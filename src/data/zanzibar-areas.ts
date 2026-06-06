export type ZanzibarRegion =
  | 'Stone Town'
  | 'North Coast'
  | 'Northeast Coast'
  | 'East Coast'
  | 'South Coast'
  | 'West Coast'
  | 'Inland';

export type MonthRating = 'high' | 'med' | 'low';

export interface ZanzibarArea {
  slug: string;
  name: string;
  region: ZanzibarRegion;
  tagline: string;
  description: string;
  hero: string;
  gallery: string[];
  bestFor: string[];
  highlights: string[];
  attractions: string[];
  bestTime: { month: string; rating: MonthRating }[];
  accommodation: string;
  gettingThere: string;
  order: number;
  orderOnMap?: { x: number; y: number };
}

export const zanzibarAreas: ZanzibarArea[] = [
  {
    slug: 'stone-town',
    name: 'Stone Town',
    region: 'Stone Town',
    tagline: 'UNESCO old town — narrow alleys, carved doors, and the old slave market',
    description: 'Stone Town is the cultural heart of Zanzibar, a UNESCO World Heritage site of coral-rag buildings, intricately carved wooden doors, and a labyrinth of narrow alleys. Spend a day (or two) wandering the old quarter, visiting the former slave market, the Sultan\'s Palace, and the Old Fort, then eat dinner on the waterfront as the sun goes down over the Indian Ocean.',
    hero: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1920&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1601275253872-8470e23f0a96?w=1920&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1920&q=80&auto=format&fit=crop',
    ],
    bestFor: ['History', 'Architecture', 'Culture', 'Food', 'Photography', 'Sundowners'],
    highlights: [
      'UNESCO World Heritage old town — labyrinth of narrow alleys and carved wooden doors',
      'The former slave market and the Anglican Cathedral built on its site',
      'Sultan\'s Palace (Beit al-Ajaib) and the Old Fort, both 17th–19th century',
      'Forodhani Gardens night market — seafood, sugarcane juice, and Zanzibar pizza',
      'Sunset dhow cruises from the waterfront',
      'Roof-top restaurants overlooking the Indian Ocean',
    ],
    attractions: ['Sultan\'s Palace', 'Old Fort', 'Former Slave Market', 'Forodhani Gardens', 'House of Wonders', 'Jaws Corner', 'Darajani Market', 'Old Dispensary'],
    bestTime: [
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' }, { month: 'October', rating: 'high' },
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
      { month: 'November', rating: 'med' },
    ],
    accommodation: 'Boutique hotels in restored merchant houses, plus a few international-standard hotels on the waterfront.',
    gettingThere: 'A 15–20 minute drive from Zanzibar International Airport (ZNZ). Most visitors stay 1–2 nights before or after a beach stay.',
    order: 1,
  },
  {
    slug: 'nungwi',
    name: 'Nungwi',
    region: 'North Coast',
    tagline: 'The northwest tip — sunset beach, dhow building, and lively evenings',
    description: 'Nungwi sits at the very northwest tip of Zanzibar, with a wide sandy beach that doesn\'t disappear at high tide (a rare thing on the east coast). It\'s the most developed of the beach villages, with a long stretch of resorts, restaurants, and beach bars, and it\'s the best place on the island to watch the sun set into the Indian Ocean.',
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&q=80&auto=format&fit=crop',
    ],
    bestFor: ['Sunsets', 'Beach bars', 'Swimming', 'Diving', 'Snorkeling', 'Lively atmosphere'],
    highlights: [
      'One of the few beaches on Zanzibar that doesn\'t disappear at high tide',
      'Spectacular sunset views — the only west-facing beach on the north',
      'Mnemba Atoll boat trips and dhow cruises depart from here',
      'Traditional dhow-building yard — watch craftsmen hand-build wooden boats',
      'Lively evening scene with beach BBQs, live music, and cocktail bars',
      'Good snorkeling and diving on the nearby reefs',
    ],
    attractions: ['Nungwi Beach', 'Nungwi Village', 'Dhow building yard', 'Mnemba Atoll trips', 'Nungwi lighthouse', 'Local fish market'],
    bestTime: [
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' }, { month: 'October', rating: 'high' },
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
      { month: 'November', rating: 'med' },
    ],
    accommodation: 'Wide range — from backpacker hostels to international 5-star resorts (The Z Hotel, Essque Zalu, Royal Zanzibar).',
    gettingThere: 'About 1.5 hours\' drive from Zanzibar airport or Stone Town. The road is paved the whole way.',
    order: 2,
  },
  {
    slug: 'kendwa',
    name: 'Kendwa',
    region: 'North Coast',
    tagline: 'The calm, no-tide beach just south of Nungwi',
    description: 'Kendwa is a small village just south of Nungwi, with the same wide white-sand beach and the same lack of tidal flat. Quieter and a bit more upmarket than Nungwi, Kendwa is where most of Zanzibar\'s high-end beach resorts are clustered. The shallow water, swaying palms, and gentle breezes make it the most popular honeymoon beach on the island.',
    hero: 'https://images.unsplash.com/photo-1559666126-84f389727b9a?w=1920&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1559666126-84f389727b9a?w=1920&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format&fit=crop',
    ],
    bestFor: ['Honeymoons', 'Luxury resorts', 'Calm swimming', 'Romance', 'Beach relaxation'],
    highlights: [
      'Wide white-sand beach with no tidal flats — swimable at any time of day',
      'Home to most of Zanzibar\'s luxury beach resorts (Gold, Kandelia, Melia)',
      'Calm, shallow water makes it ideal for couples and families',
      'Quieter than Nungwi but still has a handful of beach bars and restaurants',
      'Famous Kendwa Rocks full-moon parties on certain months',
      'Excellent sunset views from the west-facing beach',
    ],
    attractions: ['Kendwa Beach', 'Sunset cruises', 'Snorkeling at Kendwa Rocks', 'Beach horseback riding', 'Kayaking'],
    bestTime: [
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' }, { month: 'October', rating: 'high' },
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
      { month: 'November', rating: 'med' },
    ],
    accommodation: 'Luxury and upper-mid-range beach resorts dominate. Limited budget options.',
    gettingThere: 'About 1.5 hours\' drive from Zanzibar airport or Stone Town, then 5 minutes south of Nungwi.',
    order: 3,
  },
  {
    slug: 'matemwe',
    name: 'Matemwe',
    region: 'Northeast Coast',
    tagline: 'Quiet diving base on the doorstep of Mnemba Atoll',
    description: 'Matemwe is a string of small fishing villages along Zanzibar\'s northeast coast, looking out over the turquoise shallows that mark the edge of Mnemba Atoll. The diving and snorkeling here are the best on the island — Mnemba is a marine conservation area with year-round visibility, coral gardens, and regular dolphin and turtle encounters.',
    hero: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80&auto=format&fit=crop',
    ],
    bestFor: ['Diving', 'Snorkeling', 'Quiet beaches', 'Marine life', 'Mnemba Atoll'],
    highlights: [
      'Closest mainland access to Mnemba Atoll — the best dive site in East Africa',
      'Year-round visibility of 20–40m and regular dolphin and turtle encounters',
      'Quiet, low-key village atmosphere with a handful of small boutique lodges',
      'Excellent deep-sea fishing for marlin, sailfish, tuna, and wahoo',
      'Tidal beach — best for walking, swimming at high tide, and tide-pool exploring',
      'Authentic fishing village culture, with fishermen landing their catch each morning',
    ],
    attractions: ['Mnemba Atoll', 'Matemwe Beach', 'Dive centres', 'Fishing villages', 'Deep-sea fishing charters'],
    bestTime: [
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' }, { month: 'October', rating: 'high' },
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
      { month: 'November', rating: 'med' },
    ],
    accommodation: 'A handful of small, mid-range to upscale boutique lodges. Limited but excellent.',
    gettingThere: 'About 1.5 hours\' drive from Zanzibar airport or Stone Town.',
    order: 4,
  },
  {
    slug: 'paje',
    name: 'Paje',
    region: 'East Coast',
    tagline: 'Kitesurfing capital of East Africa',
    description: 'Paje is a small beach village on Zanzibar\'s east coast, famous throughout the kitesurfing world for its reliable side-shore winds from December to March and again from June to September. If you\'ve never kitesurfed, this is the place to learn. If you have, you already know about Paje.',
    hero: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80&auto=format&fit=crop',
    ],
    bestFor: ['Kitesurfing', 'Windsurfing', 'Beach bars', 'Young travellers', 'Backpackers'],
    highlights: [
      'East Africa\'s kitesurfing capital — reliable winds Dec–Mar and Jun–Sep',
      'Wide shallow lagoon makes it one of the best learner beaches in the world',
      'Multiple IKO-certified kitesurfing schools with the latest gear',
      'Lively backpacker scene with beach bars, hostels, and yoga',
      'Tidal beach — best for kitesurfing and walking; swimming at high tide',
      'Easy day trips to Jozani Forest, The Rock restaurant, and Paje\'s seaweed farms',
    ],
    attractions: ['Paje Beach', 'Kitesurfing schools', 'Seaweed farms', 'Jozani Forest (nearby)', 'The Rock restaurant (nearby)'],
    bestTime: [
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' },
      { month: 'October', rating: 'med' }, { month: 'November', rating: 'med' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
    ],
    accommodation: 'Mid-range beach lodges, hostels, and a few boutique hotels. Less luxury than Nungwi/Kendwa.',
    gettingThere: 'About 1 hour\'s drive from Zanzibar airport or Stone Town.',
    order: 5,
  },
  {
    slug: 'jambiani',
    name: 'Jambiani',
    region: 'East Coast',
    tagline: 'Authentic fishing village with a quiet, community feel',
    description: 'Jambiani is what Paje was ten years ago — a working fishing village on Zanzibar\'s southeast coast, with a beautiful long beach, a few small guesthouses, and a strong sense of community. The pace is slower, the seaweed farms are still working, and the evenings are quiet. A good choice for travellers who want a real slice of Zanzibar life without the kitesurfing crowds.',
    hero: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1920&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1920&q=80&auto=format&fit=crop',
    ],
    bestFor: ['Quiet beach', 'Authentic culture', 'Seaweed farms', 'Community tourism', 'Slow travel'],
    highlights: [
      'Authentic working fishing village with traditional dhow building',
      'Long, quiet beach with no large resorts — mostly small guesthouses',
      'Famous for its seaweed farming, mainly run by local women',
      'Excellent low-tide reef walking — see starfish, sea cucumbers, and small reef fish',
      'Strong community-tourism initiatives: village tours, cooking classes, school visits',
      'Easy day trips to Paje (15 min) and Jozani Forest (20 min)',
    ],
    attractions: ['Jambiani Beach', 'Seaweed farms', 'Reef walking at low tide', 'Village tours', 'Fishing dhow trips'],
    bestTime: [
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' }, { month: 'October', rating: 'high' },
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
      { month: 'November', rating: 'med' },
    ],
    accommodation: 'Small guesthouses and mid-range boutique lodges. A few standout eco-lodges.',
    gettingThere: 'About 1 hour 15 minutes\' drive from Zanzibar airport or Stone Town.',
    order: 6,
  },
  {
    slug: 'jozani-forest',
    name: 'Jozani Forest',
    region: 'Inland',
    tagline: 'Zanzibar\'s only national park — home of the red colobus monkey',
    description: 'Jozani-Chwaka Bay National Park is Zanzibar\'s only national park, a 50 km² reserve of coral-rag forest, mangrove boardwalk, and swamp. The star attraction is the Zanzibar red colobus monkey, found nowhere else on Earth. A 45-minute guided walk through the forest is a half-day must-do for any first-time visitor to the island.',
    hero: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&auto=format&fit=crop',
    gallery: [],
    bestFor: ['Wildlife', 'Nature walks', 'Photography', 'Conservation', 'Family-friendly'],
    highlights: [
      'Zanzibar\'s only national park — 50 km² of coral-rag forest and mangrove',
      'The Zanzibar red colobus monkey, found nowhere else on Earth',
      'Guided 45-minute forest walk with a local naturalist guide',
      'Mangrove boardwalk through the Chwaka Bay tidal forest',
      'Easy half-day trip from Stone Town, Paje, or any east-coast beach',
      'Good for families — short, easy trail, plenty of monkey viewing',
    ],
    attractions: ['Red colobus monkeys', 'Mangrove boardwalk', 'Naturalist-guided forest walk', 'Butterflies', 'Native sycamore fig trees'],
    bestTime: [
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' }, { month: 'October', rating: 'high' },
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
      { month: 'November', rating: 'med' },
    ],
    accommodation: 'Day trip only — most visitors return to Stone Town, Paje, or Jambiani.',
    gettingThere: 'About 30–45 minutes\' drive from Stone Town, 20 minutes from Paje or Jambiani.',
    order: 7,
  },
  {
    slug: 'prison-island',
    name: 'Prison Island (Changuu)',
    region: 'West Coast',
    tagline: 'A 30-minute boat ride — giant tortoises and clear shallows',
    description: 'Prison Island (Changuu Island) sits 5 km northwest of Stone Town, a 30-minute dhow ride from the Zanzibar waterfront. The island\'s 19th-century "prison" was never actually used as one — the British built it as a quarantine station for yellow fever cases, then abandoned it. Today the main attractions are the 100+-year-old giant Aldabra tortoises and a small sandy beach for swimming and snorkeling.',
    hero: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80&auto=format&fit=crop',
    gallery: [],
    bestFor: ['Half-day trip', 'Giant tortoises', 'Snorkeling', 'History', 'Family-friendly'],
    highlights: [
      '30-minute dhow ride from Stone Town — perfect half-day trip',
      'Home to over 100 giant Aldabra tortoises, some over 100 years old',
      'Snorkel in the clear water off the island\'s reef',
      'Explore the abandoned 19th-century "prison" building',
      'Optional combination with snorkel at the nearby Bawe Island reef',
      'Best done in the morning — most visitors return to Stone Town for lunch',
    ],
    attractions: ['Giant tortoises', 'Abandoned prison building', 'Snorkeling', 'Dhow ride from Stone Town'],
    bestTime: [
      { month: 'June', rating: 'high' }, { month: 'July', rating: 'high' }, { month: 'August', rating: 'high' },
      { month: 'September', rating: 'high' }, { month: 'October', rating: 'high' },
      { month: 'December', rating: 'high' }, { month: 'January', rating: 'high' }, { month: 'February', rating: 'high' },
      { month: 'March', rating: 'med' }, { month: 'April', rating: 'low' }, { month: 'May', rating: 'low' },
      { month: 'November', rating: 'med' },
    ],
    accommodation: 'Day trip only — return to Stone Town for the night.',
    gettingThere: '30-minute dhow ride from Stone Town waterfront. Most hotels and tour operators can arrange a half-day trip.',
    order: 8,
  },
];

export const zanzibarAreaBySlug = (slug: string): ZanzibarArea | undefined =>
  zanzibarAreas.find((a) => a.slug === slug);

export const zanzibarRegions = (): ZanzibarRegion[] => {
  const set = new Set<ZanzibarRegion>();
  zanzibarAreas.forEach((a) => set.add(a.region));
  return Array.from(set);
};
