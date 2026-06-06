#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const PAGES = [
  ['home', 'http://127.0.0.1:4321/'],
  ['tours-hub', 'http://127.0.0.1:4321/tours'],
  ['tour-detail', 'http://127.0.0.1:4321/tours/signature-northern-circuit'],
  ['dest-hub', 'http://127.0.0.1:4321/destinations'],
  ['dest-detail', 'http://127.0.0.1:4321/destinations/serengeti-national-park'],
  ['kilimanjaro', 'http://127.0.0.1:4321/kilimanjaro'],
  ['kili-detail', 'http://127.0.0.1:4321/kilimanjaro/lemosho'],
  ['zanzibar', 'http://127.0.0.1:4321/zanzibar'],
  ['zanzibar-detail', 'http://127.0.0.1:4321/zanzibar/nungwi'],
  ['experiences', 'http://127.0.0.1:4321/experiences'],
  ['blog', 'http://127.0.0.1:4321/blog'],
  ['blog-detail', 'http://127.0.0.1:4321/blog/best-time-to-visit-tanzania'],
  ['contact', 'http://127.0.0.1:4321/contact'],
  ['travel-info', 'http://127.0.0.1:4321/travel-info'],
  ['gallery', 'http://127.0.0.1:4321/gallery'],
  ['about', 'http://127.0.0.1:4321/about'],
];

const results = [];
for (const [name, url] of PAGES) {
  const out = `/tmp/lh-${name}.json`;
  try {
    execSync(
      `pnpm exec lighthouse "${url}" --quiet --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-dev-shm-usage" --output=json --output-path=${out} --only-categories=performance,accessibility,best-practices,seo --form-factor=desktop --screenEmulation.mobile=false --throttling-method=provided`,
      { stdio: 'ignore', cwd: process.cwd() }
    );
    const r = JSON.parse(readFileSync(out, 'utf8'));
    const s = {
      page: name,
      perf: Math.round((r.categories.performance.score || 0) * 100),
      a11y: Math.round((r.categories.accessibility.score || 0) * 100),
      bp: Math.round((r.categories['best-practices'].score || 0) * 100),
      seo: Math.round((r.categories.seo.score || 0) * 100),
    };
    results.push(s);
    console.log(
      `${name.padEnd(18)}  Perf:${String(s.perf).padStart(3)}  A11y:${String(s.a11y).padStart(3)}  BP:${String(s.bp).padStart(3)}  SEO:${String(s.seo).padStart(3)}`
    );
  } catch (e) {
    console.log(`${name.padEnd(18)}  ERROR: ${e.message.slice(0, 80)}`);
  }
}

console.log('\n=== AVERAGES ===');
const avg = (k) => Math.round(results.reduce((a, r) => a + r[k], 0) / results.length);
console.log(`Perf:${avg('perf')}  A11y:${avg('a11y')}  BP:${avg('bp')}  SEO:${avg('seo')}`);
