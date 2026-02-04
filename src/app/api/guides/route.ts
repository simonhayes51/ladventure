import { getGuides } from "@/lib/guides"
import { createPresignedS3Url } from "@/lib/aws-signature"

function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || ""
  return cookie.includes("admin=1")
}

async function writeGuidesToS3(guides: any[]) {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION
  const accessKeyId = process.env.S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
  const key = process.env.GUIDES_S3_KEY

  if (!bucket || !region || !accessKeyId || !secretAccessKey || !key) {
    throw new Error("S3 not configured for guides")
  }

  const host = `${bucket}.s3.${region}.amazonaws.com`
  const s3Path = `/${key}`
  const body = JSON.stringify(guides, null, 2)

  const url = createPresignedS3Url({
    method: "PUT",
    host,
    path: s3Path,
    region,
    accessKeyId,
    secretAccessKey,
    headers: {
      host,
      "content-type": "application/json",
    },
    expires: 60,
  })

  const put = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  })

  if (!put.ok) {
    const t = await put.text().catch(() => "")
    throw new Error(`Failed to write guides to S3: HTTP${put.status} ${t}`)
  }
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const guides = await getGuides()
  return new Response(JSON.stringify({ guides }), { status: 200 })
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  try {
    const payload = await request.json()

    if (!payload?.slug || typeof payload.slug !== "string" || payload.slug.trim().length < 3) {
      return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 })
    }

    const guides = await getGuides()
    const idx = guides.findIndex((g) => g.slug === payload.slug)

    if (idx >= 0) guides[idx] = { ...guides[idx], ...payload }
    else guides.push(payload)

    await writeGuidesToS3(guides)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Failed" }), { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const url = new URL(request.url)
  const slug = url.searchParams.get("slug")
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 })
  }

  try {
    const guides = await getGuides()
    const filtered = guides.filter((g) => g.slug !== slug)
    await writeGuidesToS3(filtered)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Failed" }), { status: 500 })
  }
}
