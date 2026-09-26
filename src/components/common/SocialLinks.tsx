import React from 'react';
import { SiteSettingsData } from '@/lib/settings';
import { isPublicHttpsUrl } from '@/lib/security';

interface SocialLinksProps {
  settings: SiteSettingsData;
  className?: string;
  compact?: boolean;
}

type SocialItem = { label: string; href: string; path: string };

export function SocialLinks({ settings, className = '', compact = false }: SocialLinksProps) {
  const items: SocialItem[] = [
    { label: 'Facebook', href: settings.facebookUrl, path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { label: 'Instagram', href: settings.instagramUrl, path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm6.5-.8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' },
    { label: 'TikTok', href: settings.tiktokUrl, path: 'M14 3h2.2a5.6 5.6 0 0 0 3.8 3.4V9a8 8 0 0 1-3.8-1.1v6.4A5.3 5.3 0 1 1 9.2 9.2v2.2a3.1 3.1 0 1 0 2.2 3V3z' },
    { label: 'LinkedIn', href: settings.linkedinUrl, path: 'M6 9H2V22h4V9zm.2-5A2.2 2.2 0 1 1 1.8 4 2.2 2.2 0 0 1 6.2 4zM22 22h-4v-6.7c0-2.2-2.6-2-2.6 0V22h-4V9h4v1.8c1.7-3.1 6.6-3.3 6.6 2.9V22z' },
    { label: 'YouTube', href: settings.youtubeUrl, path: 'M22.5 6.8a3 3 0 0 0-2.1-2.1C18.6 4.2 12 4.2 12 4.2s-6.6 0-8.4.5A3 3 0 0 0 1.5 6.8 31 31 0 0 0 1 12a31 31 0 0 0 .5 5.2 3 3 0 0 0 2.1 2.1c1.8.5 8.4.5 8.4.5s6.6 0 8.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-5.2zM10 15.5v-7l6 3.5-6 3.5z' },
    { label: 'X', href: settings.xUrl, path: 'M3 3h4.6l4.1 5.8L16.7 3H21l-7.2 8.2L21.4 21h-4.6l-4.6-6.5L6.1 21H2l7.8-8.9L3 3z' },
  ].filter((item) => isPublicHttpsUrl(item.href));

  if (!items.length) return null;

  return (
    <nav aria-label="Social media" className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.label} account`}
          className={`inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-200 transition hover:border-amber-400 hover:text-amber-300 ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d={item.path} />
          </svg>
        </a>
      ))}
    </nav>
  );
}
