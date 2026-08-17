import React from 'react';
import Link from 'next/link';
import { Wrench, Home, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-950 py-16 px-4">
      <div className="max-w-xl w-full text-center space-y-6 glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Animated icon */}
        <div className="w-20 h-20 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-glow-gold">
          <Wrench className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            LOOKS LIKE THIS PIPELINE TOOK A WRONG TURN.
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            The page, service guide, or pipe path you were looking for doesn&apos;t exist or has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-glow-gold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> RETURN TO HOMEPAGE
          </Link>
          <Link
            href="/quote"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2"
          >
            REQUEST A QUOTE
          </Link>
        </div>

      </div>
    </div>
  );
}
