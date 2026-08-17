import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Inbox, CalendarDays, Wrench, FolderKanban, ArrowRight, ShieldCheck, Clock, Image as ImageIcon, Layers, Settings, MessageSquare, Plus, FileText } from 'lucide-react';

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const enquiriesCount = await db.enquiry.count({ where: { status: 'NEW' } });
  const totalEnquiries = await db.enquiry.count();
  const bookingsCount = await db.booking.count({ where: { status: 'CONFIRMED' } });
  const totalServices = await db.service.count();
  const totalMedia = await db.mediaItem.count();
  const totalSlides = await db.heroSlide.count();
  const totalReviews = await db.testimonial.count();

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
          <h1 className="text-3xl font-extrabold text-white font-heading">FULL CONTROL ADMIN PORTAL</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">TRIDS Gas & Plumbing • Master Management System</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/slides"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-glow-gold flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" /> Control Slides
          </Link>

          <Link
            href="/admin/services"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-glow-blue flex items-center gap-1.5"
          >
            <Wrench className="w-4 h-4" /> Manage Services
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-2 rounded-xl border border-emerald-500/40">
            <ShieldCheck className="w-4 h-4" /> Gas Safe 979661
          </div>
        </div>
      </div>

      {/* MASTER CONTROL CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* 1. Services Control */}
        <Link href="/admin/services" className="glass-card p-5 rounded-2xl border border-[#1E3A8A] hover:border-amber-400 space-y-3 group transition-all">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Services Manager</span>
            <Wrench className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{totalServices} Services</div>
          <p className="text-xs text-slate-300">Add new gas or plumbing services, edit descriptions, toggle active state, or remove services.</p>
          <div className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
            Open Services Manager <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* 2. Hero Slideshow Control */}
        <Link href="/admin/slides" className="glass-card p-5 rounded-2xl border border-[#1E3A8A] hover:border-amber-400 space-y-3 group transition-all">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Homepage Slide Control</span>
            <Layers className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{totalSlides} Hero Slides</div>
          <p className="text-xs text-slate-300">Add new slides, upload photos, edit technical specs, reorder slide sequence, or hide slides.</p>
          <div className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
            Open Slide Controller <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* 3. Media Gallery (Pictures & Videos) */}
        <Link href="/admin/gallery" className="glass-card p-5 rounded-2xl border border-[#1E3A8A] hover:border-amber-400 space-y-3 group transition-all">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Media Gallery (Photos/Videos)</span>
            <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{totalMedia} Items</div>
          <p className="text-xs text-slate-300">Upload pictures and videos from device, manage work showcase items, or remove media content.</p>
          <div className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
            Manage Photo & Video Gallery <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* 4. Site Settings & Text Contents */}
        <Link href="/admin/settings" className="glass-card p-5 rounded-2xl border border-[#1E3A8A] hover:border-amber-400 space-y-3 group transition-all">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Website Settings & Text</span>
            <Settings className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-white font-heading">Global Site Settings</div>
          <p className="text-xs text-slate-300">Edit phone number, email address, Gas Safe Reg 979661, emergency banners, opening hours & copy.</p>
          <div className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
            Edit Site Settings & Copy <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* 5. Customer Reviews & Testimonials */}
        <Link href="/admin/testimonials" className="glass-card p-5 rounded-2xl border border-[#1E3A8A] hover:border-amber-400 space-y-3 group transition-all">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Customer Reviews</span>
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{totalReviews} Reviews</div>
          <p className="text-xs text-slate-300">Add new customer reviews, edit ratings, approve testimonials, or remove bad reviews.</p>
          <div className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
            Manage Customer Reviews <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* 6. Enquiries & Quote Requests */}
        <Link href="/admin/enquiries" className="glass-card p-5 rounded-2xl border border-[#1E3A8A] hover:border-amber-400 space-y-3 group transition-all">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-mono font-bold uppercase">Quote Requests & Enquiries</span>
            <Inbox className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-heading">{enquiriesCount} New</div>
          <p className="text-xs text-slate-300">View customer submissions, manage enquiry status, add internal notes, and send email responses.</p>
          <div className="text-xs text-amber-400 font-mono font-bold flex items-center gap-1">
            View All Enquiries ({totalEnquiries}) <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

      </div>

      {/* Recent Enquiries & Bookings Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        
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
