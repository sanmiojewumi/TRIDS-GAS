'use client';

import { CrudManager, CrudField } from '@/components/admin/CrudManager';

const fields: CrudField[] = [
  { name: 'question', label: 'Question', required: true },
  { name: 'answer', label: 'Answer', type: 'textarea', required: true },
  { name: 'category', label: 'Category' },
  { name: 'order', label: 'Display order', type: 'number' },
  { name: 'published', label: 'Visible on website', type: 'checkbox' },
];

export default function AdminFaqsPage() {
  return (
    <CrudManager
      title="Frequently Asked Questions"
      description="Manage the questions and answers shown on the public FAQ page."
      singular="FAQ"
      endpoint="/api/admin/content/faqs"
      fields={fields}
      displayFields={['answer', 'category']}
    />
  );
}
