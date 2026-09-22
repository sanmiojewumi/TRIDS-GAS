'use client';

import React, { useEffect, useState } from 'react';
import { Ban, CalendarClock, Save, Trash2 } from 'lucide-react';

type DayRule = {
  id?: string;
  dayOfWeek: number;
  enabled: boolean;
  startTime: string;
  endTime: string;
  slotDuration: number;
};

type BlockedDate = { id: string; date: string; reason?: string | null };

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const defaultDays: DayRule[] = dayNames.map((_, dayOfWeek) => ({
  dayOfWeek,
  enabled: dayOfWeek > 0 && dayOfWeek < 6,
  startTime: '08:00',
  endTime: '18:00',
  slotDuration: 90,
}));

export default function AdminAvailabilityPage() {
  const [days, setDays] = useState<DayRule[]>(defaultDays);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [blockDate, setBlockDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const response = await fetch('/api/admin/availability', { cache: 'no-store' });
    const data = await response.json();
    if (response.ok) {
      if (data.days?.length === 7) setDays(data.days);
      setBlockedDates(data.blockedDates || []);
    } else {
      setError(data.error || 'Could not load availability');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateDay = (dayOfWeek: number, changes: Partial<DayRule>) => {
    setDays((current) =>
      current.map((day) => (day.dayOfWeek === dayOfWeek ? { ...day, ...changes } : day)),
    );
  };

  const saveDays = async () => {
    setSaving(true);
    setError('');
    setMessage('');
    const response = await fetch('/api/admin/availability', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days }),
    });
    const data = await response.json();
    setSaving(false);
    if (!response.ok) {
      setError(data.error || 'Could not save weekly availability');
      return;
    }
    setMessage('Weekly availability updated.');
    await load();
  };

  const addBlockedDate = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    const response = await fetch('/api/admin/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: blockDate, reason }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'Could not block this date');
      return;
    }
    setBlockDate('');
    setReason('');
    setMessage('Date blocked successfully.');
    await load();
  };

  const removeBlockedDate = async (id: string) => {
    const response = await fetch(`/api/admin/availability/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setBlockedDates((current) => current.filter((date) => date.id !== id));
      setMessage('Date reopened for bookings.');
    }
  };

  return (
    <div className="space-y-8">
      <header className="border-b border-slate-800 pb-5">
        <h1 className="flex items-center gap-3 font-heading text-3xl font-extrabold text-white">
          <CalendarClock className="h-8 w-8 text-amber-400" /> Booking Availability
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Set working hours, appointment length and dates that customers cannot book.
        </p>
      </header>

      {message && <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</div>}
      {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <h2 className="font-heading text-xl font-bold text-white">Weekly schedule</h2>
        </div>
        <div className="divide-y divide-slate-800">
          {days.map((day) => (
            <div key={day.dayOfWeek} className="grid gap-4 p-4 sm:grid-cols-[1.2fr_.8fr_1fr_1fr_1fr] sm:items-center">
              <label className="flex items-center gap-3 font-bold text-white">
                <input
                  type="checkbox"
                  checked={day.enabled}
                  onChange={(event) => updateDay(day.dayOfWeek, { enabled: event.target.checked })}
                  className="h-4 w-4 accent-amber-400"
                />
                {dayNames[day.dayOfWeek]}
              </label>
              <span className={`text-xs font-bold uppercase ${day.enabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                {day.enabled ? 'Taking bookings' : 'Closed'}
              </span>
              <input type="time" disabled={!day.enabled} value={day.startTime} onChange={(event) => updateDay(day.dayOfWeek, { startTime: event.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white disabled:opacity-40" />
              <input type="time" disabled={!day.enabled} value={day.endTime} onChange={(event) => updateDay(day.dayOfWeek, { endTime: event.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white disabled:opacity-40" />
              <select disabled={!day.enabled} value={day.slotDuration} onChange={(event) => updateDay(day.dayOfWeek, { slotDuration: Number(event.target.value) })} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white disabled:opacity-40">
                <option value={30}>30-minute slots</option>
                <option value={60}>60-minute slots</option>
                <option value={90}>90-minute slots</option>
                <option value={120}>2-hour slots</option>
              </select>
            </div>
          ))}
        </div>
        <div className="flex justify-end border-t border-slate-800 p-5">
          <button type="button" onClick={saveDays} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs font-extrabold text-slate-950 disabled:opacity-50">
            <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save Weekly Schedule'}
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={addBlockedDate} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-white">
            <Ban className="h-5 w-5 text-red-400" /> Block a date
          </h2>
          <input type="date" required value={blockDate} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setBlockDate(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white" />
          <input type="text" value={reason} maxLength={200} placeholder="Reason, e.g. annual leave (optional)" onChange={(event) => setReason(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white" />
          <button className="rounded-xl bg-red-500 px-5 py-3 text-xs font-extrabold text-white">Block Date</button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="font-heading text-xl font-bold text-white">Blocked dates</h2>
          <div className="mt-4 space-y-3">
            {blockedDates.length === 0 ? (
              <p className="text-sm text-slate-500">No dates are currently blocked.</p>
            ) : blockedDates.map((blocked) => (
              <div key={blocked.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div>
                  <p className="font-bold text-white">{blocked.date}</p>
                  {blocked.reason && <p className="text-xs text-slate-400">{blocked.reason}</p>}
                </div>
                <button type="button" onClick={() => removeBlockedDate(blocked.id)} aria-label="Reopen date" className="rounded-lg border border-red-500/30 p-2 text-red-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
