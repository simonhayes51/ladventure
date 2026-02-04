import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

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

  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  })
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType || "application/octet-stream",
    ACL: "public-read",
  })
  const url = await getSignedUrl(client, command, { expiresIn: 3600 })
  const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`
  return new Response(JSON.stringify({ url, publicUrl }), { status: 200 })
}
