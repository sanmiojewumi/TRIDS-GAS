'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, CheckCircle2, ArrowRight, ShieldCheck, Calculator, Sparkles, PhoneCall, Calendar, Send, Check } from 'lucide-react';

export const BoilerQuoteCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('Semi-Detached');
  const [bedrooms, setBedrooms] = useState('3 Bedrooms');
  const [bathrooms, setBathrooms] = useState('1 Bathroom');
  const [currentBoiler, setCurrentBoiler] = useState('Combi Boiler');
  
  // Instant submission fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const propertyTypes = [
    { id: 'Detached', label: 'Detached House' },
    { id: 'Semi-Detached', label: 'Semi-Detached' },
    { id: 'Terraced', label: 'Terraced House' },
    { id: 'Flat', label: 'Flat / Apartment' },
  ];

  const bedroomOptions = ['1-2 Bedrooms', '3 Bedrooms', '4 Bedrooms', '5+ Bedrooms'];
  const bathroomOptions = ['1 Bathroom', '2 Bathrooms', '3+ Bathrooms'];
  const boilerOptions = ['Combi Boiler', 'System Boiler', 'Conventional / Heat Only', 'Not Sure'];

  // Calculate estimated price based on property size
  const getEstimatedPrice = () => {
    let base = 1750;
    if (bedrooms === '3 Bedrooms') base += 250;
    if (bedrooms === '4 Bedrooms') base += 500;
    if (bedrooms === '5+ Bedrooms') base += 850;
    if (bathrooms === '2 Bathrooms') base += 200;
    if (bathrooms === '3+ Bathrooms') base += 400;
    if (currentBoiler === 'System Boiler' || currentBoiler === 'Conventional / Heat Only') base += 350;
    return { min: base, max: base + 650 };
  };

  const estimated = getEstimatedPrice();

  const handleInstantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !postcode) {
      setErrorMsg('Please enter your name, phone number, and postcode.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: 'not-provided@tridsgas.co.uk',
          postcode,
          service: 'Boiler Installation (Instant Estimator)',
          message: `Instant Estimator Quote: £${estimated.min} - £${estimated.max}. Property: ${propertyType}, ${bedrooms}, ${bathrooms}, Current: ${currentBoiler}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg('Failed to send quote request. Please try calling 07311038572.');
      }
    } catch (err) {
      console.error('Instant calculator submit error:', err);
      setErrorMsg('An error occurred. Please call 07311038572 directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0A1228] border-t border-b border-[#1E3A8A] relative overflow-hidden">
      {/* Background Tri-Color Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1C3F] border border-amber-500/40 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5" /> Instant 30-Second Online Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            GET AN INSTANT BOILER INSTALLATION QUOTE
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Answer a few quick questions to estimate your new boiler cost. No personal details required to see prices!
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#1E3A8A] shadow-2xl bg-[#0F1C3F]/90">
          
          {/* Progress Steps Header */}
          <div className="flex items-center justify-between gap-2 mb-8 border-b border-[#1E3A8A]/60 pb-4">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${step >= 1 ? 'bg-amber-500 text-slate-950 shadow-glow-gold' : 'bg-[#070D1E] text-slate-400'}`}>
                1
              </span>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Property</span>
            </div>
            <div className="w-12 h-0.5 bg-[#1E3A8A]" />

            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${step >= 2 ? 'bg-amber-500 text-slate-950 shadow-glow-gold' : 'bg-[#070D1E] text-slate-400'}`}>
                2
              </span>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Bedrooms & Baths</span>
            </div>
            <div className="w-12 h-0.5 bg-[#1E3A8A]" />

            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${step >= 3 ? 'bg-amber-500 text-slate-950 shadow-glow-gold' : 'bg-[#070D1E] text-slate-400'}`}>
                3
              </span>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Current Boiler</span>
            </div>
            <div className="w-12 h-0.5 bg-[#1E3A8A]" />

            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${step === 4 ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald' : 'bg-[#070D1E] text-slate-400'}`}>
                4
              </span>
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">Instant Quote</span>
            </div>
          </div>

          {/* STEP 1: Property Type */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-white font-heading">
                Step 1: What type of property do you live in?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {propertyTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setPropertyType(pt.id)}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      propertyType === pt.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-glow-gold'
                        : 'bg-[#070D1E] text-slate-200 border-[#1E3A8A] hover:border-amber-400/50'
                    }`}
                  >
                    <span className="text-sm">{pt.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-glow-gold"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Bedrooms & Bathrooms */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-white font-heading">
                Step 2: How many bedrooms & bathrooms?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase font-mono">Bedrooms</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {bedroomOptions.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBedrooms(b)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          bedrooms === b
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-glow-gold'
                            : 'bg-[#070D1E] text-slate-200 border-[#1E3A8A]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase font-mono">Bathrooms</label>
                  <div className="grid grid-cols-3 gap-3">
                    {bathroomOptions.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBathrooms(b)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          bathrooms === b
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-glow-gold'
                            : 'bg-[#070D1E] text-slate-200 border-[#1E3A8A]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-[#070D1E] text-slate-300 border border-[#1E3A8A] text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-glow-gold"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Current Boiler */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-white font-heading">
                Step 3: What type of boiler do you currently have?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {boilerOptions.map((b) => (
                  <button
                    key={b}
                    onClick={() => setCurrentBoiler(b)}
                    className={`p-4 rounded-2xl border text-center text-xs font-bold transition-all flex flex-col items-center justify-center gap-2 ${
                      currentBoiler === b
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-glow-gold'
                        : 'bg-[#070D1E] text-slate-200 border-[#1E3A8A]'
                    }`}
                  >
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span>{b}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-[#070D1E] text-slate-300 border border-[#1E3A8A] text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-glow-emerald"
                >
                  Calculate My Quote <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Instant Result */}
          {step === 4 && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Estimated Installation Range
              </div>

              <div className="space-y-2">
                <div className="text-4xl sm:text-5xl font-extrabold text-yellow-400 font-heading">
                  £{estimated.min.toLocaleString()} – £{estimated.max.toLocaleString()}
                </div>
                <p className="text-xs text-slate-300">
                  Includes full installation, chemical flush, magnetic filter, warranty & Gas Safe CP12 registration.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070D1E] border border-[#1E3A8A] text-left text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-400 block font-mono text-[10px]">PROPERTY</span>
                  <strong className="text-white font-semibold">{propertyType}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[10px]">BEDROOMS</span>
                  <strong className="text-white font-semibold">{bedrooms}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[10px]">BATHROOMS</span>
                  <strong className="text-white font-semibold">{bathrooms}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono text-[10px]">CURRENT BOILER</span>
                  <strong className="text-white font-semibold">{currentBoiler}</strong>
                </div>
              </div>

              {/* Direct Instant Notification Form to tridsgasandplumbing@gmail.com */}
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-sm space-y-2 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-bold">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Estimate Sent to TRIDS Engineer!</h4>
                  <p className="text-xs text-slate-300">
                    We have received your request at <strong className="text-yellow-400 font-mono">tridsgasandplumbing@gmail.com</strong> and will call you back shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInstantSubmit} className="p-5 rounded-2xl bg-[#070D1E] border border-[#1E3A8A] text-left space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Send className="w-4 h-4 text-amber-400" /> Send This Estimate to TRIDS Engineer for Fast Callback
                  </h4>

                  {errorMsg && (
                    <div className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded-lg border border-red-500/40">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-[#0F1C3F] border border-[#1E3A8A] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="bg-[#0F1C3F] border border-[#1E3A8A] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-mono"
                    />

                    <input
                      type="text"
                      placeholder="Postcode (e.g. CW1 2AB) *"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      required
                      className="bg-[#0F1C3F] border border-[#1E3A8A] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-glow-gold flex items-center justify-center gap-2"
                    >
                      {submitting ? 'Sending Request...' : 'Send Estimate to Engineer'}
                    </button>

                    <a
                      href="tel:07311038572"
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Call Directly: 07311038572
                    </a>
                  </div>
                </form>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href={`/quote?service=Boiler+Installation&details=${encodeURIComponent(
                    `Property: ${propertyType}, ${bedrooms}, ${bathrooms}, Current: ${currentBoiler}`
                  )}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F1C3F] hover:bg-[#142552] text-slate-200 text-xs font-semibold border border-[#1E3A8A] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Full Quote Form</span>
                </Link>

                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-amber-400 underline"
                >
                  Recalculate with different options
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
