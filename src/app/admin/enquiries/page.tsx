import React from 'react';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Inbox, Phone, Mail, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export default async function AdminEnquiriesPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const enquiries = await db.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">ENQUIRIES & SMART QUOTES</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Manage pipeline: New → Contacted → Quoted → Booked → Completed → Archived</p>
        </div>
        <div className="text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
          Total Received: {enquiries.length}
        </div>
      </div>

      <div className="space-y-4">
        {enquiries.map((e) => (
          <div key={e.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-lg font-bold text-white font-heading">{e.name}</span>
                <span className="ml-3 text-xs text-amber-400 font-mono">Service: {e.service}</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 w-fit">
                STATUS: {e.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> {e.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> {e.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Postcode: {e.postcode}
              </div>
            </div>

            {e.preferredDate && (
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Preferred Date: {e.preferredDate} ({e.preferredTime || 'Flexible'})
              </div>
            )}

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-white block mb-1">Customer Description:</strong>
              {e.message}
            </div>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono">No enquiries logged in database yet.</div>
        )}
      </div>
    </div>
  );
}
