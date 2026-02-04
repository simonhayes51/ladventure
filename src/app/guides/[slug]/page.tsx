import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getGuideBySlug } from "@/lib/guides"
import Image from "next/image"
import Script from "next/script"

export const dynamic = "force-dynamic"

type GuidePageProps = {
  params: { slug: string }
}

// ---------- Metadata ----------
export async function generateMetadata(
  { params }: GuidePageProps
): Promise<Metadata> {
  const guide = await getGuideBySlug(params.slug)

  if (!guide) {
    return {
      title: "Guide | Ladventure",
      description: "Travel guides and weekend trip ideas",
    }
  }

  const url = `https://ladventure.co.uk/guides/${guide.slug}`

  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      url,
      siteName: "Ladventure",
      type: "article",
      images: [
        {
          url: guide.heroImage,
          width: 1400,
          height: 788,
          alt: guide.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
      images: [guide.heroImage],
    },
  }
}

// ---------- Page ----------
export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  return (
    <main className="bg-background">

      {/* SEO Structured Data */}
      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://ladventure.co.uk/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Guides",
              item: "https://ladventure.co.uk/guides",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: guide.title,
              item: `https://ladventure.co.uk/guides/${guide.slug}`,
            },
          ],
        })}
      </Script>

      {/* Hero */}
      <section className="py-20 border-b-4 border-foreground">
        <div className="container mx-auto px-4">

          <p className="text-xs font-bold uppercase text-muted-foreground">
            {guide.location}
          </p>

          <h1 className="text-4xl md:text-6xl font-black uppercase text-primary mb-6">
            {guide.title}
          </h1>

          <p className="text-lg max-w-3xl">
            {guide.excerpt}
          </p>

        </div>
      </section>

      {/* Image + Highlights */}
      <section className="py-16 border-b-4 border-foreground">
        <div className="container mx-auto px-4 grid lg:grid-cols-[1.6fr_1fr] gap-10">

          <div>
            <div className="aspect-[16/9] border-4 border-foreground overflow-hidden">

              <Image
                src={guide.heroImage}
                alt={guide.heroAlt}
                width={1400}
                height={788}
                priority
                className="object-cover w-full h-full"
              />

            </div>
          </div>

          <aside className="border-4 border-foreground bg-white p-6">

            <h2 className="text-2xl font-bold uppercase text-primary mb-4">
              Highlights
            </h2>

            <ul className="space-y-3">
              {guide.highlights.map((item) => (
                <li key={item}>✔️ {item}</li>
              ))}
            </ul>

          </aside>

        </div>
      </section>

      {/* Itinerary */}
      <section className="py-16 bg-secondary/10 border-b-4 border-foreground">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold uppercase text-primary mb-8">
            Sample itinerary
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {guide.itinerary.map((item) => (
              <div
                key={item.title}
                className="bg-white border-2 border-foreground p-6"
              >
                <h3 className="text-xl font-bold mb-2">
                  {item.title}
                </h3>

                <p>{item.detail}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Gallery + FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-[1.4fr_1fr] gap-10">

          {/* Gallery */}
          <div className="border-2 border-foreground bg-white p-6">

            <h2 className="text-2xl font-bold uppercase text-primary mb-4">
              Gallery
            </h2>

            <div className="grid grid-cols-2 gap-4">

              {(guide.gallery ?? [guide.heroImage])
                .slice(0, 4)
                .map((src) => (
                  <div
                    key={src}
                    className="aspect-[4/3] overflow-hidden border-2 border-foreground"
                  >
                    <Image
                      src={src}
                      alt={guide.heroAlt}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}

            </div>

          </div>

          {/* FAQ */}
          <div className="border-2 border-foreground bg-white p-6">

            <h2 className="text-2xl font-bold uppercase text-primary mb-4">
              FAQs
            </h2>

            <div className="space-y-4">

              {guide.faq.map((item) => (
                <div key={item.question}>
                  <p className="font-bold">{item.question}</p>
                  <p>{item.answer}</p>
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

    </main>
  )
}
