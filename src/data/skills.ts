import type { Lang } from '../i18n/ui';

// `hot` items are shown as filled chips (the ones used most).
export interface SkillGroup { title: string; text: string; items: string[]; hot: string[] }

export const skills: Record<Lang, SkillGroup[]> = {
  en: [
    { title: 'AI & LLM workflows', text: 'Agents, prompts and local models wired into real work.', items: ['Prompt and agent workflows', 'LLM benchmarking', 'Local models', 'Automation pipelines', 'Claude Code'], hot: ['Prompt and agent workflows', 'Automation pipelines'] },
    { title: 'Languages & frameworks', text: 'Typed, functional and scripting languages, the web, and a robot.', items: ['Python', 'TypeScript / Node', 'C++ / ROS 2', 'Astro', 'Haskell', 'Scala', 'HTML / CSS'], hot: ['Python', 'TypeScript / Node'] },
    { title: 'Tools & product', text: 'Running services, and the day-to-day of product teams.', items: ['Docker & self-hosting', 'Linux · Windows · macOS', 'Git', 'Playwright', 'Bruno (API testing)', 'Jira & Confluence', 'Zendesk'], hot: ['Docker & self-hosting', 'Jira & Confluence'] },
  ],
  de: [
    { title: 'KI & LLM-Workflows', text: 'Agenten, Prompts und lokale Modelle im echten Arbeitsalltag.', items: ['Prompt- und Agenten-Workflows', 'LLM-Benchmarking', 'Lokale Modelle', 'Automatisierungs-Pipelines', 'Claude Code'], hot: ['Prompt- und Agenten-Workflows', 'Automatisierungs-Pipelines'] },
    { title: 'Sprachen & Frameworks', text: 'Typisierte, funktionale und Skriptsprachen, das Web und ein Roboter.', items: ['Python', 'TypeScript / Node', 'C++ / ROS 2', 'Astro', 'Haskell', 'Scala', 'HTML / CSS'], hot: ['Python', 'TypeScript / Node'] },
    { title: 'Werkzeuge & Produkt', text: 'Dienste betreiben und der Alltag in Produktteams.', items: ['Docker & Self-Hosting', 'Linux · Windows · macOS', 'Git', 'Playwright', 'Bruno (API-Tests)', 'Jira & Confluence', 'Zendesk'], hot: ['Docker & Self-Hosting', 'Jira & Confluence'] },
  ],
};
