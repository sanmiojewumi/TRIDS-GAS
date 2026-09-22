'use client';

import React, { useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi, I can help you choose a service or explain how booking works. How can I help?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'customer', messages: nextMessages }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Assistant unavailable');
      setMessages((current) => [...current, { role: 'assistant', content: data.reply }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Assistant unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 left-4 z-50 sm:bottom-6">
      {open && (
        <section className="mb-3 flex h-[min(34rem,70vh)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl">
          <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900 p-4">
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-amber-400 p-2 text-slate-950"><Bot className="h-5 w-5" /></span>
              <div>
                <h2 className="text-sm font-extrabold text-white">TRIDS Assistant</h2>
                <p className="text-[10px] text-slate-400">General guidance, not emergency advice</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                message.role === 'user'
                  ? 'ml-auto bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-200'
              }`}>
                {message.content}
              </div>
            ))}
            {loading && <div className="w-fit rounded-2xl bg-slate-800 px-3.5 py-2.5 text-sm text-slate-400">Thinking…</div>}
            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">{error}</div>}
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-slate-700 bg-slate-900 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={1200}
              placeholder="Ask about services or booking…"
              aria-label="Message the TRIDS assistant"
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
            />
            <button disabled={loading || !input.trim()} aria-label="Send message" className="rounded-xl bg-amber-400 px-3 text-slate-950 disabled:opacity-40">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-sm font-extrabold text-white shadow-xl hover:from-blue-500 hover:to-indigo-500"
        aria-expanded={open}
      >
        <Sparkles className="h-4 w-4 text-amber-300" />
        Ask TRIDS AI
      </button>
    </div>
  );
}
