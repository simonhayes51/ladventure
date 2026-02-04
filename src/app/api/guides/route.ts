import { NextResponse } from "next/server"
import { getAllGuides, getGuideBySlug } from "@/lib/guides" // adjust based on what you actually have

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")

  if (slug) {
    const guide = await getGuideBySlug(slug)
    return NextResponse.json({ guide })
  }

  const guides = await getAllGuides()
  return NextResponse.json({ guides })
}
