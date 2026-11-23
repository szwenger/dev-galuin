export type Lang = 'en' | 'de';

export const ui = {
  en: {
    title: 'Simon Zwenger – Software & Product',
    description: 'Junior software developer and product manager with a technical focus on AI and automation. Based in Wiesbaden.',
    navSkills: 'Skills', navProjects: 'Projects', navExperience: 'Experience', navLooking: 'Looking for', navContact: 'Contact',
    menu: 'Menu', themeToggle: 'Toggle light/dark theme', langLabel: 'Deutsch', langName: 'Switch to German',
    portraitAlt: 'Black and white portrait of Simon Zwenger',
    greeting: "Hi, I'm Simon.", currentlyAt: 'Currently at', explore: 'Explore projects',
    tagAi: '{{ /AI & AUTOMATION }}',
    skillsTitle: 'Tech stack', skillsCaption: 'What I reach for when building, shipping and running things.',
    expTitle: 'Experience.', expCaption: 'Product work at a bank, and the degree behind it.',
    badgeCurrent: 'Current role', badgeOngoing: 'Ongoing',
    lkTitle: "What I'm looking for.", lkCaption: 'Open to working-student and junior roles. Based in Wiesbaden.', lkCta: 'Write to me',
    ctTitle: "Let's talk.", ctCopy: 'A role, a project idea, or just a question: my inbox is open.',
    ctName: 'Your name', ctNamePh: 'What should I call you?', ctEmail: 'Email address', ctEmailPh: 'you@example.com',
    ctMsg: 'What do you have in mind?', ctMsgPh: 'A few lines about the role or project…', ctSend: 'Write email',
    ctHint: 'Opens your mail app with a prepared draft. Nothing is sent from this site.',
    ctSubject: 'Hello from simon.zwenger.dev', ctCopyEmail: 'Copy email address', ctCopied: 'Copied',
    backToTop: 'Back to top', footerLine: 'Software, product and automation.',
    projTitle: 'Featured projects', projCaption: 'Open a folder to explore.', projDetails: 'Project details',
    projClose: 'Close project details', projView: 'View project', projSource: 'Source on GitHub', projLive: 'Live',
    impressum: 'Legal notice', privacy: 'Privacy', licenses: 'Licences', legalUpdated: 'Last updated', backHome: 'Back to the portfolio',
    projInside: 'Inside', projNotes: 'Notes', projPrivate: 'Private project: write-up only, no public code.', projFigure: 'open the second image full size',
  },
  de: {
    title: 'Simon Zwenger – Software & Produkt',
    description: 'Junior-Softwareentwickler und Product Manager mit technischem Fokus auf KI und Automatisierung. Wiesbaden.',
    navSkills: 'Skills', navProjects: 'Projekte', navExperience: 'Erfahrung', navLooking: 'Gesucht', navContact: 'Kontakt',
    menu: 'Menü', themeToggle: 'Hell/Dunkel umschalten', langLabel: 'English', langName: 'Auf Englisch wechseln',
    portraitAlt: 'Schwarz-weißes Porträt von Simon Zwenger',
    greeting: 'Hi, ich bin Simon.', currentlyAt: 'Aktuell bei', explore: 'Projekte ansehen',
    tagAi: '{{ /KI & AUTOMATISIERUNG }}',
    skillsTitle: 'Tech-Stack', skillsCaption: 'Womit ich baue, ausliefere und betreibe.',
    expTitle: 'Erfahrung.', expCaption: 'Produktarbeit bei einer Bank und das Studium dahinter.',
    badgeCurrent: 'Aktuelle Rolle', badgeOngoing: 'Laufend',
    lkTitle: 'Wonach ich suche.', lkCaption: 'Offen für Werkstudenten- und Junior-Stellen. Wohnort: Wiesbaden.', lkCta: 'Schreib mir',
    ctTitle: 'Lass uns reden.', ctCopy: 'Eine Stelle, eine Projektidee oder einfach eine Frage: schreib mir.',
    ctName: 'Dein Name', ctNamePh: 'Wie soll ich dich nennen?', ctEmail: 'E-Mail-Adresse', ctEmailPh: 'du@beispiel.de',
    ctMsg: 'Worum geht es?', ctMsgPh: 'Ein paar Zeilen zur Stelle oder zum Projekt…', ctSend: 'E-Mail schreiben',
    ctHint: 'Öffnet dein Mailprogramm mit einem vorbereiteten Entwurf. Diese Seite verschickt nichts.',
    ctSubject: 'Hallo über simon.zwenger.dev', ctCopyEmail: 'E-Mail-Adresse kopieren', ctCopied: 'Kopiert',
    backToTop: 'Nach oben', footerLine: 'Software, Produkt und Automatisierung.',
    projTitle: 'Ausgewählte Projekte', projCaption: 'Öffne einen Ordner.', projDetails: 'Projektdetails',
    projClose: 'Projektdetails schließen', projView: 'Projekt ansehen', projSource: 'Code auf GitHub', projLive: 'Live',
    impressum: 'Impressum', privacy: 'Datenschutz', licenses: 'Lizenzen', legalUpdated: 'Stand', backHome: 'Zurück zum Portfolio',
    projInside: 'Einblick', projNotes: 'Notizen', projPrivate: 'Privates Projekt: nur Beschreibung, kein öffentlicher Code.', projFigure: 'zweites Bild in voller Größe öffnen',
  },
} as const;

export function t(lang: Lang, key: keyof typeof ui.en): string {
  return ui[lang][key];
}
