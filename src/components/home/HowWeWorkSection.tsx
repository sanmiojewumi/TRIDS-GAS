import React from 'react';
import { PhoneCall, SearchCheck, Wrench, ShieldCheck } from 'lucide-react';

export const HowWeWorkSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'CONTACT',
      subtitle: 'Tell us what you need.',
      description: 'Reach out by phone or submit a quick online request.',
      icon: PhoneCall,
    },
    {
      number: '02',
      title: 'ASSESS',
      subtitle: 'We inspect and diagnose.',
      description: 'Thorough inspection of your boiler, flues, or pipework.',
      icon: SearchCheck,
    },
    {
      number: '03',
      title: 'SOLVE',
      subtitle: 'Professional execution.',
      description: 'Work carried out cleanly to strict Gas Safe standards.',
      icon: Wrench,
    },
    {
      number: '04',
      title: 'PROTECT',
      subtitle: 'Safety & Commissioning.',
      description: 'Full testing, commissioning, and safety sign-off.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#070D1E] relative overflow-hidden border-t border-[#1E3A8A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Straightforward Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            HOW WE WORK
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Our structured four-step engineering process guarantees safety, clarity, and peace of mind from start to finish.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500 to-amber-500/20 -translate-y-6 z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative z-10 glass-card rounded-2xl p-6 flex flex-col items-center text-center group hover:border-amber-400 transition-all duration-300"
              >
                {/* Step Number Badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#070D1E] border-2 border-amber-500 flex items-center justify-center text-yellow-400 font-mono font-extrabold text-lg shadow-glow-gold mb-4 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                <div className="w-10 h-10 rounded-full bg-[#0F1C3F] border border-[#1E3A8A] flex items-center justify-center text-slate-300 mb-3">
                  <Icon className="w-5 h-5 text-yellow-400" />
                </div>

                <h3 className="text-lg font-extrabold text-white font-heading tracking-wide">
                  {step.title}
                </h3>
                <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                  {step.subtitle}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                  {step.description}
                </p>

                {/* Progress dot */}
                <div className="mt-4 w-2 h-2 rounded-full bg-amber-500/50 group-hover:bg-amber-400 group-hover:scale-150 transition-all" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
