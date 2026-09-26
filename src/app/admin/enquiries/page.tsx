'use client';

import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Calendar, Save, Trash2 } from 'lucide-react';

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  message: string;
  preferredDate?: string | null;
  preferredTime?: string | null;
  status: string;
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const response = await fetch('/api/enquiries', { cache: 'no-store' });
    const data = await response.json();
    if (response.ok) setEnquiries(data.enquiries || []);
    else setError(data.error || 'Could not load enquiries');
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = (id: string, status: string) => {
    setEnquiries((current) =>
      current.map((enquiry) => (enquiry.id === id ? { ...enquiry, status } : enquiry)),
    );
  };

  const save = async (enquiry: Enquiry) => {
    setError('');
    setMessage('');
    const response = await fetch(`/api/enquiries/${enquiry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: enquiry.status }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'Could not update enquiry');
      return;
    }
    setMessage(`${enquiry.name}'s enquiry is now ${enquiry.status.toLowerCase()}.`);
  };

  const remove = async (enquiry: Enquiry) => {
    if (!window.confirm(`Permanently remove ${enquiry.name}'s enquiry?`)) return;
    const response = await fetch(`/api/enquiries/${enquiry.id}`, { method: 'DELETE' });
    if (!response.ok) {
      setError('Could not remove enquiry');
      return;
    }
    setEnquiries((current) => current.filter((entry) => entry.id !== enquiry.id));
    setMessage('Enquiry removed.');
  };

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

      {message && <div role="status" className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</div>}
      {error && <div role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}

      <div className="space-y-4">
        {enquiries.map((e) => (
          <div key={e.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <span className="text-lg font-bold text-white font-heading">{e.name}</span>
                <span className="ml-3 text-xs text-amber-400 font-mono">Service: {e.service}</span>
              </div>
              <select
                value={e.status}
                onChange={(event) => updateStatus(e.id, event.target.value)}
                aria-label={`Status for ${e.name}`}
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold uppercase text-white"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUOTED">Quoted</option>
                <option value="BOOKED">Booked</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-300">
              <a href={`tel:${e.phone}`} className="flex items-center gap-2 hover:text-amber-300">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> {e.phone}
              </a>
              <a href={`mailto:${e.email}`} className="flex items-center gap-2 break-all hover:text-amber-300">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> {e.email}
              </a>
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

            <div className="flex flex-wrap justify-end gap-2 border-t border-slate-800 pt-3">
              <button type="button" onClick={() => save(e)} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950">
                <Save className="h-4 w-4" /> Save Status
              </button>
              <button type="button" onClick={() => remove(e)} className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-center py-12 text-slate-500 font-mono">Loading enquiries…</div>
        )}
        {!loading && enquiries.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono">No enquiries logged in database yet.</div>
        )}
      </div>
    </div>
  );
}
