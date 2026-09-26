'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ShieldCheck, PhoneCall, ArrowRight, MessageSquare } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  phone?: string;
  gasSafeNumber?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = [],
  phone = '07311038572',
  gasSafeNumber = '979661',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultFaqs: FAQItem[] = [
    {
      question: 'How do I verify that TRIDS Gas & Plumbing is Gas Safe registered?',
      answer:
        'TRIDS Gas & Plumbing operates under official Gas Safe Register License No. 979661. You can verify our license anytime on the official UK Gas Safe Register website (www.gassaferegister.co.uk) or inspect our physical Gas Safe ID card upon arrival.',
      category: 'GAS SAFETY',
    },
    {
      question: 'Which areas in Cheshire, Manchester, and Staffordshire do you cover?',
      answer:
        'Our primary service hub is Crewe, and we cover Winsford, Sandbach, Nantwich, Congleton, All Cheshire, Warrington, Stockport, Greater Manchester, Stoke-on-Trent, and all locations within a 50-mile radius.',
      category: 'COVERAGE',
    },
    {
      question: 'How often should I get my combi or system boiler serviced?',
      answer:
        'An annual boiler service is recommended every 12 months. Regular annual servicing is mandatory to keep your manufacturer warranty valid (Worcester Bosch, Vaillant, Ideal), ensures peak fuel efficiency, and prevents dangerous carbon monoxide leaks.',
      category: 'BOILERS',
    },
    {
      question: 'What is included in a Landlord Gas Safety Check (CP12)?',
      answer:
        'A Landlord Gas Safety inspection includes testing gas tightness on supply pipework, flue gas combustion analysis, safety device inspection on all gas appliances (boilers, hobs, fires), and issuing an official digital CP12 certificate for tenant records.',
      category: 'LANDLORDS',
    },
    {
      question: 'Do you offer emergency callout services for gas leaks or heating breakdowns?',
      answer:
        'Yes! We provide rapid local response for urgent gas emergencies, sudden boiler fault codes, complete loss of hot water, and pipe leaks. Call our direct engineer line immediately on 07311038572.',
      category: 'EMERGENCY',
    },
    {
      question: 'How long does a new high-efficiency boiler installation take?',
      answer:
        'A straightforward combi-to-combi replacement is usually completed in just 1 day. System-to-combi conversions or unvented cylinder upgrades typically take 1 to 2 days, including full system chemical flush, magnetic filter installation, and Benchmark sign-off.',
      category: 'INSTALLATION',
    },
    {
      question: 'How do enquiries and booking confirmations work?',
      answer:
        'When you submit a quote request or book an online slot on our website, all details are instantly dispatched to our official email (tridsgasandplumbing@gmail.com) and logged in our database. Our engineer will contact you promptly to confirm.',
      category: 'BOOKINGS',
    },
  ];
  const displayedFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-[#0A1228] border-t border-[#1E3A8A] relative overflow-hidden">
      {/* Tri-color Ambient Mesh Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F1C3F] border border-amber-500/40 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5 text-yellow-400" /> Got Questions? We Have Answers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Everything you need to know about our Gas Safe engineering services, boiler installations, landlord CP12 certificates, and emergency callouts.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="glass-card rounded-2xl border border-[#1E3A8A] overflow-hidden transition-all duration-200 hover:border-amber-400/50 bg-[#0F1C3F]/80 shadow-lg"
              >
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#070D1E] border border-[#1E3A8A] flex items-center justify-center text-yellow-400 text-xs font-mono font-bold shrink-0">
                      Q{index + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white font-heading leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-[#070D1E] border border-[#1E3A8A] flex items-center justify-center text-amber-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-amber-500 text-slate-950 border-amber-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-[#1E3A8A]/50 animate-in fade-in duration-200">
                    <p
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className="text-slate-300 text-sm sm:text-base leading-relaxed sm:pl-11 pt-4"
                    >
                      {faq.answer}
                    </p>
                    <div className="mt-4 flex flex-col items-start gap-3 text-xs font-mono sm:flex-row sm:items-center sm:gap-4 sm:pl-11">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                        Gas Safe Registered ({gasSafeNumber})
                      </span>
                      <Link href="/contact" className="text-amber-400 hover:underline flex items-center gap-1">
                        Have more questions? Contact Us <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="mt-12 p-6 rounded-3xl bg-[#070D1E] border border-[#1E3A8A] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex w-full flex-col items-stretch gap-3 min-[420px]:w-auto min-[420px]:flex-row min-[420px]:items-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-yellow-400 flex items-center justify-center font-bold shrink-0">
              <MessageSquare className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Still have questions?</h4>
              <p className="text-xs text-slate-300">Speak directly with our Gas Safe registered lead engineer.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone}`}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold shadow-glow-gold flex items-center gap-2 font-mono"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{phone}</span>
            </a>

            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-[#0F1C3F] hover:bg-[#142552] text-slate-200 text-xs font-bold border border-[#1E3A8A]"
            >
              Contact Form
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
