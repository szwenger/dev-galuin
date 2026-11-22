import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://simon.zwenger.dev',
  i18n: { defaultLocale: 'en', locales: ['en', 'de'], routing: { prefixDefaultLocale: false } },
});
