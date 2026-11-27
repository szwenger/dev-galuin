import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const read = (p) => readFileSync(join('dist', p), 'utf8');
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

test('lang attributes', () => {
  assert.match(read('index.html'), /<html lang="en"/);
  assert.match(read('de/index.html'), /<html lang="de"/);
});

test('hreflang alternates link both ways', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    assert.match(h, /rel="alternate"[^>]*hreflang="en"|hreflang="en"[^>]*rel="alternate"/);
    assert.match(h, /rel="alternate"[^>]*hreflang="de"|hreflang="de"[^>]*rel="alternate"/);
  }
});

test('theme-init inline script sits in head', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const head = read(f).split('</head>')[0];
    assert.match(head, /<script[^>]*>[^<]*localStorage[^<]*theme/);
  }
});

// Terms that must never ship (birth date, birthplace, ...) live in a git-ignored file, one per line,
// so the public repo does not publish the very data it guards. Without the file the test is skipped.
const PRIVATE = 'tests/private-terms.local.txt';
const privateTerms = existsSync(PRIVATE) ? readFileSync(PRIVATE, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean) : [];
test('no private data in build', { skip: privateTerms.length ? false : `${PRIVATE} missing` }, () => {
  for (const f of walk('dist').filter((p) => /\.(html|js|css|txt|xml)$/.test(p))) {
    const c = readFileSync(f, 'utf8');
    for (const bad of privateTerms) assert.ok(!c.includes(bad), `private term #${privateTerms.indexOf(bad) + 1} in ${f}`);
  }
});

test('CNAME', () => {
  assert.equal(read('CNAME').trim(), 'simon.zwenger.dev');
});

test('content present in both languages', () => {
  const titles = {
    'index.html': ['Roles', 'What I bring', 'Alongside my studies'],
    'de/index.html': ['Rollen', 'Was ich mitbringe', 'Neben dem Studium'],
  };
  for (const [f, ts] of Object.entries(titles)) {
    const h = read(f);
    for (const s of ['Simon Zwenger', 'Wiesbaden', 'C24', ...ts]) assert.ok(h.includes(s), `${s} missing in ${f}`);
    assert.ok(!/social media/i.test(h), `social media in ${f}`);
  }
});

test('one section each for skills, experience, looking, contact', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    for (const id of ['skills', 'experience', 'looking', 'contact']) {
      const n = h.match(new RegExp(`<section[^>]*id="${id}"`, 'g'))?.length ?? 0;
      assert.equal(n, 1, `#${id} in ${f}`);
    }
    assert.ok(!h.includes('TODO-ASK-SIMON'), `sentinel leaked into ${f}`);
  }
});

test('timeline: drawable path and one node per entry', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    assert.match(h, /<path[^>]*pathLength="1"/, `ink path in ${f}`);
    assert.equal(h.match(/data-stop/g)?.length, 4, `4 stops in ${f}`);
  }
});

test('footer: back to top, year, location', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const foot = read(f).split('<footer')[1] ?? '';
    assert.match(foot, /href="#top"/);
    assert.match(foot, /2026/);
    assert.match(foot, /Wiesbaden/);
  }
});

const IDS = ['karaoke-app', 'vault-dashboard', 'work-dashboard', 'software-engineering-project', 'rl-project'];
const REPOS = {
  'software-engineering-project': 'https://github.com/szwenger/software_engineering_project',
  'rl-project': 'https://github.com/szwenger/rl_project',
};

test('projects: one folder and one study per project, in order', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    assert.equal(h.match(/<section[^>]*id="projects"/g)?.length, 1, `#projects in ${f}`);
    const folders = [...h.matchAll(/data-folder="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(folders, IDS, `folders in ${f}`);
    for (const id of IDS) {
      assert.equal(h.match(new RegExp(`id="study-${id}"`, 'g'))?.length, 1, `study ${id} in ${f}`);
      assert.match(h, new RegExp(`<button[^>]*aria-controls="study-${id}"[^>]*aria-expanded="false"|<button[^>]*aria-expanded="false"[^>]*aria-controls="study-${id}"`), `button for ${id}`);
    }
  }
});

