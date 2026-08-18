import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { EmergencyBanner } from '@/components/common/EmergencyBanner';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.seoTitle || `${post.title} | TRIDS Knowledge Centre`,
    description: post.seoDescription || post.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) notFound();

  const settings = await getSiteSettings();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: settings.companyName,
    },
    datePublished: post.publishedAt,
  };

  return (
    <article className="py-12 lg:py-20 bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Knowledge Centre
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-800 pb-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <User className="w-4 h-4 text-amber-500" /> By {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-4 h-4 text-slate-500" />{' '}
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Body Content */}
        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900 border-l-4 border-amber-500 text-slate-200 text-sm italic">
            {post.excerpt}
          </div>

          <div className="whitespace-pre-line leading-relaxed space-y-4">
            {post.content}
          </div>
        </div>

        {/* Emergency Notice */}
        <EmergencyBanner emergencyNotice={settings.emergencyNotice} />

      </div>
    </article>
  );
}
