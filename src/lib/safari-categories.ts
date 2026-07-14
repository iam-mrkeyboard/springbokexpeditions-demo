import { getCollection } from 'astro:content';

export type TourCategory =
  | 'luxury'
  | 'mid-range'
  | 'budget'
  | 'honeymoon'
  | 'family'
  | 'migration'
  | 'photography'
  | 'birding'
  | 'cultural'
  | 'fly-in';

export interface SeasonNote {
  name: string;
  months: string;
  hook: string;
  body: string;
}

export interface WhenToGo {
  headline: string;
  intro: string;
  seasons: SeasonNote[];
  proTip: string;
}

export const CATEGORY_CONFIG: Record<TourCategory, {
  label: string;
  pluralLabel: string;
  experienceSlug: string;
  whenToGo: WhenToGo;
}> = {
  luxury: {
    label: 'Luxury Safari',
    pluralLabel: 'Luxury Safaris',
    experienceSlug: 'luxury-safari',
    whenToGo: {
      headline: 'Two windows of absolute exclusivity',
      intro: 'Luxury safaris are less about a single "best month" and more about matching exclusivity to the right migration phase. The northern Serengeti’s mobile camps fill 12–18 months out, so timing and booking strategy go hand in hand.',
      seasons: [
        {
          name: 'Peak season',
          months: 'July – September',
          hook: 'Mara River crossings at their most dramatic',
          body: 'The dry season concentrates game around water sources and delivers the iconic Mara River crossings in the northern Serengeti. Days are warm, mornings are cool, and the light is perfect for sundowners. This is when the top tented camps command their highest rates — and justify every dollar.',
        },
        {
          name: 'Secret season',
          months: 'November',
          hook: 'Five-star service, fraction of the crowd',
          body: 'The short rains green the bush, the dust settles, and Lake Manyara’s flamingos return. Many luxury lodges drop their rates while the service stays flawless. Savvy travelers call it the secret season — same private guides, same lodges, far fewer vehicles at sightings.',
        },
        {
          name: 'Intimate season',
          months: 'Late January – February',
          hook: 'Calving, predator action, and total privacy',
          body: 'The herds gather on the Ndutu plains for calving season. Mobile camps that follow the migration offer an intimate, front-row seat to newborn wildebeest and the predators that shadow them. Quieter, warmer, and arguably more emotional than the river crossings.',
        },
      ],
      proTip: 'Book northern Serengeti luxury camps 12–18 months ahead for August. The best mobile camps have fewer than ten tents and sell out first.',
    },
  },
  'mid-range': {
    label: 'Mid-Range Safari',
    pluralLabel: 'Mid-Range Safaris',
    experienceSlug: 'mid-range-safari',
    whenToGo: {
      headline: 'The sweet spot between value and spectacle',
      intro: 'Mid-range safaris deliver the same northern circuit parks as luxury trips — Tarangire, Ngorongoro, Serengeti — at a more accessible price. The trick is traveling on the shoulder edges of the dry season, when the wildlife is excellent but the peak-season premiums have not kicked in.',
      seasons: [
        {
          name: 'Best-value dry season',
          months: 'June & late September – October',
          hook: 'Dry-season game viewing without the July–August price surge',
          body: 'June is the dry season’s opening act: the Serengeti is still green, the Grumeti crossings begin, and lodges are priced below the July peak. Late September through October offers the same reliable wildlife as mid-summer, with thinner crowds and softer rates.',
        },
        {
          name: 'Calving season',
          months: 'January – February',
          hook: 'Thousands of births a day, moderate pricing',
          body: 'The southern Serengeti and Ndutu become the stage for the calving season — up to 8,000 wildebeest calves born daily, with lions, cheetahs, and hyenas following close behind. Green landscapes, warm days, and better lodge availability than the river-crossing months.',
        },
        {
          name: 'Shoulder value',
          months: 'November',
          hook: 'Short rains, fresh bush, smart-money pricing',
          body: 'Brief afternoon showers green the landscape and settle the dust. Wildlife viewing remains strong in Tarangire and Ngorongoro, and many mid-range lodges offer green-season rates. A strong pick for travelers who want value without committing to the full rainy season.',
        },
      ],
      proTip: 'If your dates are flexible, target the last two weeks of September. You still get the Mara River tail end, but lodges drop from their August highs.',
    },
  },
  budget: {
    label: 'Budget Safari',
    pluralLabel: 'Budget Safaris',
    experienceSlug: 'budget-safari',
    whenToGo: {
      headline: 'Travel when the parks are empty and the rates drop',
      intro: 'Budget safaris shine in the green season, when park gates are quiet, landscapes turn emerald, and camping or lodge rates fall by up to 40%. You trade perfect weather for unbeatable value — and with the right route, the game viewing is still excellent.',
      seasons: [
        {
          name: 'Green season savings',
          months: 'Late March – May',
          hook: 'Lowest prices of the year, lush scenery, no crowds',
          body: 'The long rains transform the Serengeti into a vivid green canvas. Rates drop dramatically, popular viewpoints are empty, and the photographic light is rich. Late March and May are the safer bets within this window; most camps stay open and the rains are lighter than April.',
        },
        {
          name: 'Short-rains value',
          months: 'November',
          hook: 'Brief showers, great visibility, budget-friendly rates',
          body: 'Rain usually comes as a single afternoon downpour, leaving the rest of the day clear. The dust settles, animals remain easy to spot, and pricing stays in low-season territory. Tarangire and Ngorongoro are especially reliable this month.',
        },
        {
          name: 'Avoid',
          months: 'April',
          hook: 'Heaviest rains; some lodges and roads close',
          body: 'April is the wettest month in northern Tanzania. Remote Serengeti tracks can become impassable and several budget camps close for maintenance. If your budget is tight, target late March or May instead for a better balance of price and reliability.',
        },
      ],
      proTip: 'Build a green-season route around Tarangire, Lake Manyara, and Ngorongoro — they stay accessible in rain and deliver excellent game per dollar.',
    },
  },
  honeymoon: {
    label: 'Honeymoon Safari',
    pluralLabel: 'Honeymoon Safaris',
    experienceSlug: 'honeymoon-safari',
    whenToGo: {
      headline: 'Romance needs the right light and the right crowd',
      intro: 'A honeymoon safari is about privacy, warm evenings, and experiences you will talk about for decades. The best windows pair reliable weather with lower crowd density — and leave room for a Zanzibar beach finale if you want one.',
      seasons: [
        {
          name: 'Classic romance',
          months: 'July – September',
          hook: 'Perfect weather, Mara crossings, and a Zanzibar beach finish',
          body: 'The dry season gives you cloudless skies, golden light, and the drama of the Mara River crossings. It is also the ideal window to combine a Serengeti safari with Zanzibar’s turquoise beaches — warm, dry, and honeymoon-perfect.',
        },
        {
          name: 'Intimate & warm',
          months: 'Late January – February',
          hook: 'Quieter plains and the miracle of calving season',
          body: 'The southern Serengeti is warm, green, and far less crowded than the peak dry season. Calving season adds raw, beautiful drama — new life on the plains against dramatic skies. A quieter, more intimate honeymoon with softer pricing.',
        },
        {
          name: 'Lush start',
          months: 'June',
          hook: 'Post-rains green, cool nights, pre-peak pricing',
          body: 'June sits right after the long rains and just before the July price jump. The bush is lush for portraits, nights are cool enough for fireside dinners, and the crowds have not yet arrived. A romantic, under-the-radar start to married life.',
        },
      ],
      proTip: 'Avoid April for honeymoons. Heavy, unpredictable rain can ground game drives and flights — not the kind of unforgettable you are aiming for.',
    },
  },
  family: {
    label: 'Family Safari',
    pluralLabel: 'Family Safaris',
    experienceSlug: 'family-safari',
    whenToGo: {
      headline: 'Align the calendar with school breaks and easy viewing',
      intro: 'Family safaris work best when school holidays overlap with dry, easy game viewing. The goal is short drives, guaranteed sightings, and lodges that welcome children — not marathon days in a safari vehicle.',
      seasons: [
        {
          name: 'Summer break',
          months: 'July – August',
          hook: 'Dry roads, animals at water, and family lodge programs',
          body: 'The northern-hemisphere summer break lines up perfectly with Tanzania’s dry season. Animals cluster around water sources, roads are easy, and many lodges run junior ranger programs. Malaria risk is lower too, which matters when traveling with children.',
        },
        {
          name: 'Festive season',
          months: 'Late December – early January',
          hook: 'Calving begins, warm weather, festive family atmosphere',
          body: 'The southern Serengeti starts calving around Christmas and New Year, giving families a front-row seat to one of nature’s great teaching moments. Lodges staff up for families, and the weather is warm and reliably dry.',
        },
        {
          name: 'Smart shoulder',
          months: 'Early June',
          hook: 'Green, uncrowded, mild, and more affordable',
          body: 'If your school calendar allows, early June is a hidden gem. The landscape is still green and beautiful, temperatures are comfortable, and rates sit below peak. Tarangire and Ngorongoro are especially rewarding for children this month.',
        },
      ],
      proTip: 'Ngorongoro Crater and Tarangire are the two best family parks — short drives, reliable Big Five sightings, and lodges that genuinely cater to children.',
    },
  },
  migration: {
    label: 'Migration Safari',
    pluralLabel: 'Migration Safaris',
    experienceSlug: 'great-migration-safari',
    whenToGo: {
      headline: 'Pick your phase — the migration never stays still',
      intro: 'The Great Migration is a year-round cycle, so the "best" time depends entirely on which chapter you want to witness. River crossings, calving, the westward push, and the return south each have their own window and their own drama.',
      seasons: [
        {
          name: 'River crossings',
          months: 'July – September',
          hook: 'The Mara River at its most chaotic and famous',
          body: 'Herds mass in the northern Serengeti and attempt the Mara River crossings. August is the single most dramatic month — crocodiles, dust, thundering wildebeest, and pure spectacle. September remains excellent as crowds begin to thin.',
        },
        {
          name: 'Calving season',
          months: 'December – March',
          hook: '8,000 calves a day and predator action everywhere',
          body: 'The herds settle on the short-grass plains of Ndutu and the southern Serengeti. Calving peaks in late January and February, drawing lions, cheetahs, and hyenas in huge numbers. This is the chapter for raw predator-prey drama.',
        },
        {
          name: 'Westward push',
          months: 'June',
          hook: 'Grumeti crossings with a fraction of the northern crowds',
          body: 'As the herds move into the western corridor, they cross the Grumeti River. The crossings are less famous than the Mara’s but still thrilling — and you will share them with far fewer vehicles. A strong choice for June travelers.',
        },
      ],
      proTip: 'Crossings are never guaranteed on a fixed date. Stay three or more nights in the right zone — Ndutu for calving, Kogatende for river crossings — rather than chasing a single overnight stop.',
    },
  },
  photography: {
    label: 'Photography Safari',
    pluralLabel: 'Photography Safaris',
    experienceSlug: 'photography-safari',
    whenToGo: {
      headline: 'Two completely different palettes, both extraordinary',
      intro: 'Photographers do not chase one perfect season. The dry season gives clarity, dust, and classic crossings; the green season gives storm light, saturated color, and intense behavior. Pick the palette that matches the story you want to tell.',
      seasons: [
        {
          name: 'Golden clarity',
          months: 'July – September',
          hook: 'Low humidity, dust, and iconic migration action',
          body: 'Clear skies, low humidity, and animals concentrated at water sources make this the classic wildlife photography window. The Mara River crossings add high drama, and the dust kicked up by herds creates golden-hour atmosphere.',
        },
        {
          name: 'Storm light',
          months: 'Late January – February',
          hook: 'Emerald plains, dramatic skies, and calving action',
          body: 'The green season turns the Serengeti emerald and fills the sky with layered clouds. Calving season delivers constant behavioral action — stalking cheetahs, protective wildebeest mothers, scavengers overhead. The contrast against a leopard’s coat is unbeatable.',
        },
        {
          name: 'Clear air',
          months: 'November',
          hook: 'Freshly washed landscapes and vivid color',
          body: 'After the short rains begin, the dust settles out of the air and visibility jumps. The bush is newly green, migratory birds arrive, and the light has a crystalline quality that works beautifully for both telephoto wildlife and wide landscapes.',
        },
      ],
      proTip: 'Be in the field at sunrise and sunset. Even the best camera cannot compensate for midday overhead light in Tanzania.',
    },
  },
  birding: {
    label: 'Birding Safari',
    pluralLabel: 'Birding Safaris',
    experienceSlug: 'birding-safari',
    whenToGo: {
      headline: 'When the migrants arrive, the bird list explodes',
      intro: 'Tanzania has over 1,100 bird species, and the list is at its most diverse when Palearctic migrants arrive and resident species shift into vivid breeding plumage. Wet-season birding is counterintuitive — and unbeatable.',
      seasons: [
        {
          name: 'Peak migrants',
          months: 'November – April',
          hook: 'European bee-eaters, Amur falcons, warblers, and breeding plumage',
          body: 'Migrants from Europe, Asia, and northern Africa flood into Tanzania. Resident species are nesting and displaying bright colors. Lake Manyara, Tarangire, and the Seronera Valley become birding hotspots, with guides tracking calls you would never identify alone.',
        },
        {
          name: 'Resident focus',
          months: 'June – October',
          hook: 'Raptors and waterbirds concentrated around shrinking water',
          body: 'The dry season pulls raptors, storks, and waterbirds toward the remaining water sources. It is also the easiest time to combine serious birding with classic mammal viewing — a strong choice for general naturalists, even if overall species diversity is lower.',
        },
        {
          name: 'Flamingo note',
          months: 'October – August',
          hook: 'Lake Manyara’s flamingos are present most of the year',
          body: 'Lake Manyara’s famous flamingo flocks are visible from roughly October through August. They migrate to Lake Natron to nest in August, so avoid late August and early September if flamingos are a must-have on your list.',
        },
      ],
      proTip: 'Pair Lake Manyara’s waterbirds with Tarangire’s endemics — Yellow-collared Lovebird, Ashy Starling — and the Usambara Mountains for forest endemics if you have extra days.',
    },
  },
  cultural: {
    label: 'Cultural Tanzania',
    pluralLabel: 'Cultural Tanzania',
    experienceSlug: 'cultural-tanzania',
    whenToGo: {
      headline: 'Year-round, but the dry seasons feel effortless',
      intro: 'Cultural experiences in northern Tanzania — Maasai bomas, Hadzabe hunter-gatherer walks, Mto wa Mbu village tours, and highland Chagga visits — do not depend on wildlife movements. They work in every month, but dry-season roads and paths make the logistics smoother.',
      seasons: [
        {
          name: 'Comfortable access',
          months: 'June – October',
          hook: 'Dust-free paths, easy village access, full community life',
          body: 'The long dry season makes travel between villages and parks straightforward. Walking paths are firm, roads are reliable, and outdoor activities — herding demonstrations, blacksmithing, traditional hut building — happen in comfortable temperatures.',
        },
        {
          name: 'Festival time',
          months: 'January – February',
          hook: 'Mwaka Kogwa and warm, dry village days',
          body: 'This is the shorter dry season and the time of Mwaka Kogwa, the Shirazi New Year festival on Zanzibar and in coastal communities. Village life is active, the weather is warm, and it pairs naturally with a safari circuit.',
        },
        {
          name: 'Rainy authenticity',
          months: 'March – May',
          hook: 'Active farms, fewer visitors, daily rhythms unchanged',
          body: 'The long rains green the highlands and make Mto wa Mbu’s banana and rice farms at their most photogenic. Maasai cattle herding continues daily regardless of weather, and the lower visitor numbers mean more intimate, unhurried village visits.',
        },
      ],
      proTip: 'A half-day stop at Mto wa Mbu fits naturally between Arusha and the parks — it sits directly on the northern circuit route and can be added to almost any itinerary without a detour.',
    },
  },
  'fly-in': {
    label: 'Fly-In Safari',
    pluralLabel: 'Fly-In Safaris',
    experienceSlug: 'fly-in-safari',
    whenToGo: {
      headline: 'Time-efficient safaris straight to the action',
      intro: 'Fly-in safaris bypass the long, bumpy road transfers from Arusha or Zanzibar, putting you directly in the heart of the Serengeti. Perfect for combining a short safari with a Zanzibar beach vacation.',
      seasons: [
        {
          name: 'Peak dry season',
          months: 'July – October',
          hook: 'Dry weather and Mara River crossings',
          body: 'The most popular time for fly-in safaris. Flights to Seronera or Kogatende airstrips are frequent, and you get immediate access to game drives without spending hours traveling on unpaved roads.',
        },
        {
          name: 'Calving season',
          months: 'January – March',
          hook: 'Wildebeest calving in the south',
          body: 'Flights connect Zanzibar and Arusha directly to the southern Serengeti airstrips. Ideal for watching newborn calves on the plains under beautifully dramatic skies.',
        },
        {
          name: 'Green season value',
          months: 'November – December & April – May',
          hook: 'Lush landscapes and low-season rates',
          body: 'Afternoon rains refresh the park. Flying in ensures you do not get stuck on wet roads, and lodges offer excellent low-season pricing.',
        },
      ],
      proTip: 'Pack light in soft-sided duffel bags. Small aircraft used for safari flights have strict baggage limits, usually 15kg per person.',
    },
  },
};

