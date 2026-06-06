import { siteInfo, absoluteUrl } from './site';

export const organizationId = absoluteUrl('/#organization');
export const websiteId = absoluteUrl('/#website');

export function withPublisher<T extends Record<string, unknown>>(jsonLd: T): T {
  return {
    ...jsonLd,
    publisher: { '@id': organizationId },
    provider: { '@id': organizationId },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'TravelAgency'],
        '@id': organizationId,
        name: siteInfo.legalName,
        alternateName: siteInfo.name,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/logo.png'),
        description: siteInfo.description,
        telephone: siteInfo.phone,
        email: siteInfo.email,
        foundingDate: siteInfo.founded,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteInfo.address.street,
          addressLocality: siteInfo.address.city,
          addressRegion: siteInfo.address.region,
          addressCountry: siteInfo.address.countryCode,
          postalCode: siteInfo.address.postal,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteInfo.geo.latitude,
          longitude: siteInfo.geo.longitude,
        },
        sameAs: [siteInfo.social.facebook, siteInfo.social.instagram, siteInfo.social.tripadvisor],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteInfo.phone,
          contactType: 'customer service',
          areaServed: ['TZ', 'KE', 'US', 'GB', 'EU'],
          availableLanguage: ['English', 'Swahili'],
        },
      },
    ],
  };
}
