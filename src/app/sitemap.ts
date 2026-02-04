import type { MetadataRoute } from "next"
import { getGuides } from "@/lib/guides"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ladventure.co.uk"
  const guides = await getGuides()

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
