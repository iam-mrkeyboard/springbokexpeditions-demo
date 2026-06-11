import { defineCollection, z } from 'astro:content';
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
}).passthrough();

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
}).passthrough();

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
}).passthrough();

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
}).passthrough();

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
}).passthrough();

// ─── Testimonials ─────────────────────────────────────────────────────────
const testimonialSchema = z.object({
  name: z.string(),
  quote: z.string().optional(),
  body: z.string().optional(),
  author: z.string().optional(),
  location: z.string().optional(),
  rating: z.number().optional(),
  tourSlug: z.string().optional(),
}).passthrough();

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
  testimonials,
};
