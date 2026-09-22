import React from 'react';
import { getSiteSettings } from '@/lib/settings';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { GasSafeBadge } from '@/components/common/GasSafeBadge';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact TRIDS Gas & Plumbing',
  description: 'Get in touch with TRIDS Gas & Plumbing by phone, email, or online enquiry form.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 lg:py-20 bg-slate-950 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Direct Communication
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            CONTACT TRIDS GAS & PLUMBING
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Speak directly with our qualified Gas Safe registered engineer for advice, quotes, and bookings.
          </p>
        </div>

        <GasSafeBadge registrationNumber={settings.gasSafeNumber} engineerName={settings.engineerName} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white font-heading border-b border-slate-800 pb-3">
                Contact Information
              </h2>

              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-mono">Direct Line</div>
                    <a href={`tel:${settings.phone}`} className="text-lg font-bold text-white hover:text-amber-400 transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-mono">Email Address</div>
                    <a href={`mailto:${settings.email}`} className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-mono">Primary Service Area</div>
                    <div className="text-sm font-semibold text-slate-200">{settings.serviceArea}</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-mono">Opening Hours</div>
                    <div className="text-sm font-semibold text-slate-200">{settings.openingHours}</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-mono">Gas Safe License</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">Reg No: {settings.gasSafeNumber}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <QuoteForm />
          </div>
        </div>

      </div>
    </div>
  );
}
