export type Guide = {
  slug: string
  title: string
  excerpt: string
  location: string
}

export const guides: Guide[] = [
  {
    slug: "prague-lads-weekend",
    title: "Prague lads weekend",
    excerpt: "Nightlife, beer halls, and a plan that keeps everyone on budget.",
    location: "Prague",
  },
  {
    slug: "peak-district-pub-hike",
    title: "Peak District pub hike",
    excerpt: "A fresh-air reset with mapped trails, stops, and transport sorted.",
    location: "Peak District",
  },
  {
    slug: "lisbon-long-weekend",
    title: "Lisbon long weekend",
    excerpt: "Sun, seafood, and smart logistics for mixed groups.",
    location: "Lisbon",
  },
]
