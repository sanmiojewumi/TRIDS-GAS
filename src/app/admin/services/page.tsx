'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wrench, Plus, Trash2, Edit3, ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff, Star, ShieldCheck } from 'lucide-react';

interface ServiceData {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  image?: string | null;
  active: boolean;
  featured: boolean;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('GAS');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [active, setActive] = useState(true);
  const [featured, setFeatured] = useState(false);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name || !description) {
      setFeedback({ type: 'error', message: 'Service name and description are required.' });
      return;
    }

    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          description,
          content: content || description,
          image,
          active,
          featured,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: editingService ? 'Service updated successfully!' : 'Service created successfully!' });
        resetForm();
        fetchServices();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save service.' });
      }
    } catch (err) {
      console.error('Error saving service:', err);
      setFeedback({ type: 'error', message: 'An error occurred while saving the service.' });
    }
  };

  const handleDeleteService = async (id: string, serviceName: string) => {
    if (!confirm(`Are you sure you want to remove "${serviceName}"?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Service "${serviceName}" deleted.` });
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleToggleActive = async (service: ServiceData) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !service.active }),
      });
      if (res.ok) {
        setServices(services.map((s) => (s.id === service.id ? { ...s, active: !s.active } : s)));
      }
    } catch (err) {
      console.error('Error toggling active:', err);
    }
  };

  const startEdit = (service: ServiceData) => {
    setEditingService(service);
    setName(service.name);
    setCategory(service.category);
    setDescription(service.description);
    setContent(service.content);
    setImage(service.image || '');
    setActive(service.active);
    setFeatured(service.featured);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingService(null);
    setName('');
    setCategory('GAS');
    setDescription('');
    setContent('');
    setImage('');
    setActive(true);
    setFeatured(false);
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
              SERVICES MANAGER
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Add new gas & plumbing services, edit existing details, toggle visibility, or delete service offerings.
            </p>
          </div>

          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-glow-gold flex items-center justify-center gap-2"
          >
            {showForm ? 'Close Form' : <><Plus className="w-4 h-4" /> Add New Service</>}
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

        {/* ADD / EDIT SERVICE FORM */}
        {showForm && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#1E3A8A] bg-[#0F1C3F]/95 shadow-2xl">
            <h2 className="text-xl font-bold text-white font-heading mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-amber-400" /> {editingService ? `Edit Service: ${editingService.name}` : 'Add New Gas or Plumbing Service'}
            </h2>

            <form onSubmit={handleSaveService} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Boiler Installation & Upgrades"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="GAS">🔥 Gas & Heating Services</option>
                    <option value="PLUMBING">🚰 Plumbing Services</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short summary displayed on homepage cards..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl p-4 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Detailed Content (Full Service Page)</label>
                <textarea
                  rows={4}
                  placeholder="Detailed breakdown of work involved, guarantees, and Gas Safe procedures..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl p-4 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Image URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-6 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="w-4 h-4 rounded border-[#1E3A8A] text-amber-500 focus:ring-amber-400"
                    />
                    <span>Active / Published</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded border-[#1E3A8A] text-amber-500 focus:ring-amber-400"
                    />
                    <span>Featured on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl bg-[#070D1E] text-slate-300 text-xs font-bold border border-[#1E3A8A]">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-glow-gold">
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SERVICES GRID */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-xs font-mono">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-slate-400">
            No services found. Click &quot;Add New Service&quot; above to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`glass-card rounded-2xl p-6 border flex flex-col justify-between space-y-4 transition-all ${
                  service.active ? 'border-[#1E3A8A] bg-[#0F1C3F]/90' : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider ${
                      service.category === 'GAS' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {service.category === 'GAS' ? '🔥 Gas Service' : '🚰 Plumbing'}
                    </span>

                    {service.featured && (
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-yellow-400 border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400" /> Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading">{service.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{service.description}</p>
                </div>

                <div className="pt-4 border-t border-[#1E3A8A]/60 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActive(service)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 border transition-all ${
                      service.active ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {service.active ? <><Eye className="w-3 h-3" /> Active</> : <><EyeOff className="w-3 h-3" /> Hidden</>}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startEdit(service)}
                      className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/40 text-xs font-bold"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id, service.name)}
                      className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-bold"
                      title="Delete Service"
                    >
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
