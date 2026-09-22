'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Wrench, Search, ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  image?: string | null;
  featured?: boolean;
}

interface ServicesProps {
  services: ServiceItem[];
}

export const ServicesSection: React.FC<ServicesProps> = ({ services }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'GAS' | 'PLUMBING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter((s) => {
    const matchesCategory = activeTab === 'ALL' || s.category === activeTab;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const gasCount = services.filter((s) => s.category === 'GAS').length;
  const plumbingCount = services.filter((s) => s.category === 'PLUMBING').length;

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#070D1E] border-t border-b border-[#1E3A8A]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1C3F] border border-blue-500/40 text-sky-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> TRIDS Gas & Plumbing Core Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            EXPERT <span className="text-red-500">GAS</span> & <span className="text-blue-400">PLUMBING</span> SOLUTIONS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From high-efficiency combi boiler replacements and gas tightness testing to unvented cylinder repairs and domestic plumbing.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0A1228] p-3 rounded-2xl border border-[#1E3A8A]">
          
          {/* Category Tabs with Red & Blue highlights */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'ALL'
                  ? 'bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 text-slate-950 shadow-glow-gold'
                  : 'bg-[#0F1C3F] text-slate-300 hover:bg-[#142552] hover:text-white'
              }`}
            >
              All Services ({services.length})
            </button>
            
            <button
              onClick={() => setActiveTab('GAS')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'GAS'
                  ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-glow-red'
                  : 'bg-[#0F1C3F] text-slate-300 hover:bg-[#142552] hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>Gas Services ({gasCount})</span>
            </button>
            
            <button
              onClick={() => setActiveTab('PLUMBING')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'PLUMBING'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-400 text-white shadow-glow-blue'
                  : 'bg-[#0F1C3F] text-slate-300 hover:bg-[#142552] hover:text-white'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-sky-200" />
              <span>Plumbing Services ({plumbingCount})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. boiler)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

        </div>

        {/* Services Cards Grid with Red & Blue cards */}
        {filteredServices.length === 0 && (
          <div className="mt-8 p-8 rounded-2xl border border-[#1E3A8A] bg-[#0F1C3F]/60 text-center text-slate-300 text-sm">
            {services.length === 0
              ? 'Services are being published. Call or request a quote and we will advise the right job.'
              : 'No services match that filter. Try another category or search term.'}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden border-2 ${
                service.category === 'GAS'
                  ? 'hover:border-red-500/60'
                  : 'hover:border-blue-500/60'
              }`}
            >
              {/* Top Card Bar */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                      service.category === 'GAS'
                        ? 'bg-red-950/40 border-red-500/40 text-red-400 group-hover:bg-red-600 group-hover:text-white'
                        : 'bg-blue-950/40 border-blue-500/40 text-sky-400 group-hover:bg-blue-600 group-hover:text-white'
                    }`}
                  >
                    {service.category === 'GAS' ? (
                      <Flame className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Wrench className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      service.category === 'GAS'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/40'
                        : 'bg-blue-500/10 text-sky-400 border border-blue-500/40'
                    }`}
                  >
                    {service.category === 'GAS' ? 'GAS SAFE' : 'PLUMBING EXPERT'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors font-heading">
                  {service.name}
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-[#1E3A8A]/60 flex items-center justify-between gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-slate-300 hover:text-yellow-400 flex items-center gap-1 transition-colors"
                >
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/quote?service=${encodeURIComponent(service.name)}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    service.category === 'GAS'
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border-red-500/40 shadow-glow-red'
                      : 'bg-blue-600/20 text-sky-400 hover:bg-blue-600 hover:text-white border-blue-500/40 shadow-glow-blue'
                  }`}
                >
                  Get a Quote
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
