import { createPresignedS3Url } from "@/lib/aws-signature"

function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || ""
  return cookie.includes("admin=1")
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const { filename, contentType } = await request.json()
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION
  const accessKeyId = process.env.S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
  if (!bucket || !region || !accessKeyId || !secretAccessKey) {
    return new Response(JSON.stringify({ error: "S3 not configured" }), { status: 500 })
  }

  const safeName = String(filename || "upload").replace(/[^a-zA-Z0-9._-]/g, "_")
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`

  const host = `${bucket}.s3.${region}.amazonaws.com`
  const contentTypeValue = contentType || "application/octet-stream"
  const url = createPresignedS3Url({
    method: "PUT",
    host,
    path: `/${key}`,
    region,
    accessKeyId,
    secretAccessKey,
    headers: {
      host,
      "content-type": contentTypeValue,
      "x-amz-acl": "public-read",
    },
    expires: 3600,
  })
  const publicUrl = `https://${host}/${key}`
  return new Response(JSON.stringify({ url, publicUrl }), { status: 200 })
}
