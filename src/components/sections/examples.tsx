import Image from "next/image"
import { Badge } from "lucide-react" 
// Note: Lucide doesn't have a Badge component that renders a UI badge, it has a Badge icon. 
// I'll create a simple span for badges or use the icon if intended, but standard UI badge is just HTML/CSS.
// I'll just use standard HTML for badges.

const examples = [
  {
    title: "The Cotswolds Retreat",
    image: "https://images.unsplash.com/photo-1518623001395-1252423c0d0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Relaxed", "Foodie", "Scenic"],
    price: "From £300pp",
    description: "A charming weekend in honey-coloured villages with gastropub dinners and gentle country walks.",
  },
  {
    title: "Peak District Adventure",
    image: "https://images.unsplash.com/photo-1508898160914-22d73397980e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Hiking", "Pubs", "Active"],
    price: "From £250pp",
    description: " rugged landscapes, serious hiking routes, and rewarding pints by the fire in traditional inns.",
  },
  {
    title: "Brighton Coastal Escape",
    image: "https://images.unsplash.com/photo-1594916894370-5b23d9a334c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Nightlife", "Beach", "Culture"],
    price: "From £280pp",
    description: "Seaside fun, vibrant lanes shopping, and electric nightlife for a high-energy group weekend.",
  },
]

export function Examples() {
  return (
    <section id="examples" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
            Example Trips
          </h2>
          <p className="text-lg text-gray-600">
            See what’s possible. Every trip is unique, but here’s some inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((trip, index) => (
            <div key={index} className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary shadow-sm">
                  {trip.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{trip.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {trip.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">{trip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
