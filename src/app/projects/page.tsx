import React from 'react';
import { db } from '@/lib/db';
import { ProjectGallerySection } from '@/components/home/ProjectGallerySection';

export const metadata = {
  title: 'Work Gallery | TRIDS Gas & Plumbing',
  description: 'View real project photos of boiler installations, heating overhauls, and plumbing work completed by TRIDS Gas & Plumbing.',
};

export default async function ProjectsPage() {
  const projects = await db.project.findMany({ where: { published: true } });

  return (
    <div className="py-12 bg-slate-950">
      <ProjectGallerySection projects={projects} />
    </div>
  );
}
