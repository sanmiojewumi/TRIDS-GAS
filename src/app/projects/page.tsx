import React from 'react';
import { db } from '@/lib/db';
import { ProjectGallerySection } from '@/components/home/ProjectGallerySection';

import { pageSeo } from '@/lib/seo';

export const metadata = pageSeo('/projects', {
  title: 'Gas & Plumbing Work Gallery | TRIDS Crewe',
  description:
    'Photos of boiler installations, heating work and plumbing completed by TRIDS Gas & Plumbing in Crewe and Cheshire.',
});

export default async function ProjectsPage() {
  const projects = await db.project.findMany({ where: { published: true } });

  return (
    <div className="py-12 bg-slate-950">
      <ProjectGallerySection projects={projects} />
    </div>
  );
}
