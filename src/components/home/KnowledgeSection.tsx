import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight, Calendar, User } from 'lucide-react';

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  author: string;
  publishedAt: string | Date;
}

interface KnowledgeProps {
  posts: BlogPostItem[];
}

export const KnowledgeSection: React.FC<KnowledgeProps> = ({ posts }) => {
  return (
    <section className="py-16 lg:py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Professional Advice & Maintenance Guides
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
              TRIDS KNOWLEDGE CENTRE
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 font-bold text-xs border border-slate-800 transition-colors"
          >
            Explore All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-amber-400 text-xs font-mono font-bold">
                    {post.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 font-heading">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 mt-4">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-500" /> {post.author}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />{' '}
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
