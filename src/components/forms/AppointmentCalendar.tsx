'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AppointmentCalendarProps {
  value: string;
  onChange: (date: string) => void;
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function dateKey(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function AppointmentCalendar({ value, onChange }: AppointmentCalendarProps) {
  const today = useMemo(() => {
    const current = new Date();
    return new Date(current.getFullYear(), current.getMonth(), current.getDate());
  }, []);
  const maximum = useMemo(() => {
    const date = new Date(today);
    date.setDate(date.getDate() + 180);
    return date;
  }, [today]);
  const [visibleMonth, setVisibleMonth] = useState(
    value ? new Date(`${value}T12:00:00`) : new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [availability, setAvailability] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const visibleMonthKey = monthKey(visibleMonth);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch(`/api/availability?month=${visibleMonthKey}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load calendar');
        setAvailability(data.days || {});
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setAvailability({});
          setError('Calendar availability could not be loaded.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [visibleMonthKey]);

  const firstDay = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: firstDay.getDay() + daysInMonth }, (_, index) => {
    const day = index - firstDay.getDay() + 1;
    return day > 0 ? day : null;
  });
  while (cells.length % 7 !== 0) cells.push(null);

  const earliestMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const latestMonth = new Date(maximum.getFullYear(), maximum.getMonth(), 1);
  const canGoBack = visibleMonth > earliestMonth;
  const canGoForward = visibleMonth < latestMonth;

  const moveMonth = (offset: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1E3A8A] bg-[#070D1E]">
      <div className="flex items-center justify-between border-b border-[#1E3A8A] px-3 py-3">
        <button
          type="button"
          onClick={() => moveMonth(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="font-heading text-base font-extrabold text-white">
          {visibleMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
        <button
          type="button"
          onClick={() => moveMonth(1)}
          disabled={!canGoForward}
          aria-label="Next month"
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-[#1E3A8A]/60 px-2 py-2">
        {weekdays.map((weekday) => (
          <span key={weekday} className="text-center text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 p-2" aria-busy={loading}>
        {cells.map((day, index) => {
          if (!day) return <span key={`blank-${index}`} className="aspect-square" aria-hidden="true" />;

          const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
          const key = dateKey(date);
          const slotCount = availability[key] || 0;
          const selectable = !loading && date >= today && date <= maximum && slotCount > 0;
          const selected = key === value;

          return (
            <button
              key={key}
              type="button"
              disabled={!selectable}
              onClick={() => onChange(key)}
              aria-label={`${date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}, ${slotCount} appointment ${slotCount === 1 ? 'time' : 'times'} available`}
              aria-pressed={selected}
              className={`aspect-square rounded-xl text-center transition-colors ${
                selected
                  ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                  : selectable
                    ? 'bg-slate-800 text-white hover:bg-blue-600'
                    : 'cursor-not-allowed text-slate-700'
              }`}
            >
              <span className="block text-sm font-bold">{day}</span>
              {selectable && <span className={`hidden text-[8px] sm:block ${selected ? 'text-slate-800' : 'text-emerald-400'}`}>{slotCount} slots</span>}
            </button>
          );
        })}
      </div>

      <div className="border-t border-[#1E3A8A]/60 px-4 py-3 text-xs">
        {error ? (
          <p className="text-red-300">{error}</p>
        ) : loading ? (
          <p className="text-slate-400">Loading available dates…</p>
        ) : value ? (
          <p className="font-bold text-amber-300">
            Selected: {new Date(`${value}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        ) : (
          <p className="text-slate-400">Choose a highlighted date to see appointment times.</p>
        )}
      </div>
    </div>
  );
}
