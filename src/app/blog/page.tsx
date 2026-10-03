import React from 'react';
import { db } from '@/lib/db';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';

import { pageSeo } from '@/lib/seo';

export const metadata = pageSeo('/blog', {
  title: 'Gas Safety & Boiler Advice | TRIDS Knowledge Centre',
  description:
    'Practical UK gas engineering articles on boiler servicing, landlord CP12 certificates and what to do if you smell gas.',
});

export default async function BlogListingPage() {
  const posts = await db.blogPost.findMany({ where: { published: true } });

  return (
    <div className="py-12 bg-slate-950">
      <KnowledgeSection posts={posts} />
    </div>
  );
}
