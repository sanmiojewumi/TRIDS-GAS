'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, X, Layers, MapPin } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage?: string | null;
  afterImage: string;
  location?: string | null;
}

interface ProjectGalleryProps {
  projects: ProjectItem[];
}

export const ProjectGallerySection: React.FC<ProjectGalleryProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [showBeforeView, setShowBeforeView] = useState<boolean>(false);

  const categories = ['ALL', 'Boiler Installation', 'Boiler Repairs', 'Plumbing', 'Gas Installation', 'Heating'];

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'ALL' || p.category === selectedCategory
  );

  return (
    <section id="projects" className="py-16 lg:py-24 bg-[#070D1E] border-t border-[#1E3A8A]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Workmanship Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            TRIDS WORK GALLERY
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Inspect real examples of our gas heating installations, boiler overhauls, and precision plumbing work.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-glow-gold'
                  : 'bg-[#0F1C3F] text-slate-300 hover:bg-[#142552] border border-[#1E3A8A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setActiveModalProject(project);
                setShowBeforeView(false);
              }}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-[#070D1E]">
                <Image
                  src={project.afterImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-transparent to-transparent opacity-80" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-[#070D1E]/95 backdrop-blur-md px-3 py-1 rounded-full border border-[#1E3A8A] text-amber-400 text-xs font-mono font-bold">
                  {project.category}
                </div>

                {project.beforeImage && (
                  <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Before/After Available
                  </div>
                )}

                {/* View Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#070D1E]/60 backdrop-blur-xs">
                  <span className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow-gold">
                    <Eye className="w-4 h-4" /> Inspect Project
                  </span>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors font-heading">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                {project.location && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {project.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 bg-[#070D1E]/95 backdrop-blur-lg flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full bg-[#0F1C3F] border border-[#1E3A8A] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="p-5 bg-[#070D1E] border-b border-[#1E3A8A] flex items-center justify-between">
                <div>
                  <span className="text-amber-400 text-xs font-mono font-bold uppercase">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-xl bg-[#142552] hover:bg-[#1E3A8A] text-slate-300 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Image View */}
              <div className="relative h-80 sm:h-[450px] w-full bg-[#070D1E]">
                <Image
                  src={
                    showBeforeView && activeModalProject.beforeImage
                      ? activeModalProject.beforeImage
                      : activeModalProject.afterImage
                  }
                  alt={activeModalProject.title}
                  fill
                  className="object-contain"
                />

                {/* View Badge */}
                <div className="absolute top-4 left-4 bg-[#070D1E]/95 px-3.5 py-1.5 rounded-xl border border-[#1E3A8A] text-white text-xs font-bold font-mono">
                  Current View: {showBeforeView ? 'BEFORE WORK' : 'COMPLETED WORK (AFTER)'}
                </div>

                {/* Toggle Controls */}
                {activeModalProject.beforeImage && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#070D1E]/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#1E3A8A] flex items-center gap-2">
                    <button
                      onClick={() => setShowBeforeView(true)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        showBeforeView ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      BEFORE
                    </button>
                    <button
                      onClick={() => setShowBeforeView(false)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        !showBeforeView ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      AFTER (COMPLETED)
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-[#0F1C3F] border-t border-[#1E3A8A] text-sm text-slate-300 space-y-2">
                <p>{activeModalProject.description}</p>
                {activeModalProject.location && (
                  <div className="text-xs text-amber-400 font-mono">
                    Location: {activeModalProject.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
