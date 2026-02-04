import { signS3Request } from "@/lib/aws-signature"

export async function GET(request: Request) {
  const bucket = process.env.S3_BUCKET || null
  const region = process.env.S3_REGION || null
  const accessKeyId = process.env.S3_ACCESS_KEY_ID || null
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || null
  const host = process.env.NEXT_PUBLIC_S3_HOST || null
  const configured = !!bucket && !!region && !!accessKeyId && !!secretAccessKey

  let healthy: boolean | null = null
  let error: string | null = null

  if (configured && bucket && region && accessKeyId && secretAccessKey) {
    try {
      const host = `${bucket}.s3.${region}.amazonaws.com`
      const { headers } = signS3Request({
        method: "HEAD",
        host,
        path: "/",
        region,
        accessKeyId,
        secretAccessKey,
      })
      const response = await fetch(`https://${host}/`, { method: "HEAD", headers })
      healthy = response.ok
      if (!response.ok) {
        error = `HTTP${response.status}`
      }
    } catch (e: any) {
      healthy = false
      error = e?.name || "S3Error"
    }
  }

  return new Response(JSON.stringify({ configured, host, region, healthy, error }), { status: 200 })
}
