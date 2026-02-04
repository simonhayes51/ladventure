import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Personalization } from "@/components/sections/personalization";
import { TripBrief } from "@/components/sections/trip-brief";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { WhyUs } from "@/components/sections/why-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Examples } from "@/components/sections/examples";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustSignals } from "@/components/sections/trust-signals";
import { FounderNote } from "@/components/sections/founder-note";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Group travel planning for UK weekends",
  description:
    "Personalised group weekend itineraries with zero commission bias. Built for UK groups who want a clean, modern plan fast.",
  keywords: [
    "group travel planning",
    "UK weekend trips",
    "stag do planning",
    "lads weekend itinerary",
    "custom trip planner",
    "Newcastle travel planner",
  ],
};

export default function Home() {
  return (
    <>
      <Hero />
      <Personalization />
      <TripBrief />
      <WhatWeDo />
      <WhyUs />
      <HowItWorks />
      <Examples />
      <Pricing />
      <Testimonials />
      <TrustSignals />
      <FounderNote />
      <CtaSection />
    </>
  );
}
