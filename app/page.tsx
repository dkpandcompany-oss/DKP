"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { OurProcess } from "@/components/OurProcess"
import { PricingSection } from "@/components/PricingSection"
import { WhoWeServeSection } from "@/components/WhoWeServeSection"
import { FAQSection } from "@/components/FAQSection"
import Hero from "@/components/Hero"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { isAdminEmail } from "@/lib/admin"

export default function Page() {
  const { user, loading } = useSupabaseAuth()
  const [isOpen,setIsOpen]=useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && isAdminEmail(user.email || '')) {
      router.push('/admin')
    }
  }, [user, loading, router])

  // Don't render content if redirecting admin user
  if (!loading && user && isAdminEmail(user.email || '')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#156d95] mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <ProductTeaserCard /> */}
      <Hero isOpen={isOpen} setIsOpen={setIsOpen} />
      <BankingScaleHero isOpen={isOpen} setIsOpen={setIsOpen} />
      <WhoWeServeSection />
      <OurProcess />
      <CaseStudiesCarousel />
      {/* <IntegrationCarousel /> */}
      <PricingSection />
      <FAQSection />
      
    </>
  )
}
