export async function POST(request: Request) {
  const { password } = await request.json()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword || password !== adminPassword) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }
  const headers = new Headers()
  headers.append(
    "Set-Cookie",
    `admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`
  )
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
}
