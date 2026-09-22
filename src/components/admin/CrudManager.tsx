'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, EyeOff, Pencil, Plus, Save, Trash2, X } from 'lucide-react';

export type CrudField = {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'url' | 'number' | 'checkbox' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

type CrudValue = string | number | boolean | null | undefined;
type CrudItem = { id: string; [key: string]: CrudValue };

type CrudManagerProps = {
  title: string;
  description: string;
  singular: string;
  endpoint: string;
  fields: CrudField[];
  displayFields: string[];
};

function initialValues(fields: CrudField[]): Record<string, CrudValue> {
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      field.type === 'checkbox'
        ? true
        : field.type === 'number'
          ? 0
          : field.type === 'select'
            ? field.options?.[0] ?? ''
            : '',
    ]),
  );
}

export function CrudManager({
  title,
  description,
  singular,
  endpoint,
  fields,
  displayFields,
}: CrudManagerProps) {
  const defaults = useMemo(() => initialValues(fields), [fields]);
  const [items, setItems] = useState<CrudItem[]>([]);
  const [values, setValues] = useState<Record<string, CrudValue>>(defaults);
  const [editing, setEditing] = useState<CrudItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(endpoint, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Could not load ${title.toLowerCase()}`);
      setItems(data.items || []);
    } catch (error) {
      setFeedback({ type: 'error', text: error instanceof Error ? error.message : 'Could not load content' });
    } finally {
      setLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const closeForm = () => {
    setValues(defaults);
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (item: CrudItem) => {
    setEditing(item);
    setValues(Object.fromEntries(fields.map((field) => [field.name, item[field.name] ?? defaults[field.name]])));
    setShowForm(true);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      const response = await fetch(editing ? `${endpoint}/${editing.id}` : endpoint, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Could not save ${singular.toLowerCase()}`);
      setFeedback({
        type: 'success',
        text: `${singular} ${editing ? 'updated' : 'added'} successfully.`,
      });
      closeForm();
      await loadItems();
    } catch (error) {
      setFeedback({ type: 'error', text: error instanceof Error ? error.message : 'Could not save content' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: CrudItem) => {
    const name = String(item.title || item.name || item.question || singular);
    if (!window.confirm(`Permanently remove "${name}"?`)) return;
    const response = await fetch(`${endpoint}/${item.id}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
      setFeedback({ type: 'error', text: data.error || `Could not remove ${singular.toLowerCase()}` });
      return;
    }
    setFeedback({ type: 'success', text: `${singular} removed successfully.` });
    setItems((current) => current.filter((entry) => entry.id !== item.id));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-white">{title}</h1>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (showForm) closeForm();
            else {
              setEditing(null);
              setValues(defaults);
              setShowForm(true);
            }
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
        >
          {showForm ? <><X className="h-4 w-4" /> Close</> : <><Plus className="h-4 w-4" /> Add {singular}</>}
        </button>
      </header>

      {feedback && (
        <div className={`rounded-xl border px-4 py-3 text-sm ${
          feedback.type === 'success'
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
            : 'border-red-500/40 bg-red-500/10 text-red-300'
        }`}>
          {feedback.text}
        </div>
      )}

      {showForm && (
        <form onSubmit={submit} className="grid gap-5 rounded-2xl border border-slate-700 bg-slate-900 p-5 sm:grid-cols-2 sm:p-7">
          <h2 className="font-heading text-xl font-bold text-white sm:col-span-2">
            {editing ? `Edit ${singular}` : `Add ${singular}`}
          </h2>
          {fields.map((field) => {
            const value = values[field.name];
            const commonClass = 'mt-2 min-h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400';

            if (field.type === 'checkbox') {
              return (
                <label key={field.name} className="flex items-center gap-3 self-end rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-200">
                  <input
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.checked }))}
                    className="h-4 w-4 accent-amber-400"
                  />
                  {field.label}
                </label>
              );
            }

            return (
              <label key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <span className="text-xs font-bold uppercase tracking-wide text-slate-300">{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    required={field.required}
                    value={String(value ?? '')}
                    placeholder={field.placeholder}
                    rows={5}
                    onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                    className={commonClass}
                  />
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    value={String(value ?? '')}
                    onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                    className={commonClass}
                  >
                    {field.options?.map((option) => <option key={option}>{option}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : 'text'}
                    required={field.required}
                    value={String(value ?? '')}
                    placeholder={field.placeholder}
                    onChange={(event) => setValues((current) => ({
                      ...current,
                      [field.name]: field.type === 'number' ? Number(event.target.value) : event.target.value,
                    }))}
                    className={commonClass}
                  />
                )}
              </label>
            );
          })}
          <div className="flex justify-end gap-3 sm:col-span-2">
            <button type="button" onClick={closeForm} className="rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-bold text-slate-300">
              Cancel
            </button>
            <button disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 disabled:opacity-60">
              <Save className="h-4 w-4" /> {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="py-14 text-center text-sm text-slate-400">Loading content…</div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-14 text-center text-sm text-slate-400">
          No {title.toLowerCase()} have been added yet.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => {
            const visibility = item.published ?? item.active;
            return (
              <article key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-lg font-bold text-white">
                        {String(item.title || item.name || item.question || singular)}
                      </h3>
                      {typeof visibility === 'boolean' && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          visibility ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-700 text-slate-300'
                        }`}>
                          {visibility ? <CheckCircle2 className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {visibility ? 'Visible' : 'Hidden'}
                        </span>
                      )}
                    </div>
                    {displayFields.map((field) => item[field] !== null && item[field] !== undefined && item[field] !== '' && (
                      <p key={field} className="line-clamp-3 text-sm leading-6 text-slate-400">
                        {String(item[field])}
                      </p>
                    ))}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => startEdit(item)} aria-label={`Edit ${singular}`} className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-2 text-blue-300 hover:bg-blue-500/20">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => remove(item)} aria-label={`Delete ${singular}`} className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-300 hover:bg-red-500/20">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
