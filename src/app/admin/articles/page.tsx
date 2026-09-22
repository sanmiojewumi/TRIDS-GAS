'use client';

import { CrudManager, CrudField } from '@/components/admin/CrudManager';

const fields: CrudField[] = [
  { name: 'title', label: 'Article title', required: true },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: ['Boiler Advice', 'Gas Safety', 'Plumbing', 'Heating', 'Energy Efficiency', 'Home Maintenance'],
  },
  { name: 'excerpt', label: 'Short summary', type: 'textarea', required: true },
  { name: 'content', label: 'Article content', type: 'textarea', required: true },
  { name: 'featuredImage', label: 'Featured image URL', required: true, placeholder: '/uploads/example.jpg or https://…' },
  { name: 'author', label: 'Author' },
  { name: 'seoTitle', label: 'SEO page title' },
  { name: 'seoDescription', label: 'SEO description', type: 'textarea' },
  { name: 'published', label: 'Published on website', type: 'checkbox' },
];

export default function AdminArticlesPage() {
  return (
    <CrudManager
      title="Knowledge Articles"
      description="Write, edit, publish or remove boiler, heating, plumbing and safety articles."
      singular="Article"
      endpoint="/api/admin/content/articles"
      fields={fields}
      displayFields={['category', 'excerpt', 'author']}
    />
  );
}
