import type { Lang } from '../i18n/ui';
import { links } from './profile';

export interface PrivacyDoc { title: string; updated: string; sections: { h: string; p: string[] }[] }

const GH = 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement';
const CF = 'https://www.cloudflare.com/privacypolicy/';
const GG = 'https://policies.google.com/privacy';
const LI = 'https://www.linkedin.com/legal/privacy-policy';
const MAIL = `<a href="mailto:${links.email}">${links.email}</a>`;

export const privacy: Record<Lang, PrivacyDoc> = {
  de: {
    title: 'Datenschutzerklärung',
    updated: '23. November 2026',
    sections: [
      { h: 'Verantwortlicher', p: [`Simon Zwenger, Kontakt: ${MAIL}. Die Anschrift steht im <a href="../impressum/">Impressum</a>.`] },
      { h: 'Hosting über GitHub Pages', p: [
        'Diese Website wird über GitHub Pages ausgeliefert. Beim Aufruf verarbeitet GitHub technisch notwendige Server-Logdaten, darunter deine IP-Adresse, Datum und Uhrzeit, die abgerufene Seite und deinen Browsertyp. Das ist nötig, um die Seite auszuliefern und missbräuchliche Zugriffe abzuwehren (Art. 6 Abs. 1 lit. f DSGVO). Anbieter sind GitHub Inc. (USA) und GitHub B.V. (Niederlande).',
        `GitHub kann diese Daten in die USA übermitteln. Nach eigener Angabe stützt sich GitHub dabei auf das EU-US Data Privacy Framework und auf Standardvertragsklauseln. Wie lange GitHub die Logdaten speichert, bestimmt GitHub; einen konkreten Zeitraum nennt die <a href="${GH}" rel="noopener">Datenschutzerklärung von GitHub</a> nicht. Ich selbst erhebe keine Zugriffsstatistiken und setze keine Tracker ein.`,
      ] },
      { h: 'Domain und DNS', p: ['Die DNS-Einträge der Domain zwenger.dev verwaltet Cloudflare (Cloudflare, Inc., USA). Die Seite selbst kommt direkt von GitHub; Cloudflare ist beim Seitenaufruf nicht zwischengeschaltet.'] },
      { h: 'Cookies und lokaler Speicher', p: ['Diese Website setzt keine Cookies. Im <code>localStorage</code> deines Browsers speichere ich nur dein Farbschema (hell/dunkel), damit es beim nächsten Besuch noch gilt. Der Wert verlässt dein Gerät nicht, ich kann ihn nicht sehen, und du kannst ihn in den Browsereinstellungen löschen. Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG, weil du das Farbschema selbst wählst, und Art. 6 Abs. 1 lit. f DSGVO.'] },
      { h: 'Keine Drittinhalte beim Laden', p: ['Schriften und Bilder liegen auf dieser Website. Beim Laden einer Seite werden keine Inhalte von Dritten nachgeladen, deshalb erhalten Dritte dabei auch keine Daten von dir.'] },
      { h: 'Kontakt per E-Mail', p: [
        `Das Kontaktformular verschickt nichts: Es öffnet nur dein Mailprogramm mit einem vorbereiteten Entwurf. Wenn du mir schreibst (${MAIL}), läuft die Nachricht über die Weiterleitung von Cloudflare (Cloudflare Email Routing, Cloudflare, Inc., USA) in mein Postfach. Nach eigener Angabe stützt sich Cloudflare bei Übermittlungen auf das EU-US Data Privacy Framework und Standardvertragsklauseln (<a href="${CF}" rel="noopener">Datenschutzerklärung von Cloudflare</a>). Wie lange Cloudflare weitergeleitete Nachrichten oder deren Metadaten speichert, gibt Cloudflare dort nicht an.`,
        `Mein Postfach ist ein Gmail-Konto (Google). Dort liegen die weitergeleiteten Nachrichten und meine Antworten; Google kann sie auch in den USA verarbeiten, siehe die <a href="${GG}" rel="noopener">Datenschutzerklärung von Google</a>.`,
        'Ich verarbeite deine Nachricht und Absenderadresse nur, um zu antworten (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Ich lösche sie, sobald die Angelegenheit erledigt ist und keine Aufbewahrungspflicht besteht.',
      ] },
      { h: 'Links zu GitHub und LinkedIn', p: [`Wenn du einem Link zu GitHub oder LinkedIn folgst, verlässt du diese Website. Ab dann gelten die Datenschutzbestimmungen des Anbieters: <a href="${GH}" rel="noopener">GitHub</a>, <a href="${LI}" rel="noopener">LinkedIn</a>.`] },
      { h: 'Deine Rechte', p: [`Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Außerdem hast du das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde. Schreib dazu einfach an ${MAIL}.`] },
    ],
  },
  en: {
    title: 'Privacy policy',
    updated: '23 November 2026',
    sections: [
      { h: 'Controller', p: [`Simon Zwenger, contact: ${MAIL}. The postal address is in the <a href="../impressum/">legal notice</a>. This is a translation; the German version applies.`] },
      { h: 'Hosting on GitHub Pages', p: [
        'This website is served by GitHub Pages. When you open a page, GitHub processes technically necessary server logs, including your IP address, date and time, the page requested and your browser type. This is needed to deliver the site and to fend off abuse (Art. 6(1)(f) GDPR). The providers are GitHub Inc. (USA) and GitHub B.V. (Netherlands).',
        `GitHub may transfer this data to the USA. By its own statement, GitHub relies on the EU-US Data Privacy Framework and on standard contractual clauses for this. GitHub decides how long it keeps the logs; the <a href="${GH}" rel="noopener">GitHub privacy statement</a> gives no specific period. I do not run analytics or trackers myself.`,
      ] },
      { h: 'Domain and DNS', p: ['The DNS records of the domain zwenger.dev are managed by Cloudflare (Cloudflare, Inc., USA). The site itself comes directly from GitHub; Cloudflare is not in the path when you open a page.'] },
      { h: 'Cookies and local storage', p: ['This site sets no cookies. In your browser\'s <code>localStorage</code> I store only your colour scheme (light/dark) so it is still there on your next visit. The value never leaves your device, I cannot see it, and you can delete it in your browser settings. Legal basis: § 25(2) no. 2 TDDDG, because you choose the colour scheme yourself, and Art. 6(1)(f) GDPR.'] },
      { h: 'No third-party content on load', p: ['Fonts and images are served from this site. Loading a page requests nothing from third parties, so no third party receives data about you when you do.'] },
      { h: 'Contact by email', p: [
        `The contact form sends nothing: it only opens your mail app with a prepared draft. If you write to me (${MAIL}), the message passes through Cloudflare's forwarding (Cloudflare Email Routing, Cloudflare, Inc., USA) into my mailbox. By its own statement, Cloudflare relies on the EU-US Data Privacy Framework and standard contractual clauses for transfers (<a href="${CF}" rel="noopener">Cloudflare privacy policy</a>). Cloudflare does not state there how long it keeps forwarded messages or their metadata.`,
        `My mailbox is a Gmail account (Google). The forwarded messages and my replies are stored there; Google may also process them in the USA, see the <a href="${GG}" rel="noopener">Google privacy policy</a>.`,
        'I use your message and address only to reply (Art. 6(1)(b) or (f) GDPR). I delete them once the matter is closed and no retention duty applies.',
      ] },
      { h: 'Links to GitHub and LinkedIn', p: [`When you follow a link to GitHub or LinkedIn you leave this site, and that provider's privacy rules apply: <a href="${GH}" rel="noopener">GitHub</a>, <a href="${LI}" rel="noopener">LinkedIn</a>.`] },
      { h: 'Your rights', p: [`You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20) and objection (Art. 21). You can also lodge a complaint with a data protection supervisory authority. To exercise any of these, email ${MAIL}.`] },
    ],
  },
};
