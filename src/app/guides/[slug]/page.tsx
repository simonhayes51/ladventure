import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { guides } from "@/lib/guides"

type GuidePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)

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

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = guides.find((item) => item.slug === slug)

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
          <p className="text-lg text-foreground font-medium max-w-3xl">{guide.summary}</p>
        </div>
      </section>

      <section className="py-14 md:py-20 border-b-4 border-foreground">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
          <div className="space-y-6">
            <div className="aspect-[16/9] border-4 border-foreground overflow-hidden retro-shadow-sm bg-muted/40">
              <img src={guide.heroImage} alt={guide.heroAlt} className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-foreground bg-white p-5 retro-shadow-sm">
                <h2 className="text-xl font-bold uppercase text-primary mb-2">Trip snapshot</h2>
                <p className="text-foreground font-medium">{guide.excerpt}</p>
              </div>
              <div className="border-2 border-foreground bg-white p-5 retro-shadow-sm">
                <h2 className="text-xl font-bold uppercase text-primary mb-2">Best for</h2>
                <p className="text-foreground font-medium">
                  Groups who want clarity, fast planning, and a schedule that keeps everyone together.
                </p>
              </div>
            </div>
          </div>

          <div className="border-4 border-foreground bg-white p-6 retro-shadow">
            <h2 className="text-2xl font-bold uppercase text-primary mb-4">Highlights</h2>
            <ul className="space-y-3 text-foreground font-medium">
              {guide.highlights.map((item: string) => (
                <li key={item}>✔️ {item}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-dashed border-foreground pt-4">
              <p className="text-sm font-bold uppercase text-muted-foreground">Need this tailored?</p>
              <p className="text-foreground font-medium">
                Send your dates, group size, and budget to info@ladventure.co.uk.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/10 border-b-4 border-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-primary mb-8 retro-text-shadow">
            Sample itinerary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.itinerary.map((item) => (
              <div key={item.title} className="bg-white border-2 border-foreground p-6 retro-shadow-sm">
                <h3 className="text-xl font-bold uppercase text-primary mb-2">{item.title}</h3>
                <p className="text-foreground font-medium">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="border-2 border-foreground bg-white p-6 retro-shadow-sm">
            <h2 className="text-2xl font-bold uppercase text-primary mb-4">Photo spaces</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/3] bg-muted/40 border-2 border-foreground flex items-center justify-center text-sm font-bold uppercase text-muted-foreground">
                Photo placeholder
              </div>
              <div className="aspect-[4/3] bg-muted/40 border-2 border-foreground flex items-center justify-center text-sm font-bold uppercase text-muted-foreground">
                Photo placeholder
              </div>
              <div className="aspect-[4/3] bg-muted/40 border-2 border-foreground flex items-center justify-center text-sm font-bold uppercase text-muted-foreground">
                Photo placeholder
              </div>
              <div className="aspect-[4/3] bg-muted/40 border-2 border-foreground flex items-center justify-center text-sm font-bold uppercase text-muted-foreground">
                Photo placeholder
              </div>
            </div>
          </div>
          <div className="border-2 border-foreground bg-white p-6 retro-shadow-sm">
            <h2 className="text-2xl font-bold uppercase text-primary mb-4">FAQs</h2>
            <div className="space-y-4">
              {guide.faq.map((item) => (
                <div key={item.question}>
                  <p className="font-bold uppercase text-foreground">{item.question}</p>
                  <p className="text-foreground font-medium">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
