// Wavy timeline: a path through every marker centre, drawn once when the road scrolls into view.
export function pathThrough(points: { x: number; y: number }[]): string {
  if (!points.length) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    const mx = (a.x + b.x) / 2;
    // Horizontal tangents at every node give the S-curves; stacked nodes collapse to a straight line.
    d += a.x === b.x ? ` L ${b.x} ${b.y}` : ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

export function initTimeline(road: HTMLElement): void {
  const svg = road.querySelector('svg')!;
  const paths = svg.querySelectorAll('path');
  const markers = [...road.querySelectorAll<HTMLElement>('[data-marker]')];

  const layout = () => {
    const box = road.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    const pts = markers.map((m) => {
      const r = m.getBoundingClientRect();
      return { x: Math.round(r.left - box.left + r.width / 2), y: Math.round(r.top - box.top + r.height / 2) };
    });
    const d = pathThrough(pts);
    paths.forEach((p) => p.setAttribute('d', d));
  };
  layout();
  new ResizeObserver(layout).observe(road);

  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { road.dataset.drawn = 'true'; io.disconnect(); }
  }, { threshold: 0.2 });
  road.dataset.drawn = 'false';
  io.observe(road);
}
