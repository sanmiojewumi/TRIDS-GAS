import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, ShieldCheck, Wrench, Thermometer } from 'lucide-react';

export const FeaturedSection: React.FC = () => {
  const featured = [
    {
      title: 'Boiler Installation',
      description: 'High efficiency, safe and professionally commissioned combi and system boilers.',
      link: '/services/boiler-installation',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
      icon: Thermometer,
      highlight: 'Up to 10-Yr Warranty Available',
    },
    {
      title: 'Boiler Servicing',
      description: 'Keep your heating system running safely and efficiently with flue gas diagnostics.',
      link: '/services/boiler-servicing',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      icon: Flame,
      highlight: 'Full Flue Gas Analysis',
    },
    {
      title: 'Gas Safety & CP12',
      description: 'Professional gas safety inspections, testing, and landlord certificates.',
      link: '/services/gas-safety-checks',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      icon: ShieldCheck,
      highlight: 'Gas Safe CP12 Certificates',
    },
    {
      title: 'General Plumbing',
      description: 'Reliable plumbing solutions for everyday household repairs and installations.',
      link: '/services/general-plumbing',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
      icon: Wrench,
      highlight: 'Trace & Access Leak Repair',
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#070D1E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1 font-heading">
              ENGINEERING YOU CAN RELY ON
            </h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base max-w-md">
            TRIDS Gas & Plumbing delivers primary engineering disciplines carried out to strict British standards.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-3xl overflow-hidden bg-[#0F1C3F] border border-[#1E3A8A] shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-amber-500/60 hover:shadow-glow-gold"
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/40 to-transparent" />
                  
                  {/* Highlight pill */}
                  <div className="absolute top-4 right-4 bg-[#070D1E]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-semibold">
                    {item.highlight}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white font-heading">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 bg-[#0F1C3F]/90 flex flex-col justify-between grow">
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#1E3A8A]/60">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Explore Details <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/quote?service=${encodeURIComponent(item.title)}`}
                      className="px-4 py-2 rounded-xl bg-[#070D1E] hover:bg-amber-500 text-white hover:text-slate-950 text-xs font-bold transition-all border border-[#1E3A8A]"
                    >
                      Book Service
                    </Link>
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
