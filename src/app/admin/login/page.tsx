\"use client\"

import { useState } from \"react\"
import { useRouter } from \"next/navigation\"
import { Button } from \"@/components/ui/button\"

export default function AdminLoginPage() {
  const [password, setPassword] = useState(\"\")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const res = await fetch(\"/api/admin/login\", {
      method: \"POST\",
      headers: { \"Content-Type\": \"application/json\" },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push(\"/admin\")
      return
    }
    setError(\"Invalid password\")
  }

  return (
    <div className=\"container mx-auto px-4 md:px-6 py-24\">
      <div className=\"max-w-md mx-auto bg-white border-2 border-foreground retro-shadow p-6\">
        <h1 className=\"text-2xl font-bold uppercase text-primary mb-4\">Admin Login</h1>
        <form onSubmit={submit} className=\"space-y-4\">
          <div>
            <label className=\"text-sm font-bold uppercase\">Password</label>
            <input
              type=\"password\"
              className=\"mt-2 w-full border-2 border-foreground p-3 bg-background\"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type=\"submit\" className=\"w-full\">Login</Button>
          {error && <p className=\"text-red-600 font-medium\">{error}</p>}
        </form>
      </div>
    </div>
  )
}
