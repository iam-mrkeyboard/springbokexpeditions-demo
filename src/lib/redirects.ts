interface Redirect {
  from: string;
  to: string;
  reason?: string;
}

/**
 * Old WordPress URL → New Astro URL.
 * 301 = permanent redirect (preserves SEO juice).
 * 410 = gone (for pages with no equivalent in the new site).
 *
 * Run: `curl -s https://springbokexpeditions.com/wp-sitemap.xml` to regenerate
 * the source list; this map is hand-curated.
 */
export const redirects: Redirect[] = [
  // ---- PAGES (12) ----
  // Note: /about/ and /contact/ are NOT in the map — the trailing-slash strip
  // middleware handles them (self-redirects would be a bug if we did).
  { from: '/cart/', to: '/contact', reason: 'WooCommerce cart → booking contact form' },
  { from: '/destination/', to: '/destinations', reason: 'singular → plural' },
  { from: '/safaris/', to: '/tours', reason: 'section renamed' },
  { from: '/zanzibar-the-pearl-of-the-swahili-coast/', to: '/zanzibar', reason: 'slug simplified (was Zanzibar landing page)' },

  // ---- POSTS that were tour/destination pages (10) ----
  { from: '/serengeti-amp-ngorongoro-safari/', to: '/tours/signature-northern-circuit', reason: 'tour' },
  { from: '/serengeti-ngorongoro-safari/', to: '/tours/signature-northern-circuit', reason: 'tour (alt slug)' },
  { from: '/serengeti-national-park/', to: '/destinations/serengeti-national-park', reason: 'destination' },
  { from: '/ngorongoro-crater/', to: '/destinations/ngorongoro-crater', reason: 'destination' },
  { from: '/tarangire-national-park/', to: '/destinations/tarangire-national-park', reason: 'destination' },
  { from: '/lake-manyara-national-park/', to: '/destinations/lake-manyara-national-park', reason: 'destination' },
  { from: '/mt-kilimanjaro/', to: '/kilimanjaro', reason: 'single page → hub' },
  { from: '/zanzibar-the-jewel-of-the-indian-ocean/', to: '/zanzibar', reason: 'single page → hub' },
  { from: '/mt-meru-2/', to: '/tours/mount-meru', reason: 'dropped -2 suffix' },
  { from: '/kilimanjaro-expedition/', to: '/kilimanjaro/lemosho', reason: 'route detail' },
  { from: '/custom-luxury-safaris/', to: '/tours/signature-northern-circuit-luxury', reason: 'tour' },
  { from: '/tarangire-lake-manyara-safari/', to: '/tours/tarangire-manyara', reason: 'tour' },

  // Note: WP placeholder posts (/hello-world/, /hello-world-2/) and Elementor
  // template kits (/product/*) are intentionally NOT mapped.
  // They'll 404 after the trailing-slash strip, and Google will deindex them.
];

const redirectMap = new Map<string, string>();
for (const r of redirects) {
  redirectMap.set(r.from, r.to);
}

export function lookupRedirect(pathname: string): string | null {
  const withSlash = pathname.length > 1 && !pathname.endsWith('/') ? pathname + '/' : pathname;
  return redirectMap.get(withSlash) ?? null;
}
