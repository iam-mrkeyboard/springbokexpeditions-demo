import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { writeFileSync } from 'node:fs';

const URLS = [
  'http://127.0.0.1:4321/',
  'http://127.0.0.1:4321/tours',
  'http://127.0.0.1:4321/tours/signature-northern-circuit',
  'http://127.0.0.1:4321/destinations/serengeti-national-park',
  'http://127.0.0.1:4321/kilimanjaro',
  'http://127.0.0.1:4321/kilimanjaro/lemosho',
  'http://127.0.0.1:4321/experiences',
  'http://127.0.0.1:4321/blog',
  'http://127.0.0.1:4321/contact',
];

const chromeFlags = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
];

const chrome = await launch({
  chromeFlags,
  chromePath: '/usr/bin/google-chrome',
});

const results = [];

for (const url of URLS) {
  console.log(`\nAuditing ${url} ...`);
  try {
    const runnerResult = await lighthouse(url, {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'desktop',
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
    });
    if (!runnerResult) {
      console.log('  No result');
      continue;
    }
    const lhr = runnerResult.lhr;
    const scores = {
      url: lhr.finalDisplayedUrl || url,
      performance: Math.round((lhr.categories.performance?.score ?? 0) * 100),
      accessibility: Math.round((lhr.categories.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((lhr.categories['best-practices']?.score ?? 0) * 100),
      seo: Math.round((lhr.categories.seo?.score ?? 0) * 100),
    };
    results.push(scores);
    console.log(
      `  Perf:${scores.performance}  A11y:${scores.accessibility}  BP:${scores.bestPractices}  SEO:${scores.seo}`
    );
  } catch (err) {
    console.log(`  Error: ${(err as Error).message}`);
  }
}

writeFileSync('/tmp/lighthouse-results.json', JSON.stringify(results, null, 2));

console.log('\n========================================');
console.log('LIGHTHOUSE SUMMARY (Desktop)');
console.log('========================================');
for (const r of results) {
  const p = String(r.performance).padStart(3);
  const a = String(r.accessibility).padStart(3);
  const b = String(r.bestPractices).padStart(3);
  const s = String(r.seo).padStart(3);
  console.log(`Perf:${p}  A11y:${a}  BP:${b}  SEO:${s}  ${r.url}`);
}

await chrome.kill();
