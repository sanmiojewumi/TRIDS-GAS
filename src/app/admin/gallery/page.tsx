'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Image as ImageIcon, Video, Trash2, Plus, Upload, CheckCircle2, AlertCircle, ArrowLeft, Play, ExternalLink } from 'lucide-react';

interface MediaItemData {
  id: string;
  title: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  thumbnailUrl?: string | null;
  category: string;
  description?: string | null;
  location?: string | null;
  featured: boolean;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [media, setMedia] = useState<MediaItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');
  
  // Form state for adding media
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [category, setCategory] = useState('BOILER');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Crewe & Cheshire');
  const [mediaUrl, setMediaUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.media) {
        setMedia(data.media);
      }
    } catch (err) {
      console.error('Failed to load gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async () => {
    if (!selectedFile) return null;
    const formData = new FormData();
    formData.append('file', selectedFile);

    setUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        return { url: data.url, type: data.type as 'IMAGE' | 'VIDEO' };
      }
      throw new Error(data.error || 'Upload failed');
    } catch (err: any) {
      console.error('File upload error:', err);
      setFeedback({ type: 'error', message: err.message || 'File upload failed' });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleCreateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    let finalUrl = mediaUrl;
    let finalType = type;

    // Handle file upload if a local file was chosen
    if (selectedFile) {
      const uploaded = await handleFileUpload();
      if (!uploaded) return;
      finalUrl = uploaded.url;
      finalType = uploaded.type;
    }

    if (!title || !finalUrl) {
      setFeedback({ type: 'error', message: 'Please provide a title and media file/URL.' });
      return;
    }

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type: finalType,
          url: finalUrl,
          thumbnailUrl,
          category,
          description,
          location,
          featured: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: 'Media content added successfully!' });
        setTitle('');
        setMediaUrl('');
        setThumbnailUrl('');
        setDescription('');
        setSelectedFile(null);
        setShowAddForm(false);
        fetchMedia();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to add media content.' });
      }
    } catch (err) {
      console.error('Error creating media:', err);
      setFeedback({ type: 'error', message: 'An error occurred while creating media item.' });
    }
  };

  const handleDeleteMedia = async (id: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to remove "${itemTitle}" from the media gallery?`)) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFeedback({ type: 'success', message: `Removed "${itemTitle}" successfully.` });
        setMedia(media.filter((item) => item.id !== id));
      } else {
        setFeedback({ type: 'error', message: 'Failed to delete media item.' });
      }
    } catch (err) {
      console.error('Delete error:', err);
      setFeedback({ type: 'error', message: 'Error deleting media item.' });
    }
  };

  const filteredMedia = media.filter((item) => {
    if (activeTab === 'IMAGE') return item.type === 'IMAGE';
    if (activeTab === 'VIDEO') return item.type === 'VIDEO';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E3A8A]">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline mb-2 font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Admin Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-white font-heading">
              MEDIA GALLERY MANAGEMENT
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Upload, preview, and remove picture and video contents on TRIDS Gas & Plumbing website.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-glow-gold flex items-center justify-center gap-2"
          >
            {showAddForm ? 'Cancel Add Form' : <><Plus className="w-4 h-4" /> Add New Picture or Video</>}
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between gap-2 border ${
              feedback.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-red-950/80 border-red-500/50 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{feedback.message}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* ADD MEDIA CONTENT FORM */}
        {showAddForm && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#1E3A8A] bg-[#0F1C3F]/95 shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-bold text-white font-heading mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-amber-400" /> Upload or Add New Media Content
            </h2>

            <form onSubmit={handleCreateMedia} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Media Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Worcester Combi Boiler Installation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Media Type *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'IMAGE' | 'VIDEO')}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="IMAGE">📷 Picture / Photo (IMAGE)</option>
                    <option value="VIDEO">🎥 Video Clip (VIDEO)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-3 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="BOILER">Boiler Servicing & Installations</option>
                    <option value="PLUMBING">General & Unvented Plumbing</option>
                    <option value="GAS_SAFETY">Gas Safety & CP12 Inspections</option>
                    <option value="WORKMANSHIP">Precision Workmanship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Job Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Crewe, Cheshire"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Upload File OR Paste Direct URL */}
              <div className="p-4 rounded-2xl bg-[#070D1E] border border-[#1E3A8A] space-y-4">
                <div>
                  <label className="block text-xs font-bold text-amber-400 mb-1">
                    Option 1: Upload File from Computer / Mobile
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                    className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400"
                  />
                  {selectedFile && (
                    <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                      ✓ Selected File: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  )}
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-[#1E3A8A]"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-mono text-slate-400">OR</span>
                  <div className="flex-grow border-t border-[#1E3A8A]"></div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-400 mb-1">
                    Option 2: Paste Direct Image / MP4 Video URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or https://example.com/video.mp4"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full bg-[#0F1C3F] border border-[#1E3A8A] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {type === 'VIDEO' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Video Poster / Thumbnail Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Description / Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the boiler model, pipework alteration, or gas safety inspection..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#070D1E] border border-[#1E3A8A] rounded-xl p-4 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#070D1E] text-slate-300 border border-[#1E3A8A] text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-glow-gold flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? 'Uploading File...' : 'Upload Media Content'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#0A1228] p-3 rounded-2xl border border-[#1E3A8A]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-[#0F1C3F] text-slate-300 hover:text-white'
              }`}
            >
              All Media ({media.length})
            </button>

            <button
              onClick={() => setActiveTab('IMAGE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'IMAGE'
                  ? 'bg-blue-600 text-white shadow-glow-blue'
                  : 'bg-[#0F1C3F] text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Pictures ({media.filter((m) => m.type === 'IMAGE').length})
            </button>

            <button
              onClick={() => setActiveTab('VIDEO')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'VIDEO'
                  ? 'bg-red-600 text-white shadow-glow-red'
                  : 'bg-[#0F1C3F] text-slate-300 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" /> Videos ({media.filter((m) => m.type === 'VIDEO').length})
            </button>
          </div>
        </div>

        {/* MEDIA GRID DISPLAY */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-xs font-mono">
            Loading media items from database...
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-slate-400 space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="text-lg font-bold text-white">No media items found</div>
            <p className="text-xs">Click &quot;Add New Picture or Video&quot; above to upload media contents.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl overflow-hidden border border-[#1E3A8A] flex flex-col justify-between group hover:border-amber-400/60 transition-all"
              >
                {/* Media Preview Box */}
                <div className="relative h-52 w-full bg-[#070D1E] overflow-hidden">
                  {item.type === 'VIDEO' ? (
                    item.url.endsWith('.mp4') || item.url.endsWith('.webm') ? (
                      <video
                        src={item.url}
                        controls
                        poster={item.thumbnailUrl || undefined}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="relative h-full w-full flex items-center justify-center bg-slate-900">
                        {item.thumbnailUrl ? (
                          <Image src={item.thumbnailUrl} alt={item.title} fill className="object-cover" />
                        ) : null}
                        <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center z-10 shadow-lg">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                      </div>
                    )
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Type Badge */}
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg z-10 ${
                      item.type === 'VIDEO'
                        ? 'bg-red-600 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {item.type === 'VIDEO' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    {item.type}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 uppercase font-bold mb-1">
                      <span>{item.category}</span>
                      <span>{item.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-white font-heading line-clamp-1">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-[#1E3A8A]/60 flex items-center justify-between gap-2 mt-3">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 font-mono"
                    >
                      <ExternalLink className="w-3 h-3" /> View Media
                    </a>

                    <button
                      onClick={() => handleDeleteMedia(item.id, item.title)}
                      className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Content
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
