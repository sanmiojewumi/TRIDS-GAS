'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileNav } from './MobileNav';
import { DraggableWhatsApp } from '../common/DraggableWhatsApp';
import { AiAssistant } from '../common/AiAssistant';
import { SiteSettingsData } from '@/lib/settings';

interface SiteChromeProps {
  settings: SiteSettingsData;
  children: React.ReactNode;
}

export const SiteChrome: React.FC<SiteChromeProps> = ({ settings, children }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:rounded-lg focus:font-bold"
      >
        Skip to content
      </a>
      <Header settings={settings} />
      <main id="main-content" className="flex-grow w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
      <Footer settings={settings} />
      <MobileNav phone={settings.phone} />
      <DraggableWhatsApp phone={settings.phone} />
      <AiAssistant />
    </>
  );
};
