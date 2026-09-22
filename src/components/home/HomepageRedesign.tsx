'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  Gauge,
  HardHat,
  Phone,
  Quote,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  ThermometerSun,
  Timer,
  Wrench,
} from 'lucide-react';
import type { SiteSettingsData } from '@/lib/settings';

export interface HomepageService {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
}

export interface HomepageReview {
  id: string;
  customerName: string;
  review: string;
  rating: number;
  service: string;
  location?: string | null;
  date: string;
}

interface HomepageRedesignProps {
  settings: SiteSettingsData;
  services: HomepageService[];
  reviews: HomepageReview[];
}

const serviceOrder = [
  'boiler-repairs',
  'boiler-servicing',
  'boiler-installation',
  'gas-safety-checks',
  'central-heating-services',
  'general-plumbing',
];

const serviceMeta = {
  'boiler-repairs': { icon: Wrench, accent: 'bg-rose-50 text-rose-600' },
  'boiler-servicing': { icon: Gauge, accent: 'bg-amber-50 text-amber-600' },
  'boiler-installation': { icon: Flame, accent: 'bg-orange-50 text-orange-600' },
  'gas-safety-checks': { icon: ShieldCheck, accent: 'bg-emerald-50 text-emerald-600' },
  'central-heating-services': { icon: ThermometerSun, accent: 'bg-blue-50 text-blue-600' },
  'general-plumbing': { icon: Wrench, accent: 'bg-cyan-50 text-cyan-600' },
} as const;

const shortServiceDescriptions: Record<string, string> = {
  'boiler-repairs': 'Diagnosis and repair for boiler faults, lockouts and loss of heat.',
  'boiler-servicing': 'Annual safety and efficiency checks for reliable performance.',
  'boiler-installation': 'Professionally specified and commissioned replacement boilers.',
  'gas-safety-checks': 'Gas appliance, flue and pipework checks carried out safely.',
  'central-heating-services': 'Heating controls, radiators and system performance support.',
  'general-plumbing': 'Dependable help with leaks, taps, toilets and everyday plumbing.',
};

function EnergyRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!railRef.current) return;
      const rect = railRef.current.getBoundingClientRect();
      const viewportAnchor = window.innerHeight * 0.72;
      const travelled = viewportAnchor - rect.top;
      setProgress(Math.max(0, Math.min(1, travelled / rect.height)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const stages = ['Gas', 'Boiler', 'Heating', 'Comfort'];

  return (
    <div
      ref={railRef}
      className="pointer-events-none absolute bottom-[8%] left-3 top-[9%] z-20 hidden w-20 lg:block"
      aria-hidden="true"
    >
      <div className="absolute bottom-0 left-3 top-0 w-px bg-slate-200" />
      <div
        className="absolute left-[10px] top-0 w-[5px] origin-top rounded-full bg-gradient-to-b from-rose-500 via-amber-400 to-blue-500 shadow-[0_0_18px_rgba(245,158,11,.45)]"
        style={{ height: `${progress * 100}%` }}
      />
      {stages.map((stage, index) => (
        <div
          key={stage}
          className="absolute left-0 flex items-center gap-3"
          style={{ top: `${index * 33.333}%` }}
        >
          <span
            className={`h-6 w-6 rounded-full border-4 border-white shadow-md transition-colors duration-500 ${
              progress + 0.02 >= index / 3 ? 'bg-amber-400' : 'bg-slate-200'
            }`}
          />
          <span className="-rotate-90 origin-left translate-y-6 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            {stage}
          </span>
        </div>
      ))}
    </div>
  );
}

export const HomepageRedesign: React.FC<HomepageRedesignProps> = ({
  settings,
  services,
  reviews,
}) => {
  const orderedServices = useMemo(
    () =>
      [...services]
        .sort(
          (a, b) =>
            serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug),
        )
        .slice(0, 6),
    [services],
  );

  const quickServices = orderedServices.length > 0 ? orderedServices : services.slice(0, 6);
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
      : null;

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Gas Safe Registered',
      text: `Registered gas engineering, number ${settings.gasSafeNumber}.`,
    },
    {
      icon: Timer,
      title: 'Responsive Service',
      text: 'Straightforward support for planned work and urgent problems.',
    },
    {
      icon: HardHat,
      title: 'Professional Workmanship',
      text: 'Work carried out safely, cleanly and with attention to detail.',
    },
    {
      icon: CheckCircle2,
      title: 'Clear & Reliable',
      text: 'Practical advice and clear communication from enquiry to completion.',
    },
  ];

  const process = [
    {
      icon: Phone,
      number: '01',
      title: 'Get in touch',
      text: 'Call, message or book a service.',
    },
    {
      icon: SearchCheck,
      number: '02',
      title: 'We assess',
      text: 'A qualified engineer identifies the problem and explains the required work.',
    },
    {
      icon: Wrench,
      number: '03',
      title: 'We fix it',
      text: 'Professional work carried out safely and efficiently.',
    },
  ];

  return (
    <div className="home-redesign bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#07101f]">
        <div className="absolute inset-0 bg-home-technical-grid opacity-60" aria-hidden="true" />
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-rose-600/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-blue-600/25 blur-3xl" aria-hidden="true" />

        <svg
          className="hero-energy-path absolute inset-x-0 bottom-0 h-24 w-full opacity-70"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-flow-gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop stopColor="#ef4444" />
              <stop offset=".48" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            d="M-20 82 C190 10 315 112 505 54 C690 0 820 112 1010 56 C1170 8 1300 60 1460 20"
            stroke="url(#hero-flow-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[690px] lg:grid-cols-[1.04fr_.96fr] lg:px-8 lg:py-20">
          <div className="z-10 max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Gas Safe Registered · {settings.gasSafeNumber}
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-amber-400">
              {settings.companyName}
            </p>
            <h1 className="max-w-3xl font-heading text-[2.25rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Professional Gas & Heating Services{' '}
              <span className="text-amber-400">You Can Trust</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {settings.heroSubheading}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold tracking-wide text-slate-950 shadow-[0_14px_35px_rgba(245,158,11,.25)] transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <CalendarCheck className="h-5 w-5" />
                BOOK A SERVICE
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-extrabold tracking-wide text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="h-5 w-5" />
                CALL NOW · {settings.phone}
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-300">
              {['Gas Safe Registered', 'Professional', 'Reliable'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/20 via-transparent to-blue-500/25 blur-xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-900 p-2 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
                <Image
                  src="/images/slides/slide2.jpg"
                  alt="TRIDS gas engineer carrying out boiler combustion analysis"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/85 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                      Precision diagnostics
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">Safe. Measured. Professionally done.</p>
                  </div>
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur sm:flex">
                    <Gauge className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav
        className="relative z-20 border-b border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,.06)]"
        aria-label="Quick services"
      >
        <div className="mx-auto flex max-w-7xl snap-x gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:grid lg:grid-cols-6 lg:px-8">
          {quickServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="flex min-w-[165px] snap-start items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700 lg:min-w-0 lg:border-r lg:border-slate-200 lg:last:border-0"
            >
              <span>{service.name}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-amber-500" />
            </Link>
          ))}
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <EnergyRail />

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-28">
            <div className="max-w-2xl">
              <p className="section-kicker">Built on safe engineering</p>
              <h2 className="section-title">Why Choose Us?</h2>
              <p className="section-intro">
                Direct, professional support for your home&apos;s gas, heating and plumbing systems.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,.06)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#07101f] text-amber-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24" id="services">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-28">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="section-kicker">Gas, heating & plumbing</p>
                <h2 className="section-title">What We Do</h2>
                <p className="section-intro">
                  Practical expertise for repairs, maintenance, safety checks and new installations.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 hover:text-blue-800"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {orderedServices.map((service) => {
                const meta = serviceMeta[service.slug as keyof typeof serviceMeta];
                const Icon = meta?.icon || Wrench;
                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,.05)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_45px_rgba(15,23,42,.1)]"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${meta?.accent || 'bg-slate-100 text-slate-700'}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold text-slate-900">{service.name}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                      {shortServiceDescriptions[service.slug] || service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#07101f] py-16 text-white sm:py-24">
          <div className="absolute inset-0 bg-home-technical-grid opacity-30" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker text-amber-400">A clear customer journey</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Getting Your Problem Solved Is Simple
              </h2>
            </div>

            <div className="relative mt-12 grid gap-8 md:grid-cols-3">
              <div className="process-flow-line absolute left-[16.66%] right-[16.66%] top-9 hidden h-px md:block" aria-hidden="true" />
              {process.map(({ icon: Icon, number, title, text }) => (
                <article key={number} className="relative text-center">
                  <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/15 bg-[#0d1b31] text-amber-400 shadow-xl">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-5 text-xs font-extrabold tracking-[0.2em] text-amber-400">{number}</p>
                  <h3 className="mt-2 text-xl font-extrabold uppercase tracking-wide">{title}</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-300">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f9fc] py-16 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-28">
            <div className="relative min-h-[380px] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-[0_25px_60px_rgba(15,23,42,.16)] sm:min-h-[520px]">
              <Image
                src="/images/slides/slide1.jpg"
                alt="TRIDS boiler installation with professional copper pipework"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101f]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-xl border border-white/20 bg-[#07101f]/85 px-4 py-3 text-white backdrop-blur">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <Flame className="h-4 w-4 text-amber-400" />
                  Boiler & heating expertise
                </span>
              </div>
            </div>

            <div>
              <p className="section-kicker">Boiler services</p>
              <h2 className="section-title">Boiler Problems? We&apos;ve Got You Covered.</h2>
              <p className="section-intro">
                From annual servicing and fault finding to repairs, maintenance and complete
                boiler installation, TRIDS provides safe and professional support.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {['Repairs', 'Servicing', 'Installation', 'Fault finding', 'Maintenance'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href="/book?service=Boiler+Servicing"
                className="mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#07101f] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-900"
              >
                <CalendarCheck className="h-5 w-5 text-amber-400" />
                BOOK BOILER SERVICE
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-10">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-28">
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-9 w-9 shrink-0 text-emerald-600" />
              <div>
                <p className="text-sm font-extrabold text-slate-900">Gas Safe Registered</p>
                <p className="text-xs text-slate-500">Registration {settings.gasSafeNumber}</p>
              </div>
            </div>
            {settings.engineerQualifications
              .split('•')
              .filter((qualification) => !qualification.toLowerCase().includes('gas safe'))
              .slice(0, 2)
              .map((qualification) => (
                <div key={qualification} className="flex items-center gap-4">
                  <ClipboardCheck className="h-9 w-9 shrink-0 text-blue-700" />
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">{qualification.trim()}</p>
                    <p className="text-xs text-slate-500">Existing TRIDS qualification</p>
                  </div>
                </div>
              ))}
            <div className="flex items-center gap-4">
              <Star className="h-9 w-9 shrink-0 fill-amber-400 text-amber-400" />
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  {averageRating ? `${averageRating} customer rating` : 'Customer feedback'}
                </p>
                <p className="text-xs text-slate-500">
                  {reviews.length > 0 ? `${reviews.length} published reviews shown` : 'Published reviews'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-28">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="section-kicker">Customer feedback</p>
                <h2 className="section-title">What Our Customers Say</h2>
              </div>
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 hover:text-blue-800"
              >
                View all reviews <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {reviews.length > 0 ? (
              <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
                {reviews.slice(0, 3).map((review) => (
                  <article
                    key={review.id}
                    className="min-w-[86%] snap-center rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:min-w-[48%] lg:min-w-0"
                  >
                    <Quote className="h-8 w-8 text-amber-400" />
                    <div className="mt-4 flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: Math.min(5, review.rating) }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <blockquote className="mt-5 text-base leading-7 text-slate-700">
                      “{review.review}”
                    </blockquote>
                    <div className="mt-6 border-t border-slate-200 pt-4">
                      <p className="font-extrabold text-slate-900">{review.customerName}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        {review.service}
                        {review.location ? ` · ${review.location}` : ''}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-600">
                Published customer reviews will appear here.
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-[#07101f] py-16 text-white sm:py-20">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
          <Sparkles className="h-7 w-7 text-amber-400" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Need a Gas Engineer?</h2>
          <p className="mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">
            Get professional help with your boiler, heating, gas or plumbing needs.
          </p>
          <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/book"
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
            >
              <CalendarCheck className="h-5 w-5" />
              BOOK A SERVICE
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-extrabold text-white backdrop-blur transition hover:bg-white/15"
            >
              <Phone className="h-5 w-5" />
              CALL NOW
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
