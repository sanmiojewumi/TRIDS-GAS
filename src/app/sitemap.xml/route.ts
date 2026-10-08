import { coverageTowns } from '@/lib/coverage';
import { LOCAL_LANDING_SLUGS } from '@/lib/local-landings';
import {
  CORE_BLOG_SLUGS,
  CORE_SERVICE_SLUGS,
  SERVICE_LANDING_BY_SLUG,
  SITEMAP_ROUTES,
  absoluteUrl,
} from '@/lib/seo';
import { notifyIndexNow } from '@/lib/indexnow';

export const dynamic = 'force-dynamic';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlTag(loc: string, priority: string, lastmod?: string) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>${lastmod ? `\n    <lastmod>${xmlEscape(lastmod)}</lastmod>` : ''}
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const urls = new Map<string, string>();

  const landingPaths = new Set(LOCAL_LANDING_SLUGS.map((slug) => `/${slug}`));
  for (const route of SITEMAP_ROUTES) {
    const loc = absoluteUrl(route);
    const priority = route === '/' ? '1.0' : route === '/gas-engineer-crewe' ? '0.95' : landingPaths.has(route) ? '0.9' : '0.8';
    urls.set(loc, urlTag(loc, priority));
  }

  for (const slug of CORE_SERVICE_SLUGS) {
    if (SERVICE_LANDING_BY_SLUG[slug]) continue;
    const loc = absoluteUrl(`/services/${slug}`);
    urls.set(loc, urlTag(loc, '0.75'));
  }

  for (const town of coverageTowns) {
    if (town.miles > 20 || town.slug === 'crewe') continue;
    const loc = absoluteUrl(`/areas/${town.slug}`);
    urls.set(loc, urlTag(loc, '0.65'));
  }

  for (const slug of CORE_BLOG_SLUGS) {
    const loc = absoluteUrl(`/blog/${slug}`);
    urls.set(loc, urlTag(loc, '0.55'));
  }

  try {
    const { db } = await import('@/lib/db');
    const result = await Promise.race([
      Promise.all([
        db.service.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
        db.serviceArea.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
        db.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
      ]),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500)),
    ]);

    if (result) {
      const [services, areas, posts] = result;
      for (const service of services) {
        if (SERVICE_LANDING_BY_SLUG[service.slug]) continue;
        const loc = absoluteUrl(`/services/${service.slug}`);
        urls.set(loc, urlTag(loc, '0.75', service.updatedAt.toISOString()));
      }
      for (const area of areas) {
        if (area.slug === 'crewe') continue;
        const loc = absoluteUrl(`/areas/${area.slug}`);
        urls.set(loc, urlTag(loc, '0.65', area.updatedAt.toISOString()));
      }
      for (const post of posts) {
        const loc = absoluteUrl(`/blog/${post.slug}`);
        urls.set(loc, urlTag(loc, '0.55', post.updatedAt.toISOString()));
      }
    }
  } catch (error) {
    console.error('Sitemap database lookup failed; returning static crawl list.', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls.values()).join('\n')}
</urlset>
`;

  await notifyIndexNow(Array.from(urls.keys()));

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
