// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
const srcDir = fileURLToPath(new URL('./src', import.meta.url));

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  fonts: [
    {
      name: 'Cormorant Garamond',
      provider: fontProviders.fontsource(),
      cssVariable: '--font-display',
      weights: ['300', '400', '500', '600', '700'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      name: 'Inter',
      provider: fontProviders.fontsource(),
      cssVariable: '--font-sans',
      weights: ['300', '400', '500', '600', '700'],
      styles: ['normal'],
      subsets: ['latin'],
    }
  ],
  integrations: [
    mdx(),
    sitemap(),
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
    service: {
      entrypoint: './src/lib/custom-image-service.ts'
    },
    domains: ['images.unsplash.com', 'images.pexels.com', 'res.cloudinary.com', 'breasafaris.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'breasafaris.com' },
    ],
  },
});
