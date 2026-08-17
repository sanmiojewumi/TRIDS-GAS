import React from 'react';
import { ShieldCheck, Star, Clock, MapPin } from 'lucide-react';

export const StatsRibbon: React.FC = () => {
  const stats = [
    {
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      label: 'GAS SAFE REGISTERED',
      value: 'Reg No: 979661',
      subtext: 'Official Licensed UK Gas Engineer',
    },
    {
      icon: Star,
      color: 'text-yellow-400 fill-yellow-400',
      bgColor: 'bg-yellow-500/10 border-yellow-500/30',
      label: 'CUSTOMER RATING',
      value: '5.0 ★★★★★',
      subtext: 'Verified 5-Star Reviews',
    },
    {
      icon: Clock,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/30',
      label: 'FAST EMERGENCY RESPONSE',
      value: '24/7 Dispatch',
      subtext: 'Rapid Emergency Callouts',
    },
    {
      icon: MapPin,
      color: 'text-sky-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      label: 'LOCAL COVERAGE',
      value: '50-Mile Radius',
      subtext: 'Crewe, Cheshire & Manchester',
    },
  ];

  return (
    <section className="bg-[#050A18] border-y border-[#1E3A8A] py-8 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-[#0F1C3F]/80 border border-[#1E3A8A] shadow-md hover:border-amber-400/50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-extrabold uppercase text-slate-400 tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-base font-extrabold text-white font-heading tracking-tight mt-0.5">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
