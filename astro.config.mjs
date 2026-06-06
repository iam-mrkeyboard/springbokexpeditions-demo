// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { zanzibarAreas } from './src/data/zanzibar-areas';

const srcDir = fileURLToPath(new URL('./src', import.meta.url));

const listIds = (dir) =>
  readdirSync(join(srcDir, 'content', dir))
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map((f) => f.replace(/\.(md|mdx)$/, ''));

const tours = listIds('tours');
const destinations = listIds('destinations');
const blog = listIds('blog');
const experiences = listIds('experiences');
const kilimanjaro = listIds('kilimanjaro');

const customPages = [
  ...tours.map((id) => `https://springbokexpeditions.com/tours/${id}/`),
  ...destinations.map((id) => `https://springbokexpeditions.com/destinations/${id}/`),
  ...blog.map((id) => `https://springbokexpeditions.com/blog/${id}/`),
  ...experiences.map((id) => `https://springbokexpeditions.com/experiences/${id}/`),
  ...kilimanjaro.map((id) => `https://springbokexpeditions.com/kilimanjaro/${id}/`),
  ...zanzibarAreas.map((z) => `https://springbokexpeditions.com/zanzibar/${z.slug}/`),
];

export default defineConfig({
  site: 'https://springbokexpeditions.com',
  adapter: netlify(),
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      customPages,
    }),
  ],
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': srcDir,
      },
    },
  },
  image: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
});
