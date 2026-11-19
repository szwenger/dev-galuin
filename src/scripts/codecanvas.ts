const CODE = `const stack = ['python', 'typescript', 'haskell', 'scala'];
async function ship(idea) { const plan = await think(idea); return build(plan); }
export default defineConfig({ site: 'https://dev.galuin.com' });
def automate(task): return [step.run() for step in task.steps if step.ready]
import { agent, tool } from './llm'; // prompts, evals, retries
SELECT * FROM backlog WHERE status = 'ready' ORDER BY impact DESC;
git commit -m "ship it" && docker compose up -d
{ "role": "product", "focus": ["ai", "automation"], "city": "wiesbaden" }
fn main() -> Result<(), Error> { pipeline.run()?; Ok(()) }
while (!done) { measure(); learn(); iterate(); }`.split('\n');

/** Draws a static wall of faint code once (and on resize / theme change). Static by design, so reduced-motion safe. */
export function initCodeCanvas(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const draw = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#888';
    ctx.globalAlpha = 0.045;
    ctx.font = '11px ui-monospace, Menlo, Consolas, monospace';
    const colW = 300, lineH = 15;
    for (let c = 0, x = -40; x < w; c++, x += colW) {
      for (let r = 0, y = 10; y < h; r++, y += lineH) {
        const line = CODE[(r * 3 + c * 7) % CODE.length];
        if ((r * 5 + c * 3) % 7 < 2) continue; // gaps so it reads as code blocks
        ctx.fillText(line.slice((c * 11) % 20), x, y);
      }
    }
  };
  const mo = new MutationObserver(draw);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  addEventListener('resize', draw);
  draw();
  return () => { mo.disconnect(); removeEventListener('resize', draw); };
}
