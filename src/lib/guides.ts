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
    excerpt: "Cheap pints, big nights, and a plan that keeps the group together.",
    location: "Prague",
    heroImage:
      "https://images.unsplash.com/photo-1541849548-216549ae216d?auto=format&fit=crop&w=1400&q=80",
    heroAlt: "Prague old town skyline at sunset",
    summary:
      "A high-energy European weekend built around beer halls, nightlife, and simple logistics so no one gets lost or left behind.",
    highlights: [
      "Central hotel in Old Town or New Town",
      "Two-night nightlife plan with pre-booked entry",
      "Daytime recovery spots and beer gardens",
    ],
    itinerary: [
      {
        title: "Day 1: Arrival + first pints",
        detail:
          "Hotel check-in, Old Town walk, dinner booking, then local beer halls and bars to kick things off properly.",
      },
      {
        title: "Day 2: Castle views + big night",
        detail:
          "Morning walk over Charles Bridge and Prague Castle, Letná beer garden in the afternoon, then pre-drinks and club night.",
      },
      {
        title: "Day 3: Brunch + fly home",
        detail:
          "Late breakfast, river walk, souvenir stop, and organised transfer to the airport.",
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
        question: "Is Prague still cheap for groups?",
        answer:
          "Yes. Pints, food, and transport are still among the best value in Europe.",
      },
      {
        question: "Do we need to book clubs?",
        answer:
          "For groups, yes. We pre-arrange entry so you don’t waste time queuing.",
      },
    ],
  },

  {
    slug: "peak-district-pub-hike",
    title: "Peak District pub hike",
    excerpt: "Fresh air, proper walks, and perfectly timed pub stops.",
    location: "Peak District",
    heroImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    heroAlt: "Peak District hills and valleys",
    summary:
      "A classic UK lads weekend combining scenic hikes, countryside pubs, and simple transport so everyone stays on schedule.",
    highlights: [
      "Circular walking route with 2–3 pub stops",
      "Options for shorter and longer routes",
      "Village accommodation close to the trail",
    ],
    itinerary: [
      {
        title: "Day 1: Arrival + village night",
        detail:
          "Check in, unpack, then reserved pub table for dinner and a relaxed first night.",
      },
      {
        title: "Day 2: Main hike + pub loop",
        detail:
          "Guided route over Mam Tor and surrounding ridges, lunch stop booked, then walk back for dinner.",
      },
      {
        title: "Day 3: Coffee + depart",
        detail:
          "Easy morning, short scenic walk, then organised return transport.",
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
        question: "Do we need to be fit?",
        answer:
          "No. We offer different route lengths and regroup points for mixed abilities.",
      },
      {
        question: "What if the weather’s bad?",
        answer:
          "We adjust routes and pub stops to keep the day enjoyable whatever the conditions.",
      },
    ],
  },

  {
    slug: "lisbon-long-weekend",
    title: "Lisbon long weekend",
    excerpt: "Sun, rooftops, and nightlife with zero planning stress.",
    location: "Lisbon",
    heroImage:
      "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1400&q=80",
    heroAlt: "Lisbon rooftops and yellow tram",
    summary:
      "A sun-soaked long weekend mixing rooftop bars, waterfront spots, and nightlife with a relaxed daytime pace.",
    highlights: [
      "Central stay in Bairro Alto or Chiado",
      "Rooftop bars and riverfront nights",
      "Optional beach trip with transfers arranged",
    ],
    itinerary: [
      {
        title: "Day 1: Arrival + rooftops",
        detail:
          "Drop bags, walk through Bairro Alto, sunset drinks, and relaxed dinner bookings.",
      },
      {
        title: "Day 2: City + coast",
        detail:
          "Morning tram ride and pastries, afternoon beach visit or LX Factory, then big night out.",
      },
      {
        title: "Day 3: Culture + party",
        detail:
          "Alfama walk and viewpoints, seafood dinner, then late bars and clubs.",
      },
      {
        title: "Day 4: Wind down",
        detail:
          "Brunch, souvenir shopping, and organised airport transfers.",
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
        question: "Is Lisbon good for stag groups?",
        answer:
          "Yes. It’s affordable, sunny, and has strong nightlife without being rowdy.",
      },
      {
        question: "Can we focus more on nightlife?",
        answer:
          "Definitely. We can shift the balance toward late nights and relaxed mornings.",
      },
    ],
  },
]
