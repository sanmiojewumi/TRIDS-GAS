import React from 'react';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FolderKanban, CheckCircle2, MapPin } from 'lucide-react';

export default async function AdminProjectsPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">WORK GALLERY PROJECTS</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Manage published engineering project cases and before/after photos</p>
        </div>
        <div className="text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
          Projects: {projects.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                {p.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> PUBLISHED
              </span>
            </div>

            <h3 className="text-lg font-bold text-white font-heading">{p.title}</h3>
            <p className="text-xs text-slate-300">{p.description}</p>
            {p.location && (
              <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Location: {p.location}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
