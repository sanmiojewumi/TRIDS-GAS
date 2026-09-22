import React from 'react';

export const metadata = {
  title: 'Cookie Policy | TRIDS Gas & Plumbing',
};

export default function CookiesPage() {
  return (
    <div className="py-12 lg:py-20 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-slate-300 text-sm leading-relaxed">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          COOKIE POLICY
        </h1>
        <p className="text-xs text-slate-400 font-mono">Last updated: August 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you browse our website to ensure basic navigation, form state, and session security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-heading">2. Essential Cookies We Use</h2>
          <p>
            We use essential session cookies for secure admin authentication and storing quote form submission preferences. These cookies do not track personal activity across third-party websites.
          </p>
        </section>
      </div>
    </div>
  );
}
