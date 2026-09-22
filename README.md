# TRIDS Gas & Plumbing Full-Stack Web Application

A premium, modern, high-converting full-stack website and admin portal built for **TRIDS Gas & Plumbing**, a professional UK gas and plumbing company operated by a Gas Safe registered engineer.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript, Server Components & Server Actions)
- **Styling**: Tailwind CSS + Custom British Engineering Design System (Deep Slate `#0F172A`, Metallic Amber/Gold `#F59E0B`, Safety Emerald `#059669`, glassmorphism, responsive micro-animations)
- **Database**: Prisma ORM with SQLite database (`prisma/dev.db`) out-of-the-box, 100% PostgreSQL ready for Supabase / Neon deployment.
- **Icons**: Lucide React
- **Authentication**: Custom secure session cookies with `bcryptjs` password hashing.

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Push Database Schema & Run Initial Seed
```bash
npx prisma db push
npx prisma db seed
```

### 3. Local environment

A `.env` file is used locally (gitignored). For a first run you only need:

```
DATABASE_URL="file:./dev.db"
SESSION_SECRET="<at-least-32-random-characters>"
ADMIN_NAME="TRIDS Administrator"
ADMIN_EMAIL="<your-private-admin-email>"
ADMIN_PASSWORD="<a-unique-password-of-at-least-16-characters>"
NODE_ENV="development"
```

Copy `.env.example` if you prefer to start from the template.

### 4. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Recent local UX and functionality fixes are listed in [CHANGELOG.md](./CHANGELOG.md). Nothing has been pushed yet.

---

## 🔐 Admin Dashboard Access

- **URL**: `http://localhost:3000/admin/login`
- Admin credentials come from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your private `.env`.
- Passwords are stored only as bcrypt hashes in the database.
- No default production credentials are included in the repository.

---

## 📋 Features Overview

1. **Homepage Flow**:
   - Gas Safe trust bar with registration verification badge.
   - High-contrast British engineering hero section with primary & secondary CTAs.
   - Interactive Gas (12) & Plumbing (12) service cards filterable by category and search term.
   - Core engineering feature cards ("Engineering You Can Rely On").
   - 4-step process timeline ("How It Works").
   - Project work gallery with interactive Before/After Lightbox toggle.
   - Verified customer reviews & review submission modal.
   - Service area coverage list & SEO landing pages.
   - Knowledge Centre blog preview.
   - UK National Gas Emergency Service (0800 111 999) safety notice.
   - Smart Quote Request & Contact forms.

2. **Smart Quote & Booking Systems**:
   - Quote workflow storing submissions in Prisma database with status pipeline tracking (`NEW` -> `CONTACTED` -> `QUOTED` -> `BOOKED` -> `COMPLETED` -> `ARCHIVED`).
   - Online appointment booking system with date picker, time slot selection, and double-booking prevention.

3. **Admin Portal (`/admin`)**:
   - Overview metrics & recent activity monitor.
   - Real-time settings manager allowing updates to business phone (`[PHONE NUMBER]`), email (`[EMAIL ADDRESS]`), Gas Safe Reg (`[GAS SAFE REGISTRATION NUMBER]`), lead engineer (`[ENGINEER NAME]`), and coverage area (`[SERVICE AREA]`).

---

## 📄 License & Compliance

Gas Safe registered trademark and UK Gas Safety (Installation and Use) Regulations compliant design.
