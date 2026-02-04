import crypto from "crypto"

type SigningInput = {
  method: string
  host: string
  path: string
  region: string
  accessKeyId: string
  secretAccessKey: string
  headers?: Record<string, string>
  query?: Record<string, string>
  expires?: number
}

const ALGORITHM = "AWS4-HMAC-SHA256"

const encodeRfc3986 = (value: string) =>
  encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)

const toAmzDate = (date: Date) => {
  const iso = date.toISOString().replace(/[:-]|\.\d{3}/g, "")
  return `${iso.slice(0, 8)}T${iso.slice(8, 14)}Z`
}

const toDateStamp = (amzDate: string) => amzDate.slice(0, 8)

const hashSha256 = (payload: string) => crypto.createHash("sha256").update(payload).digest("hex")

const hmac = (key: crypto.BinaryLike, data: string) => crypto.createHmac("sha256", key).update(data).digest()

const getSigningKey = (secretAccessKey: string, dateStamp: string, region: string) => {
  const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp)
  const kRegion = hmac(kDate, region)
  const kService = hmac(kRegion, "s3")
  return hmac(kService, "aws4_request")
}

const canonicalizeHeaders = (headers: Record<string, string>) => {
  const normalized = Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value.trim().replace(/\s+/g, " ")])
  normalized.sort(([a], [b]) => a.localeCompare(b))
  const canonical = normalized.map(([key, value]) => `${key}:${value}\n`).join("")
  const signedHeaders = normalized.map(([key]) => key).join(";")
  return { canonical, signedHeaders }
}

const canonicalizeQuery = (query: Record<string, string>) => {
  const pairs = Object.entries(query).map(([key, value]) => [encodeRfc3986(key), encodeRfc3986(value)])
  pairs.sort(([a], [b]) => (a === b ? 0 : a < b ? -1 : 1))
  return pairs.map(([key, value]) => `${key}=${value}`).join("&")
}

const encodeS3Path = (path: string) => path.split("/").map(encodeRfc3986).join("/")

export const createPresignedS3Url = (input: SigningInput) => {
  const {
    method,
    host,
    path,
    region,
    accessKeyId,
    secretAccessKey,
    headers = {},
    query = {},
    expires = 3600,
  } = input

  const now = new Date()
  const amzDate = toAmzDate(now)
  const dateStamp = toDateStamp(amzDate)
  const scope = `${dateStamp}/${region}/s3/aws4_request`

  const { canonical, signedHeaders } = canonicalizeHeaders(headers)
  const baseQuery = {
    "X-Amz-Algorithm": ALGORITHM,
    "X-Amz-Credential": `${accessKeyId}/${scope}`,
    "X-Amz-Date": amzDate,
    "X-Amz-Expires": String(expires),
    "X-Amz-SignedHeaders": signedHeaders,
    ...query,
  }

  const canonicalQuery = canonicalizeQuery(baseQuery)
  const canonicalRequest = [
    method,
    encodeS3Path(path),
    canonicalQuery,
    canonical,
    signedHeaders,
    "UNSIGNED-PAYLOAD",
  ].join("\n")

  const stringToSign = [ALGORITHM, amzDate, scope, hashSha256(canonicalRequest)].join("\n")
  const signature = crypto.createHmac("sha256", getSigningKey(secretAccessKey, dateStamp, region)).update(stringToSign).digest("hex")

  const finalQuery = `${canonicalQuery}&X-Amz-Signature=${signature}`
  return `https://${host}${encodeS3Path(path)}?${finalQuery}`
}

export const signS3Request = (input: SigningInput) => {
  const { method, host, path, region, accessKeyId, secretAccessKey, headers = {}, query = {} } = input
  const now = new Date()
  const amzDate = toAmzDate(now)
  const dateStamp = toDateStamp(amzDate)
  const scope = `${dateStamp}/${region}/s3/aws4_request`
  const payloadHash = hashSha256("")

  const requestHeaders = {
    host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDate,
    ...headers,
  }

  const { canonical, signedHeaders } = canonicalizeHeaders(requestHeaders)
  const canonicalQuery = canonicalizeQuery(query)
  const canonicalRequest = [method, encodeS3Path(path), canonicalQuery, canonical, signedHeaders, payloadHash].join("\n")
  const stringToSign = [ALGORITHM, amzDate, scope, hashSha256(canonicalRequest)].join("\n")
  const signature = crypto.createHmac("sha256", getSigningKey(secretAccessKey, dateStamp, region)).update(stringToSign).digest("hex")

  const authorization = `${ALGORITHM} Credential=${accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  return { headers: { ...requestHeaders, Authorization: authorization } }
}
