import type { Metadata } from "next"
import { getGuides } from "@/lib/guides"
import { GuidesFilterGrid } from "@/components/guides/filter-grid"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Guides",
  description: "Location guides and group travel planning articles built for UK weekend trips.",
  alternates: {
    canonical: "/guides",
    languages: {
      "en-GB": "/guides",
      en: "/guides",
    },
  },
  keywords: ["travel guides", "group trip planning", "UK weekend destinations", "sample itineraries"],
}

export default async function GuidesPage() {
  const guides = (await getGuides()).filter((g) => g?.slug && typeof g.slug === "string")

  return (
    <div className="bg-background">
      <section className="py-20 md:py-28 border-b-4 border-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase text-primary mb-6 retro-text-shadow">
            Guides & inspiration
          </h1>
          <p className="text-lg text-foreground font-medium max-w-3xl">
            Built for SEO and scale — publish location guides, sample itineraries, and planning tips as the library grows.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <GuidesFilterGrid guides={guides} />
      </section>
    </div>
  )
}
