'use client';

import React, { useState } from 'react';
import { Copy, Sparkles, WandSparkles } from 'lucide-react';

export default function AdminAiAssistantPage() {
  const [contentType, setContentType] = useState('service page');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    setCopied(false);
    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'admin',
          message: `Create a ${contentType} based on this brief:\n${prompt}`,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not generate content');
      setResult(data.reply);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not generate content');
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
  };

  return (
    <div className="space-y-7">
      <header className="border-b border-slate-800 pb-5">
        <h1 className="flex items-center gap-3 font-heading text-3xl font-extrabold text-white">
          <Sparkles className="h-8 w-8 text-amber-400" /> AI Writing Assistant
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Draft accurate website content, then review and paste it into the relevant content manager.
        </p>
      </header>

      <form onSubmit={generate} className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-300">Content type</span>
          <select value={contentType} onChange={(event) => setContentType(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white">
            <option>service page</option>
            <option>frequently asked question and answer</option>
            <option>knowledge article</option>
            <option>homepage section</option>
            <option>customer email response</option>
            <option>social media post</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-300">Brief</span>
          <textarea
            required
            rows={7}
            maxLength={3000}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Example: Explain why an annual boiler service matters, aimed at homeowners in Crewe. Keep it concise and mention Gas Safe registration 979661."
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none focus:border-amber-400"
          />
        </label>
        <button disabled={loading || !prompt.trim()} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs font-extrabold text-slate-950 disabled:opacity-50">
          <WandSparkles className="h-4 w-4" /> {loading ? 'Generating…' : 'Generate Draft'}
        </button>
      </form>

      {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

      {result && (
        <section className="rounded-2xl border border-blue-500/30 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-white">Generated draft</h2>
            <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-xs font-bold text-slate-200">
              <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="whitespace-pre-wrap text-sm leading-7 text-slate-200">{result}</div>
          <p className="mt-5 border-t border-slate-800 pt-4 text-xs text-amber-300">
            Review facts, prices and safety claims before publishing. AI drafts are not published automatically.
          </p>
        </section>
      )}
    </div>
  );
}
