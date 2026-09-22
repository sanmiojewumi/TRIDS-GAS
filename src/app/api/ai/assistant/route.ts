import { NextResponse } from 'next/server';
import { getVercelOidcToken } from '@vercel/oidc';
import { verifyAdminAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { checkRateLimit, cleanText } from '@/lib/security';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mode = body.mode === 'admin' ? 'admin' : 'customer';
    const isAdmin = mode === 'admin' ? await verifyAdminAuth() : false;

    if (mode === 'admin' && !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const limit = checkRateLimit(request, `ai-${mode}`, {
      windowMs: 60 * 60 * 1000,
      max: mode === 'admin' ? 60 : 12,
    });
    if (!limit.allowed) {
      return NextResponse.json(
        { error: 'AI request limit reached. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
      );
    }

    const openAiKey = process.env.OPENAI_API_KEY;
    let gatewayKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
    if (!openAiKey && !gatewayKey && process.env.VERCEL) {
      try {
        gatewayKey = await getVercelOidcToken();
      } catch (error) {
        console.error('Unable to obtain Vercel OIDC token:', error);
      }
    }
    const apiKey = openAiKey || gatewayKey;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'The AI assistant has not been configured yet.' },
        { status: 503 },
      );
    }

    const rawMessages: ChatMessage[] = Array.isArray(body.messages)
      ? body.messages
          .slice(-8)
          .map((message: Record<string, unknown>) => ({
            role: message.role === 'assistant' ? 'assistant' as const : 'user' as const,
            content: cleanText(message.content, 1200),
          }))
          .filter((message: ChatMessage) => message.content)
      : [{ role: 'user', content: cleanText(body.message, 3000) }];

    if (!rawMessages.length || !rawMessages.some((message) => message.role === 'user')) {
      return NextResponse.json({ error: 'Enter a message for the assistant' }, { status: 400 });
    }

    let instructions: string;
    if (mode === 'admin') {
      instructions = `You are the private content-writing assistant for TRIDS Gas & Plumbing, a UK Gas Safe registered business.
Create clear, accurate British English copy for services, FAQs, website sections and educational articles.
Never invent qualifications, prices, guarantees, customer reviews or completed projects.
Gas-safety content must advise readers to use a Gas Safe registered engineer. For suspected gas leaks, advise leaving the property and calling 0800 111 999.
Return polished copy only, with concise headings where useful.`;
    } else {
      const [settings, services] = await Promise.all([
        getSiteSettings(),
        db.service.findMany({
          where: { active: true },
          select: { name: true, description: true },
          take: 20,
        }).catch(() => []),
      ]);
      instructions = `You are the website assistant for ${settings.companyName}, a UK Gas Safe registered gas, heating and plumbing business (registration ${settings.gasSafeNumber}).
Available services: ${services.map((service) => `${service.name}: ${service.description}`).join(' | ')}.
Service area: ${settings.serviceArea}. Phone: ${settings.phone}. Email: ${settings.email}.
Help customers choose a service, understand the booking process and prepare a quote request. Keep answers brief and friendly.
Do not diagnose faults remotely, promise prices, claim a booking is confirmed, or provide instructions for gas work.
If gas or carbon monoxide may be leaking, tell the customer to leave the property, avoid switches/flames and call the National Gas Emergency Service on 0800 111 999.
For uncertain or safety-critical issues, direct the customer to call TRIDS or book an assessment.`;
    }

    const response = await fetch(
      openAiKey
        ? 'https://api.openai.com/v1/chat/completions'
        : 'https://ai-gateway.vercel.sh/v1/chat/completions',
      {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: openAiKey
          ? process.env.OPENAI_MODEL || 'gpt-4o-mini'
          : process.env.AI_GATEWAY_MODEL || 'openai/gpt-4o-mini',
        temperature: mode === 'admin' ? 0.6 : 0.25,
        max_tokens: mode === 'admin' ? 1200 : 350,
        messages: [{ role: 'system', content: instructions }, ...rawMessages],
      }),
      signal: AbortSignal.timeout(25_000),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI request failed:', response.status, data?.error?.type);
      return NextResponse.json({ error: 'The AI assistant is temporarily unavailable.' }, { status: 502 });
    }

    const reply = cleanText(data?.choices?.[0]?.message?.content, mode === 'admin' ? 12_000 : 3000);
    if (!reply) {
      return NextResponse.json({ error: 'The AI assistant returned no response.' }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('AI assistant error:', error);
    return NextResponse.json({ error: 'The AI assistant is temporarily unavailable.' }, { status: 500 });
  }
}