/**
 * Curated, hand-picked list of tour IDs for each category.
 * Each category shows exactly the count defined in the plan, no more, no less.
 * Order is intentional — most iconic / popular tours first.
 */
export const CATEGORY_TOURS: Record<TourCategory, string[]> = {
  luxury: [
    // custom-luxury removed per user request
    'western-serengeti-grumeti',
    'photography-safari',
    'northern-circuit-classic-luxury',
    'signature-northern-circuit-luxury',
    'mara-river-crossing-luxury',
  ],
  'mid-range': [
    'northern-circuit-classic',
    'signature-northern-circuit',
    'calving-migration-safari',
    'birding-safari',
    'cultural-tanzania',
    'mara-river-crossing',
    'family-safari',
    'walking-bush-safari',
    'cultural-walking-village',
    'tarangire-ngorongoro-midrange',
    'big-five-express',
    'tarangire-manyara',
  ],
  budget: [
    'budget-camping-safari',
    'signature-northern-circuit-budget',
    // ensure unique IDs for budget versions if needed
    'zanzibar-budget-island-hopping',
    'big-five-express-budget',
    'tarangire-manyara-budget',
  ],
  honeymoon: [
    'zanzibar-honeymoon',
    'honeymoon-safari-zanzibar',
    'southern-wilderness-zanzibar-honeymoon',
    'ultimate-bush-private-island-honeymoon',
  ],
  family: [
    'family-safari',
    'tarangire-ngorongoro-midrange',
    'big-five-express',
    'tarangire-manyara',
  ],
  migration: [
    'mara-river-crossing',
    'great-migration-6day',
    'calving-migration-safari',
    'calving-migration-5day',
    'calving-migration-6day',
    'calving-migration-8day',
    'western-serengeti-grumeti',
    'signature-northern-circuit',
  ],
  photography: [
    'photography-safari',
    'lens-express-photo-safari',
    'calving-season-photo-masterclass',
    'serengeti-shadows-photo-expedition',
  ],
  birding: [
    'birding-safari',
    'walking-bush-safari',
    'ruaha-nyerere-safari',
  ],
  cultural: [
    'cultural-tanzania',
    'cultural-walking-village',
    'northern-circuit-classic',
    'signature-northern-circuit',
  ],
  'fly-in': [
    'fly-in-safari-3day',
    'fly-in-safari-4day',
    'fly-in-safari-5day',
    'fly-in-safari-6day',
  ],
};

