'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sliders, CheckCircle2 } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0A1228] border-t border-[#1E3A8A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1C3F] border border-amber-500/40 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <Sliders className="w-3.5 h-3.5 text-yellow-400" /> Engineering Transformation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            SEE THE TRIDS DIFFERENCE
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Drag the slider to compare an outdated boiler system with a clean, high-efficiency TRIDS installation.
          </p>
        </div>

        {/* Interactive Before/After Container */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative h-[320px] sm:h-[480px] w-full rounded-3xl overflow-hidden border-2 border-[#1E3A8A] shadow-2xl select-none cursor-ew-resize touch-none group"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            {/* AFTER Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80"
                alt="After: Modern High-Efficiency Boiler Installation"
                fill
                className="object-cover"
                priority
              />
              {/* After Badge */}
              <div className="absolute bottom-6 right-6 bg-[#070D1E]/95 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/40 text-emerald-400 font-extrabold text-xs flex items-center gap-2 shadow-lg z-10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>AFTER: TRIDS Modern Installation</span>
              </div>
            </div>

            {/* BEFORE Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full min-w-[320px] sm:min-w-[800px] md:min-w-[1000px]">
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
                  alt="Before: Old Inefficient Heating System"
                  fill
                  className="object-cover grayscale contrast-125"
                />
              </div>
              {/* Before Badge */}
              <div className="absolute bottom-6 left-6 bg-[#070D1E]/95 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-extrabold text-xs shadow-lg z-10">
                BEFORE: Outdated System
              </div>
            </div>

            {/* Slider Drag Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)] cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-yellow-400 text-slate-950 border-2 border-slate-900 flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform">
                <Sliders className="w-5 h-5" />
              </div>
            </div>

          </div>

          <div className="mt-4 text-center text-xs font-mono text-slate-400">
            ← Drag slider left or right to compare →
          </div>
        </div>

      </div>
    </section>
  );
};
