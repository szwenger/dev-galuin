import { defineConfig } from 'astro/config';

export default defineConfig({
  build: { inlineStylesheets: 'always' }, // no render-blocking CSS request; the sheet is ~5 KB
  site: 'https://simon.zwenger.dev',
  i18n: { defaultLocale: 'en', locales: ['en', 'de'], routing: { prefixDefaultLocale: false } },
});
