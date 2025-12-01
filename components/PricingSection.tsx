"use client"

import { useState } from "react"
import { ServiceCard } from "./pricing/ServiceCard"
import { ServiceModal } from "./pricing/ServiceModal"
import { AddOnsSection } from "./pricing/AddOnsSection"
import { BuildPackageDrawer } from "./pricing/BuildPackageDrawer"
import { SERVICES, Service } from "./pricing/data"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function PricingSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleViewDetails = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <section id="pricing" className="py-24 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-figtree text-[40px] font-normal text-[#111A4A] leading-tight mb-4">
            Choose a Service
          </h2>
          <p className="font-figtree text-lg text-slate-600 max-w-2xl mx-auto">
            Pick what you need — clear pricing, measurable results.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold text-[#111A4A]">Optional Add-ons</h3>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          <AddOnsSection />
        </div>

        {/* Custom Package CTA */}
        <div className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden mb-16 bg-[#111A4A]">
  {/* Radial background rings */}
  <div className="absolute inset-0">
    <div className="absolute -right-40 top-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0%,rgba(17,26,74,0)_70%)]"></div>
    <div className="absolute -right-20 top-20 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0%,rgba(17,26,74,0)_75%)]"></div>
    <div className="absolute right-0 top-40 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(17,26,74,0)_80%)]"></div>

    {/* subtle texture (optional) */}
    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </div>

  {/* Content */}
  <div className="relative z-10">
    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
      Need a custom solution?
    </h3>

    <p className="text-slate-300 mb-8 max-w-xl mx-auto">
      Mix and match services to create a package that fits your specific goals and budget.
    </p>

    <Button
      onClick={() => setIsDrawerOpen(true)}
      className="bg-white text-[#111A4A] hover:bg-slate-100 text-lg px-8 py-6 rounded-full font-semibold"
    >
      <Plus className="w-5 h-5 mr-2" />
      Build your own package
    </Button>
  </div>
</div>



      </div>

      {/* Modals & Drawers */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <BuildPackageDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  )
}
