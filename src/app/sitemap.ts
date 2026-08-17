import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tridsgas.co.uk';

  const services = await db.service.findMany({ where: { active: true } });
  const areas = await db.serviceArea.findMany({ where: { active: true } });
  const posts = await db.blogPost.findMany({ where: { published: true } });

  const serviceUrls = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const areaUrls = areas.map((a) => ({
    url: `${baseUrl}/areas/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postUrls = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const staticUrls = [
    '',
    '/services',
    '/about',
    '/projects',
    '/reviews',
    '/areas',
    '/blog',
    '/contact',
    '/quote',
    '/book',
    '/privacy',
    '/cookies',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...serviceUrls, ...areaUrls, ...postUrls];
}
