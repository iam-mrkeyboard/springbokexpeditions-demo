import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

// ─── Tours ────────────────────────────────────────────────────────────────
const tourSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  summary: z.string(),
  type: z.enum(['safari', 'kilimanjaro', 'zanzibar', 'cultural', 'migration', 'honeymoon', 'family', 'day-trip', 'meru']),
  styles: z.array(z.enum(['luxury', 'mid-range', 'budget'])).min(1),
  badges: z.array(z.string()).optional().default([]),
  durationDays: z.number().int().positive(),
  difficulty: z.enum(['easy', 'moderate', 'challenging', 'strenuous']).optional(),
  hero: z.string(),
  gallery: z.array(z.string()).optional().default([]),
  highlights: z.array(z.string()),
  itinerary: z.array(z.object({
    day: z.number().int().positive(),
    title: z.string(),
    body: z.string(),
    meals: z.string().optional(),
    accommodation: z.string().optional(),
    activities: z.array(z.string()).optional(),
  })),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  bestSeason: z.array(z.string()),
  destinations: z.array(z.string()),
  experiences: z.array(z.string()),
  groupSize: z.string(),
  startEnd: z.string().optional(),
  publishedAt: z.union([z.string(), z.date()]).optional(),
  featured: z.boolean().default(false),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
}).catchall(z.any());

// ─── Destinations ─────────────────────────────────────────────────────────
const destinationSchema = z.object({
  name: z.string(),
  region: z.string(),
  summary: z.string(),
  hero: z.string(),
  gallery: z.array(z.string()).optional().default([]),
  wildlife: z.array(z.object({
    name: z.string(),
    fact: z.string(),
  })).optional().default([]),
  bestTime: z.array(z.object({
    month: z.string(),
    rating: z.enum(['high', 'med', 'low']),
  })).optional().default([]),
  attractions: z.array(z.string()).optional().default([]),
  gettingThere: z.string().optional(),
  publishedAt: z.union([z.string(), z.date()]).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
}).catchall(z.any());

// ─── Blog ─────────────────────────────────────────────────────────────────
const blogSchema = z.object({
  title: z.string(),
  excerpt: z.string().optional(),
  hero: z.string().optional(),
  author: z.string().optional(),
  publishedAt: z.union([z.string(), z.date()]).optional(),
  tags: z.array(z.string()).optional().default([]),
  readingTime: z.number().optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
}).catchall(z.any());

// ─── Kilimanjaro routes ───────────────────────────────────────────────────
const kilimanjaroSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  hero: z.string().optional(),
  gallery: z.array(z.string()).optional().default([]),
  successRate: z.string().optional(),
  durationDays: z.number().optional(),
  difficulty: z.string().optional(),
  scenery: z.number().optional(),
  traffic: z.string().optional(),
  accommodation: z.string().optional(),
  bestMonths: z.array(z.string()).optional().default([]),
  startPoint: z.string().optional(),
  endPoint: z.string().optional(),
  highlights: z.array(z.string()).optional().default([]),
}).catchall(z.any());

// ─── Trekking itineraries (Kilimanjaro, Meru, etc.) ───────────────────────
const trekkingSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  summary: z.string().optional(),
  route: z.string(),
  mountain: z.enum(['kilimanjaro', 'meru']),
  hero: z.string().optional(),
  gallery: z.array(z.string()).optional().default([]),
  successRate: z.string().optional(),
  durationDays: z.number().int().positive(),
  difficulty: z.enum(['easy', 'moderate', 'challenging', 'strenuous']).optional(),
  accommodation: z.string().optional(),
  bestMonths: z.array(z.string()).optional().default([]),
  highlights: z.array(z.string()).optional().default([]),
  inclusions: z.array(z.string()).optional().default([]),
  exclusions: z.array(z.string()).optional().default([]),
  itinerary: z.array(z.object({
    day: z.number().int().positive(),
    title: z.string(),
    elevation: z.string().optional(),
    timeWalking: z.string().optional(),
    terrain: z.string().optional(),
    description: z.string(),
    accommodation: z.string().optional(),
    meals: z.string().optional(),
  })).optional().default([]),
  order: z.number().optional(),
  publishedAt: z.union([z.string(), z.date()]),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
}).catchall(z.any());

// ─── Experiences ──────────────────────────────────────────────────────────
const experienceSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  hero: z.string().optional(),
  icon: z.string().optional(),
  bestMonths: z.array(z.string()).optional().default([]),
  durationDays: z.number().optional(),
  priceFromUSD: z.number().optional(),
  priceNote: z.string().optional(),
  highlights: z.array(z.string()).optional().default([]),
  sampleItinerary: z.array(z.any()).optional().default([]),
}).catchall(z.any());

// ─── Activities ───────────────────────────────────────────────────────────
const activitySchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  hero: z.string().optional(),
  icon: z.string().optional(),
  bestMonths: z.array(z.string()).optional().default([]),
  duration: z.string().optional(),
  location: z.string().optional(),
  highlights: z.array(z.string()).optional().default([]),
  order: z.number().optional(),
}).catchall(z.any());

// ─── Testimonials ─────────────────────────────────────────────────────────
const testimonialSchema = z.object({
  name: z.string(),
  initials: z.string().optional(),
  location: z.string().optional(),
  rating: z.number(),
  date: z.string(),
  travelerType: z.string(),
  guide: z.string().optional(),
  featured: z.boolean().default(false),
}).catchall(z.any());

// ─── Collection definitions ──────────────────────────────────────────────
const tours = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tours' }),
  schema: tourSchema,
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/destinations' }),
  schema: destinationSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

const kilimanjaro = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/kilimanjaro' }),
  schema: kilimanjaroSchema,
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experiences' }),
  schema: experienceSchema,
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
  schema: activitySchema,
});

const trekking = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/trekking' }),
  schema: trekkingSchema,
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonials' }),
  schema: testimonialSchema,
});

export const collections = {
  tours,
  destinations,
  blog,
  kilimanjaro,
  experiences,
  activities,
  trekking,
  testimonials,
};
