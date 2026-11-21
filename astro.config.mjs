// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_BASE lets the site be tried at https://<user>.github.io/DescentTD-website/
// before the custom domain is live. With descenttd.com it stays "/".
export default defineConfig({
  site: 'https://descenttd.com',
  base: process.env.SITE_BASE ?? '/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  image: { responsiveStyles: false },
  build: { inlineStylesheets: 'auto' },
});
