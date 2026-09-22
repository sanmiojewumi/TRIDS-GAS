import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyAdminAuth } from '@/lib/auth';
import { TRIDSLogo } from '@/components/common/TRIDSLogo';
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  CalendarClock,
  Wrench,
  FolderKanban,
  Star,
  Settings,
  LogOut,
  Layers,
  Images,
  MapPinned,
  Newspaper,
  CircleHelp,
  Sparkles,
} from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await verifyAdminAuth();

  if (!isAuth) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto">
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <TRIDSLogo size="sm" />
            <div className="mt-2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 inline-block">
              ADMIN CONTROL PORTAL
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-500" /> Overview Dashboard
            </Link>

            <Link
              href="/admin/enquiries"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Inbox className="w-4 h-4 text-amber-500" /> Enquiries & Quotes
            </Link>

            <Link
              href="/admin/bookings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <CalendarDays className="w-4 h-4 text-amber-500" /> Booking Calendar
            </Link>

            <Link
              href="/admin/availability"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <CalendarClock className="w-4 h-4 text-amber-500" /> Availability & Hours
            </Link>

            <Link
              href="/admin/services"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Wrench className="w-4 h-4 text-amber-500" /> Services Manager
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <FolderKanban className="w-4 h-4 text-amber-500" /> Project Gallery
            </Link>

            <Link
              href="/admin/areas"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <MapPinned className="w-4 h-4 text-amber-500" /> Service Areas
            </Link>

            <Link
              href="/admin/articles"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Newspaper className="w-4 h-4 text-amber-500" /> Knowledge Articles
            </Link>

            <Link
              href="/admin/faqs"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <CircleHelp className="w-4 h-4 text-amber-500" /> FAQs
            </Link>

            <Link
              href="/admin/ai-assistant"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> AI Writing Assistant
            </Link>

            <Link
              href="/admin/testimonials"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Star className="w-4 h-4 text-amber-500" /> Testimonials
            </Link>

            <Link
              href="/admin/slides"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Layers className="w-4 h-4 text-amber-500" /> Homepage Slides
            </Link>

            <Link
              href="/admin/gallery"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Images className="w-4 h-4 text-amber-500" /> Media Gallery
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-amber-400 transition-colors"
            >
              <Settings className="w-4 h-4 text-amber-500" /> Website Settings
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800"
          >
            View Live Website
          </Link>
          
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-xs font-bold text-red-300 border border-red-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Admin Workspace Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
