import type { Lang } from '../i18n/ui';

export interface Profile {
  name: string; location: string; headline: string; headline2: string; role: string; pitch: string; current: string; currentOrg: string; currentRole: string;
}

export const profile: Record<Lang, Profile> = {
  en: {
    name: 'Simon Zwenger',
    location: 'Wiesbaden',
    headline: 'SOFTWARE',
    headline2: '& PRODUCT',
    role: 'Junior software developer, product management & AI.',
    pitch: 'I build **software and automations** that fix real user problems, and bring **five years of product experience** from C24 Bank.',
    current: 'Currently working student in product management at C24 Bank.',
    currentOrg: 'C24 Bank',
    currentRole: 'Working student, product management',
  },
  de: {
    name: 'Simon Zwenger',
    location: 'Wiesbaden',
    headline: 'SOFTWARE',
    headline2: '& PRODUKT',
    role: 'Junior-Softwareentwickler, Produktmanagement & KI.',
    pitch: 'Ich baue **Software und Automatisierungen**, die echte Nutzerprobleme lösen, und bringe **fünf Jahre Produkterfahrung** von der C24 Bank mit.',
    current: 'Aktuell Werkstudent im Produktmanagement bei der C24 Bank.',
    currentOrg: 'C24 Bank',
    currentRole: 'Werkstudent Produktmanagement',
  },
};

export const SENTINEL = 'TODO-ASK-SIMON';
// If either is set back to SENTINEL, the site hides it locally and the CI (deploy) build fails.
// request@zwenger.dev: Cloudflare Email Routing forward (receiving only).
export const links = {
  email: 'request@zwenger.dev' as string,
  linkedin: 'https://www.linkedin.com/in/simon-zwenger-a8a358351/' as string,
  github: 'https://github.com/szwenger',
};
if (process.env.CI && (links.email === SENTINEL || links.linkedin === SENTINEL)) {
  throw new Error('profile.ts: set links.email and links.linkedin before deploying');
}
export const hasEmail = links.email !== SENTINEL;
export const hasLinkedin = links.linkedin !== SENTINEL;
