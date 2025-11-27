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
        <div className="bg-[#111A4A] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mb-16">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need a custom solution?</h3>
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

        {/* FAQ Snippet */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-[#111A4A] mb-6 text-center">Common Questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do you offer monthly retainers?</AccordionTrigger>
              <AccordionContent>
                Yes! While our core services are project-based, we offer monthly support retainers starting at ₹9,999/month for ongoing advisory and maintenance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How does the payment structure work?</AccordionTrigger>
              <AccordionContent>
                We typically require a 50% deposit to commence work, with the remaining 50% due upon project completion and handover.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I combine multiple services?</AccordionTrigger>
              <AccordionContent>
                Absolutely. You can use our "Build your own package" tool to select multiple services. We often provide a bundle discount for multi-service projects.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
