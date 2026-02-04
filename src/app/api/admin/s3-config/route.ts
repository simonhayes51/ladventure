import { S3Client, HeadBucketCommand } from "@aws-sdk/client-s3"

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
      const client = new S3Client({
        region,
        credentials: { accessKeyId, secretAccessKey },
      })
      await client.send(new HeadBucketCommand({ Bucket: bucket }))
      healthy = true
    } catch (e: any) {
      healthy = false
      error = e?.name || "S3Error"
    }
  }

  return new Response(JSON.stringify({ configured, host, region, healthy, error }), { status: 200 })
}
