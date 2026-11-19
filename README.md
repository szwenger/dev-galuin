# dev.galuin.com

Portfolio of Simon Zwenger: projects, experience, freelance offer and contact. Static site built with [Astro](https://astro.build), English at `/`, German at `/de/`, dark and light theme.

## Run

Needs Node 22.

```sh
npm install
npm run dev        # http://localhost:4321/ and /de/
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
npm test           # run after a build: checks dist/ plus unit tests
```

## Where things live

- Content: `src/data/` (profile and contact links, skills, experience, projects) and `src/i18n/ui.ts` (all UI strings, EN + DE).
- Sections: `src/components/`, assembled in `src/components/Page.astro`, used by both language pages.
- Project screenshots: `src/assets/projects/` (synthetic data only, each under 150 KB). The second, overlapping image of a project is its `inset` in `src/data/projects.ts`.
- Social preview image (what Slack, LinkedIn or WhatsApp show when the link is shared): `public/og.png`, 1200x630.

## Deploy

Every push to `main` runs `.github/workflows/pages.yml`: `npm ci`, build, tests, then deploy to GitHub Pages. A failing test stops the deploy. With `CI` set, the build also fails if the contact email or LinkedIn link is still a placeholder.

One-time setup (manual):

1. Create the GitHub repository and push `main`.
2. Repository Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. DNS for galuin.com: add a `CNAME` record `dev` pointing to `szwenger.github.io`.
4. Settings → Pages → Custom domain: `dev.galuin.com`, then tick **Enforce HTTPS** once the certificate is issued.

## Changing the contact email

One line in `src/data/profile.ts` (`links.email`).
