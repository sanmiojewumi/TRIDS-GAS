'use client';

import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  service: string;
  location?: string | null;
  date: string;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
  googleReviewsUrl?: string;
}

export const TestimonialsSection: React.FC<TestimonialsProps> = ({
  testimonials,
  googleReviewsUrl,
}) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    service: 'Boiler Servicing',
    rating: 5,
    review: '',
  });

  const hasGoogleReviews = Boolean(googleReviewsUrl && googleReviewsUrl !== '#');
  const averageRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
      : '5.0';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit review.');
      }
      setSubmitted(true);
      setTimeout(() => {
        setShowReviewModal(false);
        setSubmitted(false);
        setFormData({ customerName: '', service: 'Boiler Servicing', rating: 5, review: '' });
      }, 2500);
    } catch (err: any) {
      setSubmitError(err.message || 'Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#070D1E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Customer Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
              WHAT OUR CUSTOMERS SAY
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Google Reviews Badge */}
            <div className="bg-[#0F1C3F] border border-[#1E3A8A] p-3 rounded-2xl flex items-center gap-3">
              <div className="flex text-amber-400 text-sm font-bold">★★★★★</div>
              <div className="text-xs text-slate-300 font-medium">
                <span className="text-white font-bold">{averageRating} Star</span>{' '}
                {testimonials.length > 0 ? `from ${testimonials.length} reviews` : 'Local gas & plumbing'}
              </div>
            </div>
            {hasGoogleReviews && (
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl bg-[#0F1C3F] border border-[#1E3A8A] text-xs font-bold text-slate-200 hover:text-amber-400"
              >
                Google Reviews
              </a>
            )}

            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-glow-gold flex items-center gap-2 shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4" /> Leave a Review
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        {testimonials.length === 0 && (
          <div className="mb-8 p-8 rounded-2xl border border-[#1E3A8A] bg-[#0F1C3F]/60 text-center text-slate-300 text-sm">
            Reviews will appear here once published. Use <strong className="text-white">Leave a Review</strong> to share your experience.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-sm italic leading-relaxed mb-4">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E3A8A]/60">
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{t.customerName}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs text-amber-400 font-mono mt-0.5">{t.service}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">{t.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 bg-[#070D1E]/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0F1C3F] border border-[#1E3A8A] rounded-3xl p-6 max-w-md w-full relative shadow-2xl">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-white mb-2 font-heading">Submit a Customer Review</h3>
              <p className="text-slate-300 text-xs mb-4">Share your feedback about TRIDS Gas & Plumbing.</p>

              {submitted ? (
                <div className="p-6 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white">Thank You!</h4>
                  <p className="text-xs text-slate-300">Your review has been submitted for moderation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Service Received</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
                    >
                      <option>Boiler Servicing</option>
                      <option>Boiler Installation</option>
                      <option>Boiler Repair</option>
                      <option>Gas Safety Check</option>
                      <option>General Plumbing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 text-amber-400"
                        >
                          <Star className={`w-6 h-6 ${star <= formData.rating ? 'fill-amber-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      placeholder="Describe your experience..."
                      className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 outline-none"
                    />
                  </div>

                  {submitError && (
                    <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded-lg border border-red-500/40">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-glow-gold disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
