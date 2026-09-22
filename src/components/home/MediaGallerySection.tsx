'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Video, Play, X, Sparkles, MapPin } from 'lucide-react';

export interface MediaItem {
  id: string;
  title: string;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  thumbnailUrl?: string | null;
  category: string;
  description?: string | null;
  location?: string | null;
}

interface GalleryProps {
  media?: MediaItem[];
}

export const MediaGallerySection: React.FC<GalleryProps> = ({ media = [] }) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IMAGE' | 'VIDEO' | 'BOILER' | 'PLUMBING'>('ALL');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Fallback default media if none passed from DB
  const defaultMedia: MediaItem[] = [
    {
      id: 'm1',
      title: 'Worcester Bosch Combi Boiler Installation',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      category: 'BOILER',
      description: 'High-efficiency A-rated combi boiler installation with magnetic filter and Nest thermostat.',
      location: 'Crewe, Cheshire',
    },
    {
      id: 'm2',
      title: 'Boiler Servicing & Flue Gas Diagnostics Walkthrough',
      type: 'VIDEO',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-plumber-working-on-a-pipe-with-a-wrench-41549-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
      category: 'BOILER',
      description: 'Step-by-step video demonstration of digital flue gas combustion testing and safety checks.',
      location: 'Nantwich, Cheshire',
    },
    {
      id: 'm3',
      title: 'Unvented Hot Water Cylinder Upgrade',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
      category: 'PLUMBING',
      description: '250L stainless steel unvented cylinder installation for high-pressure multi-bathroom water supply.',
      location: 'Sandbach, Cheshire',
    },
    {
      id: 'm4',
      title: 'Precision Copper Pipework & Thermostatic Brassware',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      category: 'WORKMANSHIP',
      description: 'Concealed thermostatic brassware installation with 22mm soldered copper pipework.',
      location: 'Winsford, Cheshire',
    },
    {
      id: 'm5',
      title: 'Gas Safety CP12 Inspection & Tightness Test Video',
      type: 'VIDEO',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-worker-fixing-a-machine-part-41551-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
      category: 'GAS_SAFETY',
      description: 'Video recording of digital manometer gas tightness testing for a landlord CP12 safety check.',
      location: 'Congleton, Cheshire',
    },
    {
      id: 'm6',
      title: 'Range Cooker & Gas Hob Supply Pipe Installation',
      type: 'IMAGE',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      category: 'GAS_SAFETY',
      description: 'New gas supply line with stability chain and gas tightness test for range cooker.',
      location: 'Stockport, Manchester',
    },
  ];

  const mediaList = media.length > 0 ? media : defaultMedia;

  const filtered = mediaList.filter((item) => {
    if (activeFilter === 'IMAGE') return item.type === 'IMAGE';
    if (activeFilter === 'VIDEO') return item.type === 'VIDEO';
    if (activeFilter === 'BOILER') return item.category === 'BOILER';
    if (activeFilter === 'PLUMBING') return item.category === 'PLUMBING';
    return true;
  });

  return (
    <section className="py-16 lg:py-24 bg-[#070D1E] border-t border-[#1E3A8A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1C3F] border border-amber-500/40 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Workmanship Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            PICTURE & VIDEO GALLERY
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Inspect real photos and video demonstrations of our gas heating installations, boiler overhauls, and precision plumbing work.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'ALL'
                ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                : 'bg-[#0F1C3F] text-slate-300 hover:text-white border border-[#1E3A8A]'
            }`}
          >
            All Media ({mediaList.length})
          </button>

          <button
            onClick={() => setActiveFilter('IMAGE')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'IMAGE'
                ? 'bg-blue-600 text-white shadow-glow-blue'
                : 'bg-[#0F1C3F] text-slate-300 hover:text-white border border-[#1E3A8A]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" /> Pictures ({mediaList.filter((m) => m.type === 'IMAGE').length})
          </button>

          <button
            onClick={() => setActiveFilter('VIDEO')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'VIDEO'
                ? 'bg-red-600 text-white shadow-glow-red'
                : 'bg-[#0F1C3F] text-slate-300 hover:text-white border border-[#1E3A8A]'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Videos ({mediaList.filter((m) => m.type === 'VIDEO').length})
          </button>

          <button
            onClick={() => setActiveFilter('BOILER')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'BOILER'
                ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                : 'bg-[#0F1C3F] text-slate-300 hover:text-white border border-[#1E3A8A]'
            }`}
          >
            Boilers
          </button>

          <button
            onClick={() => setActiveFilter('PLUMBING')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'PLUMBING'
                ? 'bg-sky-500 text-slate-950 shadow-glow-blue'
                : 'bg-[#0F1C3F] text-slate-300 hover:text-white border border-[#1E3A8A]'
            }`}
          >
            Plumbing
          </button>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#1E3A8A] flex flex-col justify-between group cursor-pointer"
            >
              {/* Media Preview Box */}
              <div className="relative h-60 w-full bg-[#050A18] overflow-hidden">
                {item.type === 'VIDEO' ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-glow-red group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Media Type Badge */}
                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg ${
                    item.type === 'VIDEO'
                      ? 'bg-red-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {item.type === 'VIDEO' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                  {item.type}
                </span>

                {item.location && (
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#070D1E]/90 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-[#1E3A8A] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {item.location}
                  </span>
                )}
              </div>

              {/* Info Body */}
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-mono font-extrabold uppercase text-amber-400 tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-heading leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL FOR PICTURE & VIDEO PLAYBACK */}
        {selectedMedia && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
            onClick={() => setSelectedMedia(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#0F1C3F] border border-[#1E3A8A] rounded-3xl overflow-hidden shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-[#1E3A8A] flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {selectedMedia.category} • {selectedMedia.location}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                    {selectedMedia.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="w-10 h-10 rounded-full bg-[#070D1E] text-slate-300 hover:text-white flex items-center justify-center border border-[#1E3A8A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Media Content Box */}
              <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                {selectedMedia.type === 'VIDEO' ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    poster={selectedMedia.thumbnailUrl || undefined}
                    className="w-full max-h-[65vh] object-contain"
                  />
                ) : (
                  <div className="relative w-full h-[500px]">
                    <Image
                      src={selectedMedia.url}
                      alt={selectedMedia.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Modal Description Footer */}
              {selectedMedia.description && (
                <div className="p-4 sm:p-6 pt-0 text-slate-300 text-sm leading-relaxed">
                  {selectedMedia.description}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
