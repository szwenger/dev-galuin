import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dev.galuin.com',
  i18n: { defaultLocale: 'en', locales: ['en', 'de'], routing: { prefixDefaultLocale: false } },
});
