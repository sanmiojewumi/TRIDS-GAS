import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface GasSafeTopBadgeProps {
  registrationNumber?: string;
}

export const GasSafeTopBadge: React.FC<GasSafeTopBadgeProps> = ({
  registrationNumber = '979661',
}) => {
  return (
    <a
      href="https://www.gassaferegister.co.uk"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-emerald-950/40 border border-emerald-500/40 text-slate-100 hover:border-emerald-400 transition-all shadow-md group shrink-0"
      title={`Verified Gas Safe Registered Engineer: Reg No ${registrationNumber}`}
    >
      {/* Official Gas Safe Shield Icon */}
      <div className="w-9 h-9 rounded-lg bg-amber-400 border border-slate-900 flex flex-col items-center justify-center text-slate-950 font-bold shrink-0 shadow-sm leading-none p-0.5 group-hover:scale-105 transition-transform">
        <ShieldCheck className="w-5 h-5 text-slate-950 stroke-[2.5]" />
        <span className="text-[7px] font-extrabold uppercase font-mono tracking-tighter text-slate-950 mt-0.5">GAS</span>
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider font-mono">
            Gas Safe Register
          </span>
          <CheckCircle2 className="w-3 h-3 text-emerald-400 inline-block" />
        </div>
        <div className="text-xs font-mono font-extrabold text-white tracking-tight">
          Reg No: <span className="text-amber-400 font-extrabold">{registrationNumber}</span>
        </div>
      </div>
    </a>
  );
};
