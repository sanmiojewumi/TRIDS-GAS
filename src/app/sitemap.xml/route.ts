import { coverageTowns } from '@/lib/coverage';
import { LOCAL_LANDING_SLUGS } from '@/lib/local-landings';
import { CORE_BLOG_SLUGS, CORE_SERVICE_SLUGS, PUBLIC_INDEX_ROUTES, absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlTag(loc: string, changefreq: string, priority: string, lastmod: string) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const lastmod = new Date().toISOString();
  const urls = new Map<string, string>();

  for (const route of PUBLIC_INDEX_ROUTES) {
    urls.set(
      absoluteUrl(route),
      urlTag(absoluteUrl(route), route === '/' ? 'daily' : 'weekly', route === '/' ? '1.0' : '0.8', lastmod),
    );
  }

  for (const slug of CORE_SERVICE_SLUGS) {
    const loc = absoluteUrl(`/services/${slug}`);
    urls.set(loc, urlTag(loc, 'weekly', '0.85', lastmod));
  }

  for (const slug of LOCAL_LANDING_SLUGS) {
    const loc = absoluteUrl(`/${slug}`);
    urls.set(loc, urlTag(loc, 'weekly', slug === 'gas-engineer-crewe' ? '0.95' : '0.9', lastmod));
  }

  for (const town of coverageTowns) {
    const loc = absoluteUrl(`/areas/${town.slug}`);
    urls.set(loc, urlTag(loc, 'weekly', '0.8', lastmod));
  }

  for (const slug of CORE_BLOG_SLUGS) {
    const loc = absoluteUrl(`/blog/${slug}`);
    urls.set(loc, urlTag(loc, 'monthly', '0.65', lastmod));
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
        const loc = absoluteUrl(`/services/${service.slug}`);
        urls.set(loc, urlTag(loc, 'weekly', '0.85', service.updatedAt.toISOString()));
      }
      for (const area of areas) {
        const loc = absoluteUrl(`/areas/${area.slug}`);
        urls.set(loc, urlTag(loc, 'weekly', '0.8', area.updatedAt.toISOString()));
      }
      for (const post of posts) {
        const loc = absoluteUrl(`/blog/${post.slug}`);
        urls.set(loc, urlTag(loc, 'monthly', '0.65', post.updatedAt.toISOString()));
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

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
