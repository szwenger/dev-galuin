export function toggleTheme(): 'dark' | 'light' {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch { /* storage blocked: choice lasts for this page only */ }
  return next;
}

/** Id of the last section whose top has passed the reading line (px from viewport top), or null while still above the first. */
export function sectionAt(sections: { id: string; top: number }[], line: number): string | null {
  let id: string | null = null;
  for (const s of sections) if (s.top <= line) id = s.id;
  return id;
}

export function initNav(): void {
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((b) => b.addEventListener('click', toggleTheme));
  // keep the current section anchor when switching language
  const lang = document.querySelector<HTMLAnchorElement>('[data-lang-toggle]');
  const base = lang?.getAttribute('href')?.split('#')[0] ?? '';
  // decided at click time, so plain scrolling (no hash change) also keeps the place
  const sync = () => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')].map((s) => ({ id: s.id, top: s.getBoundingClientRect().top }));
    const id = sectionAt(sections, innerHeight / 3);
    lang?.setAttribute('href', base + (id ? '#' + id : ''));
  };
  for (const ev of ['pointerdown', 'focus', 'keydown'] as const) lang?.addEventListener(ev, sync);
  const menu = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const list = document.querySelector<HTMLElement>('[data-menu]');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    list?.classList.toggle('open', open);
  });
  list?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    menu?.setAttribute('aria-expanded', 'false');
    list.classList.remove('open');
  }));
}
