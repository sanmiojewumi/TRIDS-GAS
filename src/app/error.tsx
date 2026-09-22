'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-950 py-16 px-4">
      <div className="max-w-xl w-full text-center space-y-6 glass-card p-8 sm:p-12 rounded-3xl border border-red-500/30 shadow-2xl">
        <div className="w-20 h-20 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-widest">
            Error 500 • System Fault
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            SOMETHING WENT WRONG.
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            An unexpected error occurred while loading this section. Our system has logged the diagnostic detail.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-glow-gold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> TRY AGAIN
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
