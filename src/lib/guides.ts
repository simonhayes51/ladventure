export type Guide = {
  slug: string
  title: string
  excerpt: string
  location: string
  heroImage: string
  heroAlt: string
  summary: string
  highlights: string[]
  itinerary: { title: string; detail: string }[]
  faq: { question: string; answer: string }[]
}

export const guides: Guide[] = [
  {
    slug: "prague-lads-weekend",
    title: "Prague lads weekend",
    excerpt: "Nightlife, beer halls, and a plan that keeps everyone on budget.",
    location: "Prague",
    heroImage:
      "https://images.unsplash.com/photo-1541849548-216549ae216d?auto=format&fit=crop&w=1400&q=80",
    heroAlt: "Prague skyline at sunset",
    summary:
      "A high-energy weekend with iconic bars, smart logistics, and a schedule that keeps the group together.",
    highlights: [
      "Central stay near Old Town Square",
      "Two-night nightlife plan with pre-booked tables",
      "Morning recovery route with coffee + brunch spots",
    ],
    itinerary: [
      {
        title: "Day 1: Arrival + old town warm-up",
        detail:
          "Meet at the hotel, quick walking loop to get bearings, then early dinner and a curated bar crawl.",
      },
      {
        title: "Day 2: Experiences + night out",
        detail:
          "Choose between beer spa or shooting range, then dinner bookings and a club plan with transport mapped.",
      },
      {
        title: "Day 3: Chill + departures",
        detail: "Slow brunch, souvenir stop, and a clear airport transfer plan.",
      },
    ],
    faq: [
      {
        question: "Is this plan budget friendly?",
        answer: "Yes — the itinerary is built around your per-person budget and capped options.",
      },
      {
        question: "Can we swap in different activities?",
        answer: "Absolutely. We tailor the schedule to your vibe and energy levels.",
      },
    ],
  },
  {
    slug: "peak-district-pub-hike",
    title: "Peak District pub hike",
    excerpt: "A fresh-air reset with mapped trails, stops, and transport sorted.",
    location: "Peak District",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    heroAlt: "Peak District hills and countryside",
    summary:
      "A relaxed UK weekend with scenic hikes, cosy pubs, and logistics that keep the group on time.",
    highlights: [
      "Circular hike with three pub stops",
      "Minibus transport from major UK cities",
      "Group-friendly accommodation with social space",
    ],
    itinerary: [
      {
        title: "Day 1: Arrival + village dinner",
        detail:
          "Check in, settle in, and kick off with a reserved table and local ale tasting.",
      },
      {
        title: "Day 2: Full hike loop",
        detail:
          "Guided route map, lunch stop booking, and optional short route for mixed fitness levels.",
      },
      {
        title: "Day 3: Easy morning + depart",
        detail: "Coffee, optional scenic walk, and timed transport home.",
      },
    ],
    faq: [
      {
        question: "Is the route beginner friendly?",
        answer: "Yes — we offer multiple route lengths and clear regroup points.",
      },
      {
        question: "Do we need cars?",
        answer: "No. We can arrange group transport or train-friendly plans.",
      },
    ],
  },
  {
    slug: "lisbon-long-weekend",
    title: "Lisbon long weekend",
    excerpt: "Sun, seafood, and smart logistics for mixed groups.",
    location: "Lisbon",
    heroImage:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1400&q=80",
    heroAlt: "Lisbon rooftops and tram",
    summary:
      "A balanced long weekend that blends sun, culture, and nightlife with a manageable pace.",
    highlights: [
      "Stay in Bairro Alto with walkable hotspots",
      "Beach half-day with transfers sorted",
      "Dining plan with seafood, tapas, and late-night bites",
    ],
    itinerary: [
      {
        title: "Day 1: Arrival + sunset spots",
        detail:
          "Drop bags, take in the views, and ease into a casual dinner and rooftop drinks.",
      },
      {
        title: "Day 2: City + beach split",
        detail:
          "Morning tram tour and pastries, afternoon beach time with transport timing included.",
      },
      {
        title: "Day 3: Culture + nightlife",
        detail: "Museum or market choice, then a night out plan with backups.",
      },
      {
        title: "Day 4: Final stroll",
        detail: "Coffee run, last-minute shopping, and airport transfer plan.",
      },
    ],
    faq: [
      {
        question: "Can we make it more nightlife focused?",
        answer: "Yes — we can increase nightlife options and adjust daytime pacing.",
      },
      {
        question: "Is this suitable for mixed ages?",
        answer: "Definitely. We balance activities so everyone stays included.",
      },
    ],
  },
]
