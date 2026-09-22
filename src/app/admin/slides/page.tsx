'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Layers, Plus, Trash2, Edit3, ArrowLeft, ArrowUp, ArrowDown, CheckCircle2, AlertCircle, Eye, EyeOff, Upload } from 'lucide-react';

interface SlideData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  techSpec: string;
  order: number;
  active: boolean;
}

export default function AdminSlidesPage() {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<SlideData | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('BOILER INSTALLATION');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('Boiler Service');
  const [techSpec, setTechSpec] = useState('Gas Safe Certified');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/slides');
      const data = await res.json();
      if (data.slides) {
        setSlides(data.slides);
      }
    } catch (err) {
      console.error('Failed to load slides:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleFileUpload = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('file', selectedFile);

    setUploading(true);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        return data.url;
      }
      throw new Error(data.error || 'File upload failed');
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'File upload failed' });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    let finalImageUrl = image;
    if (selectedFile) {
      const uploadedUrl = await handleFileUpload();
      if (!uploadedUrl) return;
      finalImageUrl = uploadedUrl;
    }

    if (!title || !finalImageUrl) {
      setFeedback({ type: 'error', message: 'Please provide a title and slide image.' });
      return;
    }

    try {
      const url = editingSlide ? `/api/slides/${editingSlide.id}` : '/api/slides';
      const method = editingSlide ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          description,
          image: finalImageUrl,
          badge,
          techSpec,
          order: editingSlide ? editingSlide.order : slides.length + 1,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: editingSlide ? 'Slide updated successfully!' : 'Slide added successfully!' });
        resetForm();
        fetchSlides();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save slide.' });
      }
    } catch (err) {
      console.error('Error saving slide:', err);
      setFeedback({ type: 'error', message: 'An error occurred while saving the slide.' });
    }
  };

  const handleToggleActive = async (slide: SlideData) => {
    try {
      const res = await fetch(`/api/slides/${slide.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !slide.active }),
      });
      if (res.ok) {
        setSlides(slides.map((s) => (s.id === slide.id ? { ...s, active: !s.active } : s)));
        setFeedback({ type: 'success', message: `Slide ${slide.active ? 'hidden' : 'activated'}.` });
      }
    } catch (err) {
      console.error('Error toggling slide active state:', err);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'UP' | 'DOWN') => {
    const targetIndex = direction === 'UP' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const newSlides = [...slides];
    const current = newSlides[index];
    const target = newSlides[targetIndex];

    // Swap orders
    newSlides[index] = { ...target, order: current.order };
    newSlides[targetIndex] = { ...current, order: target.order };

    setSlides(newSlides);

    // Save orders to API
    await fetch(`/api/slides/${current.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: target.order }),
    });

    await fetch(`/api/slides/${target.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: current.order }),
    });
  };

  const handleDeleteSlide = async (id: string, slideTitle: string) => {
    if (!confirm(`Are you sure you want to remove "${slideTitle}" from homepage slides?`)) return;

    try {
      const res = await fetch(`/api/slides/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Slide "${slideTitle}" removed.` });
        setSlides(slides.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const startEdit = (slide: SlideData) => {
    setEditingSlide(slide);
    setTitle(slide.title);
    setCategory(slide.category);
    setDescription(slide.description);
    setImage(slide.image);
    setBadge(slide.badge);
    setTechSpec(slide.techSpec);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setEditingSlide(null);
    setTitle('');
    setCategory('BOILER INSTALLATION');
    setDescription('');
    setImage('');
    setBadge('Boiler Service');
    setTechSpec('Gas Safe Certified');
    setSelectedFile(null);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3A8A]">
          <div>
            <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline mb-2 font-mono">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Operations Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-white font-heading">
              HOMEPAGE SLIDES & CAROUSEL CONTROL
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Add, reorder, edit, toggle, or remove hero slides shown on the main homepage.
            </p>
          </div>

          <button
            onClick={() => { resetForm(); setShowAddForm(!showAddForm); }}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-glow-gold flex items-center justify-center gap-2"
          >
            {showAddForm ? 'Close Form' : <><Plus className="w-4 h-4" /> Add New Hero Slide</>}
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

        {/* ADD / EDIT SLIDE FORM */}
        {showAddForm && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#1E3A8A] bg-[#0F1C3F]/95 shadow-2xl">
            <h2 className="text-xl font-bold text-white font-heading mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" /> {editingSlide ? 'Edit Slide Details' : 'Create New Hero Slide'}
            </h2>

            <form onSubmit={handleSaveSlide} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Slide Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ideal Combi Boiler & Precision Pipework"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category Label *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BOILER INSTALLATION"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Badge Text *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ideal Combi Boiler"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Technical Specification Pill *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Soldered Copper Gas Line & MagnaClean Filter"
                    value={techSpec}
                    onChange={(e) => setTechSpec(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Upload Image OR Paste URL */}
              <div className="p-4 rounded-2xl bg-[#070D1E] border border-[#1E3A8A] space-y-3">
                <div>
                  <label className="block text-xs font-bold text-amber-400 mb-1">Upload Image File from Device</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                    className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-amber-500 file:text-slate-950"
                  />
                </div>
                <div className="text-[10px] font-mono text-slate-400 text-center">OR</div>
                <div>
                  <label className="block text-xs font-bold text-amber-400 mb-1">Paste Direct Image URL</label>
                  <input
                    type="text"
                    placeholder="/images/slides/slide1.jpg or https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-[#0F1C3F] border border-[#1E3A8A] rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Slide Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe the boiler model or diagnostic procedure..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl p-4 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl bg-[#070D1E] text-slate-300 text-xs font-bold border border-[#1E3A8A]">
                  Cancel
                </button>
                <button type="submit" disabled={uploading} className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-glow-gold">
                  {uploading ? 'Uploading...' : editingSlide ? 'Update Slide' : 'Save Slide'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SLIDES LIST */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs font-mono">Loading hero slides...</div>
        ) : slides.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-slate-400">
            No slides found. Click &quot;Add New Hero Slide&quot; above.
          </div>
        ) : (
          <div className="space-y-4">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`glass-card rounded-2xl p-5 border flex flex-col md:flex-row items-center justify-between gap-5 transition-all ${
                  slide.active ? 'border-[#1E3A8A] bg-[#0F1C3F]/90' : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-[#1E3A8A]">
                    <Image src={slide.image} alt={slide.title} fill className="object-contain p-1" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        SLIDE #{index + 1}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{slide.category}</span>
                    </div>

                    <h3 className="text-base font-bold text-white font-heading">{slide.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-1">{slide.description}</p>
                    <div className="text-[11px] text-emerald-400 font-mono font-semibold">✓ {slide.techSpec}</div>
                  </div>
                </div>

                {/* Right: Controls (Reorder, Toggle Active, Edit, Delete) */}
                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#1E3A8A]">
                  {/* Reorder Buttons */}
                  <button
                    onClick={() => handleMoveOrder(index, 'UP')}
                    disabled={index === 0}
                    className="p-2 rounded-lg bg-[#070D1E] text-slate-300 hover:text-amber-400 border border-[#1E3A8A] disabled:opacity-30"
                    title="Move Slide Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMoveOrder(index, 'DOWN')}
                    disabled={index === slides.length - 1}
                    className="p-2 rounded-lg bg-[#070D1E] text-slate-300 hover:text-amber-400 border border-[#1E3A8A] disabled:opacity-30"
                    title="Move Slide Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Active */}
                  <button
                    onClick={() => handleToggleActive(slide)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                      slide.active ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {slide.active ? <><Eye className="w-3.5 h-3.5" /> Active</> : <><EyeOff className="w-3.5 h-3.5" /> Hidden</>}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => startEdit(slide)}
                    className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/40 text-xs font-bold"
                    title="Edit Slide"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteSlide(slide.id, slide.title)}
                    className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-bold"
                    title="Remove Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
