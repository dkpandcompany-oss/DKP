import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { OurProcess } from "@/components/OurProcess"
import { PricingSection } from "@/components/PricingSection"
import { WhoWeServeSection } from "@/components/WhoWeServeSection"
import { FAQSection } from "@/components/FAQSection"
import Hero from "@/components/Hero"

export default function Page() {
  return (
    <>
      {/* <ProductTeaserCard /> */}
      <Hero/>
      <BankingScaleHero />
      <WhoWeServeSection />
      <OurProcess />
      <CaseStudiesCarousel />
      <IntegrationCarousel />
      <PricingSection />
      <FAQSection />
      
    </>
  )
}
