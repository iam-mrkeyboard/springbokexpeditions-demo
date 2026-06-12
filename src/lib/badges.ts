export const STYLE_TIERS = {
  luxury: {
    label: 'Luxury',
    color: 'savannah',
    // Filled dark pill with gold accent — looks premium/embossed
    bg: 'bg-safari-900 text-savannah-300 ring-1 ring-savannah-500/40 shadow-sm',
    border: 'border-safari-700',
    accent: 'bg-safari-900 text-savannah-300',
    chip: 'bg-safari-900/95 text-savannah-300 ring-1 ring-savannah-400/50',
    icon: 'crown',
    description: 'Private guide, fly-in camps, all-inclusive premium',
    order: 1,
  },
  'mid-range': {
    label: 'Mid-Range',
    color: 'savannah',
    // Cream/gold pill — balanced, quality
    bg: 'bg-savannah-100 text-safari-800 ring-1 ring-savannah-300',
    border: 'border-savannah-300',
    accent: 'bg-savannah-500 text-white',
    chip: 'bg-savannah-500/95 text-safari-900 ring-1 ring-savannah-600/30',
    icon: 'tent',
    description: 'Quality camps, smaller groups, excellent value',
    order: 2,
  },
  budget: {
    label: 'Budget',
    color: 'dusk',
    // Warm neutral pill — earthy, authentic
    bg: 'bg-dusk-100 text-dusk-800 ring-1 ring-dusk-300',
    border: 'border-dusk-300',
    accent: 'bg-dusk-700 text-dusk-50',
    chip: 'bg-dusk-700/95 text-dusk-50 ring-1 ring-dusk-600/30',
    icon: 'compass',
    description: 'Camping or basic lodges, shared vehicle, authentic adventure',
    order: 3,
  },
} as const;

