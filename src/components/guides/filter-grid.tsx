 "use client"
 
 import { useMemo, useState } from "react"
 import Link from "next/link"
 import Image from "next/image"
 import { Button } from "@/components/ui/button"
 import type { Guide } from "@/lib/guides"
 
 type Props = {
   guides: Guide[]
 }
 
 export function GuidesFilterGrid({ guides }: Props) {
   const [query, setQuery] = useState("")
   const [activeTags, setActiveTags] = useState<string[]>([])
 
   const allTags = useMemo(() => {
     const s = new Set<string>()
     guides.forEach((g) => (g.tags || []).forEach((t) => s.add(t)))
     return Array.from(s).sort((a, b) => a.localeCompare(b))
   }, [guides])
 
   const toggleTag = (tag: string) => {
     setActiveTags((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]))
   }
 
   const filtered = useMemo(() => {
     const q = query.trim().toLowerCase()
     return guides.filter((g) => {
       const textMatch =
         !q ||
         g.title.toLowerCase().includes(q) ||
         g.location.toLowerCase().includes(q) ||
         g.excerpt.toLowerCase().includes(q)
       const tagsMatch =
         activeTags.length === 0 || (g.tags || []).some((t) => activeTags.includes(t))
       return textMatch && tagsMatch
     })
   }, [guides, query, activeTags])
 
   return (
     <div className="space-y-6">
       <div className="container mx-auto px-4 md:px-6">
         <div className="bg-white border-2 border-foreground p-4 retro-shadow flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
           <input
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Filter by destination, title, or text…"
             className="w-full md:max-w-md border-2 border-foreground p-3 bg-background"
           />
           {allTags.length > 0 && (
             <div className="flex flex-wrap gap-2">
               {allTags.map((tag) => {
                 const active = activeTags.includes(tag)
                 return (
                   <Button
                     key={tag}
                     variant={active ? "default" : "outline"}
                     onClick={() => toggleTag(tag)}
                     className={active ? "bg-secondary text-secondary-foreground" : ""}
                   >
                     {tag}
                   </Button>
                 )
               })}
               {activeTags.length > 0 && (
                 <Button variant="destructive" onClick={() => setActiveTags([])}>
                   Clear Tags
                 </Button>
               )}
             </div>
           )}
         </div>
       </div>
 
       <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filtered.map((guide) => {
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
               {(guide.tags || []).length > 0 && (
                 <div className="mt-3 flex flex-wrap gap-2">
                   {(guide.tags || []).map((t) => (
                     <span key={t} className="text-xs uppercase px-2 py-1 border-2 border-foreground bg-background">
                       {t}
                     </span>
                   ))}
                 </div>
               )}
               <span className="mt-4 inline-block text-accent font-bold uppercase text-sm">Read the guide →</span>
             </Link>
           )
         })}
         {filtered.length === 0 && (
           <div className="md:col-span-3 border-2 border-foreground bg-white p-6 retro-shadow">
             <p className="font-medium">No guides match your filters.</p>
           </div>
         )}
       </div>
     </div>
   )
 }
