'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Plus, Trash2, Edit3, ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff, Star } from 'lucide-react';

interface TestimonialData {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  service: string;
  location?: string | null;
  published: boolean;
  date: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialData | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [service, setService] = useState('Boiler Installation & Servicing');
  const [location, setLocation] = useState('Crewe, Cheshire');
  const [published, setPublished] = useState(true);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (data.testimonials) setTestimonials(data.testimonials);
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!customerName || !review) {
      setFeedback({ type: 'error', message: 'Customer name and review text are required.' });
      return;
    }

    try {
      const url = editingItem ? `/api/admin/testimonials/${editingItem.id}` : '/api/admin/testimonials';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          review,
          rating: Number(rating),
          service,
          location,
          published,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: editingItem ? 'Review updated!' : 'Review created!' });
        resetForm();
        fetchTestimonials();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save review.' });
      }
    } catch (err) {
      console.error('Error saving testimonial:', err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove the review from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Review from "${name}" removed.` });
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const startEdit = (t: TestimonialData) => {
    setEditingItem(t);
    setCustomerName(t.customerName);
    setReview(t.review);
    setRating(t.rating);
    setService(t.service);
    setLocation(t.location || 'Crewe, Cheshire');
    setPublished(t.published);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setCustomerName('');
    setReview('');
    setRating(5);
    setService('Boiler Installation & Servicing');
    setLocation('Crewe, Cheshire');
    setPublished(true);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3A8A]">
          <div>
            <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline mb-2 font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-white font-heading">
              CUSTOMER REVIEWS & TESTIMONIALS MANAGER
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Add new verified customer reviews, edit ratings, approve testimonials, or remove bad reviews.
            </p>
          </div>

          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-glow-gold flex items-center justify-center gap-2"
          >
            {showForm ? 'Close Form' : <><Plus className="w-4 h-4" /> Add New Customer Review</>}
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
            feedback.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' : 'bg-red-950/80 border-red-500/50 text-red-300'
          }`}>
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{feedback.message}</span>
            </div>
            <button onClick={() => setFeedback(null)}>✕</button>
          </div>
        )}

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#1E3A8A] bg-[#0F1C3F]/95 shadow-2xl">
            <h2 className="text-xl font-bold text-white font-heading mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" /> {editingItem ? 'Edit Review' : 'Create New Customer Review'}
            </h2>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David M."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Star Rating (1 - 5) *</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars (Good)</option>
                    <option value={3}>⭐⭐⭐ 3 Stars (Average)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Service Provided</label>
                  <input
                    type="text"
                    placeholder="e.g. Boiler Servicing & Flue Gas Analysis"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Customer Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Crewe, Cheshire"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Review Feedback *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Paste or write customer review feedback..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl p-4 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded border-[#1E3A8A] text-amber-500 focus:ring-amber-400"
                  />
                  <span>Published on Website</span>
                </label>

                <div className="flex gap-3">
                  <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl bg-[#070D1E] text-slate-300 text-xs font-bold border border-[#1E3A8A]">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-glow-gold">
                    {editingItem ? 'Update Review' : 'Save Review'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* LIST */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs font-mono">Loading reviews...</div>
        ) : testimonials.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-slate-400">
            No reviews found. Click &quot;Add New Customer Review&quot; above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-6 border border-[#1E3A8A] bg-[#0F1C3F]/90 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-white text-base">{item.customerName}</span>
                    <div className="flex text-yellow-400 text-xs">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-amber-400 font-bold">{item.service} • {item.location}</div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">&quot;{item.review}&quot;</p>
                </div>

                <div className="pt-4 border-t border-[#1E3A8A]/60 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                    item.published ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {item.published ? 'Published' : 'Hidden'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button onClick={() => startEdit(item)} className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/40 text-xs font-bold">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.customerName)} className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-bold">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
