'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface BookingFormProps {
  initialService?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ initialService }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    postcode: '',
    service: initialService || 'Boiler Servicing',
    date: '',
    time: '',
    notes: '',
    website: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const servicesList = [
    'Boiler Servicing',
    'Boiler Installation Survey',
    'Boiler Repair & Diagnostics',
    'Gas Safety Inspection & CP12',
    'Gas Hob / Oven Installation',
    'Unvented Cylinder Servicing',
    'General Plumbing Inspection',
    'Radiator & Valve Upgrades',
  ];

  useEffect(() => {
    if (!formData.date) {
      setTimeSlots([]);
      return;
    }

    const controller = new AbortController();
    setLoadingSlots(true);
    setError('');
    fetch(`/api/availability?date=${encodeURIComponent(formData.date)}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load appointment times');
        const slots = Array.isArray(data.slots) ? data.slots : [];
        setTimeSlots(slots);
        setFormData((current) => ({
          ...current,
          time: slots.includes(current.time) ? current.time : '',
        }));
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setTimeSlots([]);
          setError(requestError.message || 'Could not load appointment times');
        }
      })
      .finally(() => setLoadingSlots(false));

    return () => controller.abort();
  }, [formData.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete booking.');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Slot unavailable. Please select another time or date.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-[#1E3A8A] shadow-2xl relative">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1E3A8A]/60">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-white font-heading">
            ONLINE APPOINTMENT BOOKING
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select your preferred date & time slot • Instant booking confirmation
          </p>
        </div>
      </div>

      {success ? (
        <div role="status" className="p-8 bg-emerald-950/90 border border-emerald-500/40 rounded-2xl text-center space-y-4 animate-in zoom-in-95">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          <h4 className="text-2xl font-bold text-white font-heading">Booking Request Received!</h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Your preferred appointment for <strong className="text-amber-400">{formData.service}</strong> on{' '}
            <strong className="text-white">{formData.date} at {formData.time}</strong> has been logged. We will contact you at {formData.email} to confirm availability.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                customerName: '',
                phone: '',
                email: '',
                postcode: '',
                service: initialService || 'Boiler Servicing',
                date: '',
                time: '',
                notes: '',
                website: '',
              });
              setTimeSlots([]);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#070D1E] text-amber-400 text-xs font-bold border border-[#1E3A8A] hover:bg-[#0F1C3F]"
          >
            Book Another Service
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div role="alert" className="p-3 bg-red-950/90 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-service" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Service <span className="text-amber-400">*</span>
              </label>
              <select
                id="booking-service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
              >
                {!servicesList.includes(formData.service) && (
                  <option value={formData.service}>{formData.service}</option>
                )}
                {servicesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="booking-date" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Select Date <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="booking-date"
                  ref={dateInputRef}
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                  className="booking-date-input w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Open appointment date calendar"
                  onClick={() => {
                    const input = dateInputRef.current;
                    if (input?.showPicker) input.showPicker();
                    else {
                      input?.focus();
                      input?.click();
                    }
                  }}
                  className="absolute inset-y-1 right-1 flex w-10 items-center justify-center rounded-lg bg-amber-400 text-slate-950 shadow-glow-gold transition-colors hover:bg-amber-300"
                >
                  <Calendar className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <label id="booking-time-label" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Available Time Slot <span className="text-amber-400">*</span>
            </label>
            {!formData.date ? (
              <p className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-400">
                Select a date to see available appointment times.
              </p>
            ) : loadingSlots ? (
              <p className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-400">
                Checking live availability…
              </p>
            ) : timeSlots.length === 0 ? (
              <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
                No appointment times are available on this date. Please choose another day.
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2" role="group" aria-labelledby="booking-time-label">
                {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  aria-pressed={formData.time === slot}
                  onClick={() => setFormData({ ...formData, time: slot })}
                  className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                    formData.time === slot
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-glow-gold'
                      : 'bg-[#070D1E] text-slate-300 border-[#1E3A8A] hover:border-slate-700'
                  }`}
                >
                  {slot}
                </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name <span className="text-amber-400">*</span>
              </label>
              <input
                id="booking-name"
                type="text"
                required
                autoComplete="name"
                maxLength={100}
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone Number <span className="text-amber-400">*</span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                maxLength={25}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 07311038572"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                id="booking-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. you@email.com"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label htmlFor="booking-postcode" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Postcode <span className="text-amber-400">*</span>
              </label>
              <input
                id="booking-postcode"
                type="text"
                required
                autoComplete="postal-code"
                maxLength={12}
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                placeholder="e.g. CW1 2AB"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="booking-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Additional Access Notes (Optional)
            </label>
            <textarea
              id="booking-notes"
              rows={2}
              maxLength={1500}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Key safe code, parking instructions, or specific issues..."
              className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="booking-website">Website</label>
            <input
              id="booking-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.time}
            className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base transition-all shadow-glow-gold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span>Sending Booking Request...</span> : <span>REQUEST APPOINTMENT</span>}
          </button>
        </form>
      )}
    </div>
  );
};
