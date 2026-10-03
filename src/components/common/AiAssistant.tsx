'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, X } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi — I can help with services or booking.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const draggedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
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

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.12}
      onDragStart={() => {
        draggedRef.current = false;
      }}
      onDrag={() => {
        draggedRef.current = true;
      }}
      className="fixed bottom-[5.75rem] left-3 z-[60] cursor-grab select-none active:cursor-grabbing lg:bottom-6 lg:left-6"
    >
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="trids-assistant-title"
          className="mb-2 flex h-64 w-[min(18rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl"
        >
          <header className="flex items-center justify-between border-b border-emerald-500/20 bg-slate-900 px-2.5 py-2">
            <div className="flex items-center gap-1.5">
              <span className="rounded-lg bg-amber-400 p-1 text-slate-950">
                <Bot className="h-3.5 w-3.5" />
              </span>
              <h2 id="trids-assistant-title" className="text-[11px] font-extrabold text-white">
                TRIDS Help
              </h2>
            </div>
            <button
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded-md p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </header>

          <div className="flex-1 space-y-2 overflow-y-auto p-2.5" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] whitespace-pre-wrap rounded-xl px-2.5 py-1.5 text-[11px] leading-4 ${
                  message.role === 'user' ? 'ml-auto bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading && <div className="w-fit rounded-xl bg-slate-800 px-2.5 py-1.5 text-[11px] text-slate-400">Thinking…</div>}
            {error && (
              <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-[11px] text-red-300">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={send}
            onPointerDown={(event) => event.stopPropagation()}
            className="flex gap-1.5 border-t border-slate-700 bg-slate-900 p-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={1200}
              placeholder="Ask a question…"
              aria-label="Message the TRIDS assistant"
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-[11px] text-white outline-none focus:border-amber-400"
            />
            <button disabled={loading || !input.trim()} aria-label="Send message" className="rounded-lg bg-amber-400 px-2 text-slate-950 disabled:opacity-40">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => {
          if (draggedRef.current) {
            draggedRef.current = false;
            return;
          }
          setOpen((current) => !current);
        }}
        className="flex h-11 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-blue-600 to-red-600 px-3 text-[11px] font-extrabold text-white shadow-xl"
        aria-expanded={open}
        aria-label={open ? 'Close TRIDS assistant' : 'Open TRIDS assistant'}
      >
        <Sparkles className="h-3.5 w-3.5 text-amber-300" />
        Help
      </button>
    </motion.div>
  );
}
