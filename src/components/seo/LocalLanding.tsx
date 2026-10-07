import Link from 'next/link';
import { CalendarCheck, CheckCircle2, MapPin, Phone } from 'lucide-react';
import { getSiteSettings } from '@/lib/settings';
import { breadcrumbJsonLd, pageSeo } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { localLandings, nearbyTownLinks, type LocalLandingContent, type LocalLandingSlug } from '@/lib/local-landings';

export function localLandingMetadata(slug: LocalLandingSlug) {
  const landing = localLandings[slug];
  return pageSeo(`/${slug}`, {
    title: landing.title,
    description: landing.description,
  });
}

export async function LocalLanding({ page }: { page: LocalLandingContent }) {
  const settings = await getSiteSettings();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    description: page.description,
    serviceType: page.h1,
    url: `${SITE_URL}/${page.slug}`,
    areaServed: ['Crewe', 'Nantwich', 'Sandbach', 'Middlewich', 'Winsford', 'Cheshire'],
    provider: {
      '@type': 'HVACBusiness',
      name: settings.companyName,
      telephone: settings.phone,
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Crewe',
        addressRegion: 'Cheshire',
        addressCountry: 'GB',
      },
    },
  };
  const crumbs = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: page.h1, path: `/${page.slug}` },
  ]);

  return (
    <div className="bg-slate-950 py-12 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <article className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Gas Safe {settings.gasSafeNumber} · Based in Crewe
          </p>
          <h1 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{page.h1}</h1>
          <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">{page.intro}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Link
              href={`/book?service=${encodeURIComponent(page.bookService)}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-slate-950 hover:bg-amber-300"
            >
              <CalendarCheck className="h-4 w-4" />
              Book this service
            </Link>
            <a
              href={`tel:${settings.phone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-bold text-white hover:bg-slate-700"
            >
              <Phone className="h-4 w-4 text-amber-400" />
              Call {settings.phone}
            </a>
          </div>
        </header>

        <section>
          <h2 className="font-heading text-2xl font-bold text-white">Typical work</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {page.jobs.map((job) => (
              <li
                key={job}
                className="flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {job}
              </li>
            ))}
          </ul>
        </section>

        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-2xl font-bold text-white">{section.heading}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{section.body}</p>
          </section>
        ))}

        <section>
          <h2 className="font-heading text-2xl font-bold text-white">Crewe and nearby towns</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Local pages for the towns TRIDS already covers. Each one is a real coverage area, not a copied template
            with a different town name swapped in.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearbyTownLinks.map((town) => (
              <Link
                key={town.href}
                href={town.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:border-amber-400 hover:text-amber-300"
              >
                <MapPin className="h-3 w-3" />
                {town.label}
              </Link>
            ))}
          </div>
        </section>

        {page.related.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold text-white">Related Crewe services</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {page.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
