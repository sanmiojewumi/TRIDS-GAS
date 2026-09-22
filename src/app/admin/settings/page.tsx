import React from 'react';
import { getSiteSettings } from '@/lib/settings';
import { verifyAdminAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SettingsForm } from './SettingsForm';
import { Settings, ShieldCheck } from 'lucide-react';

export default async function AdminSettingsPage() {
  const isAuth = await verifyAdminAuth();
  if (!isAuth) redirect('/admin/login');

  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">LIVE WEBSITE SETTINGS</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Configure company phone, email, Gas Safe Reg number, engineer details, and service areas</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/40">
          <ShieldCheck className="w-4 h-4" /> Real-time CMS Sync
        </div>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
