export const WHATSAPP_NUMBER = '919026463875';
export const WHATSAPP_DISPLAY = '+91 90264 63875';

export type InsurancePlanId =
  | 'Health Insurance'
  | 'Term Life Insurance'
  | 'Car & Bike Insurance'
  | 'Business Insurance';

export interface InsurancePlan {
  id: InsurancePlanId;
  index: string;
  title: string;
  description: string;
  highlights: string;
  whatsappMessage: string;
  accentVariant: 'green' | 'navy';
}

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'Health Insurance',
    index: '01',
    title: 'Health Insurance',
    description:
      'Individual and family health plans with cashless hospital support and clear claim guidance.',
    highlights: 'Cashless Network · Family Floater · Renewal Help',
    whatsappMessage:
      'Hello Insurance Hub, I would like details on Health Insurance.',
    accentVariant: 'green',
  },
  {
    id: 'Term Life Insurance',
    index: '02',
    title: 'Term Life Insurance',
    description:
      'Long-term financial protection for your family with straightforward coverage at affordable premiums.',
    highlights: 'High Sum Assured · Flexible Tenure · Rider Options',
    whatsappMessage:
      'Hello Insurance Hub, I would like details on Term Life Insurance.',
    accentVariant: 'navy',
  },
  {
    id: 'Car & Bike Insurance',
    index: '03',
    title: 'Car & Bike Insurance',
    description:
      'Quick policy issuance, renewals, and practical add-on cover for cars and two-wheelers.',
    highlights: 'Zero Depreciation · Instant Policy · Claim Support',
    whatsappMessage:
      'Hello Insurance Hub, I need a quote for Car & Bike Insurance.',
    accentVariant: 'green',
  },
  {
    id: 'Business Insurance',
    index: '04',
    title: 'Business Insurance',
    description:
      'Tailored protection for shops, offices, commercial assets, transit goods, and teams.',
    highlights: 'Property & Stock · Group Health · Liability Cover',
    whatsappMessage:
      'Hello Insurance Hub, I would like details on Business Insurance.',
    accentVariant: 'navy',
  },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildForwardWhatsAppUrl(currentHref?: string): string {
  const pageUrl =
    currentHref && currentHref.startsWith('http')
      ? currentHref
      : `https://wa.me/${WHATSAPP_NUMBER}`;
  const text =
    `Insurance Hub — Secure Tomorrow. Care Today.\n` +
    `Get insurance quotes on WhatsApp (${WHATSAPP_DISPLAY}):\n` +
    `${pageUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildQuoteMessage(
  name: string,
  plan: InsurancePlanId,
  city: string
): string {
  const cleanName = name.trim();
  const cleanCity = city.trim() || 'Not specified';
  return (
    `Hello Insurance Hub! Quote Request:\n` +
    `Name: ${cleanName}\n` +
    `Plan: ${plan}\n` +
    `City: ${cleanCity}`
  );
}

export function openExternalLink(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
