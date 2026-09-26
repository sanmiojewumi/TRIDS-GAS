'use client';

import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, Save, Trash2 } from 'lucide-react';

type Booking = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  postcode: string;
  service: string;
  date: string;
  time: string;
  status: string;
  notes?: string | null;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    const response = await fetch('/api/bookings', { cache: 'no-store' });
    const data = await response.json();
    if (response.ok) setBookings(data.bookings || []);
    else setError(data.error || 'Could not load bookings');
  };

  useEffect(() => {
    load();
  }, []);

  const updateLocal = (id: string, changes: Partial<Booking>) => {
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, ...changes } : booking));
  };

  const save = async (booking: Booking) => {
    setError('');
    setMessage('');
    const response = await fetch(`/api/bookings/${booking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: booking.date, time: booking.time, status: booking.status }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'Could not update booking');
      return;
    }
    const confirmationNote =
      booking.status === 'CONFIRMED'
        ? data.customerEmailSent
          ? ' Confirmation email sent to the customer.'
          : ' Confirmation email could not be sent. Check SMTP settings.'
        : '';
    setMessage(`Booking for ${booking.customerName} updated.${confirmationNote}`);
    await load();
  };

  const remove = async (booking: Booking) => {
    if (!window.confirm(`Permanently remove ${booking.customerName}'s booking?`)) return;
    const response = await fetch(`/api/bookings/${booking.id}`, { method: 'DELETE' });
    if (response.ok) {
      setBookings((current) => current.filter((entry) => entry.id !== booking.id));
      setMessage('Booking removed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white font-heading">BOOKING CALENDAR & SCHEDULE</h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Edit appointment dates, times and booking status. Confirming a booking emails the customer.
          </p>
        </div>
        <div className="text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
          Bookings Total: {bookings.length}
        </div>
      </div>

      {message && <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</div>}
      {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-lg font-bold text-white font-heading">{b.customerName}</span>
                <span className="ml-3 text-xs text-amber-400 font-mono">{b.service}</span>
              </div>
              <select value={b.status} onChange={(event) => updateLocal(b.id, { status: event.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold text-white">
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase text-slate-400">
                Date
                <input type="date" value={b.date} onChange={(event) => updateLocal(b.id, { date: event.target.value })} className="mt-1 block w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white" />
              </label>
              <label className="text-xs font-bold uppercase text-slate-400">
                Time
                <input type="time" value={b.time} onChange={(event) => updateLocal(b.id, { time: event.target.value })} className="mt-1 block w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white" />
              </label>
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

            <div className="flex justify-end gap-2 border-t border-slate-800 pt-3">
              <button type="button" onClick={() => save(b)} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950">
                <Save className="h-4 w-4" /> Save Changes
              </button>
              <button type="button" onClick={() => remove(b)} className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-300">
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-mono">No bookings scheduled yet.</div>
        )}
      </div>
    </div>
  );
}
