import type { Lang } from '../i18n/ui';

export interface Service { title: string; text: string }

export const freelance: Record<Lang, Service[]> = {
  en: [
    { title: 'Websites', text: 'Fast, accessible, static sites for people and small businesses, from design to launch.' },
    { title: 'Automation', text: 'Scripts and AI workflows that take repetitive work off your desk.' },
    { title: 'PC builds', text: 'Parts advice, assembly and setup for gaming, work or home servers.' },
  ],
  de: [
    { title: 'Websites', text: 'Schnelle, barrierearme statische Seiten für Privatpersonen und kleine Unternehmen, vom Entwurf bis zum Launch.' },
    { title: 'Automatisierung', text: 'Skripte und KI-Workflows, die dir wiederkehrende Arbeit abnehmen.' },
    { title: 'PC-Builds', text: 'Teileberatung, Zusammenbau und Einrichtung für Gaming, Arbeit oder Heimserver.' },
  ],
};
