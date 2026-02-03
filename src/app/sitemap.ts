import type { MetadataRoute } from "next"
import { guides } from "@/lib/guides"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ladventure.co.uk"

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
    },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date(),
    })),
  ]
}
