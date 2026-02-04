import type { Metadata } from "next"
import Link from "next/link"
import { getGuides } from "@/lib/guides"
import Image from "next/image"

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
            Publish location guides, sample itineraries, and planning tips as the library grows.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const cardImage = (guide.gallery && guide.gallery[0]) || guide.heroImage

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="bg-white border-2 border-foreground p-6 retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
              >
                <div className="aspect-[16/9] border-2 border-foreground overflow-hidden mb-3">
                  <Image
                    src={cardImage}
                    alt={guide.heroAlt}
                    width={800}
                    height={450}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-xs font-bold uppercase text-muted-foreground">{guide.location}</p>
                <h2 className="text-2xl font-bold text-primary uppercase mt-2">{guide.title}</h2>
                <p className="text-foreground font-medium mt-3">{guide.excerpt}</p>
                <span className="mt-4 inline-block text-accent font-bold uppercase text-sm">
                  Read the guide →
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
