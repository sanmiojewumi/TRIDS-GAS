import React from 'react';
import { PhoneCall, SearchCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'GET IN TOUCH',
      description: 'Contact TRIDS Gas & Plumbing by phone or submit a smart online quote request.',
      icon: PhoneCall,
    },
    {
      number: '02',
      title: 'DIAGNOSE',
      description: 'Understand the issue, inspect pipework/flue, and assess the required work.',
      icon: SearchCheck,
    },
    {
      number: '03',
      title: 'SOLVE',
      description: 'Carry out the gas or plumbing work safely, cleanly, and professionally.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'COMPLETE',
      description: 'Test, commission, issue certificates, and clearly explain the finished work.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#070D1E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Straightforward Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            HOW IT WORKS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From initial phone call to complete sign-off, our four-step process guarantees safety, clarity, and peace of mind.
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
                className="relative z-10 glass-card rounded-2xl p-6 flex flex-col items-center text-center group hover:border-amber-500/60 transition-all duration-300"
              >
                {/* Step Number Badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#070D1E] border-2 border-amber-500 flex items-center justify-center text-amber-400 font-mono font-extrabold text-lg shadow-glow-gold mb-4 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                <div className="w-10 h-10 rounded-full bg-[#0F1C3F] border border-[#1E3A8A] flex items-center justify-center text-slate-300 mb-3">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>

                <h3 className="text-lg font-extrabold text-white font-heading tracking-wide">
                  {step.title}
                </h3>
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
