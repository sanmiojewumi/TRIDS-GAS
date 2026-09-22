import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, CheckCircle2, Calendar, ShieldCheck, Gauge, Zap } from 'lucide-react';

export const FeaturedBoilerSection: React.FC = () => {
  const specs = [
    { label: 'EFFICIENCY', value: '98%', desc: 'A-Rated Energy Performance', color: 'bg-emerald-500' },
    { label: 'SAFETY', value: '100%', desc: 'Gas Safe Flue Gas Tested', color: 'bg-yellow-400' },
    { label: 'RELIABILITY', value: '10 YRS', desc: 'Warranty Protection Available', color: 'bg-sky-400' },
    { label: 'PERFORMANCE', value: 'OPTIMAL', desc: 'Precision Flow & Temperature', color: 'bg-emerald-400' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#070D1E] to-[#0A1228] border-t border-[#1E3A8A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Image & Specs Panel */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#1E3A8A] shadow-2xl group">
              <div className="relative h-[420px] sm:h-[500px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
                  alt="TRIDS Boiler Servicing and Heating System"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/40 to-transparent" />
                
                {/* Floating Technical Specification Panel */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#070D1E]/95 backdrop-blur-md p-4 rounded-2xl border border-amber-400/40 shadow-xl grid grid-cols-2 gap-3">
                  {specs.map((spec) => (
                    <div key={spec.label} className="p-2.5 rounded-xl bg-[#0F1C3F] border border-[#1E3A8A]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-400">{spec.label}</span>
                        <span className="text-xs font-bold text-yellow-400">{spec.value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#070D1E] rounded-full mt-1.5 overflow-hidden">
                        <div className={`h-full ${spec.color} w-full rounded-full`} />
                      </div>
                      <span className="text-[10px] text-slate-300 mt-1 block">{spec.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1C3F] border border-[#1E3A8A] text-amber-400 text-xs font-bold uppercase tracking-widest">
              <Flame className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Heating & Boiler Specialists
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              YOUR BOILER. YOUR COMFORT. OUR EXPERTISE.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Whether you need an annual safety service, an urgent breakdown repair, or a complete high-efficiency heating system upgrade, TRIDS Gas & Plumbing delivers precision gas engineering.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#070D1E] border border-[#1E3A8A]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Boiler Installation & Replacements</h4>
                  <p className="text-xs text-slate-400 mt-0.5">A+ rated Worcester Bosch, Vaillant & Ideal combi or system boilers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#070D1E] border border-[#1E3A8A]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Annual Boiler Servicing</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Comprehensive flue gas analysis and combustion safety checks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#070D1E] border border-[#1E3A8A]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Fault Diagnostics & Emergency Repairs</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Rapid resolution of error codes, pressure loss, and heating faults.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/book?service=Boiler+Servicing"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-glow-gold hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 fill-slate-950" />
                <span>BOOK BOILER SERVICE</span>
              </Link>

              <Link
                href="/services/boiler-installation"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0F1C3F] hover:bg-[#142552] text-white font-semibold text-sm border border-[#1E3A8A]"
              >
                Explore Installations
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
