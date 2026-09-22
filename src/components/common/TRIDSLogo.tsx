import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const dimensions = {
  sm: { width: 140, height: 140, className: 'h-9 w-auto max-h-9 max-w-[4.5rem] sm:max-w-[5rem]' },
  md: { width: 180, height: 180, className: 'h-10 sm:h-11 md:h-12 w-auto max-h-12 max-w-[5.25rem] sm:max-w-[6rem] md:max-w-[6.75rem]' },
  lg: { width: 220, height: 220, className: 'h-14 md:h-16 w-auto max-h-16 max-w-[7.5rem] md:max-w-[8.5rem]' },
};

export const TRIDSLogo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const current = dimensions[size];

  return (
    <Link
      href="/"
      className="group flex items-center shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      aria-label="TRIDS Gas & Plumbing home"
    >
      <Image
        src="/images/trids-logo.png"
        alt="TRIDS Gas & Plumbing"
        width={current.width}
        height={current.height}
        className={`object-contain object-left ${current.className} drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)] transition-transform duration-200 group-hover:scale-[1.03]`}
        priority
      />
    </Link>
  );
};
