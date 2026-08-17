import React from 'react';
import { CheckCircle2, ShieldCheck, Award, MessageSquare, Clock, Users, Wrench } from 'lucide-react';

export const WhyChooseTRIDSSection: React.FC = () => {
  const points = [
    { title: 'Professional Workmanship', desc: 'Meticulous attention to detail from diagnosis through to final sign-off.', icon: Award },
    { title: 'Safety-First Approach', desc: 'Every job approached with rigorous Gas Safe protocols and building compliance.', icon: ShieldCheck },
    { title: 'Clear Communication', desc: 'Straightforward explanations, upfront advice, and zero hidden charges.', icon: MessageSquare },
    { title: 'Reliable Service', desc: 'Dependable appointment times and rapid emergency assistance across Crewe.', icon: Clock },
    { title: 'Quality Installations', desc: 'Premium copper pipe runs, A-rated boilers, and official commissioning.', icon: Wrench },
    { title: 'Experienced Engineering', desc: 'Qualified Gas Safe engineer skilled in complex heating & unvented systems.', icon: ShieldCheck },
    { title: 'Customer-Focused Service', desc: 'The job is not finished until the customer is 100% satisfied.', icon: Users },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A1228] border-t border-[#1E3A8A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-yellow-400 font-mono text-xs font-bold uppercase tracking-widest">
              The TRIDS Engineering Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              PROFESSIONALISM YOU CAN FEEL.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We deliver the technical expertise, reliability, and safety of a major engineering firm combined with the personal accountability of a local specialist.
            </p>
          </div>

          {/* Right Column: 7 Points Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="glass-card rounded-2xl p-5 border border-[#1E3A8A] hover:border-amber-400/60 transition-all flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-yellow-400 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors font-heading">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
