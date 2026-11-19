import type { Lang } from '../i18n/ui';

export interface Entry { period: string; role: string; org: string; place?: string; note?: string; badge?: 'current' | 'ongoing' }

// Newest first. Notes stay generic: no internal C24 details.
export const experience: Record<Lang, Entry[]> = {
  en: [
    { period: '01/2026 – now', role: 'Working student, product management', org: 'C24 Bank', place: 'Wiesbaden', badge: 'current', note: 'Shaping banking features with engineering and design: requirements, backlog, acceptance.' },
    { period: '09/2025 – 12/2025', role: 'Intern, product management', org: 'C24 Bank', place: 'Wiesbaden', note: 'User stories, stakeholder alignment and release testing in a product team.' },
    { period: '09/2021 – 09/2025', role: 'Customer service, level 1', org: 'C24 Bank', place: 'Wiesbaden', note: 'Four years of first-line support. Learned where products confuse people.' },
    { period: '2023 – now', role: 'B.Sc. Computer Science, minor chemistry', org: 'Johannes Gutenberg University Mainz', badge: 'ongoing', note: 'Functional programming, software engineering and machine learning.' },
  ],
  de: [
    { period: '01/2026 – heute', role: 'Werkstudent Produktmanagement', org: 'C24 Bank', place: 'Wiesbaden', badge: 'current', note: 'Bankfeatures gemeinsam mit Entwicklung und Design gestalten: Anforderungen, Backlog, Abnahme.' },
    { period: '09/2025 – 12/2025', role: 'Praktikant Produktmanagement', org: 'C24 Bank', place: 'Wiesbaden', note: 'User Stories, Abstimmung mit Stakeholdern und Release-Tests im Produktteam.' },
    { period: '09/2021 – 09/2025', role: 'Kundenservice, Level 1', org: 'C24 Bank', place: 'Wiesbaden', note: 'Vier Jahre First-Level-Support. Dort gelernt, wo Produkte Menschen verwirren.' },
    { period: '2023 – heute', role: 'B.Sc. Informatik, Nebenfach Chemie', org: 'Johannes Gutenberg-Universität Mainz', badge: 'ongoing', note: 'Funktionale Programmierung, Softwaretechnik und maschinelles Lernen.' },
  ],
};
