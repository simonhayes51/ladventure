import fs from "node:fs/promises"
import path from "node:path"

const dataPath = path.join(process.cwd(), "data", "guides.json")

function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || ""
  return cookie.includes("admin=1")
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }
  try {
    const content = await fs.readFile(dataPath, "utf-8")
    return new Response(JSON.stringify({ guides: JSON.parse(content) }), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ guides: [] }), { status: 200 })
  }
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }
  try {
    const payload = await request.json()
    const content = await fs.readFile(dataPath, "utf-8").catch(() => "[]")
    const guides = JSON.parse(content) as any[]
    const existingIndex = guides.findIndex((g) => g.slug === payload.slug)
    if (existingIndex >= 0) {
      guides[existingIndex] = { ...guides[existingIndex], ...payload }
    } else {
      guides.push(payload)
    }
    await fs.writeFile(dataPath, JSON.stringify(guides, null, 2), "utf-8")
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 })
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
    const content = await fs.readFile(dataPath, "utf-8").catch(() => "[]")
    const guides = JSON.parse(content) as any[]
    const filtered = guides.filter((g) => g.slug !== slug)
    await fs.writeFile(dataPath, JSON.stringify(filtered, null, 2), "utf-8")
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 })
  }
}
