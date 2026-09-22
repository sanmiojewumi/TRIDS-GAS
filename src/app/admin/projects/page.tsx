'use client';

import { CrudManager, CrudField } from '@/components/admin/CrudManager';

const fields: CrudField[] = [
  { name: 'title', label: 'Project title', required: true },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: ['Boiler Installation', 'Boiler Repairs', 'Plumbing', 'Gas Installation', 'Heating', 'Pipework'],
  },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'beforeImage', label: 'Before image URL', placeholder: '/uploads/example.jpg or https://…' },
  { name: 'afterImage', label: 'After image URL', required: true, placeholder: '/uploads/example.jpg or https://…' },
  { name: 'location', label: 'Location' },
  { name: 'published', label: 'Visible on website', type: 'checkbox' },
];

export default function AdminProjectsPage() {
  return (
    <CrudManager
      title="Project Gallery"
      description="Add, edit, publish or remove completed work and before/after projects."
      singular="Project"
      endpoint="/api/admin/content/projects"
      fields={fields}
      displayFields={['category', 'description', 'location']}
    />
  );
}