test('projects: every screenshot file exists and stays under 150 KB', () => {
  const src = readFileSync('src/data/projects.ts', 'utf8');
  const files = [...src.matchAll(/from '\.\.\/assets\/projects\/([^']+)'/g)].map((m) => m[1]);
  assert.ok(files.length >= 4, 'screenshots imported');
  for (const f of files) assert.ok(statSync(join('src/assets/projects', f)).size < 150 * 1024, `${f} size`);
});

test('projects: public repos link to GitHub, private ones do not', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    for (const id of IDS) {
      const study = h.split(`id="study-${id}"`)[1].split('</article>')[0];
      const gh = study.match(/href="https:\/\/github\.com\/[^"]+"/g) ?? [];
      if (REPOS[id]) assert.deepEqual(gh, [`href="${REPOS[id]}"`], `${id} repo link`);
      else assert.equal(gh.length, 0, `${id} must not link to GitHub`);
    }
  }
});

test('nav: theme button, language links, hero, portrait', () => {
  const en = read('index.html'), de = read('de/index.html');
  for (const h of [en, de]) {
    assert.match(h, /<button[^>]*aria-label="[^"]+"[^>]*data-theme-toggle|<button[^>]*data-theme-toggle[^>]*aria-label="[^"]+"/);
    assert.match(h, /<img[^>]*alt="[^"]+"[^>]*>/);
  }
  assert.match(en, /<a[^>]*href="\/de\/[^"]*"[^>]*data-lang-toggle|<a[^>]*data-lang-toggle[^>]*href="\/de\/[^"]*"/);
  assert.match(de, /<a[^>]*href="\/(#[^"]*)?"[^>]*data-lang-toggle|<a[^>]*data-lang-toggle[^>]*href="\/(#[^"]*)?"/);
  assert.match(en, /<h1[\s\S]*SOFTWARE[\s\S]*&(#38|amp); PRODUCT/);
  assert.match(de, /<h1[\s\S]*SOFTWARE[\s\S]*&(#38|amp); PRODUKT/);
  const img = en.match(/<img[^>]*portrait[^>]*>|<img[^>]*>/)[0];
  assert.match(img, /width="\d+"/);
  assert.match(img, /height="\d+"/);
});

test('projects: second shot overlaps the main one where one exists', () => {
  const INSETS = { 'karaoke-app': 'phone', 'vault-dashboard': 'phone', 'software-engineering-project': 'figure', 'rl-project': 'figure' };
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    for (const id of IDS) {
      const study = h.split(`id="study-${id}"`)[1].split('</article>')[0];
      const insets = [...study.matchAll(/<img[^>]*class="inset (phone|figure)"/g)].map((m) => m[1]);
      assert.deepEqual(insets, INSETS[id] ? [INSETS[id]] : [], `${id} inset in ${f}`);
    }
    assert.ok(!h.includes('data-text='), `old rolling label markup left in ${f}`);
  }
});

const SITE = 'https://simon.zwenger.dev';

test('404 page: own page, links home in both languages, not indexed', () => {
  const h = read('404.html');
  assert.match(h, /<html lang="en"/);
  assert.match(h, /<meta name="robots" content="noindex"/);
  assert.ok(!h.includes('rel="canonical"'), '404 must not claim a canonical URL');
  assert.match(h, /href="\/"/);
  assert.match(h, /href="\/de\/"/);
});

test('social preview: og:image and twitter card point at a 1200x630 PNG', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    assert.match(h, new RegExp(`<meta property="og:image" content="${SITE}/og.png"`), `og:image in ${f}`);
    assert.match(h, /<meta property="og:image:alt" content="[^"]+"/);
    assert.match(h, /<meta name="twitter:card" content="summary_large_image"/);
  }
  const png = readFileSync(join('dist', 'og.png'));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(png.length < 300 * 1024, 'og.png under 300 KB');
});

test('deploy workflow: tests gate the Pages deploy', () => {
  const w = readFileSync('.github/workflows/pages.yml', 'utf8');
  for (const s of ['npm ci', 'npm run build', 'npm test', 'actions/upload-pages-artifact@', 'actions/deploy-pages@', 'pages: write', 'id-token: write']) {
    assert.ok(w.includes(s), `${s} missing in workflow`);
  }
  for (const m of w.matchAll(/uses: (\S+)/g)) assert.match(m[1], /@[0-9a-f]{40}$/, `${m[1]} is not pinned to a commit`);
  assert.match(w, /branches:\s*\[\s*main\s*\]/);
  assert.match(w, /path:\s*\.?\/?dist/);
});

test('folders: screen readers hear the project title, once', () => {
  for (const f of ['index.html', 'de/index.html']) {
    const h = read(f);
    for (const m of h.matchAll(/<button[^>]*data-folder="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g)) {
      const sr = m[2].match(/<span class="sr-only"[^>]*>([^<]*)<\/span>/)?.[1] ?? '';
      const title = h.split(`id="title-${m[1]}"`)[1].split('>')[1].split('<')[0];
      assert.ok(sr.includes(title.replace(/'/g, '&#39;')) || sr.includes(title), `${m[1]} sr-only "${sr}" lacks "${title}" in ${f}`);
      assert.match(m[2], /<span class="act"[^>]*aria-hidden="true"|<span aria-hidden="true"[^>]*class="act"/, `${m[1]} visible "view" label must be hidden from AT in ${f}`);
    }
  }
});

test('repo: planning docs and handoff stay out of the public repo', async () => {
  const { execFileSync } = await import('node:child_process');
  let tracked;
  try { tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n'); } catch { return; } // no git (e.g. tarball): nothing to check
  for (const p of tracked) assert.ok(!/^(docs\/|HANDOFF\.md$)/.test(p), `${p} would be published`);
});

const LEGAL = { en: ['', 'impressum', 'privacy', 'licenses'], de: ['de/', 'de/impressum', 'de/privacy', 'de/licenses'] };

test('legal pages exist in both languages and the footer links to them', () => {
  for (const [lang, [home, ...slugs]] of Object.entries(LEGAL)) {
    const foot = read(`${home}index.html`);
    for (const s of slugs) {
      assert.ok(existsSync(join('dist', s, 'index.html')), `${s} missing`);
      const slug = s.split('/').pop();
      assert.ok(foot.includes(`href="${lang === 'en' ? '' : '/de'}/${slug}/"`), `footer link to ${slug} (${lang})`);
    }
  }
  assert.ok(existsSync(join('dist', 'licenses', 'OFL-SpaceGrotesk.txt')), 'OFL text shipped');
});

// legal.ts imports ./profile without an extension, which Node cannot load, so read the address from the source text.
const legalSrc = readFileSync('src/data/legal.ts', 'utf8');
const addrMatch = legalSrc.match(/address:\s*\[([^\]]*)\]/);
const addrLines = [...(addrMatch?.[1] ?? '').matchAll(/'([^']+)'/g)].map((m) => m[1]);
const legalData = { hasAddress: addrLines.length > 0, legal: { address: addrLines } };

test('impressum: names the owner and email; placeholder shows the pending line and noindex, a real address shows every line and is indexed, never the raw sentinel', () => {
  for (const f of ['impressum/index.html', 'de/impressum/index.html']) {
    const h = read(f);
    assert.match(h, /Simon Zwenger/);
    assert.match(h, /request@zwenger\.dev/);
    assert.doesNotMatch(h, /TODO-ADDRESS/);
    if (legalData.hasAddress) {
      assert.doesNotMatch(h, /data-address-pending/);
      assert.doesNotMatch(h, /<meta name="robots" content="noindex"/);
      for (const line of legalData.legal.address) assert.ok(h.includes(line), `${f}: ${line}`);
    } else {
      assert.match(h, /data-address-pending/);
      assert.match(h, /<meta name="robots" content="noindex"/);
    }
    assert.doesNotMatch(h, /before launch|vor dem Start/);
  }
});

test('privacy: no cookies claim, names GitHub and Cloudflare, no third-party hosts loaded', () => {
  for (const f of ['privacy/index.html', 'de/privacy/index.html']) {
    const h = read(f);
    assert.match(h, /GitHub/);
    assert.match(h, /Cloudflare/);
    assert.match(h, /Gmail/);
    assert.match(h, /localStorage/);
  }
});

test('contact: the GitHub link carries the GitHub logo', () => {
  for (const f of ['index.html', 'de/index.html']) {
    assert.match(read(f), /<a[^>]*rel="me noopener"[^>]*><svg[^>]*class="brand"[^>]*fill="currentColor"[^>]*>[^]*?<span class="roll">GitHub<\/span>/, `GitHub logo on ${f}`);
  }
});
