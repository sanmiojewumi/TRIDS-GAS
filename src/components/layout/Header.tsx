'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TRIDSLogo } from '../common/TRIDSLogo';
import { SocialLinks } from '../common/SocialLinks';
import { Phone, ShieldCheck, Menu, X, Calendar } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';

interface HeaderProps {
  settings: SiteSettingsData;
}

export const Header: React.FC<HeaderProps> = ({ settings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  const formattedPhone = settings.phone.replace(/^0/, '44').replace(/\s+/g, '');

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-[#050A18] border-b border-[#1E3A8A]/60 text-xs py-1.5 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Gas Safe Registered:{' '}
              <strong className="text-white font-mono">{settings.gasSafeNumber}</strong>
            </span>
            <span className="hidden lg:inline text-blue-900">|</span>
            <span className="hidden lg:inline text-slate-300">
              {settings.address}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <SocialLinks settings={settings} compact className="hidden xl:flex" />
            <span className="hidden md:inline font-mono">{settings.openingHours}</span>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-1.5 text-amber-400 font-bold hover:text-amber-300 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#070D1E]/95 backdrop-blur-xl py-2 shadow-xl border-b border-[#1E3A8A]/50'
            : 'bg-[#070D1E]/95 backdrop-blur-md py-2.5 border-b border-[#1E3A8A]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <TRIDSLogo size="lg" />
            <Link
              href="/"
              className="min-w-0 overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="TRIDS Gas & Plumbing home"
            >
              <span className="header-brand-3d block truncate whitespace-nowrap font-heading text-[clamp(0.7rem,2.15vw,1.3rem)] font-extrabold uppercase tracking-[0.055em] max-[359px]:hidden">
                TRIDS GAS &amp; PLUMBING
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-amber-400 bg-[#0F1C3F]'
                      : 'text-slate-200 hover:text-amber-400 hover:bg-[#0F1C3F]/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/book"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-blue-500"
            >
              <Calendar className="w-4 h-4" />
              Book a Service
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">{settings.phone}</span>
              <span className="lg:hidden">Call</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-200 hover:text-amber-400 hover:bg-[#0F1C3F] border border-[#1E3A8A] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden bg-[#070D1E] border-b border-[#1E3A8A] px-4 pt-3 pb-6 space-y-4 max-h-[calc(100vh-7rem)] overflow-y-auto"
          >
            <div className="pb-3 border-b border-[#1E3A8A] flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Menu</span>
              <a
                href={`https://wa.me/${formattedPhone}?text=Hello%20TRIDS%20Gas%20%26%20Plumbing%2C%20I%20would%20like%20to%20enquire%20about%20a%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-extrabold flex items-center gap-2"
              >
                WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`block px-4 py-3 rounded-xl text-sm font-bold text-center transition-colors ${
                    pathname === link.href
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-[#0F1C3F] text-white border border-[#1E3A8A] hover:border-amber-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1E3A8A] grid grid-cols-2 gap-2">
              <Link
                href="/book"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Online
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-sm font-mono"
              >
                <Phone className="w-4 h-4" />
                Call {settings.phone}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
