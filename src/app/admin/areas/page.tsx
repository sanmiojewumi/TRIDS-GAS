'use client';

import { CrudManager, CrudField } from '@/components/admin/CrudManager';

const fields: CrudField[] = [
  { name: 'name', label: 'Town or service area', required: true },
  { name: 'description', label: 'Area page description', type: 'textarea', required: true },
  { name: 'seoTitle', label: 'SEO page title' },
  { name: 'seoDescription', label: 'SEO description', type: 'textarea' },
  { name: 'active', label: 'Visible on website', type: 'checkbox' },
];

export default function AdminAreasPage() {
  return (
    <CrudManager
      title="Service Areas"
      description="Control the locations displayed on the coverage page and their local landing pages."
      singular="Service Area"
      endpoint="/api/admin/content/areas"
      fields={fields}
      displayFields={['description', 'seoTitle']}
    />
  );
}
