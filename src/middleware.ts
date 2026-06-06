// Strips trailing slashes via 301 redirect (except for the root path)
export function onRequest(ctx, next) {
  const url = new URL(ctx.request.url);
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const clean = url.pathname.replace(/\/+$/, '') + url.search;
    return new Response(null, {
      status: 301,
      headers: { Location: clean },
    });
  }
  return next();
}
