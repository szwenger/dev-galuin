import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';
import rlShot from '../assets/projects/rl-project.webp';
import karaokeShot from '../assets/projects/karaoke-app.webp';
import vaultShot from '../assets/projects/vault-dashboard.webp';
import workShot from '../assets/projects/work-dashboard.webp';
import karaokePhone from '../assets/projects/karaoke-app-phone.webp';
import vaultPhone from '../assets/projects/vault-dashboard-phone.webp';
import rlGraphs from '../assets/projects/rl-graphs.webp';
import seShot from '../assets/projects/software-engineering-project.webp';
import seFilter from '../assets/projects/software-engineering-project-filter.webp';

export interface Project {
  id: string;
  title: string;
  kind: Record<Lang, string>;      // short descriptor under the folder
  summary: Record<Lang, string>;
  details: Record<Lang, string[]>;
  stack: string[];
  image?: ImageMetadata;           // synthetic-data screenshot only; folders without one show a typographic sheet
  inset?: { src: ImageMetadata; kind: 'phone' | 'figure' }; // second shot, overlaps the main one bottom-right
  repo?: string;                   // public repos only
  live?: string;
}

// Order = folder order. Private projects (karaoke, dashboards) are write-ups without repo links.
export const projects: Project[] = [
  {
    id: 'karaoke-app',
    title: 'Karaoke',
    kind: { en: 'Self-hosted party app', de: 'Self-hosted Party-App' },
    summary: {
      en: 'Karaoke for house parties. One laptop plays songs on the TV, guests join from their phones by scanning a QR code. No app install, no cloud.',
      de: 'Karaoke für Hauspartys. Ein Laptop spielt die Songs auf dem Fernseher, Gäste steigen per QR-Code mit dem Handy ein. Keine App, keine Cloud.',
    },
    details: {
      en: [
        'Phones search the local song library and add to a shared queue in real time.',
        'mpv drives the TV: a join screen while idle, the video as soon as a song is queued.',
        'Missing a song? A YouTube fallback downloads, tags and queues it; admins can restrict it.',
        'Control center for the host with queue, playback and permission settings.',
      ],
      de: [
        'Handys durchsuchen die lokale Songbibliothek und füllen eine gemeinsame Warteschlange in Echtzeit.',
        'mpv steuert den Fernseher: ein Beitritts-Screen im Leerlauf, das Video, sobald ein Song wartet.',
        'Song fehlt? Ein YouTube-Fallback lädt ihn herunter, taggt und reiht ihn ein; Admins können das einschränken.',
        'Control Center für den Host mit Warteschlange, Wiedergabe und Rechten.',
      ],
    },
    stack: ['Node.js', 'Express', 'WebSockets', 'mpv', 'ffmpeg', 'yt-dlp'],
    image: karaokeShot,
    inset: { src: karaokePhone, kind: 'phone' },
  },
  {
    id: 'vault-dashboard',
    title: 'Study dashboard',
    kind: { en: 'Obsidian homepage', de: 'Obsidian-Startseite' },
    summary: {
      en: 'The homepage of my study vault: deadlines, courses, tasks and progress in one calm view, now being turned into an Obsidian plugin.',
      de: 'Die Startseite meines Studien-Vaults: Fristen, Kurse, Aufgaben und Fortschritt in einer ruhigen Ansicht, gerade auf dem Weg zum Obsidian-Plugin.',
    },
    details: {
      en: [
        'Reads notes and tasks straight from the vault, no separate database.',
        'Separate data and UI layers, so the view can move into a plugin unchanged.',
        'Designed in HTML mockups first, then a pass to strip anything that looked generic.',
      ],
      de: [
        'Liest Notizen und Aufgaben direkt aus dem Vault, ohne eigene Datenbank.',
        'Daten- und UI-Schicht getrennt, damit die Ansicht unverändert in ein Plugin wandern kann.',
        'Erst als HTML-Mockup entworfen, dann von allem Generischen befreit.',
      ],
    },
    stack: ['JavaScript', 'Obsidian', 'Dataview'],
    image: vaultShot,
    inset: { src: vaultPhone, kind: 'phone' },
  },
  {
    id: 'work-dashboard',
    title: 'Work dashboard',
    kind: { en: 'Obsidian plugin + Python', de: 'Obsidian-Plugin + Python' },
    summary: {
      en: 'A personal organizer inside Obsidian: hours, meetings, tasks, tickets, mail and routine streaks on one screen, all computed locally.',
      de: 'Ein persönlicher Organizer in Obsidian: Stunden, Termine, Aufgaben, Tickets, Mails und Routinen auf einem Bildschirm, alles lokal berechnet.',
    },
    details: {
      en: [
        'Python pipeline merges parsers and fetchers into one JSON file the plugin draws.',
        'Tasks can be completed, rescheduled or reprioritised from the dashboard and are written back to the notes.',
        'Re-renders as a keyed morph: changed rows slide, numbers roll, nothing flashes.',
        'Runs fully on the machine: no server and no cloud service of its own.',
      ],
      de: [
        'Eine Python-Pipeline führt Parser und Abrufe zu einer JSON-Datei zusammen, die das Plugin zeichnet.',
        'Aufgaben lassen sich im Dashboard abhaken, verschieben oder priorisieren und werden in die Notizen zurückgeschrieben.',
        'Neu-Rendern als Keyed Morph: geänderte Zeilen gleiten, Zahlen rollen, nichts flackert.',
        'Läuft komplett lokal: kein Server, kein eigener Cloud-Dienst.',
      ],
    },
    stack: ['Python', 'JavaScript', 'Obsidian API', 'macOS'],
    image: workShot,
  },
  {
    id: 'software-engineering-project',
    title: 'Scrum project',
    kind: { en: 'University team project', de: 'Uni-Teamprojekt' },
    summary: {
      en: 'A web app for preparing vehicle sensor data, built by a university team run like a real software team. I was product owner and team lead of the frontend.',
      de: 'Eine Web-App zur Aufbereitung von Fahrzeug-Sensordaten, gebaut von einem Uni-Team, das wie ein echtes Softwareteam arbeitete. Ich war Product Owner und Teamleiter im Frontend.',
    },
    details: {
      en: [
        'Upload OBD logs, compare sessions side by side and read per-signal statistics with boxplots.',
        'Filters such as moving average, peak removal and clipping run in the Python backend.',
        'React and TypeScript frontend, Flask API and SQLite storage, shipped as Docker images.',
        'Planned in scrum sprints with backlog, reviews and retrospectives across several sub-teams.',
      ],
      de: [
        'OBD-Logs hochladen, Fahrten nebeneinander vergleichen und Statistiken samt Boxplots je Signal lesen.',
        'Filter wie gleitender Mittelwert, Peak-Entfernung und Clipping laufen im Python-Backend.',
        'Frontend in React und TypeScript, Flask-API und SQLite, ausgeliefert als Docker-Images.',
        'In Scrum-Sprints geplant, mit Backlog, Reviews und Retrospektiven über mehrere Teilteams.',
      ],
    },
    stack: ['React', 'TypeScript', 'Recharts', 'Flask', 'SQLite', 'Docker', 'Scrum'],
    image: seShot,
    inset: { src: seFilter, kind: 'figure' },
    repo: 'https://github.com/szwenger/software_engineering_project',
  },
  {
    id: 'rl-project',
    title: "Knight's Fury",
    kind: { en: 'Reinforcement learning', de: 'Reinforcement Learning' },
    summary: {
      en: 'A top-down wave survival game built in Pygame, wrapped as a Gymnasium environment, and a PPO agent trained to play it.',
      de: 'Ein Top-down-Wellen-Survival-Spiel in Pygame, verpackt als Gymnasium-Umgebung, und ein PPO-Agent, der es spielen lernt.',
    },
    details: {
      en: [
        'Play it yourself or watch the trained agent take over.',
        'Custom Gymnasium environment with a headless mode for fast training.',
        'Rewards and player stats live in a config file, so experiments need no code changes.',
      ],
      de: [
        'Selbst spielen oder dem trainierten Agenten zusehen.',
        'Eigene Gymnasium-Umgebung mit Headless-Modus für schnelles Training.',
        'Belohnungen und Spielerwerte stehen in einer Config-Datei, Experimente brauchen keinen Code.',
      ],
    },
    stack: ['Python', 'Pygame', 'Gymnasium', 'Stable-Baselines3', 'NumPy'],
    image: rlShot,
    inset: { src: rlGraphs, kind: 'figure' },
    repo: 'https://github.com/szwenger/rl_project',
  },
];
