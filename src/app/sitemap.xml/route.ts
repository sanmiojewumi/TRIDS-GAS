import { coverageTowns, getCoverageTown } from '@/lib/coverage';
import { LOCAL_LANDING_SLUGS } from '@/lib/local-landings';
import {
  CORE_BLOG_SLUGS,
  CORE_SERVICE_SLUGS,
  SERVICE_LANDING_BY_SLUG,
  SITEMAP_ROUTES,
  absoluteUrl,
} from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlTag(loc: string, priority: string) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <priority>${priority}</priority>
  </url>`;
}

function buildStaticSitemap() {
  const urls = new Map<string, string>();
  const landingPaths = new Set(LOCAL_LANDING_SLUGS.map((slug) => `/${slug}`));

  for (const route of SITEMAP_ROUTES) {
    const loc = absoluteUrl(route);
    const priority =
      route === '/' ? '1.0' : route === '/gas-engineer-crewe' ? '0.95' : landingPaths.has(route) ? '0.9' : '0.8';
    urls.set(loc, urlTag(loc, priority));
  }

  for (const slug of CORE_SERVICE_SLUGS) {
    if (SERVICE_LANDING_BY_SLUG[slug]) continue;
    urls.set(absoluteUrl(`/services/${slug}`), urlTag(absoluteUrl(`/services/${slug}`), '0.75'));
  }

  for (const town of coverageTowns) {
    if (town.miles > 20 || town.slug === 'crewe') continue;
    urls.set(absoluteUrl(`/areas/${town.slug}`), urlTag(absoluteUrl(`/areas/${town.slug}`), '0.65'));
  }

  for (const slug of CORE_BLOG_SLUGS) {
    urls.set(absoluteUrl(`/blog/${slug}`), urlTag(absoluteUrl(`/blog/${slug}`), '0.55'));
  }

  return urls;
}

function sitemapResponse(urls: Map<string, string>) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls.values()).join('\n')}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}

export async function GET() {
  const urls = buildStaticSitemap();

  try {
    const { db } = await import('@/lib/db');
    const result = await Promise.race([
      Promise.all([
        db.service.findMany({ where: { active: true }, select: { slug: true } }),
        db.serviceArea.findMany({ where: { active: true }, select: { slug: true } }),
        db.blogPost.findMany({ where: { published: true }, select: { slug: true } }),
      ]),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 800)),
    ]);

    if (result) {
      const [services, areas, posts] = result;
      for (const service of services) {
        if (SERVICE_LANDING_BY_SLUG[service.slug]) continue;
        const loc = absoluteUrl(`/services/${service.slug}`);
        urls.set(loc, urlTag(loc, '0.75'));
      }
      for (const area of areas) {
        const known = getCoverageTown(area.slug);
        if (!known || known.slug === 'crewe' || known.miles > 20) continue;
        const loc = absoluteUrl(`/areas/${area.slug}`);
        urls.set(loc, urlTag(loc, '0.65'));
      }
      for (const post of posts) {
        const loc = absoluteUrl(`/blog/${post.slug}`);
        urls.set(loc, urlTag(loc, '0.55'));
      }
    }
  } catch (error) {
    console.error('Sitemap database lookup failed; returning static crawl list.', error);
  }

  return sitemapResponse(urls);
}
