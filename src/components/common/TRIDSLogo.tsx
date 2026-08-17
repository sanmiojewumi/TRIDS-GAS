import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const TRIDSLogo: React.FC<LogoProps> = ({ size = 'md' }) => {
  // Enlarge logo dimensions by 100%
  const dimensions = {
    sm: { width: 720, height: 260, heightClass: 'h-28 md:h-32' },
    md: { width: 920, height: 340, heightClass: 'h-32 md:h-40 lg:h-48' },
    lg: { width: 1200, height: 440, heightClass: 'h-40 md:h-52 lg:h-64' },
  };

  const currentDim = dimensions[size];

  return (
    <Link href="/" className="group flex items-center transition-transform duration-200 hover:scale-[1.02] shrink-0">
      <div className="relative overflow-hidden flex items-center py-1">
        <Image
          src="/images/trids-logo.png"
          alt="TRIDS Gas & Plumbing Logo"
          width={currentDim.width}
          height={currentDim.height}
          className={`object-contain w-auto ${currentDim.heightClass} drop-shadow-[0_8px_25px_rgba(245,158,11,0.35)] transition-all`}
          priority
        />
      </div>
    </Link>
  );
};
