'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Upload, AlertCircle } from 'lucide-react';

interface QuoteFormProps {
  initialService?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ initialService = 'Boiler Servicing' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    service: initialService,
    message: '',
    preferredDate: '',
    preferredTime: 'Morning (08:00 - 12:00)',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const servicesList = [
    'Boiler Installation',
    'Boiler Servicing',
    'Boiler Repairs',
    'Gas Safety Checks',
    'Landlord Gas Safety Certificates (CP12)',
    'Gas Appliance Installation',
    'Gas Pipework Installation',
    'Gas Tightness Testing',
    'Gas Leak Investigation',
    'Central Heating Services',
    'General Plumbing',
    'Leaking Pipes & Leak Detection',
    'Tap & Toilet Installation',
    'Shower & Radiator Replacement',
    'Hot Water Cylinder Services',
    'Emergency Plumbing / Other',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit quote request. Please try again.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        postcode: '',
        service: initialService,
        message: '',
        preferredDate: '',
        preferredTime: 'Morning (08:00 - 12:00)',
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please call us directly on 07311038572.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-[#1E3A8A] shadow-2xl relative">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1E3A8A]/60">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-white font-heading">
            REQUEST A DETAILED QUOTE
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent pricing • Gas Safe Registered Engineer (Reg 979661) • No obligation
          </p>
        </div>
      </div>

      {success ? (
        <div className="p-8 bg-emerald-950/90 border border-emerald-500/40 rounded-2xl text-center space-y-4 animate-in zoom-in-95">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          <h4 className="text-2xl font-bold text-white font-heading">Quote Request Received!</h4>
          <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
            Thank you for contacting TRIDS Gas & Plumbing. Our lead engineer will review your request details and respond shortly by phone or email.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 rounded-xl bg-[#070D1E] text-amber-400 text-xs font-bold border border-[#1E3A8A] hover:bg-[#0F1C3F]"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-950/90 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. David Miller"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Phone Number <span className="text-amber-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 07311038572"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. tridsgasandplumbing@gmail.com"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Postcode <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                placeholder="e.g. CW1 2AB"
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Service Required <span className="text-amber-400">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
              >
                {servicesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Preferred Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Preferred Time
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
              >
                <option>Morning (08:00 - 12:00)</option>
                <option>Afternoon (12:00 - 16:00)</option>
                <option>Evening / Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Work Description & Details <span className="text-amber-400">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your boiler model, symptoms, leak location or project scope..."
              className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl p-4 text-sm text-white focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#070D1E] border border-dashed border-[#1E3A8A] flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Attach Photos / Fault Codes (Optional)</span>
            </span>
            <span className="text-[10px] font-mono bg-[#0F1C3F] px-2.5 py-1 rounded-lg">Supported: JPG, PNG, PDF</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base transition-all shadow-glow-gold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Submitting Quote Request...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>SUBMIT QUOTE REQUEST</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
