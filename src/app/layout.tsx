import type { Metadata } from "next";
import { Righteous, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from "@/components/analytics";

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
  title: "Ladventure | Weekend trips, planned properly.",
  description: "The easiest way to plan group trips. Hotels, activities, and transport sorted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${righteous.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
