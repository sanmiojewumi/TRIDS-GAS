import React from 'react';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Wrench, Flame, CheckCircle2 } from 'lucide-react';

export default async function AdminServicesPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const services = await db.service.findMany({
    orderBy: { category: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">SERVICES MANAGER</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Configure active Gas & Plumbing services offerings</p>
        </div>
        <div className="text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
          Total Services: {services.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    s.category === 'GAS'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {s.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ACTIVE
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-heading">{s.name}</h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">{s.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400">
              Slug: /services/{s.slug}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