export const EXPERIENCE_BADGES = {
  'signature':                { label: 'Signature',         icon: 'sparkles',   chip: 'bg-safari-900/90 text-savannah-300 ring-1 ring-savannah-400/40', soft: 'bg-savannah-50 text-safari-800 ring-1 ring-savannah-200' },
  'balloon-safari':           { label: 'Balloon Safari',    icon: 'mountain',   chip: 'bg-sunset-500/90 text-white ring-1 ring-sunset-600/30',          soft: 'bg-sunset-50 text-sunset-800 ring-1 ring-sunset-200' },
  'fly-in':                   { label: 'Fly-In',            icon: 'plane',      chip: 'bg-safari-700/90 text-savannah-200 ring-1 ring-safari-600/30',   soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'fly-camping':              { label: 'Fly Camping',       icon: 'tent',       chip: 'bg-safari-600/90 text-savannah-100 ring-1 ring-safari-500/30',   soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'walking-safari':           { label: 'Walking Safari',    icon: 'footprints', chip: 'bg-dusk-800/90 text-dusk-50 ring-1 ring-dusk-700/30',            soft: 'bg-dusk-100 text-dusk-800 ring-1 ring-dusk-200' },
  'family-friendly':          { label: 'Family-Friendly',   icon: 'users',      chip: 'bg-sunset-400/90 text-white ring-1 ring-sunset-500/30',          soft: 'bg-sunset-50 text-sunset-700 ring-1 ring-sunset-200' },
  'honeymoon':                { label: 'Honeymoon',         icon: 'heart',      chip: 'bg-rose-700/90 text-rose-50 ring-1 ring-rose-600/30',            soft: 'bg-rose-50 text-rose-800 ring-1 ring-rose-200' },
  'photography':              { label: 'Photography Focus', icon: 'camera',     chip: 'bg-safari-900/90 text-savannah-300 ring-1 ring-savannah-400/40', soft: 'bg-savannah-50 text-safari-800 ring-1 ring-savannah-200' },
  'cultural':                 { label: 'Cultural Immersion',icon: 'users-round', chip: 'bg-dusk-700/90 text-dusk-50 ring-1 ring-dusk-600/30',           soft: 'bg-dusk-100 text-dusk-800 ring-1 ring-dusk-200' },
  'migration':                { label: 'Great Migration',   icon: 'compass',    chip: 'bg-sunset-600/90 text-white ring-1 ring-sunset-700/30',          soft: 'bg-sunset-50 text-sunset-800 ring-1 ring-sunset-200' },
  'calving':                  { label: 'Calving Season',    icon: 'sparkles',   chip: 'bg-sunset-500/90 text-white ring-1 ring-sunset-600/30',          soft: 'bg-sunset-50 text-sunset-800 ring-1 ring-sunset-200' },
  'river-crossing':           { label: 'River Crossing',    icon: 'mountain-snow', chip: 'bg-safari-800/90 text-savannah-200 ring-1 ring-safari-700/30',soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'rhino-tracking':           { label: 'Rhino Tracking',    icon: 'shield',     chip: 'bg-dusk-800/90 text-dusk-50 ring-1 ring-dusk-700/30',            soft: 'bg-dusk-100 text-dusk-800 ring-1 ring-dusk-200' },
  'night-drives':             { label: 'Night Game Drives', icon: 'moon',       chip: 'bg-safari-900/95 text-savannah-300 ring-1 ring-savannah-500/40', soft: 'bg-dusk-100 text-dusk-800 ring-1 ring-dusk-200' },
  'boat-safari':              { label: 'Boat Safari',       icon: 'anchor',     chip: 'bg-safari-700/90 text-savannah-100 ring-1 ring-safari-600/30',   soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'beach-extension':          { label: 'Beach Extension',   icon: 'sun',        chip: 'bg-savannah-500/90 text-safari-900 ring-1 ring-savannah-600/30', soft: 'bg-savannah-50 text-safari-800 ring-1 ring-savannah-200' },
  'accessible':               { label: 'Accessible',        icon: 'accessibility', chip:'bg-safari-600/90 text-white ring-1 ring-safari-500/30',         soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'private-guide':            { label: 'Private Guide',     icon: 'user-check', chip: 'bg-safari-800/90 text-savannah-200 ring-1 ring-safari-700/30',   soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'conservation':             { label: 'Conservation Focus',icon: 'leaf',       chip: 'bg-safari-700/90 text-savannah-100 ring-1 ring-safari-600/30',   soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'climb-high-sleep-low':     { label: 'Climb High, Sleep Low', icon: 'mountain-snow', chip: 'bg-dusk-800/90 text-dusk-50 ring-1 ring-dusk-700/30',       soft: 'bg-dusk-100 text-dusk-800 ring-1 ring-dusk-200' },
  'birding':                  { label: 'Birding',           icon: 'bird',       chip: 'bg-safari-600/90 text-savannah-100 ring-1 ring-safari-500/30',   soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'off-the-beaten-path':      { label: 'Off The Beaten Path',icon: 'binoculars', chip: 'bg-dusk-700/90 text-dusk-50 ring-1 ring-dusk-600/30',           soft: 'bg-dusk-100 text-dusk-800 ring-1 ring-dusk-200' },
  'express':                  { label: 'Express',           icon: 'zap',        chip: 'bg-sunset-500/90 text-white ring-1 ring-sunset-600/30',          soft: 'bg-sunset-50 text-sunset-800 ring-1 ring-sunset-200' },
  'extended':                 { label: 'Extended',          icon: 'calendar',   chip: 'bg-safari-700/90 text-savannah-200 ring-1 ring-safari-600/30',   soft: 'bg-safari-50 text-safari-800 ring-1 ring-safari-200' },
  'high-success-rate':        { label: 'High Summit Success',icon: 'trophy',     chip: 'bg-safari-900/95 text-savannah-300 ring-1 ring-savannah-400/40', soft: 'bg-savannah-50 text-safari-800 ring-1 ring-savannah-200' },
} as const;

export type StyleTier = keyof typeof STYLE_TIERS;
export type ExperienceBadge = keyof typeof EXPERIENCE_BADGES;

export function getStyleTier(tier: StyleTier) {
  return STYLE_TIERS[tier];
}

export function getExperienceBadge(badge: ExperienceBadge) {
  return EXPERIENCE_BADGES[badge];
}

export function getStyleTierOrder(tier: StyleTier): number {
  return STYLE_TIERS[tier].order;
}

export function getAllStyleTiers(): StyleTier[] {
  return Object.keys(STYLE_TIERS) as StyleTier[];
}

export function getAllExperienceBadges(): ExperienceBadge[] {
  return Object.keys(EXPERIENCE_BADGES) as ExperienceBadge[];
}

export function isValidStyleTier(tier: string): tier is StyleTier {
  return tier in STYLE_TIERS;
}

export function isValidExperienceBadge(badge: string): badge is ExperienceBadge {
  return badge in EXPERIENCE_BADGES;
}
