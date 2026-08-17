import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export interface ServiceAreaItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface ServiceAreasProps {
  areas: ServiceAreaItem[];
  primaryServiceArea?: string;
}

export const ServiceAreasSection: React.FC<ServiceAreasProps> = ({
  areas,
  primaryServiceArea = 'Crewe & Cheshire',
}) => {
  return (
    <section className="py-16 lg:py-24 bg-[#0A1228]/90 border-t border-[#1E3A8A]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Local Coverage & Fast Response
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            SERVING CHESHIRE, MANCHESTER & 50-MILE RADIUS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            TRIDS Gas & Plumbing provides prompt domestic gas, boiler servicing, and plumbing solutions throughout the following local areas.
          </p>
        </div>

        {/* Location Cards Grid (Only Real Serving Areas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areas.map((area) => (
            <Link
              key={area.id}
              href={`/areas/${area.slug}`}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-[#1E3A8A] flex flex-col justify-between group hover:border-amber-400/60 transition-all"
            >
              <div>
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <MapPin className="w-4 h-4 shrink-0 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">Area Coverage</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-heading">
                  {area.name}
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {area.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E3A8A]/60 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>View Local Services</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
