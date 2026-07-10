import { defineMiddleware } from 'astro:middleware';
import { lookupRedirect } from './lib/redirects';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  if (
    url.pathname === '/404' ||
    url.pathname === '/api/contact' ||
    url.pathname === '/api/enquire' ||
    url.pathname === '/api/plan-trip' ||
    url.pathname.startsWith('/og/')
  ) {
    return next();
  }

  const destination = lookupRedirect(url.pathname);
  if (destination) {
    const target = new URL(destination, url.origin);
    return new Response(null, {
      status: 301,
      headers: { Location: target.pathname + target.search },
    });
  }

  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    const clean = url.pathname.slice(0, -1) + url.search;
    return new Response(null, {
      status: 301,
      headers: { Location: clean },
    });
  }

  return next();
});
