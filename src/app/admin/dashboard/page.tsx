import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Inbox, CalendarDays, Wrench, FolderKanban, ArrowRight, ShieldCheck, Clock, Image as ImageIcon, Video, Plus } from 'lucide-react';

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const enquiriesCount = await db.enquiry.count({ where: { status: 'NEW' } });
  const totalEnquiries = await db.enquiry.count();
  const bookingsCount = await db.booking.count({ where: { status: 'CONFIRMED' } });
  const totalServices = await db.service.count();
  const totalMedia = await db.mediaItem.count();

  const recentEnquiries = await db.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const recentBookings = await db.booking.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div className="space-y-8">
      {/* Dashboard Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">OPERATIONS DASHBOARD</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">TRIDS Gas & Plumbing • Live System Monitor</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            href="/admin/gallery"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-glow-gold flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Manage Media Gallery
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-2 rounded-xl border border-emerald-500/40">
            <ShieldCheck className="w-4 h-4" /> Gas Safe Compliant (979661)
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">New Enquiries</span>
            <Inbox className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{enquiriesCount}</div>
          <div className="text-[11px] text-slate-400">Total Enquiries: {totalEnquiries}</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Upcoming Bookings</span>
            <CalendarDays className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{bookingsCount}</div>
          <div className="text-[11px] text-slate-400">Confirmed Slots</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Active Services</span>
            <Wrench className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{totalServices}</div>
          <div className="text-[11px] text-slate-400">Gas & Plumbing Offerings</div>
        </div>

        <Link href="/admin/gallery" className="glass-card p-5 rounded-2xl border border-amber-500/40 hover:border-amber-400 space-y-2 group transition-all">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Media Gallery</span>
            <ImageIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{totalMedia}</div>
          <div className="text-[11px] text-amber-400 flex items-center gap-1 font-mono">
            Upload / Remove Pictures & Videos <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>

      {/* Recent Enquiries & Bookings Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Enquiries */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading">Recent Quote Requests</h2>
            <Link href="/admin/enquiries" className="text-xs text-amber-400 font-mono flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.map((e) => (
              <div key={e.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{e.name}</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    {e.status}
                  </span>
                </div>
                <div className="text-slate-400">{e.service} • {e.postcode}</div>
                <div className="text-slate-500 text-[10px] font-mono">{e.phone} • {e.email}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-heading">Upcoming Booked Appointments</h2>
            <Link href="/admin/bookings" className="text-xs text-amber-400 font-mono flex items-center gap-1 hover:underline">
              View Calendar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{b.customerName}</span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {b.status}
                  </span>
                </div>
                <div className="text-slate-300 font-medium">{b.service}</div>
                <div className="text-amber-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {b.date} at {b.time}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
