import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ladventure handles your data.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24">
      <h1 className="text-3xl font-black uppercase text-primary mb-6">Privacy Policy</h1>
      <div className="bg-white border-2 border-foreground retro-shadow p-6 space-y-4">
        <p className="text-foreground font-medium">
          We use your information to deliver trip planning services and respond to enquiries. We do not sell your data.
        </p>
        <p className="text-foreground font-medium">
          Contact: info@ladventure.co.uk
        </p>
      </div>
    </div>
  )
}
