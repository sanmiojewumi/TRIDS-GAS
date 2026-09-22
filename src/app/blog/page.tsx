import React from 'react';
import { db } from '@/lib/db';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';

export const metadata = {
  title: 'TRIDS Knowledge Centre | Gas Safety & Boiler Advice',
  description: 'Expert UK gas engineering articles, boiler maintenance tips, safety advice, and plumbing guides.',
};

export default async function BlogListingPage() {
  const posts = await db.blogPost.findMany({ where: { published: true } });

  return (
    <div className="py-12 bg-slate-950">
      <KnowledgeSection posts={posts} />
    </div>
  );
}
