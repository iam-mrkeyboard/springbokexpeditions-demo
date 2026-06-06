import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const itineraryDay = z.object({
  day: z.number().int().min(1).max(60),
  title: z.string().min(3),
  body: z.string().min(10),
  meals: z.enum(['B', 'L', 'D', 'BL', 'LD', 'BD', 'BLD']),
  accommodation: z.string(),
  activities: z.array(z.string()).default([]),
});

const tourStyle = z.enum(['luxury', 'mid-range', 'budget']);

const tours = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/tours' }),
  schema: z.object({
    title: z.string().min(3).max(200),
    excerpt: z.string().min(20).max(300),
    summary: z.string().min(20).max(500),
    type: z.enum(['safari', 'kilimanjaro', 'meru', 'zanzibar', 'day-trip', 'honeymoon', 'family', 'cultural', 'migration']),
    styles: z.array(tourStyle).min(1),
    durationDays: z.number().int().min(1).max(60),
    difficulty: z.enum(['easy', 'moderate', 'challenging', 'strenuous']),
    priceFromUSD: z.number().int().positive(),
    priceNote: z.string().optional(),
    hero: z.url(),
    gallery: z.array(z.url()).default([]),
    highlights: z.array(z.string()).min(1),
    itinerary: z.array(itineraryDay).min(1),
    inclusions: z.array(z.string()).min(1),
    exclusions: z.array(z.string()).min(1),
    bestSeason: z.array(z.string()).min(1),
    destinations: z.array(z.string()).min(1),
    experiences: z.array(z.string()).default([]),
    groupSize: z.string().optional(),
    startEnd: z.string().optional(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().max(160).optional(),
    }).optional(),
  }),
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/destinations' }),
  schema: z.object({
    name: z.string().min(2).max(100),
    region: z.enum(['Northern Circuit', 'Southern Circuit', 'Western Circuit', 'Coastal', 'Mountain']),
    summary: z.string().min(20).max(500),
    hero: z.url(),
    gallery: z.array(z.url()).default([]),
    wildlife: z.array(z.object({ name: z.string(), fact: z.string() })).default([]),
    bestTime: z.array(z.object({ month: z.string(), rating: z.enum(['low', 'med', 'high']) })).default([]),
    attractions: z.array(z.string()).min(1),
    gettingThere: z.string().optional(),
    publishedAt: z.coerce.date(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().max(160).optional(),
    }).optional(),
  }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experiences' }),
  schema: z.object({
    name: z.string().min(2),
    tagline: z.string().min(2).max(150),
    summary: z.string().min(20).max(500),
    description: z.string().min(50).max(2000).optional(),
    icon: z.string().optional(),
    hero: z.url(),
    bestMonths: z.array(z.string()).min(1),
    durationDays: z.number().int().min(1).max(60),
    priceFromUSD: z.number().int().positive().optional(),
    priceNote: z.string().optional(),
    highlights: z.array(z.string()).min(1),
    sampleItinerary: z.array(z.object({
      day: z.number().int().min(1).max(60),
      title: z.string().min(3),
      body: z.string().min(10),
      location: z.string().optional(),
    })).min(1).optional(),
    relatedTours: z.array(z.string()).default([]),
    relatedLinks: z.array(z.object({
      label: z.string(),
      href: z.string(),
      description: z.string().optional(),
    })).default([]),
    faqs: z.array(z.object({
      q: z.string().min(5),
      a: z.string().min(10),
    })).default([]),
    order: z.number().int().default(99),
    publishedAt: z.coerce.date(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().max(160).optional(),
    }).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(5).max(200),
    excerpt: z.string().min(20).max(500),
    hero: z.url(),
    author: z.string().default('Springbok Expeditions'),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().int().min(1).max(60).optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().max(160).optional(),
    }).optional(),
  }),
});

const lodges = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lodges' }),
  schema: z.object({
    name: z.string().min(2),
    location: z.string(),
    summary: z.string().min(20).max(500),
    hero: z.url(),
    roomCount: z.number().int().optional(),
    bestFor: z.array(z.string()).default([]),
    priceTier: z.enum(['$', '$$', '$$$', '$$$$']).default('$$$'),
    publishedAt: z.coerce.date(),
  }),
});

const kiliDay = z.object({
  day: z.number().int().min(1).max(21),
  title: z.string().min(3),
  elevation: z.string(),
  timeWalking: z.string(),
  terrain: z.string(),
  description: z.string().min(10),
  accommodation: z.string(),
  meals: z.enum(['B', 'L', 'D', 'BL', 'LD', 'BD', 'BLD']),
});

const kilimanjaro = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/kilimanjaro' }),
  schema: z.object({
    name: z.string().min(2),
    tagline: z.string().min(2),
    summary: z.string().min(50).max(500),
    description: z.string().optional(),
    hero: z.url(),
    gallery: z.array(z.url()).default([]),
    successRate: z.string(),
    durationDays: z.number().int().min(5).max(10),
    difficulty: z.enum(['moderate', 'challenging', 'strenuous', 'expert']),
    scenery: z.number().int().min(1).max(5),
    traffic: z.enum(['quiet', 'moderate', 'busy', 'very-busy']),
    accommodation: z.enum(['huts', 'tents', 'mixed']),
    bestMonths: z.array(z.string()).min(2),
    startPoint: z.string(),
    endPoint: z.string(),
    highlights: z.array(z.string()).min(3),
    itinerary: z.array(kiliDay).min(5),
    inclusions: z.array(z.string()).min(3),
    exclusions: z.array(z.string()).min(2),
    priceFromUSD: z.number().int().positive(),
    priceNote: z.string().optional(),
    order: z.number().int().default(99),
    publishedAt: z.coerce.date(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().max(160).optional(),
    }).optional(),
  }),
});

export const collections = { tours, destinations, experiences, blog, lodges, kilimanjaro };
