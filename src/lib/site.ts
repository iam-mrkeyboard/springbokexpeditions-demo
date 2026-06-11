export const siteInfo = {
  name: 'Springbok Expeditions',
  shortName: 'Springbok',
  legalName: 'Springbok Expeditions Ltd',
  url: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  tagline: 'Locally-owned Tanzanian tour operator',
  description:
    'Bespoke Tanzania safaris, Kilimanjaro climbs, and Zanzibar beach holidays. Private guides, hand-picked lodges, and trips built from scratch around you.',
  phone: '+255 784 136 616',
  whatsapp: '+255 764 908 272',
  email: import.meta.env.PUBLIC_EMAIL || 'info@springbokexpeditions.com',
  address: {
    street: 'Sokoni Street',
    city: 'Arusha',
    region: 'Arusha Region',
    country: 'Tanzania',
    countryCode: 'TZ',
    postal: 'P.O. Box 1234',
  },
  geo: {
    latitude: -3.3869,
    longitude: 36.6829,
  },
  founded: '2014',
  social: {
    facebook: 'https://facebook.com/springbokexpeditions',
    instagram: 'https://instagram.com/springbokexpeditions',
    tripadvisor: 'https://tripadvisor.com/springbokexpeditions',
  },
  defaultOgImage: '/og/default.png',
  themeColor: '#1F3D2B',
  brand: {
    safariGreen: '#1F3D2B',
    savannahGold: '#C9A24A',
    sunsetOrange: '#C8571F',
    duskCream: '#FAF7F1',
  },
};

export type SiteInfo = typeof siteInfo;

export function absoluteUrl(path: string): string {
  const base = siteInfo.url.replace(/\/$/, '');
  if (!path) return base;
  return path.startsWith('http') ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