export function isValidCategory(slug: string): slug is TourCategory {
  return slug in CATEGORY_CONFIG;
}

export async function getToursForCategory(category: TourCategory) {
  const tours = await getCollection('tours');
  const ids = CATEGORY_TOURS[category] ?? [];
  return tours
    .filter((tour) => ids.includes(tour.id))
    .sort(
      (a, b) =>
        ids.indexOf(a.id) - ids.indexOf(b.id) ||
        a.data.title.localeCompare(b.data.title)
    );
}

export const ALL_CATEGORIES: TourCategory[] = [
  'luxury',
  'mid-range',
  'budget',
  'honeymoon',
  'family',
  'migration',
  'photography',
  'birding',
  'cultural',
  'fly-in',
];

export const TOUR_ALTERNATE_DURATIONS: Record<string, { label: string; id: string }[]> = {
  'calving-migration-5day': [
    { label: '5 Days', id: 'calving-migration-5day' },
    { label: '6 Days', id: 'calving-migration-6day' },
    { label: '7 Days', id: 'calving-migration-safari' },
    { label: '8 Days', id: 'calving-migration-8day' },
  ],
  'calving-migration-6day': [
    { label: '5 Days', id: 'calving-migration-5day' },
    { label: '6 Days', id: 'calving-migration-6day' },
    { label: '7 Days', id: 'calving-migration-safari' },
    { label: '8 Days', id: 'calving-migration-8day' },
  ],
  'calving-migration-safari': [
    { label: '5 Days', id: 'calving-migration-5day' },
    { label: '6 Days', id: 'calving-migration-6day' },
    { label: '7 Days', id: 'calving-migration-safari' },
    { label: '8 Days', id: 'calving-migration-8day' },
  ],
  'calving-migration-8day': [
    { label: '5 Days', id: 'calving-migration-5day' },
    { label: '6 Days', id: 'calving-migration-6day' },
    { label: '7 Days', id: 'calving-migration-safari' },
    { label: '8 Days', id: 'calving-migration-8day' },
  ],
  'great-migration-6day': [
    { label: '6 Days', id: 'great-migration-6day' },
    { label: '8 Days', id: 'mara-river-crossing' },
  ],
  'mara-river-crossing': [
    { label: '6 Days', id: 'great-migration-6day' },
    { label: '8 Days', id: 'mara-river-crossing' },
  ],
};
