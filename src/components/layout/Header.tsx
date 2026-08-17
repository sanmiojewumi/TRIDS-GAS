'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TRIDSLogo } from '../common/TRIDSLogo';
import { Phone, ShieldCheck, Menu, X, Calendar, Wrench } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';

interface HeaderProps {
  settings: SiteSettingsData;
}

export const Header: React.FC<HeaderProps> = ({ settings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Areas', href: '/areas' },
    { name: 'Knowledge', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const formattedPhone = settings.phone.replace(/^0/, '44').replace(/\s+/g, '');

  return (
    <header className="w-full relative z-50">
      {/* Top Announcement & Trust Bar */}
      <div className="bg-[#050A18] border-b border-[#1E3A8A]/60 text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Gas Safe Registered: <strong className="text-white font-mono">{settings.gasSafeNumber}</strong>
            </span>
            <span className="hidden md:inline text-blue-900">|</span>
            <span className="hidden md:inline text-slate-300">
              Serving Crewe, Cheshire, Manchester, Stoke & 50-Mile Radius
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden sm:inline font-mono">{settings.openingHours}</span>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-1.5 text-amber-400 font-bold hover:text-amber-300 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? 'glass-header py-3 shadow-xl' : 'bg-[#070D1E]/95 backdrop-blur-md py-4 border-b border-[#1E3A8A]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-4">
          
          {/* Left: Enlarged Brand Logo */}
          <TRIDSLogo size="md" />

          {/* Center: White Button Navigation Bar (50% enlarged 16px font-extrabold) */}
          <div className="hidden xl:flex items-center gap-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-base font-extrabold tracking-wide transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center bg-white text-slate-950 hover:bg-amber-400 hover:text-slate-950 ${
                    isActive
                      ? 'border-2 border-amber-400 shadow-glow-gold scale-105 ring-2 ring-amber-400/50'
                      : 'border-2 border-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right: Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/book"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white text-sm font-extrabold border border-blue-400/50 shadow-glow-blue transition-all"
            >
              <Calendar className="w-4 h-4 text-yellow-300" />
              <span>Book Online</span>
            </Link>

            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-red-600 hover:from-yellow-300 hover:to-red-500 text-slate-950 text-sm font-extrabold transition-all shadow-glow-gold hover:scale-[1.02] font-mono"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>{settings.phone}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl text-slate-200 hover:text-amber-400 hover:bg-[#0F1C3F] border border-[#1E3A8A] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#070D1E] border-b border-[#1E3A8A] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile WhatsApp Button */}
            <div className="pb-3 border-b border-[#1E3A8A] flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">TRIDS Navigation</span>
              <a
                href={`https://wa.me/${formattedPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-extrabold flex items-center gap-2 border border-white/40 shadow-glow-emerald"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.197 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile White Buttons Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-extrabold text-center transition-all bg-white text-slate-950 hover:bg-amber-400 ${
                    pathname === link.href ? 'border-2 border-amber-400 shadow-glow-gold' : 'border-2 border-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1E3A8A] grid grid-cols-2 gap-2.5">
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0F1C3F] text-white font-bold text-sm border border-[#1E3A8A]"
              >
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Get a Quote</span>
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-red-600 text-slate-950 font-extrabold text-sm shadow-glow-gold font-mono"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
