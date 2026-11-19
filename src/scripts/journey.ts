const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (p: number) => p * p * (3 - 2 * p);

/**
 * The hero portrait starts bottom-centre, then flips (rotateY 0→180°) and lands in the
 * intro's portrait slot as you scroll. After landing it simply tracks the slot.
 * No-op under reduced motion: the slot's own <img> stays visible instead.
 */
export function initPortraitJourney(card: HTMLElement, slot: HTMLElement): () => void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const root = document.documentElement;
  root.classList.add('journey-on');
  let raf = 0;

  const frame = () => {
    raf = 0;
    const vw = innerWidth, vh = innerHeight;
    const s = slot.getBoundingClientRect();
    if (!s.width) return;
    const startW = clamp(vw * 0.24, 150, 370);
    const startScale = startW / s.width;
    const startCx = vw / 2, startCy = vh - (startW * s.height / s.width) / 2 - 24;
    const slotDocTop = s.top + scrollY;
    const dist = Math.max(slotDocTop - vh * 0.3, 1);
    const p = clamp(scrollY / dist, 0, 1), e = smooth(p);
    const cx = lerp(startCx, s.left + s.width / 2, e);
    const cy = lerp(startCy, s.top + s.height / 2, e);
    const scale = lerp(startScale, 1, e);
    const rot = lerp(5, 180, e);
    card.style.width = s.width + 'px';
    card.style.height = s.height + 'px';
    card.style.transform = `translate3d(${cx - s.width / 2}px, ${cy - s.height / 2}px, 0) perspective(1200px) rotateY(${rot}deg) scale(${scale})`;
    card.style.visibility = p >= 1 && (s.bottom < -80 || s.top > vh + 80) ? 'hidden' : 'visible';
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(frame); };

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  frame();
  return () => {
    removeEventListener('scroll', queue);
    removeEventListener('resize', queue);
    cancelAnimationFrame(raf);
    root.classList.remove('journey-on');
  };
}
