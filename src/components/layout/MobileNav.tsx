'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Calendar } from 'lucide-react';

interface MobileNavProps {
  phone: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ phone }) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700 bg-[#050A18]/95 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-xl lg:hidden"
      aria-label="Quick contact actions"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href={`tel:${phone}`}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-3 text-xs font-extrabold tracking-wide text-slate-950 active:scale-[0.98]"
        >
          <PhoneCall className="h-5 w-5" />
          CALL NOW
        </a>
        <Link
          href="/book"
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 text-xs font-extrabold tracking-wide text-white active:scale-[0.98]"
        >
          <Calendar className="h-5 w-5" />
          BOOK A SERVICE
        </Link>
      </div>
    </nav>
  );
};
