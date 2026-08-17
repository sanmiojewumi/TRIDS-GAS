'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronLeft, ChevronRight, Flame, Gauge, Layers, CheckCircle2, Thermometer } from 'lucide-react';

interface SlideItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  icon: any;
  techSpec: string;
}

export const HeroSlideshow: React.FC<{ gasSafeNumber: string }> = ({ gasSafeNumber }) => {
  const slides: SlideItem[] = [
    {
      id: 'slide-1-ideal',
      title: 'Ideal Combi Boiler & Precision Copper Pipework',
      category: 'BOILER INSTALLATION',
      description: 'Wall-hung Ideal Exclusive combi boiler with 22mm soldered copper pipework, gas meter valve & magnetic filter.',
      image: '/images/slides/slide1.jpg',
      badge: 'Ideal Combi Boiler',
      icon: Flame,
      techSpec: 'Soldered Copper Gas Line & MagnaClean Filter',
    },
    {
      id: 'slide-2-rinnai-heater',
      title: 'Rinnai Continuous Flow Digital Water Heater',
      category: 'WATER HEATER SYSTEM',
      description: 'Wall-mounted Rinnai continuous flow gas water heater with microprocessor digital display set to 120°F.',
      image: '/images/slides/slide4.jpg',
      badge: 'Rinnai Water Heater',
      icon: Thermometer,
      techSpec: 'Microprocessor Digital Temperature Control (120°F)',
    },
    {
      id: 'slide-3-casing-off',
      title: 'Boiler With Casing Removed & Ongoing Flue Gas Analysis',
      category: 'INTERNAL DIAGNOSTICS',
      description: 'Front casing removed exposing burner chamber, heat exchanger, gas valve & ongoing flue gas analysis test.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      badge: 'Boiler Casing Off & FGA Test',
      icon: Layers,
      techSpec: 'Combustion Chamber Inspection & Flue Probe Analysis',
    },
    {
      id: 'slide-4-fga-tablet',
      title: 'Flue Gas Analyser & Monitor Tablet',
      category: 'COMBUSTION DIAGNOSTICS',
      description: 'Electronic digital flue gas analyzer paired with wireless monitor tablet showing live CO (53 PPM) & CO2 (8.5%) ratios.',
      image: '/images/slides/slide2.jpg',
      badge: 'Flue Gas Analyser & Tablet',
      icon: Gauge,
      techSpec: 'TPI DC710 Smart Flue Gas Analyser & Live Report',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play slideshow every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];
  const SlideIcon = currentSlide.icon;

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative rounded-3xl overflow-hidden border-2 border-[#1E3A8A] bg-[#0F1C3F]/95 shadow-2xl group select-none">
      
      {/* Top 100% Unobscured Image Box */}
      <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden bg-[#050A18]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.image}
              alt={currentSlide.title}
              fill
              className="object-contain object-center bg-slate-950 p-2"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#070D1E]/80 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center border border-[#1E3A8A] transition-all opacity-80 group-hover:opacity-100 z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#070D1E]/80 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center border border-[#1E3A8A] transition-all opacity-80 group-hover:opacity-100 z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* DROPPED DOWN CAPTION SECTION BELOW IMAGE */}
      <div className="p-4 sm:p-5 bg-[#070D1E] border-t border-[#1E3A8A] space-y-2">
        <div className="flex items-center justify-between gap-2">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F1C3F] border border-amber-400/40 text-amber-400 text-xs font-mono font-bold uppercase">
            <SlideIcon className="w-3.5 h-3.5" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Gas Safe Reg Pill */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Reg: {gasSafeNumber}</span>
          </div>
        </div>

        {/* Slide Title */}
        <h3 className="text-base sm:text-lg font-extrabold text-white font-heading leading-snug">
          {currentSlide.title}
        </h3>

        {/* Slide Description */}
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {currentSlide.description}
        </p>

        {/* Technical Specification Line */}
        <div className="pt-2 border-t border-[#1E3A8A]/60 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{currentSlide.techSpec}</span>
        </div>
      </div>

      {/* Bottom Navigation Dots & Status */}
      <div className="p-3 bg-[#050A18] border-t border-[#1E3A8A] flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentIndex ? 'w-8 bg-amber-400 shadow-glow-gold' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
          Image {currentIndex + 1} of {slides.length}
        </span>
      </div>

    </div>
  );
};
