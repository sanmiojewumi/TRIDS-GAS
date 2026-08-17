import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Calendar, CheckCircle2, Award, Zap, ShieldAlert, Flame, Star, Clock, MapPin, Wrench } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';
import { HeroSlideshow } from './HeroSlideshow';

interface HeroProps {
  settings: SiteSettingsData;
}

export const HeroSection: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#070D1E] overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Dynamic Animated Background Mesh & Tri-Color Ambient Rays */}
      <div className="absolute inset-0 bg-engineering-pattern opacity-40 pointer-events-none" />
      
      {/* Ambient Red, Blue, and Yellow Glow Rays */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[150px] animate-subtle-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-blue-600/25 rounded-full blur-[160px] animate-subtle-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-500/15 rounded-full blur-[150px] animate-subtle-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Busy Top Live Ticker Ribbon */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#0F1C3F]/90 border border-[#1E3A8A] rounded-2xl p-2.5 px-4 shadow-xl">
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AVAILABLE TODAY IN CREWE & CHESHIRE
            </span>
            <span className="hidden md:inline text-slate-300 font-medium">
              Average 30-Min Emergency Arrival • Landlord CP12 Safety Certificates
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="hidden sm:flex items-center gap-1 text-yellow-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-yellow-400" /> 5.0 Star Rated (140+ Reviews)
            </span>
            <a href={`tel:${settings.phone}`} className="text-amber-400 font-extrabold hover:underline">
              ☎ {settings.phone}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider shadow-glow-red animate-pulse">
                <ShieldAlert className="w-4 h-4 text-red-400" /> 24/7 Emergency Gas Response
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1C3F]/90 border border-blue-500/40 text-slate-200 text-xs font-semibold shadow-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gas Safe Registered: <strong className="text-yellow-400 font-mono">{settings.gasSafeNumber}</strong></span>
              </div>
            </div>

            {/* Headline Corrected: ENGINEER YOU CAN TRUST */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
              TRIDS GAS & PLUMBING
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-blue-400 mt-1 text-3xl sm:text-4xl lg:text-5xl font-extrabold">
                ENGINEER YOU CAN TRUST.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed font-normal">
              Professional domestic gas, boiler servicing, heating installations, and plumbing repairs. Delivered safely, cleanly, and efficiently by a qualified Gas Safe registered engineer across Crewe, Cheshire, Manchester & Staffordshire.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-500 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-slate-950 text-base font-extrabold transition-all shadow-glow-gold hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="w-5 h-5 fill-slate-950" />
                <span>{settings.primaryCtaText}</span>
              </Link>

              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-base font-bold transition-all border border-red-400/40 shadow-glow-red font-mono"
              >
                <Phone className="w-5 h-5 text-white" />
                <span>{settings.secondaryCtaText}: {settings.phone}</span>
              </a>
            </div>

            {/* Busy Feature Highlights Grid */}
            <div className="pt-6 border-t border-[#1E3A8A]/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-300">
              <div className="p-2.5 rounded-xl bg-[#0F1C3F]/60 border border-[#1E3A8A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gas Safe Registered</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0F1C3F]/60 border border-[#1E3A8A] flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>City & Guilds Qualified</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0F1C3F]/60 border border-[#1E3A8A] flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                <span>30-Min Fast Response</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0F1C3F]/60 border border-[#1E3A8A] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-red-400 shrink-0" />
                <span>Unvented G3 Specialist</span>
              </div>
            </div>

          </div>

          {/* Right Column: Restored Slideshow with Accurately Aligned Captions */}
          <div className="lg:col-span-5 relative">
            <HeroSlideshow gasSafeNumber={settings.gasSafeNumber} />
          </div>

        </div>
      </div>
    </section>
  );
};
