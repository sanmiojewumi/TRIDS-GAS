import React from 'react';
import { ShieldCheck, ShieldAlert, Award, MessageSquare, Clock, Users } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const reasons = [
    {
      title: 'Gas Safe Registered',
      description: 'All work carried out strictly by a Gas Safe registered engineer (Reg No. 979661).',
      icon: ShieldCheck,
      badge: 'Reg 979661',
    },
    {
      title: 'Safety First Culture',
      description: 'Every job approached with rigorous safety protocols and compliance as priority.',
      icon: ShieldAlert,
      badge: 'Compliant',
    },
    {
      title: 'Professional Workmanship',
      description: 'Meticulous attention to detail from initial diagnosis through to final sign-off.',
      icon: Award,
      badge: 'Guaranteed',
    },
    {
      title: 'Transparent Communication',
      description: 'Straightforward explanations, clear upfront advice, and zero hidden charges.',
      icon: MessageSquare,
      badge: 'Clear Pricing',
    },
    {
      title: 'Fast Local Response',
      description: 'Dependable appointment times and rapid emergency assistance across Crewe & Cheshire.',
      icon: Clock,
      badge: 'Punctual',
    },
    {
      title: 'Customer Satisfaction',
      description: 'The job is not finished until the customer fully understands what has been done.',
      icon: Users,
      badge: 'Satisfaction',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0A1228]/90 border-t border-[#1E3A8A]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            The TRIDS Gas & Plumbing Guarantee
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            WHY CHOOSE TRIDS?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We deliver the confidence and safety of a top-tier engineering firm with the personal accountability of a dedicated local specialist.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#070D1E] border border-[#1E3A8A] flex items-center justify-center text-amber-400 group-hover:border-amber-500/60 group-hover:scale-110 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-[#070D1E] text-slate-300 border border-[#1E3A8A]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-heading">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#1E3A8A]/60 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  TRIDS Quality Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
