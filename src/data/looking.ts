import type { Lang } from '../i18n/ui';

export interface Item { title: string; text: string }

// What I am looking for: roles and working style, no paid-services offer.
export const looking: Record<Lang, Item[]> = {
  en: [
    { title: 'Roles', text: 'Working-student or junior roles in product management, or in software with a focus on AI and automation.' },
    { title: 'What I bring', text: 'Four years of first-line support showed me where products confuse people. My own projects keep me close enough to the code to talk to engineers.' },
    { title: 'Alongside my studies', text: 'I study Computer Science (B.Sc.) in Mainz, so part-time and working-student arrangements fit best.' },
  ],
  de: [
    { title: 'Rollen', text: 'Werkstudenten- oder Junior-Stellen im Produktmanagement oder in der Softwareentwicklung mit Schwerpunkt KI und Automatisierung.' },
    { title: 'Was ich mitbringe', text: 'Vier Jahre First-Level-Support haben mir gezeigt, wo Produkte Menschen verwirren. Eigene Projekte halten mich nah genug am Code, um mit Entwicklern auf Augenhöhe zu sprechen.' },
    { title: 'Neben dem Studium', text: 'Ich studiere Informatik (B.Sc.) in Mainz, deshalb passen Teilzeit und Werkstudententätigkeit am besten.' },
  ],
};
