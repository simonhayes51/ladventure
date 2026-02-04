import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookies used on Ladventure.",
  alternates: { canonical: "/cookies" },
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <h1 className="text-3xl font-black uppercase text-primary mb-6">Cookie Policy</h1>
      <div className="bg-white border-2 border-foreground retro-shadow p-6 space-y-4">
        <p className="text-foreground font-medium">
          We use essential cookies and analytics. You can disable non-essential cookies in your browser settings.
        </p>
      </div>
    </div>
  )
}
