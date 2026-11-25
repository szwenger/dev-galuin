// Hero headline: letters rise in one after another, then lift where the pointer is.

/** 1 at the pointer, falling to 0 at `radius` px. */
export function proximity(dx: number, dy: number, radius: number): number {
  const d = Math.hypot(dx, dy);
  return d >= radius ? 0 : (1 - d / radius) ** 2;
}

export function initHeadline(h1: HTMLElement): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const words: string[] = [];
  const letters: HTMLElement[] = [];
  h1.querySelectorAll<HTMLElement>('.l1, .l2').forEach((line) => {
    for (const node of [...line.childNodes]) {
      if (node.nodeType !== Node.TEXT_NODE) continue;
      words.push(node.textContent!.trim());
      const frag = document.createDocumentFragment();
      for (const ch of node.textContent!) {
        if (ch === ' ') { frag.append(' '); continue; }
        const s = document.createElement('span');
        s.className = 'ch';
        s.setAttribute('aria-hidden', 'true');
        s.style.setProperty('--i', String(letters.length));
        s.textContent = ch;
        letters.push(s);
        frag.append(s);
      }
      node.replaceWith(frag);
    }
  });
  h1.setAttribute('aria-label', words.join(' '));
  h1.classList.add('split');

  // After the entrance, letters follow the pointer through the `translate` property (the entrance uses `transform`).
  const live = (letters.length * 45 + 1100);
  setTimeout(() => h1.classList.add('live'), live);
  if (!matchMedia('(hover: hover)').matches) return;
  let raf = 0, x = 0, y = 0;
  const move = () => {
    raf = 0;
    const radius = Math.min(innerWidth * 0.18, 260);
    for (const l of letters) {
      const r = l.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
      const k = proximity(dx, dy, radius);
      l.style.translate = k ? `0 ${(-k * 0.12).toFixed(3)}em` : '';
    }
  };
  addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; if (!raf && scrollY < innerHeight) raf = requestAnimationFrame(move); }, { passive: true });
  document.addEventListener('pointerleave', () => letters.forEach((l) => (l.style.translate = '')));
}
