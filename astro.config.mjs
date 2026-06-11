// @ts-check
import { defineConfig, envField } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { config as loadEnv } from 'dotenv';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import robotsTxt from 'astro-robots-txt';
import astroCompress from 'astro-compress';
import { zanzibarAreas } from './src/data/zanzibar-areas.ts';

loadEnv({ path: '.env' });

const srcDir = fileURLToPath(new URL('./src', import.meta.url));
const contentDir = join(srcDir, 'content');

const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';

function contentSlugs(subdir) {
  return readdirSync(join(contentDir, subdir))
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map((f) => f.replace(/\.(md|mdx)$/, ''));
}
const isProd = process.env.NODE_ENV === 'production';
const bareHost = isProd ? new URL(siteUrl).host : undefined;
const siteOrigin = siteUrl.replace(/\/$/, '');

const dynamicUrls = [
  ...contentSlugs('tours').map((s) => `${siteOrigin}/tours/${s}`),
  ...contentSlugs('destinations').map((s) => `${siteOrigin}/destinations/${s}`),
  ...contentSlugs('blog').map((s) => `${siteOrigin}/blog/${s}`),
  ...contentSlugs('kilimanjaro').map((s) => `${siteOrigin}/kilimanjaro/${s}`),
  ...contentSlugs('experiences').map((s) => `${siteOrigin}/experiences/${s}`),
  ...zanzibarAreas.map((a) => `${siteOrigin}/zanzibar/${a.slug}`),
];

// https://astro.build/config
export default defineConfig({
  site: siteUrl,

  // Server output: needed for Astro Actions (forms), DB reads, admin (later)
  output: 'server',
  adapter: node({ mode: 'standalone' }),

  trailingSlash: 'ignore',

  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      filter: (page) =>
        !page.includes('/api/') &&
        !page.includes('/404') &&
        !page.includes('/admin/'),
      customPages: dynamicUrls,
    }),
    robotsTxt({
      policy: isProd
        ? [
            {
              userAgent: '*',
              allow: '/',
              disallow: ['/api/', '/admin/'],
            },
          ]
        : [
            {
              userAgent: '*',
              disallow: '/',
            },
          ],
      sitemap: isProd ? `${siteOrigin}/sitemap-index.xml` : undefined,
      host: isProd ? bareHost : undefined,
    }),
    astroCompress({
      HTML: true,
      JavaScript: true,
      CSS: true,
      Image: false,
      SVG: false,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': srcDir,
      },
    },
  },

  image: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'res.cloudinary.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'springbokexpeditions.com' },
    ],
  },

  env: {
    schema: {
      DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      SESSION_SECRET: envField.string({ context: 'server', access: 'secret' }),
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      RESEND_FROM_EMAIL: envField.string({ context: 'server', access: 'public', optional: true }),
      RESEND_TO_EMAIL: envField.string({ context: 'server', access: 'public', optional: true }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      PUBLIC_SITE_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_SITE_NAME: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_PHONE: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_WHATSAPP: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_EMAIL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_PLAUSIBLE_DOMAIN: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_CLOUDINARY_CLOUD_NAME: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },

  experimental: {},
});
