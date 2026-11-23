import React, { useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  Car,
  Check,
  Copy,
  HeartPulse,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { BrandEmblem, WhatsAppGlyph } from './components/BrandLogo';
import {
  INSURANCE_PLANS,
  InsurancePlanId,
  WHATSAPP_DISPLAY,
  buildForwardWhatsAppUrl,
  buildQuoteMessage,
  buildWhatsAppUrl,
  openExternalLink,
} from './utils/whatsapp';

const PLAN_ICONS: Record<InsurancePlanId, React.ReactNode> = {
  'Health Insurance': <HeartPulse className="w-5 h-5" aria-hidden="true" />,
  'Term Life Insurance': <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
  'Car & Bike Insurance': <Car className="w-5 h-5" aria-hidden="true" />,
  'Business Insurance': <Building2 className="w-5 h-5" aria-hidden="true" />,
};

export default function App() {
  const [customerName, setCustomerName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlanId>('Health Insurance');
  const [customerCity, setCustomerCity] = useState('');
  const [nameError, setNameError] = useState('');
  const [submittedQuote, setSubmittedQuote] = useState<{
    message: string;
    url: string;
  } | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleSelectPlanForQuote = (planId: InsurancePlanId) => {
    setSelectedPlan(planId);
    setSubmittedQuote(null);
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      document.getElementById('customerName')?.focus();
    }, 350);
  };

  const handleForwardOnWhatsApp = () => {
    const shareUrl = buildForwardWhatsAppUrl(window.location.href);
    openExternalLink(shareUrl);
    if (navigator.clipboard && window.location.href.startsWith('http')) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setCopiedShareLink(true);
          window.setTimeout(() => setCopiedShareLink(false), 2500);
        })
        .catch(() => {});
    }
  };

  const handleQuoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = customerName.trim();
    if (!trimmedName) {
      setNameError('Please enter your name to prepare your WhatsApp quote request.');
      return;
    }

    setNameError('');
    const message = buildQuoteMessage(trimmedName, selectedPlan, customerCity);
    const url = buildWhatsAppUrl(message);
    setSubmittedQuote({ message, url });
    setCopiedMessage(false);
    openExternalLink(url);
  };

  const handleCopyPreparedMessage = () => {
    if (!submittedQuote || !navigator.clipboard) return;
    navigator.clipboard
      .writeText(submittedQuote.message)
      .then(() => {
        setCopiedMessage(true);
        window.setTimeout(() => setCopiedMessage(false), 2500);
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Top Bar (3-zone contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Lockup */}
          <a
            href="#top"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002B5B] rounded-md"
          >
            <BrandEmblem className="w-8 h-9 shrink-0" />
            <span className="font-display text-base sm:text-lg font-extrabold tracking-tight">
              <span className="text-[#002B5B]">INSURANCE</span>{' '}
              <span className="text-[#00966B]">HUB</span>
            </span>
          </a>

          {/* Zone 2: Clean Single-line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#plans"
              className="hover:text-[#002B5B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002B5B] rounded-sm"
            >
              Plans
            </a>
            <a
              href="#process"
              className="hover:text-[#002B5B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002B5B] rounded-sm"
            >
              How It Works
            </a>
            <a
              href="#quote"
              className="hover:text-[#002B5B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002B5B] rounded-sm"
            >
              Request Quote
            </a>
            <a
              href="#contact"
              className="hover:text-[#002B5B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002B5B] rounded-sm"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href={buildWhatsAppUrl(
                'Hello Insurance Hub, I would like to chat regarding insurance.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002B5B]"
            >
              <WhatsAppGlyph className="w-4 h-4 fill-current shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-slate-100/70 border-b border-slate-200/80 py-12 sm:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                <p className="text-xs sm:text-sm font-semibold text-[#00966B] tracking-normal mb-4">
                  Direct WhatsApp Desk · {WHATSAPP_DISPLAY} · Secure Tomorrow. Care Today.
                </p>

                <h1
                  className="font-display font-extrabold text-[#002B5B] tracking-tight leading-[1.12] max-w-2xl mx-auto lg:mx-0"
                  style={{
                    fontSize: 'clamp(2.125rem, 4vw, 3.35rem)',
                    textWrap: 'balance',
                  }}
                >
                  Simple, Trusted Insurance —{' '}
                  <span className="text-[#00966B]">Right on WhatsApp</span>
                </h1>

                <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Get clear guidance, tailored quotes, and responsive policy support for
                  Health, Term Life, Car &amp; Bike, and Business insurance directly on
                  WhatsApp.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <a
                    href={buildWhatsAppUrl(
                      'Hello Insurance Hub, I would like an insurance quote.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002B5B]"
                  >
                    <WhatsAppGlyph className="w-5 h-5 fill-current shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleForwardOnWhatsApp}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-[#002B5B] font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002B5B]"
                  >
                    {copiedShareLink ? (
                      <Check className="w-4 h-4 text-[#00966B]" aria-hidden="true" />
                    ) : (
                      <Share2 className="w-4 h-4 text-[#00966B]" aria-hidden="true" />
                    )}
                    <span>
                      {copiedShareLink ? 'Opening Share & Link Copied' : 'Forward on WhatsApp'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Official Brand Showcase Card */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="w-full max-w-sm bg-white rounded-3xl p-8 border border-slate-200/90 text-center">
                  <BrandEmblem
                    className="w-24 h-28 mx-auto"
                    label="Insurance Hub Official Emblem"
                  />
                  <div className="mt-4 font-display text-2xl font-extrabold tracking-tight">
                    <span className="text-[#002B5B]">INSURANCE</span>{' '}
                    <span className="text-[#00966B]">HUB</span>
                  </div>
                  <p className="text-xs font-semibold text-[#002B5B] mt-1.5">
                    Secure Tomorrow. Care Today.
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <p>
                      Direct Desk:{' '}
                      <strong className="text-[#002B5B] font-bold tabular-nums">
                        {WHATSAPP_DISPLAY}
                      </strong>
                    </p>
                    <p className="text-slate-500">
                      Health · Term Life · Motor · Business
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Plans Grid */}
        <section id="plans" className="py-14 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold text-[#00966B] mb-1.5">
                Coverage Portfolio
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-extrabold text-[#002B5B] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Choose a Plan to Ask on WhatsApp
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Message our desk directly for a specific policy or pre-fill the quote form below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INSURANCE_PLANS.map((plan) => {
                const isGreen = plan.accentVariant === 'green';
                return (
                  <article
                    key={plan.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between transition-colors hover:border-slate-300"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span
                          className={`inline-flex w-10 h-10 rounded-xl items-center justify-center ${
                            isGreen
                              ? 'bg-emerald-50 text-[#00966B]'
                              : 'bg-slate-100 text-[#002B5B]'
                          }`}
                        >
                          {PLAN_ICONS[plan.id]}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 tabular-nums">
                          {plan.index}.
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-[#002B5B]">
                        {plan.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {plan.description}
                      </p>
                      <p className="mt-3 text-xs font-medium text-slate-500">
                        {plan.highlights}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
                      <a
                        href={buildWhatsAppUrl(plan.whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs text-center inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002B5B] ${
                          isGreen
                            ? 'bg-emerald-50 hover:bg-[#25D366] text-[#007A57] hover:text-white'
                            : 'bg-slate-100 hover:bg-[#002B5B] text-[#002B5B] hover:text-white'
                        }`}
                      >
                        <span>Ask on WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleSelectPlanForQuote(plan.id)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#002B5B] hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002B5B]"
                      >
                        Pre-fill Quote Form
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Simple 3-Step Direct Desk Process */}
        <section id="process" className="py-12 bg-white border-t border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-bold text-[#00966B] tabular-nums">01.</p>
                <h3 className="mt-1 font-display text-base font-bold text-[#002B5B]">
                  Pick Your Coverage Type
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  Select Health, Term Life, Car &amp; Bike, or Business insurance based on your
                  requirement.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#00966B] tabular-nums">02.</p>
                <h3 className="mt-1 font-display text-base font-bold text-[#002B5B]">
                  Send Details on WhatsApp
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  Your message opens ready to send directly to our WhatsApp desk at{' '}
                  <span className="font-semibold text-[#002B5B] tabular-nums">
                    {WHATSAPP_DISPLAY}
                  </span>
                  .
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-[#00966B] tabular-nums">03.</p>
                <h3 className="mt-1 font-display text-base font-bold text-[#002B5B]">
                  Review Options &amp; Policy Support
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  Receive side-by-side plan explanations, quick renewal help, and claim
                  assistance in one chat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Request Form */}
        <section id="quote" className="py-14 sm:py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90">
              <div className="text-center">
                <h2
                  className="font-display text-xl sm:text-2xl font-extrabold text-[#002B5B] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Request a Quote on WhatsApp
                </h2>
                <p className="text-sm text-slate-600 mt-1.5">
                  Enter your details to open WhatsApp directly with your message ready.
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} noValidate className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-xs font-bold text-[#002B5B] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="customerName"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (nameError) setNameError('');
                    }}
                    placeholder="Enter your name"
                    aria-invalid={Boolean(nameError)}
                    className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00966B] ${
                      nameError ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                  {nameError && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                      {nameError}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="planSelect"
                    className="block text-xs font-bold text-[#002B5B] mb-1.5"
                  >
                    Insurance Plan
                  </label>
                  <select
                    id="planSelect"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as InsurancePlanId)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00966B]"
                  >
                    {INSURANCE_PLANS.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="customerCity"
                    className="block text-xs font-bold text-[#002B5B] mb-1.5"
                  >
                    City
                  </label>
                  <input
                    id="customerCity"
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00966B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002B5B]"
                >
                  <WhatsAppGlyph className="w-4 h-4 fill-current shrink-0" />
                  <span>Send on WhatsApp ({WHATSAPP_DISPLAY})</span>
                </button>
              </form>

              {submittedQuote && (
                <div
                  role="status"
                  className="mt-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left"
                >
                  <p className="text-xs font-bold text-[#007A57]">
                    Quote message prepared for Insurance Hub
                  </p>
                  <pre className="mt-2 text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {submittedQuote.message}
                  </pre>
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <a
                      href={submittedQuote.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      <WhatsAppGlyph className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyPreparedMessage}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-[#002B5B] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedMessage ? (
                        <Check className="w-3.5 h-3.5 text-[#00966B]" aria-hidden="true" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                      )}
                      <span>{copiedMessage ? 'Copied' : 'Copy Message'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <BrandEmblem className="w-8 h-9 shrink-0" label="Insurance Hub Footer Logo" />
            <div>
              <div className="font-display text-sm font-extrabold tracking-tight">
                <span>INSURANCE</span> <span className="text-[#25D366]">HUB</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Secure Tomorrow. Care Today. ·{' '}
                <span className="tabular-nums">{WHATSAPP_DISPLAY}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-slate-400">
            <button
              type="button"
              onClick={handleForwardOnWhatsApp}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Forward Page
            </button>
            <span aria-hidden="true">·</span>
            <p>© {currentYear} Insurance Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={buildWhatsAppUrl('Hello Insurance Hub, I need help with insurance.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Insurance Hub"
        className="fixed bottom-5 right-5 z-50 w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002B5B]"
      >
        <WhatsAppGlyph className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
}
