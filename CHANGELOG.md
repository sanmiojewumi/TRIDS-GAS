# TRIDS Gas & Plumbing changelog

## FAQs, availability and AI — 22 September 2026

- Moved booking times from hardcoded buttons to live database availability.
- Added a six-month visual calendar showing only future dates with open appointment slots.
- Added admin weekly hours, appointment duration and blocked-date controls.
- Added booking date, time and status editing plus booking removal.
- Booking submissions now revalidate the requested slot server-side before saving.
- Seeded editable FAQ records and connected published FAQs to the public accordion.
- Added a customer-facing TRIDS AI service and booking assistant with gas-emergency guardrails.
- Added a private admin AI writing assistant for services, FAQs, articles and website copy.
- Customer guidance works without an API key; optional Gemini free-tier or OpenAI keys enable generative responses.

## Admin content management — 22 September 2026

- Added full create, edit, publish/hide and delete controls for project case studies.
- Added service-area management, including local page copy and SEO fields.
- Added knowledge-article management for blog content, images, authors and SEO metadata.
- Added FAQ management and connected published database FAQs to the public FAQ page.
- Added editing to the existing photo/video gallery manager.
- Added protected, validated admin content APIs and automatic public-page revalidation.
- Added the new content managers to the admin sidebar.

## Security hardening — 22 September 2026

- Replaced forgeable admin cookies with HMAC-SHA256 signed, eight-hour sessions.
- Added cryptographic session validation to the Next.js proxy and database-backed validation to admin APIs.
- Removed all default credentials; admin password seeding now requires private environment variables and uses bcrypt with 12 rounds.
- Added rate limits to login, booking, enquiry and review endpoints.
- Added strict input validation, length limits, safe email HTML escaping and generic authentication failures.
- Booking submissions are now pending requests until availability is confirmed.
- Restricted uploads to verified JPG, PNG, WebP, GIF, MP4 and WebM content with a 25 MB limit and random filenames.
- Protected unpublished testimonials and other inactive admin content from public API responses.
- Added CSP, HSTS, anti-framing, MIME-sniffing, referrer and browser permissions headers.
- Upgraded Next.js, React, Nodemailer and PostCSS to patched releases; production dependency audit reports zero known vulnerabilities.
- Rotated the local session secret and admin password. Real secrets remain in the gitignored `.env` file.

## Homepage redesign — 22 September 2026

- Replaced the crowded 15-section homepage with a focused, mobile-first customer journey.
- New hero uses the existing TRIDS brand, phone number, Gas Safe registration and real diagnostic image.
- Added clickable quick-service navigation for the six core existing services.
- Added concise Why Choose Us, What We Do, three-step process, boiler feature, trust, reviews and final CTA sections.
- Added one signature energy-flow effect: an animated hero route plus a scroll-linked Gas → Boiler → Heating → Comfort rail on desktop.
- Added `prefers-reduced-motion` support and simplified the effect on mobile.
- Mobile sticky actions are now the two essential choices: **Call Now** and **Book a Service**.
- Simplified the site header and footer while retaining the existing contact details, service links, areas and legal links.
- Removed unverified sample testimonials from the seed and local database. The homepage now only renders genuinely published records.

## What was broken or awkward

- The header logo was sized like a billboard (`h-32` to `h-48`), so it crushed the navigation on every screen.
- Desktop nav used large white pill buttons that only appeared at the `xl` breakpoint, so most laptops only got a hamburger.
- The public header, footer, WhatsApp button and bottom nav also wrapped `/admin`, including the login page.
- Admin login advertised `admin@tridsgas.co.uk`, but the seed only created `tridsgasandplumbing@gmail.com`, so the documented login failed.
- Admin routes were not actually protected. The sidebar also hid the existing Slides and Gallery screens.
- Quote, booking and review forms looked complete, but reviews never saved, the quote “photo upload” did nothing, and the boiler estimator’s “full quote” details were ignored.
- Services, areas, reviews and blog pages were empty after a fresh install because the seed only created slides.

## What changed

### Logo and header
- Logo is now a compact header mark (`~40–48px`) and a slightly larger footer mark.
- Header is sticky. Desktop nav is normal text links from the `lg` breakpoint.
- Mobile menu closes on navigation, locks background scroll, and includes Quote, Book and Call.

### Forms and buttons
- Quote form submits to `/api/enquiries`, shows API errors, accepts a service that is not in the default list, and prefills details from the boiler estimator.
- Dead photo-upload row replaced with a WhatsApp / notes instruction that matches real behaviour.
- Booking form posts a pending request to `/api/bookings` with double-booking checks.
- “Leave a Review” now posts to `/api/reviews` and stores the review as **unpublished** for admin approval.
- Hero has a working **Get a Quote** button alongside Book and Call.

### Admin
- `/admin/*` (except login) requires a valid signed session.
- Login no longer displays or prefills credentials.
- Seed creates one administrator from the private `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.
- Sidebar links added for Homepage Slides and Media Gallery.
- Public site chrome is hidden on admin pages.

### Content seed
- 16 services (matching footer slugs), 9 service areas, 3 knowledge articles, site settings, and 4 hero slides.
- Testimonials are not seeded; genuine reviews can be submitted and approved through the admin portal.

### Honesty / UX tweaks
- Removed the unverified “140+ reviews / 5.0 star” hero claim.
- Review average is calculated from published reviews.
- Gas Safe badge no longer prints `[ENGINEER NAME]` when the name is empty.
- Empty states added for services, reviews and areas.

## How to test locally

From this folder:

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Check | Where |
| --- | --- |
| Logo size and sticky nav | Every public page, desktop and phone width |
| Menu, Book, Quote, Call, WhatsApp | Header, footer, mobile bottom bar |
| Quote submission | `/quote` or homepage quote block — then `/admin/enquiries` |
| Booking | `/book` — then `/admin/bookings` |
| Boiler enquiry | `/quote` → submit a detailed boiler or heating request |
| Review submit | Reviews page → Leave a Review — appears in `/admin/testimonials` as unpublished |
| Service pages | `/services/boiler-installation` and other footer links |
| Admin login | `/admin/login` using the private credentials in `.env` |

Email notifications only send if you later add SMTP credentials. Without them, submissions still save in the local SQLite database (`prisma/dev.db`).
