import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const publicCrawl = {
  allow: ['/', '/llms.txt'],
  disallow: ['/admin', '/admin/', '/api/', '/api/admin/'],
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', ...publicCrawl },
      { userAgent: 'Googlebot', ...publicCrawl },
      { userAgent: 'Bingbot', ...publicCrawl },
      { userAgent: 'DuckDuckBot', ...publicCrawl },
      { userAgent: 'Applebot', ...publicCrawl },
      { userAgent: 'GPTBot', ...publicCrawl },
      { userAgent: 'ChatGPT-User', ...publicCrawl },
      { userAgent: 'Google-Extended', ...publicCrawl },
      { userAgent: 'ClaudeBot', ...publicCrawl },
      { userAgent: 'Claude-SearchBot', ...publicCrawl },
      { userAgent: 'anthropic-ai', ...publicCrawl },
      { userAgent: 'PerplexityBot', ...publicCrawl },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}