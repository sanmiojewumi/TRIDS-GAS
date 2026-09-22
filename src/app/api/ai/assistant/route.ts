import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getSiteSettings } from '@/lib/settings';
import { checkRateLimit, cleanText } from '@/lib/security';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function guidedReply(message: string, phone: string, mode: 'admin' | 'customer'): string {
  const text = message.toLowerCase();

  if (mode === 'admin') {
    return `Free guided draft outline

1. Clear headline describing the customer benefit
2. Short introduction explaining the problem or service
3. What TRIDS Gas & Plumbing can assess or provide
4. Gas Safe and safety information where relevant
5. Service-area details
6. Call to action: book online or call ${phone}

Brief to develop:
${message}

For original generative copy, add a free Gemini API key in Vercel. Review all facts and safety claims before publishing.`;
  }

  if (/(smell gas|gas leak|carbon monoxide|co alarm)/.test(text)) {
    return 'Leave the property, avoid electrical switches and naked flames, and call the National Gas Emergency Service immediately on 0800 111 999. Once the emergency service says it is safe, contact TRIDS for assessment or repair.';
  }
  if (/(book|appointment|available|calendar|time slot)/.test(text)) {
    return 'Use the Book a Service page to choose a live available date and time. Your request remains pending until TRIDS confirms it by phone or email.';
  }
  if (/(boiler service|servicing|annual service)/.test(text)) {
    return 'TRIDS provides annual boiler servicing and safety checks. Use Book a Service to choose an available time, or call ' + phone + ' if you need advice first.';
  }
  if (/(repair|fault|no heating|no hot water|error code)/.test(text)) {
    return 'Choose Boiler Repair & Diagnostics when booking. Include the boiler make, fault code and symptoms in the notes. For anything safety-critical, stop using the appliance and call ' + phone + '.';
  }
  if (/(install|replacement|new boiler)/.test(text)) {
    return 'Book a Boiler Installation Survey so TRIDS can assess the property, system and suitable options before providing a quotation.';
  }
  if (/(landlord|cp12|gas safety certificate)/.test(text)) {
    return 'TRIDS provides landlord gas safety inspections and CP12 records. Select Gas Safety Inspection & CP12 on the booking page.';
  }
  if (/(plumb|leak|tap|toilet|radiator)/.test(text)) {
    return 'TRIDS covers general plumbing, leaks, radiators, valves and related heating work. Submit a quote request with photos or details, or call ' + phone + ' for an urgent issue.';
  }
  if (/(price|cost|quote|how much)/.test(text)) {
    return 'Prices depend on the appliance, fault and work required. Submit a quote request with as much detail as possible so TRIDS can assess it accurately.';
  }
  if (/(area|cover|location|postcode)/.test(text)) {
    return 'TRIDS is based in Crewe and covers Cheshire, Warrington, Stockport, Greater Manchester, Stoke-on-Trent and locations within roughly a 50-mile radius.';
  }
  return `I can guide you on boiler servicing, repairs, installations, CP12 checks, plumbing and online booking. For a specific assessment, submit a quote request or call ${phone}.`;
}

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
    const geminiKey = process.env.GEMINI_API_KEY;

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
    let phone = '07311038572';
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
      phone = settings.phone;
      instructions = `You are the website assistant for ${settings.companyName}, a UK Gas Safe registered gas, heating and plumbing business (registration ${settings.gasSafeNumber}).
Available services: ${services.map((service) => `${service.name}: ${service.description}`).join(' | ')}.
Service area: ${settings.serviceArea}. Phone: ${settings.phone}. Email: ${settings.email}.
Help customers choose a service, understand the booking process and prepare a quote request. Keep answers brief and friendly.
Do not diagnose faults remotely, promise prices, claim a booking is confirmed, or provide instructions for gas work.
If gas or carbon monoxide may be leaking, tell the customer to leave the property, avoid switches/flames and call the National Gas Emergency Service on 0800 111 999.
For uncertain or safety-critical issues, direct the customer to call TRIDS or book an assessment.`;
    }

    const lastMessage = rawMessages.filter((message) => message.role === 'user').at(-1)?.content || '';
    if (!openAiKey && !geminiKey) {
      return NextResponse.json({ reply: guidedReply(lastMessage, phone, mode), provider: 'guided' });
    }

    try {
      if (geminiKey && !openAiKey) {
        const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiKey)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: instructions }] },
              contents: rawMessages.map((message) => ({
                role: message.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: message.content }],
              })),
              generationConfig: {
                temperature: mode === 'admin' ? 0.6 : 0.25,
                maxOutputTokens: mode === 'admin' ? 1200 : 350,
              },
            }),
            signal: AbortSignal.timeout(25_000),
          },
        );
        const data = await response.json();
        const reply = cleanText(
          data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join(''),
          mode === 'admin' ? 12_000 : 3000,
        );
        if (response.ok && reply) return NextResponse.json({ reply, provider: 'gemini' });
        console.error('Gemini request failed:', response.status, data?.error?.status);
      } else if (openAiKey) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openAiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
            temperature: mode === 'admin' ? 0.6 : 0.25,
            max_tokens: mode === 'admin' ? 1200 : 350,
            messages: [{ role: 'system', content: instructions }, ...rawMessages],
          }),
          signal: AbortSignal.timeout(25_000),
        });
        const data = await response.json();
        const reply = cleanText(data?.choices?.[0]?.message?.content, mode === 'admin' ? 12_000 : 3000);
        if (response.ok && reply) return NextResponse.json({ reply, provider: 'openai' });
        console.error('OpenAI request failed:', response.status, data?.error?.type);
      }
    } catch (providerError) {
      console.error('Generative AI request failed:', providerError);
    }

    return NextResponse.json({
      reply: guidedReply(lastMessage, phone, mode),
      provider: 'guided-fallback',
    });
  } catch (error) {
    console.error('AI assistant error:', error);
    return NextResponse.json({ error: 'The AI assistant is temporarily unavailable.' }, { status: 500 });
  }
}
