'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const openedByUserRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('trids-assistant-seen')) return;
    const timer = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('trids-assistant-seen', 'true');
    }, 6000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (openedByUserRef.current) inputRef.current?.focus({ preventScroll: true });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content: trimmedContent }];
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

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendMessage(input);
  };

  const closeAssistant = () => {
    setOpen(false);
    openedByUserRef.current = false;
    sessionStorage.setItem('trids-assistant-seen', 'true');
  };

  return (
    <div className="fixed bottom-20 left-4 z-50 sm:bottom-6">
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="trids-assistant-title"
          className="relative mb-3 flex h-[min(34rem,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl"
        >
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
            <Image
              src="/images/trids-logo.png"
              alt=""
              width={520}
              height={520}
              className="w-[125%] max-w-none select-none object-contain opacity-[0.055] grayscale"
            />
          </div>
          <div className="pointer-events-none absolute -left-20 top-14 z-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 z-0 h-52 w-52 rounded-full bg-red-500/10 blur-3xl" aria-hidden="true" />

          <header className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 bg-slate-900/95 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="relative rounded-xl bg-amber-400 p-2 text-slate-950">
                <Bot className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" aria-hidden="true" />
              </span>
              <div>
                <h2 id="trids-assistant-title" className="text-sm font-extrabold text-white">TRIDS Virtual Assistant</h2>
                <p className="text-[10px] text-emerald-400">Online · General guidance</p>
              </div>
            </div>
            <button type="button" onClick={closeAssistant} aria-label="Close assistant" className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="relative z-10 flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
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
            {error && <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">{error}</div>}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {['Book a service', 'Boiler repair', 'Areas covered'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-200 hover:bg-blue-500/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={send} className="relative z-10 flex gap-2 border-t border-slate-700 bg-slate-900/95 p-3 backdrop-blur-sm">
            <input
              ref={inputRef}
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
        onClick={() => {
          openedByUserRef.current = !open;
          setOpen((current) => !current);
          sessionStorage.setItem('trids-assistant-seen', 'true');
        }}
        className="flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 via-blue-600 to-red-600 px-4 text-sm font-extrabold text-white shadow-xl transition hover:from-emerald-500 hover:via-blue-500 hover:to-red-500"
        aria-expanded={open}
        aria-label={open ? 'Close TRIDS assistant' : 'Open TRIDS assistant'}
      >
        <Sparkles className="h-4 w-4 text-amber-300" />
        Virtual Assistant
      </button>
    </div>
  );
}
