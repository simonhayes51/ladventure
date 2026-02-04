import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules for using Ladventure.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <h1 className="text-3xl font-black uppercase text-primary mb-6">Terms of Service</h1>
      <div className="bg-white border-2 border-foreground retro-shadow p-6 space-y-4">
        <p className="text-foreground font-medium">
          By using Ladventure, you agree to our service terms. Trip plans are advisory and subject to availability and supplier policies.
        </p>
      </div>
    </div>
  )
}
