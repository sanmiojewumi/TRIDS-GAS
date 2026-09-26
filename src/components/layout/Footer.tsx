import React from 'react';
import Link from 'next/link';
import { TRIDSLogo } from '../common/TRIDSLogo';
import { SocialLinks } from '../common/SocialLinks';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';
import { coverageTowns } from '@/lib/coverage';

interface FooterProps {
  settings: SiteSettingsData;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const serviceLinks = [
    ['Boiler Repairs', '/services/boiler-repairs'],
    ['Boiler Servicing', '/services/boiler-servicing'],
    ['Boiler Installation', '/services/boiler-installation'],
    ['Gas Safety Checks', '/services/gas-safety-checks'],
    ['Central Heating', '/services/central-heating-services'],
    ['General Plumbing', '/services/general-plumbing'],
  ];

  const areaLinks = coverageTowns.slice(0, 10).map((town) => [town.name, `/areas/${town.slug}`]);

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#050a14] pb-16 text-slate-400 lg:pb-0">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <TRIDSLogo size="lg" />
            <p className="text-sm font-semibold text-amber-400">{settings.tagline}</p>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
              Gas Safe boiler, heating and plumbing from Crewe across Cheshire, towns within
              30 miles, and the extra areas TRIDS already covers.
            </p>
            <SocialLinks settings={settings} />
            <div className="inline-flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-slate-200">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <div className="font-semibold text-emerald-400">Gas Safe Registered Engineer</div>
                <div className="text-slate-400 font-mono">Reg No: {settings.gasSafeNumber}</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-amber-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">Service Areas</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {areaLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-amber-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/areas" className="mt-4 inline-block text-xs font-bold text-amber-400 hover:text-amber-300">
              View all areas
            </Link>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <div>
                  <a href={`tel:${settings.phone}`} className="text-white font-mono font-bold hover:text-amber-400 transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <div>
                  <a href={`mailto:${settings.email}`} className="break-all text-slate-200 hover:text-amber-400 transition-colors">
                    {settings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <div className="text-slate-200">{settings.address}</div>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link href="/contact" className="rounded-lg bg-white px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
                Contact
              </Link>
              <Link href="/book" className="rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300">
                Book
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-7 text-xs text-slate-500 sm:flex-row">
          <div>
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved. Gas Safe Registered ({settings.gasSafeNumber}).
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-slate-300">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-slate-300">Terms</Link>
            <Link href="/contact" className="transition-colors hover:text-slate-300">Contact</Link>
            <Link href="/admin/login" className="font-mono transition-colors hover:text-amber-400">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
