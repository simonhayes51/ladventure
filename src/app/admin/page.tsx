"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Guide = {
  slug: string
  title: string
  excerpt: string
  location: string
  heroImage: string
  heroAlt: string
  highlights?: string[]
  itinerary?: { title: string; detail: string }[]
  faq?: { question: string; answer: string }[]
  gallery?: string[]
}

type S3Status = {
  configured: boolean
  host: string | null
  region?: string | null
  healthy: boolean | null
  error: string | null
}

export default function AdminPage() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [form, setForm] = useState<Guide>({
    slug: "",
    title: "",
    excerpt: "",
    location: "",
    heroImage: "",
    heroAlt: "",
    highlights: [],
    itinerary: [],
    faq: [],
    gallery: [],
  })
  const [message, setMessage] = useState<string | null>(null)
  const [uploadingHero, setUploadingHero] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const slugExists = guides.some((g) => g.slug === form.slug) && form.slug.trim().length > 0
  const [galleryProgress, setGalleryProgress] = useState<{ done: number; total: number } | null>(null)
  const [s3, setS3] = useState<S3Status | null>(null)

  const loadGuides = async () => {
    const res = await fetch("/api/admin/guides")
    if (res.ok) {
      const data = await res.json()
      setGuides(data.guides)
    }
  }

  useEffect(() => {
    loadGuides()
    ;(async () => {
      const res = await fetch("/api/admin/s3-config")
      if (res.ok) {
        const data = await res.json()
        setS3(data)
      }
    })()
  }, [])

  const addGuide = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    const res = await fetch("/api/admin/guides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ slug: "", title: "", excerpt: "", location: "", heroImage: "", heroAlt: "", highlights: [], itinerary: [], faq: [], gallery: [] })
      setMessage("Guide saved")
      loadGuides()
      return
    }
    setMessage("Failed to save guide")
  }
  const deleteGuide = async (slug: string) => {
    setMessage(null)
    const res = await fetch(`/api/admin/guides?slug=${encodeURIComponent(slug)}`, { method: "DELETE" })
    if (res.ok) {
      setMessage("Guide deleted")
      loadGuides()
      return
    }
    setMessage("Failed to delete guide")
  }
  const editGuide = (g: Guide) => {
    setForm({
      slug: g.slug,
      title: g.title,
      excerpt: g.excerpt,
      location: g.location,
      heroImage: g.heroImage,
      heroAlt: g.heroAlt,
      highlights: g.highlights || [],
      itinerary: g.itinerary || [],
      faq: g.faq || [],
      gallery: g.gallery || [],
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const uploadHero = async (file: File) => {
    setUploadingHero(true)
    const sig = await fetch("/api/admin/upload-signed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    })
    if (!sig.ok) {
      setUploadingHero(false)
      setMessage("Hero upload failed")
      return
    }
    const { url, publicUrl } = await sig.json()
    const put = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    })
    setUploadingHero(false)
    if (put.ok) {
      setForm((f) => ({ ...f, heroImage: publicUrl }))
      setMessage("Hero image uploaded")
    } else {
      setMessage("Hero upload failed")
    }
  }
  const uploadGallery = async (file: File) => {
    setUploadingGallery(true)
    const sig = await fetch("/api/admin/upload-signed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    })
    if (!sig.ok) {
      setUploadingGallery(false)
      setMessage("Gallery upload failed")
      return
    }
    const { url, publicUrl } = await sig.json()
    const put = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    })
    setUploadingGallery(false)
    if (put.ok) {
      setForm((f) => ({ ...f, gallery: [...(f.gallery || []), publicUrl] }))
      setMessage("Gallery image uploaded")
    } else {
      setMessage("Gallery upload failed")
    }
  }
  const uploadGalleryFiles = async (files: FileList) => {
    setGalleryProgress({ done: 0, total: files.length })
    for (let i = 0; i < files.length; i++) {
      await uploadGallery(files[i])
      setGalleryProgress({ done: i + 1, total: files.length })
    }
    setUploadingGallery(false)
    setTimeout(() => setGalleryProgress(null), 1500)
  }
  const removeGalleryItem = (src: string) => {
    setForm((f) => ({ ...f, gallery: (f.gallery || []).filter((g) => g !== src) }))
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <h1 className="text-3xl font-black uppercase text-primary mb-6">Admin</h1>
      <div className="mb-4">
        {s3 ? (
          <div className="text-xs font-bold uppercase">
            <span className={`inline-block px-2 py-1 border-2 ${s3.healthy ? "border-green-600 text-green-700" : s3.healthy === false ? "border-red-600 text-red-700" : s3.configured ? "border-yellow-600 text-yellow-700" : "border-gray-400 text-gray-600"}`}>
              S3 {s3.healthy ? "OK" : s3.healthy === false ? "Error" : s3.configured ? "Configured" : "Not Configured"}
            </span>
            {s3.host && <span className="ml-2">Host {s3.host}</span>}
            {s3.region && <span className="ml-2">Region {s3.region}</span>}
            {s3.error && <span className="ml-2">Error {s3.error}</span>}
          </div>
        ) : (
          <div className="text-xs">Loading S3 status…</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border-2 border-foreground retro-shadow p-6">
          <h2 className="text-xl font-bold uppercase text-primary mb-4">Add guide</h2>
          <form onSubmit={addGuide} className="space-y-3">
            <div>
              <label className="text-sm font-bold uppercase">Slug</label>
              <input className="mt-1 w-full border-2 border-foreground p-3 bg-background" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              {slugExists && <p className="text-xs text-red-600 mt-1">Existing slug — saving will update this guide.</p>}
            </div>
            <div>
              <label className="text-sm font-bold uppercase">Title</label>
              <input className="mt-1 w-full border-2 border-foreground p-3 bg-background" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-bold uppercase">Excerpt</label>
              <input className="mt-1 w-full border-2 border-foreground p-3 bg-background" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-bold uppercase">Location</label>
                <input className="mt-1 w-full border-2 border-foreground p-3 bg-background" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-bold uppercase">Hero alt</label>
                <input className="mt-1 w-full border-2 border-foreground p-3 bg-background" value={form.heroAlt} onChange={(e) => setForm({ ...form, heroAlt: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold uppercase">Hero image URL</label>
              <input className="mt-1 w-full border-2 border-foreground p-3 bg-background" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} />
              <div className="mt-2 flex items-center gap-2">
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadHero(e.target.files[0])} />
                {uploadingHero && <span className="text-sm">Uploading…</span>}
              </div>
              {form.heroImage && (
                <div className="mt-2 border-2 border-foreground p-2">
                  <img src={form.heroImage} alt={form.heroAlt || "Hero image"} className="max-h-40 w-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-bold uppercase">Highlights</label>
              <div className="space-y-2 mt-2">
                {(form.highlights || []).map((h, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input className="flex-1 border-2 border-foreground p-2 bg-background" value={h} onChange={(e) => {
                      const arr = [...(form.highlights || [])]; arr[idx] = e.target.value; setForm({ ...form, highlights: arr })
                    }} />
                    <Button variant="destructive" onClick={() => {
                      const arr = [...(form.highlights || [])]; arr.splice(idx, 1); setForm({ ...form, highlights: arr })
                    }}>Remove</Button>
                  </div>
                ))}
                <Button onClick={() => setForm({ ...form, highlights: [...(form.highlights || []), ""] })}>Add Highlight</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-bold uppercase">Itinerary</label>
              <div className="space-y-2 mt-2">
                {(form.itinerary || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-foreground p-3 space-y-2"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", String(idx))
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const from = Number(e.dataTransfer.getData("text/plain"))
                      const to = idx
                      if (Number.isNaN(from) || from === to) return
                      const arr = [...(form.itinerary || [])]
                      const [cur] = arr.splice(from, 1)
                      arr.splice(to, 0, cur)
                      setForm({ ...form, itinerary: arr })
                    }}
                  >
                    <input className="w-full border-2 border-foreground p-2 bg-background" placeholder="Title" value={item.title} onChange={(e) => {
                      const arr = [...(form.itinerary || [])]; arr[idx] = { ...arr[idx], title: e.target.value }; setForm({ ...form, itinerary: arr })
                    }} />
                    <textarea className="w-full border-2 border-foreground p-2 bg-background" placeholder="Detail" rows={2} value={item.detail} onChange={(e) => {
                      const arr = [...(form.itinerary || [])]; arr[idx] = { ...arr[idx], detail: e.target.value }; setForm({ ...form, itinerary: arr })
                    }} />
                    <div className="flex gap-2">
                      <Button variant="destructive" onClick={() => {
                        const arr = [...(form.itinerary || [])]; arr.splice(idx, 1); setForm({ ...form, itinerary: arr })
                      }}>Remove</Button>
                    </div>
                  </div>
                ))}
                <Button onClick={() => setForm({ ...form, itinerary: [...(form.itinerary || []), { title: "", detail: "" }] })}>Add Itinerary Item</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-bold uppercase">FAQ</label>
              <div className="space-y-2 mt-2">
                {(form.faq || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-foreground p-3 space-y-2"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", String(idx))
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const from = Number(e.dataTransfer.getData("text/plain"))
                      const to = idx
                      if (Number.isNaN(from) || from === to) return
                      const arr = [...(form.faq || [])]
                      const [cur] = arr.splice(from, 1)
                      arr.splice(to, 0, cur)
                      setForm({ ...form, faq: arr })
                    }}
                  >
                    <input className="w-full border-2 border-foreground p-2 bg-background" placeholder="Question" value={item.question} onChange={(e) => {
                      const arr = [...(form.faq || [])]; arr[idx] = { ...arr[idx], question: e.target.value }; setForm({ ...form, faq: arr })
                    }} />
                    <textarea className="w-full border-2 border-foreground p-2 bg-background" placeholder="Answer" rows={2} value={item.answer} onChange={(e) => {
                      const arr = [...(form.faq || [])]; arr[idx] = { ...arr[idx], answer: e.target.value }; setForm({ ...form, faq: arr })
                    }} />
                    <div className="flex gap-2">
                      <Button variant="destructive" onClick={() => {
                        const arr = [...(form.faq || [])]; arr.splice(idx, 1); setForm({ ...form, faq: arr })
                      }}>Remove</Button>
                    </div>
                  </div>
                ))}
                <Button onClick={() => setForm({ ...form, faq: [...(form.faq || []), { question: "", answer: "" }] })}>Add FAQ Item</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-bold uppercase">Gallery image URLs (one per line)</label>
              <textarea className="mt-1 w-full border-2 border-foreground p-3 bg-background" rows={3} value={(form.gallery || []).join("\n")} onChange={(e) => setForm({ ...form, gallery: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} />
              <div className="mt-2 flex items-center gap-2">
                <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && uploadGalleryFiles(e.target.files)} />
                {uploadingGallery && <span className="text-sm">Uploading…</span>}
                {galleryProgress && <span className="text-sm">{galleryProgress.done}/{galleryProgress.total}</span>}
              </div>
              {(form.gallery || []).length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-bold uppercase mb-2">Gallery</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(form.gallery || []).map((src, idx) => (
                      <div
                        key={src}
                        className="border-2 border-foreground p-2"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("text/plain", String(idx))
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          const from = Number(e.dataTransfer.getData("text/plain"))
                          const to = idx
                          if (Number.isNaN(from) || from === to) return
                          const arr = [...(form.gallery || [])]
                          const [cur] = arr.splice(from, 1)
                          arr.splice(to, 0, cur)
                          setForm({ ...form, gallery: arr })
                        }}
                      >
                        <img src={src} alt="Gallery image" className="h-24 w-full object-cover mb-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-xs truncate mr-2">{src}</span>
                          <div className="flex gap-2">
                            <Button onClick={() => {
                              const arr = [...(form.gallery || [])]; const idx = arr.indexOf(src); if (idx <= 0) return; const [cur] = arr.splice(idx, 1); arr.splice(idx - 1, 0, cur); setForm({ ...form, gallery: arr })
                            }}>Up</Button>
                            <Button onClick={() => {
                              const arr = [...(form.gallery || [])]; const idx = arr.indexOf(src); if (idx < 0 || idx >= arr.length - 1) return; const [cur] = arr.splice(idx, 1); arr.splice(idx + 1, 0, cur); setForm({ ...form, gallery: arr })
                            }}>Down</Button>
                            <Button variant="destructive" onClick={() => removeGalleryItem(src)}>Remove</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">Save</Button>
            {message && <p className="text-sm">{message}</p>}
          </form>
        </div>

        <div className="bg-white border-2 border-foreground retro-shadow p-6">
          <h2 className="text-xl font-bold uppercase text-primary mb-4">Guides</h2>
          <div className="space-y-3">
            {guides.map((g) => (
              <div key={g.slug} className="border-2 border-foreground p-3">
                <p className="text-xs font-bold uppercase text-muted-foreground">{g.location}</p>
                <p className="font-bold">{g.title}</p>
                <p className="text-sm">{g.excerpt}</p>
                <a className="text-primary underline text-sm" href={`/guides/${g.slug}`}>View</a>
                <div className="mt-2">
                  <Button variant="destructive" onClick={() => deleteGuide(g.slug)}>Delete</Button>
                  <Button className="ml-2" onClick={() => editGuide(g)}>Edit</Button>
                </div>
              </div>
            ))}
            {guides.length === 0 && <p>No guides</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
