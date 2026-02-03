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
        detail: "Easy morning, short scenic walk, then organised return transport.",
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
        detail: "Brunch, souvenir shopping, and organised airport transfers.",
      },
    ],
    faq: [
      {
        question: "Can we make it more nightlife focused?",
        answer: "Yes — we can increase nightlife options and adjust daytime pacing.",
      },
      {
        question: "Is Lisbon good for stag groups?",
        answer: "Yes. It’s affordable, sunny, and has strong nightlife without being rowdy.",
      },
    ],
  },
]
