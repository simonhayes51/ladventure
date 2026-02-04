import { NextResponse } from "next/server"
import { getGuides, getGuideBySlug } from "@/lib/guides"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")

  if (slug) {
    const guide = await getGuideBySlug(slug)
    return NextResponse.json({ guide })
  }

  const guides = await getGuides()
  return NextResponse.json({ guides })
}
