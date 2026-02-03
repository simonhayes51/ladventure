import { Hero } from "@/components/sections/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Examples } from "@/components/sections/examples";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <HowItWorks />
      <Examples />
      <Pricing />
      <Testimonials />
      <CtaSection />
    </>
  );
}
