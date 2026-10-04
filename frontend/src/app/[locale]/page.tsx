import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { BrandTicker } from "@/components/home/BrandTicker";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { CTASection } from "@/components/layout/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <BrandTicker />
      <HowItWorks />
      <Features />
      <FeaturedCars />
      <CTASection />
    </>
  );
}