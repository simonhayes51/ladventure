import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { guides } from "@/lib/guides"

type GuidePageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = guides.find((item) => item.slug === params.slug)

  if (!guide) {
    return {
      title: "Guide",
    }
  }

  return {
    title: guide.title,
    description: guide.excerpt,
  }
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = guides.find((item) => item.slug === params.slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="bg-background">
      <section className="py-20 md:py-28 border-b-4 border-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-xs font-bold uppercase text-muted-foreground">{guide.location}</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase text-primary mb-6 retro-text-shadow">
            {guide.title}
          </h1>
          <p className="text-lg text-foreground font-medium max-w-3xl">
            {guide.excerpt} Full content will be added soon — the structure is ready for scalable SEO growth.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-primary">
            What we will cover
          </h2>
          <ul className="space-y-3 text-foreground font-medium">
            <li>✔️ Ideal group itineraries by budget and vibe</li>
            <li>✔️ Logistics plan for stays, transport, and bookings</li>
            <li>✔️ Activity picks with time blocks and meeting points</li>
            <li>✔️ Local tips to avoid tourist traps</li>
          </ul>
          <p className="text-foreground font-medium">
            Want this finished first? Send your group brief and we’ll prioritise the guide.
          </p>
        </div>
      </section>
    </div>
  )
}
