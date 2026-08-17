import React from 'react';
import Link from 'next/link';
import { TRIDSLogo } from '../common/TRIDSLogo';
import { ShieldCheck, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { SiteSettingsData } from '@/lib/settings';

interface FooterProps {
  settings: SiteSettingsData;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-[#050A18] border-t border-[#1E3A8A]/60 text-slate-400 relative overflow-hidden">
      {/* Background ambient element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <TRIDSLogo size="lg" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              TRIDS Gas & Plumbing provides high-standard UK domestic gas, heating, and plumbing services across Crewe, Cheshire, Manchester & Staffordshire. Operated by a Gas Safe registered engineer (Reg No. 979661) prioritizing safety, technical accuracy, and client satisfaction.
            </p>

            {/* Gas Safe Badge Box */}
            <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-[#070D1E] border border-emerald-500/40 text-xs text-slate-200">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-emerald-400">Gas Safe Registered Engineer</div>
                <div className="text-slate-400 font-mono">Reg No: {settings.gasSafeNumber}</div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading border-l-2 border-amber-500 pl-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> All Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> About TRIDS
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Work Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/areas" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Service Areas
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Knowledge Centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading border-l-2 border-amber-500 pl-2">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/boiler-installation" className="hover:text-amber-400 transition-colors">
                  Boiler Installation
                </Link>
              </li>
              <li>
                <Link href="/services/boiler-servicing" className="hover:text-amber-400 transition-colors">
                  Boiler Servicing
                </Link>
              </li>
              <li>
                <Link href="/services/boiler-repairs" className="hover:text-amber-400 transition-colors">
                  Boiler Repairs
                </Link>
              </li>
              <li>
                <Link href="/services/gas-safety-checks" className="hover:text-amber-400 transition-colors">
                  Gas Safety Checks
                </Link>
              </li>
              <li>
                <Link href="/services/landlord-gas-safety-certificates" className="hover:text-amber-400 transition-colors">
                  Landlord Gas Certificates (CP12)
                </Link>
              </li>
              <li>
                <Link href="/services/general-plumbing" className="hover:text-amber-400 transition-colors">
                  General Plumbing
                </Link>
              </li>
              <li>
                <Link href="/services/leaking-pipes" className="hover:text-amber-400 transition-colors">
                  Leak Detection & Repair
                </Link>
              </li>
              <li>
                <Link href="/services/emergency-plumbing" className="hover:text-amber-400 transition-colors">
                  Emergency Plumbing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Availability */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading border-l-2 border-amber-500 pl-2">
              Contact & Hours
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400">Direct Phone</div>
                  <a href={`tel:${settings.phone}`} className="text-white font-mono font-bold hover:text-amber-400 transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400">Email Address</div>
                  <a href={`mailto:${settings.email}`} className="text-slate-200 font-mono hover:text-amber-400 transition-colors">
                    {settings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400">Primary Coverage</div>
                  <div className="text-slate-200">{settings.serviceArea}</div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400">Working Hours</div>
                  <div className="text-slate-200">{settings.openingHours}</div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-[#1E3A8A]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved. Gas Safe Registered ({settings.gasSafeNumber}).
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/cookies" className="hover:text-slate-300 transition-colors">
              Cookie Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-amber-400 transition-colors font-mono">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
