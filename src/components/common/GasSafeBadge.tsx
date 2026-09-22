import React from 'react';
import { ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';

interface GasSafeBadgeProps {
  registrationNumber?: string;
  engineerName?: string;
  compact?: boolean;
}

export const GasSafeBadge: React.FC<GasSafeBadgeProps> = ({
  registrationNumber = '979661',
  engineerName,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-sm">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Gas Safe Registered: <strong className="text-white">{registrationNumber}</strong></span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-6 md:p-8 shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-glow-emerald">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider">
                Official Certification
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified UK Engineer
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-1.5">
              Gas Safe Registered Engineer
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Gas work in the UK must legally be carried out by a registered engineer. TRIDS Gas & Plumbing is fully licensed, insured, and verified.
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
          <div className="text-left md:text-right">
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Reg Number</div>
            <div className="text-lg font-mono font-bold text-emerald-400 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800 inline-block mt-0.5">
              {registrationNumber}
            </div>
          </div>
          
          {engineerName && !engineerName.startsWith('[') && (
            <div className="text-left md:text-right">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Lead Engineer</div>
              <div className="text-sm font-semibold text-slate-200">{engineerName}</div>
            </div>
          )}

          <a
            href="https://www.gassaferegister.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-lg shadow-emerald-950/50"
          >
            Verify on Gas Safe Register <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
