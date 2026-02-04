import fs from "node:fs/promises"
import path from "node:path"

export const runtime = "nodejs"

function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || ""
  return cookie.includes("admin=1")
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const form = await request.formData()
  const file = form.get("file")
  if (!file || !(file instanceof Blob)) {
    return new Response(JSON.stringify({ error: "Missing file" }), { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  await fs.mkdir(uploadsDir, { recursive: true })

  const originalName = (file as any).name || "upload"
  const ext = originalName.includes(".") ? originalName.split(".").pop() : "bin"
  const safeExt = (ext || "bin").toLowerCase()
  const filename = `guide-${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`
  const destPath = path.join(uploadsDir, filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  await fs.writeFile(destPath, buffer)

  const urlPath = `/uploads/${filename}`
  return new Response(JSON.stringify({ ok: true, path: urlPath }), { status: 200 })
}
