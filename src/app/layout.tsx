import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from "@/components/analytics";
import { Righteous, Space_Grotesk } from "next/font/google"
import { FloatingChat } from "@/components/floating-chat";

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ladventure.co.uk"),
  title: {
    default: "Ladventure | Tailored group trips, planned properly",
    template: "%s | Ladventure",
  },
  description:
    "Bespoke group weekend planning built around your budget, dates, and vibe. One flat fee. Zero commissions. Newcastle-based.",
  openGraph: {
    title: "Ladventure | Tailored group trips, planned properly",
    description:
      "Bespoke group weekend planning built around your budget, dates, and vibe. One flat fee. Zero commissions. Newcastle-based.",
    url: "https://ladventure.co.uk",
    siteName: "Ladventure",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ladventure | Tailored group trips, planned properly",
    description:
      "Bespoke group weekend planning built around your budget, dates, and vibe. One flat fee. Zero commissions. Newcastle-based.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "Ladventure",
                url: "https://ladventure.co.uk",
                areaServed: "UK",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Newcastle upon Tyne",
                  addressCountry: "GB",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                name: "Group weekend trip planning",
                serviceType: "Travel planning",
                provider: {
                  "@type": "Organization",
                  name: "Ladventure",
                },
                areaServed: "UK",
                offers: {
                  "@type": "Offer",
                  priceCurrency: "GBP",
                  price: "50",
                },
              },
            ]),
          }}
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col font-sans"
      >
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <FloatingChat />
        <Footer />
      </body>
    </html>
  );
}
