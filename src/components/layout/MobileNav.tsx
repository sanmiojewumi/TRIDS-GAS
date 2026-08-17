'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, PhoneCall, FileText } from 'lucide-react';

interface MobileNavProps {
  phone: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ phone }) => {
  const pathname = usePathname();

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/services', icon: Wrench },
    { label: 'Call', href: `tel:${phone}`, icon: PhoneCall, isCall: true },
    { label: 'Quote', href: '/quote', icon: FileText },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050A18]/95 backdrop-blur-xl border-t border-[#1E3A8A] shadow-2xl px-2 py-1.5">
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCall) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold shadow-glow-gold active:scale-95 transition-transform"
              >
                <Icon className="w-5 h-5 mb-0.5 animate-bounce" />
                <span className="text-[10px] uppercase font-mono font-bold tracking-tight">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-colors ${
                isActive
                  ? 'text-amber-400 bg-[#0F1C3F] font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-[#0F1C3F]/50'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-sans tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
