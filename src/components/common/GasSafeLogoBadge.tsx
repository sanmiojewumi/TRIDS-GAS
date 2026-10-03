import React from 'react';

interface GasSafeLogoBadgeProps {
  registrationNumber?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

const sizes = {
  sm: { mark: 56, text: 'text-[11px]', number: 'text-xs' },
  md: { mark: 72, text: 'text-sm', number: 'text-sm' },
  lg: { mark: 92, text: 'text-base', number: 'text-base' },
};

export function GasSafeLogoBadge({
  registrationNumber = '979661',
  size = 'md',
  theme = 'dark',
}: GasSafeLogoBadgeProps) {
  const current = sizes[size];
  const isLight = theme === 'light';

  return (
    <a
      href="https://www.gassaferegister.co.uk/find-an-engineer/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Verify Gas Safe registration ${registrationNumber}`}
      className={`inline-flex items-center gap-3 rounded-2xl border px-3 py-2 shadow-lg transition hover:-translate-y-0.5 ${
        isLight
          ? 'border-emerald-200 bg-white text-slate-900'
          : 'border-emerald-400/40 bg-white/10 text-white backdrop-blur'
      }`}
    >
      <svg
        width={current.mark}
        height={current.mark}
        viewBox="0 0 96 96"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="48" cy="48" r="46" fill="#0B8F4D" />
        <circle cx="48" cy="48" r="38" fill="#087A41" />
        <path
          d="M48 20c2 9-6 15-6 25 0 6 4 10 9 12-8 1-15 8-15 18 0 11 9 19 20 19s20-8 20-19c0-13-11-19-15-27 8 2 12-4 12-12 0-9-11-16-25-16z"
          fill="#FFFFFF"
        />
      </svg>
      <span className="pr-1 text-left">
        <span className={`block font-extrabold uppercase tracking-[0.12em] ${current.text} ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>
          Gas Safe Registered
        </span>
        <span className={`mt-0.5 block font-mono font-extrabold ${current.number} ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Licence {registrationNumber}
        </span>
        <span className={`block text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>
          Check the official register
        </span>
      </span>
    </a>
  );
}
