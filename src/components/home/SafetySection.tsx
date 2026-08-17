import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, Award, Gauge } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';

interface SafetyProps {
  settings: SiteSettingsData;
}

export const SafetySection: React.FC<SafetyProps> = ({ settings }) => {
  return (
    <section className="py-16 lg:py-24 bg-[#050A18] border-t border-[#1E3A8A] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-engineering-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Safety Standards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 text-emerald-400" /> Gas Safety Is Non-Negotiable
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              WHEN GAS IS INVOLVED, THERE ARE NO SHORTCUTS.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Gas work in the UK must legally be carried out by a registered engineer. TRIDS Gas & Plumbing operates under official Gas Safe License <strong className="text-amber-400 font-mono">Reg No. {settings.gasSafeNumber}</strong>. We rigorously follow all UK Building Regulations and British Standards (BS 6891 & BS 5440).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0F1C3F] border border-[#1E3A8A] flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white">Gas Tightness Digital Testing</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Precision manometer testing to confirm zero pressure drop across gas lines.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F1C3F] border border-[#1E3A8A] flex items-start gap-3">
                <Gauge className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white">Flue Gas Combustion Analysis</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Electronic testing of CO/CO2 ratios to prevent carbon monoxide risks.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F1C3F] border border-[#1E3A8A] flex items-start gap-3">
                <Award className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white">Benchmark Commissioning</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Full compliance logging for full manufacturer warranty protection.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0F1C3F] border border-[#1E3A8A] flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-white">CP12 Landlord Certificates</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Official digital certification for property owners and letting agents.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual License Shield Box */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-3xl p-8 border-2 border-emerald-500/40 bg-[#0F1C3F]/90 shadow-2xl text-center space-y-6 relative overflow-hidden">
              <div className="w-20 h-20 rounded-2xl bg-amber-400 text-slate-950 flex flex-col items-center justify-center font-bold mx-auto border-2 border-slate-900 shadow-glow-gold">
                <ShieldCheck className="w-10 h-10 stroke-[2.5]" />
                <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest mt-0.5">GAS SAFE</span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  OFFICIAL REGISTERED ENGINEER
                </div>
                <h3 className="text-3xl font-extrabold text-white font-heading font-mono">
                  REG NO: <span className="text-yellow-400 font-extrabold">{settings.gasSafeNumber}</span>
                </h3>
              </div>

              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Always demand to see an engineer&apos;s Gas Safe ID card before allowing any gas work in your property. TRIDS Gas & Plumbing is fully licensed, insured, and verified.
              </p>

              <a
                href="https://www.gassaferegister.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-glow-emerald transition-all"
              >
                <span>Verify on Gas Safe Register</span>
                <CheckCircle2 className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
