// Folder browser: one study open at a time below the grid. Esc or the close button returns focus to the folder.
export function initProjects(root: HTMLElement): void {
  const panel = root.querySelector<HTMLElement>('[data-panel]')!;
  const folders = [...root.querySelectorAll<HTMLButtonElement>('[data-folder]')];
  const studies = [...root.querySelectorAll<HTMLElement>('[data-study]')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current: HTMLButtonElement | null = null;

  document.documentElement.classList.add('js-projects');
  panel.hidden = true;
  studies.forEach((s) => (s.hidden = true));

  const close = () => {
    if (!current) return;
    current.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    current.focus({ preventScroll: true });
    current.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    current = null;
  };

  const open = (btn: HTMLButtonElement) => {
    folders.forEach((f) => f.setAttribute('aria-expanded', String(f === btn)));
    studies.forEach((s) => (s.hidden = s.dataset.study !== btn.dataset.folder));
    panel.hidden = false;
    current = btn;
    panel.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
    panel.focus({ preventScroll: true });
  };

  folders.forEach((btn) => {
    btn.addEventListener('click', () => (current === btn ? close() : open(btn)));
    // Lean the folder towards the pointer: -5deg at the left edge, +5deg at the right.
    btn.addEventListener('pointermove', (e) => {
      if (reduce || e.pointerType !== 'mouse') return;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--lean', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
    });
    btn.addEventListener('pointerleave', () => btn.style.removeProperty('--lean'));
  });
  panel.querySelector('[data-close]')!.addEventListener('click', close);
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}
