import React from 'react';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { CalendarDays, Clock, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export default async function AdminBookingsPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const bookings = await db.booking.findMany({
    orderBy: { date: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">BOOKING CALENDAR & SCHEDULE</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Confirmed & Scheduled Gas/Plumbing Appointments</p>
        </div>
        <div className="text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
          Bookings Total: {bookings.length}
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-lg font-bold text-white font-heading">{b.customerName}</span>
                <span className="ml-3 text-xs text-amber-400 font-mono">{b.service}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {b.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-amber-400 font-mono font-bold">
              <CalendarDays className="w-4 h-4" /> Date: {b.date}
              <Clock className="w-4 h-4 ml-4" /> Time Slot: {b.time}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {b.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {b.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Postcode: {b.postcode}
              </div>
            </div>

            {b.notes && (
              <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono">
                Notes: {b.notes}
              </div>
            )}
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono">No bookings scheduled yet.</div>
        )}
      </div>
    </div>
  );
}
