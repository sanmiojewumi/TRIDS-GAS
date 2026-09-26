'use client';

import React, { useState } from 'react';
import { SiteSettingsData } from '@/lib/settings';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface SettingsFormProps {
  initialSettings: SiteSettingsData;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialSettings }) => {
  const [formData, setFormData] = useState<SiteSettingsData>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to save website settings');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
      {success && (
        <div className="p-4 bg-emerald-950/90 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Website settings updated successfully! Changes are live across the site.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/90 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2 font-mono">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Group 1: Core Business Contact Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-heading border-b border-slate-800 pb-2">
          1. Core Business Information & Licensing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 07700 900123"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Email Address</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. info@tridsgas.co.uk"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Gas Safe Reg Number</label>
            <input
              type="text"
              value={formData.gasSafeNumber}
              onChange={(e) => setFormData({ ...formData, gasSafeNumber: e.target.value })}
              placeholder="e.g. 123456"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-emerald-400 font-mono font-bold outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Lead Engineer Name</label>
            <input
              type="text"
              value={formData.engineerName}
              onChange={(e) => setFormData({ ...formData, engineerName: e.target.value })}
              placeholder="e.g. John Trids"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Service Area Coverage</label>
            <input
              type="text"
              value={formData.serviceArea}
              onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
              placeholder="e.g. Greater London & Surrey"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Group 2: Hero Section Copy */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-heading border-b border-slate-800 pb-2">
          2. Hero Section Headlines & CTAs
        </h2>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Hero Headline</label>
          <input
            type="text"
            value={formData.heroHeading}
            onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Hero Subheading</label>
          <textarea
            rows={2}
            value={formData.heroSubheading}
            onChange={(e) => setFormData({ ...formData, heroSubheading: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Group 3: Emergency Notice Text */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-heading border-b border-slate-800 pb-2">
          3. UK Safety & Emergency Notice
        </h2>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Emergency Gas Notice</label>
          <textarea
            rows={2}
            value={formData.emergencyNotice}
            onChange={(e) => setFormData({ ...formData, emergencyNotice: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-red-300 outline-none focus:border-amber-500 font-mono"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-heading border-b border-slate-800 pb-2">
          4. Reviews, Hours & Social Accounts
        </h2>
        <p className="text-xs text-slate-400">
          Social icons only appear on the site when you add a real HTTPS profile URL. Leave a field blank if you do not have that account.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Opening Hours</label>
            <input
              type="text"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Google Reviews URL</label>
            <input
              type="url"
              value={formData.googleReviewsUrl === '#' ? '' : formData.googleReviewsUrl}
              onChange={(e) => setFormData({ ...formData, googleReviewsUrl: e.target.value })}
              placeholder="https://g.page/r/..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Address / Coverage Line</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['facebookUrl', 'Facebook URL'],
            ['instagramUrl', 'Instagram URL'],
            ['tiktokUrl', 'TikTok URL'],
            ['linkedinUrl', 'LinkedIn URL'],
            ['youtubeUrl', 'YouTube URL'],
            ['xUrl', 'X URL'],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">{label}</label>
              <input
                type="url"
                value={formData[key as keyof SiteSettingsData] as string}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                placeholder="https://"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-amber-500 font-mono"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-glow-gold flex items-center gap-2 disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        <span>{saving ? 'Saving Changes...' : 'SAVE LIVE WEBSITE SETTINGS'}</span>
      </button>
    </form>
  );
};
