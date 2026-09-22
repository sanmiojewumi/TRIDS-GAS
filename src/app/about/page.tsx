import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteSettings } from '@/lib/settings';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';
import { ShieldCheck, Award, CheckCircle2, UserCheck, PhoneCall, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About TRIDS Gas & Plumbing | Meet the Lead Engineer',
  description: 'Learn about TRIDS Gas & Plumbing, operated by a Gas Safe registered engineer committed to technical excellence and safety.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 bg-slate-950 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> British Engineering Excellence
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            ABOUT TRIDS GAS & PLUMBING
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Founded on principles of uncompromising safety, technical precision, and absolute transparency in domestic heating and plumbing.
          </p>
        </div>

        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />

        {/* Section 1: Meet the Engineer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="lg:col-span-5 relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <Image
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80"
              alt="TRIDS Lead Engineer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-amber-500/30">
              <div className="text-xs font-mono text-amber-400">Lead Engineer</div>
              <div className="text-lg font-bold text-white">{settings.engineerName}</div>
              <div className="text-xs text-slate-300 mt-0.5">{settings.engineerQualifications}</div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Meet The Lead Engineer
            </span>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              Technical Knowledge & Personal Responsibility
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When you hire TRIDS Gas & Plumbing, you deal directly with a fully qualified Gas Safe registered engineer who takes personal pride in every pipe joint soldered, every boiler installed, and every safety inspection completed.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              With years of field experience across domestic gas systems, central heating hydraulics, and unvented hot water cylinders, we ensure every job complies strictly with current UK Building Regulations and Gas Safety (Installation and Use) Regulations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-semibold text-slate-200">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" /> Gas Safe Licensed ({settings.gasSafeNumber})
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Unvented Hot Water Certified (G3)
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Public Liability Insurance
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> Worcester & Vaillant Approved
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Our Approach */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-white font-heading">OUR APPROACH</h2>
            <p className="text-slate-300 text-sm">Five pillars of standard operating procedure on every site visit.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">1</div>
              <h3 className="text-lg font-bold text-white font-heading">Safety & Compliance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">No shortcuts. Pressure testing, flue gas analysis, and safety interlocks checked thoroughly.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">2</div>
              <h3 className="text-lg font-bold text-white font-heading">Technical Quality</h3>
              <p className="text-xs text-slate-300 leading-relaxed">Clean copper pipework runs, high-flow fittings, and efficient system hydraulic balancing.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">3</div>
              <h3 className="text-lg font-bold text-white font-heading">Transparent Communication</h3>
              <p className="text-xs text-slate-300 leading-relaxed">We explain diagnosed faults in plain language and provide upfront costs prior to work.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Safety First */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl font-extrabold text-white font-heading">Why Gas Work Requires a Licensed Engineer</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Ill-fitted gas appliances or unverified pipework can result in catastrophic gas leaks, explosive fires, or toxic carbon monoxide poisoning. Always verify your engineer&apos;s Gas Safe ID card before allowing gas work in your home.
            </p>
          </div>

          <a
            href={`tel:${settings.phone}`}
            className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-glow-gold shrink-0 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" /> CALL TRIDS: {settings.phone}
          </a>
        </div>

      </div>
    </div>
  );
}
