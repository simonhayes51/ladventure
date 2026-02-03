"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingModal } from "@/components/booking-modal"

const examples = [
  {
    title: "The Cotswolds Retreat",
    image: "https://www.walkersbritain.co.uk/croppedImages/Europe/England-_-UK/Cotswolds-Stills-Tim-Charody-59-7160267-350px.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Relaxed", "Foodie", "Scenic"],
    price: "From £300pp",
    description: "A charming weekend in honey-coloured villages with gastropub dinners and gentle country walks.",
    fullDetails: {
      itinerary: [
        { day: "Friday", desc: "Arrival at luxury cottage. Private chef dinner with local produce." },
        { day: "Saturday", desc: "Guided scenic walk to Stow-on-the-Wold. Pub lunch. Gin tasting session." },
        { day: "Sunday", desc: "Lazy brunch. Visit to Daylesford Farm. Departure." }
      ],
      included: ["2 nights luxury accommodation", "Private Chef Dinner", "Gin Tasting", "Local Guide"]
    }
  },
  {
    title: "Peak District Adventure",
    image: "https://images.unsplash.com/photo-1508898160914-22d73397980e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Hiking", "Pubs", "Active"],
    price: "From £250pp",
    description: "Rugged landscapes, serious hiking routes, and rewarding pints by the fire in traditional inns.",
    fullDetails: {
      itinerary: [
        { day: "Friday", desc: "Check-in to bunkhouse/lodge. Welcome drinks and pub dinner." },
        { day: "Saturday", desc: "Guided hike up Mam Tor. Picnic lunch. Craft beer brewery tour." },
        { day: "Sunday", desc: "Short recovery walk. Roast dinner. Departure." }
      ],
      included: ["2 nights lodge accommodation", "Guided Hikes", "Brewery Tour", "All Transport"]
    }
  },
  {
    title: "Brighton Coastal Escape",
    image: "https://images.unsplash.com/photo-1594916894370-5b23d9a334c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Nightlife", "Beach", "Culture"],
    price: "From £280pp",
    description: "Seaside fun, vibrant lanes shopping, and electric nightlife for a high-energy group weekend.",
    fullDetails: {
      itinerary: [
        { day: "Friday", desc: "Seafront hotel check-in. Cocktail masterclass. Club entry." },
        { day: "Saturday", desc: "Beach yoga (or lie-in). Lanes shopping treasure hunt. Seafood dinner." },
        { day: "Sunday", desc: "i360 Flight. Fish & Chips on the pier. Departure." }
      ],
      included: ["2 nights hotel", "Cocktail Masterclass", "Club Entry", "Treasure Hunt"]
    }
  },
]

export function Examples() {
  const [selectedTrip, setSelectedTrip] = useState<typeof examples[0] | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const openBooking = () => {
    // Keep the trip details open or close them? 
    // Maybe close details and open booking.
    setIsBookingOpen(true)
  }

  return (
    <section id="examples" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Retro Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-4 retro-text-shadow">
            Example Trips
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            See what’s possible. Every trip is unique, but here’s some inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((trip, index) => (
            <div 
              key={index} 
              className="group relative bg-white border-4 border-foreground retro-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedTrip(trip)}
            >
              <div className="relative h-48 w-full overflow-hidden border-b-4 border-foreground">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 z-10 bg-secondary border-2 border-foreground px-3 py-1 text-sm font-bold text-secondary-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {trip.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2 uppercase">{trip.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {trip.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs font-bold bg-muted text-muted-foreground border border-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-foreground font-medium">{trip.description}</p>
                <div className="mt-4 text-accent font-bold uppercase text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Details <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trip Details Modal */}
      <AnimatePresence>
        {selectedTrip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTrip(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
                className="relative w-full max-w-2xl bg-white border-4 border-foreground p-0 retro-shadow-accent shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col"
              >
                <div className="relative h-64 w-full shrink-0 border-b-4 border-foreground">
                   <Image
                      src={selectedTrip.image}
                      alt={selectedTrip.title}
                      fill
                      className="object-cover"
                   />
                   <button
                    onClick={() => setSelectedTrip(null)}
                    className="absolute top-4 right-4 p-2 bg-white border-2 border-foreground hover:bg-red-500 hover:text-white transition-colors z-20"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-0 left-0 bg-primary text-white px-6 py-2 border-t-4 border-r-4 border-foreground">
                    <h3 className="text-2xl font-bold uppercase">{selectedTrip.title}</h3>
                  </div>
                </div>
                
                <div className="p-8 space-y-8">
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-4 text-accent border-b-2 border-accent inline-block">The Plan</h4>
                    <div className="space-y-4">
                      {selectedTrip.fullDetails.itinerary.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-24 shrink-0 font-bold text-primary">{item.day}</div>
                          <div className="text-foreground">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold uppercase mb-4 text-secondary-foreground border-b-2 border-secondary inline-block">What's Included</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {selectedTrip.fullDetails.included.map((inc, idx) => (
                         <div key={idx} className="flex items-center gap-2">
                           <div className="p-1 bg-green-100 border border-green-800 text-green-800 rounded-none">
                             <Check className="w-3 h-3" />
                           </div>
                           <span className="font-medium">{inc}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center border-t-2 border-dashed border-gray-300">
                     <div className="text-2xl font-bold text-primary">{selectedTrip.price}</div>
                     <Button 
                       onClick={openBooking} 
                       className="retro-shadow-secondary hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                       size="lg"
                     >
                       Book This Trip
                     </Button>
                  </div>
                </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        prefilledDestination={selectedTrip?.title}
      />
    </section>
  )
}
