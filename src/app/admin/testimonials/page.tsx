import React from 'react';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Star, CheckCircle2 } from 'lucide-react';

export default async function AdminTestimonialsPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">TESTIMONIALS & REVIEWS</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Moderate customer reviews displayed on live website</p>
        </div>
        <div className="text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
          Total Reviews: {testimonials.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex text-amber-400 text-sm">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> PUBLISHED
              </span>
            </div>

            <p className="text-xs text-slate-200 italic">&ldquo;{t.review}&rdquo;</p>
            
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white">{t.customerName}</span>
              <span className="text-amber-400">{t.service}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
