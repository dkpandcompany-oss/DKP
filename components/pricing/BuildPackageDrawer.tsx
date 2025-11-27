"use client"

import { useRouter } from "next/navigation"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { Check, X, Info, ArrowRight } from "lucide-react"
import { SERVICES, ADD_ONS } from "./data"
import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BuildPackageDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function BuildPackageDrawer({ isOpen, onClose }: BuildPackageDrawerProps) {
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
    const [activeStep, setActiveStep] = useState(1)
    const router = useRouter()

    const handleBookServices = () => {
        const params = new URLSearchParams()
        if (selectedServices.length > 0) params.set("services", selectedServices.join(","))
        if (selectedAddOns.length > 0) params.set("addons", selectedAddOns.join(","))

        onClose()
        router.push(`/contact?${params.toString()}`)
    }

    // Reset state when closed
    useEffect(() => {
        if (!isOpen) {
            setActiveStep(1)
        }
    }, [isOpen])

    const toggleService = (id: string) => {
        setSelectedServices(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const totals = useMemo(() => {
        let min = 0
        let max = 0

        selectedServices.forEach(id => {
            const service = SERVICES.find(s => s.id === id)
            if (service) {
                min += service.minPrice
                max += service.maxPrice
            }
        })

        selectedAddOns.forEach(id => {
            const addon = ADD_ONS.find(a => a.id === id)
            if (addon) {
                min += addon.priceValue
                max += addon.priceValue
            }
        })

        return { min, max }
    }, [selectedServices, selectedAddOns])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
    }

    // Scroll spy to update active step
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop
        const step2Offset = document.getElementById('step-2')?.offsetTop || 1000
        // Adjust offset logic as needed based on layout
        if (scrollTop + 300 >= step2Offset) {
            setActiveStep(2)
        } else {
            setActiveStep(1)
        }
    }

    const scrollToStep = (step: number) => {
        const element = document.getElementById(`step-${step}`)
        element?.scrollIntoView({ behavior: 'smooth' })
        setActiveStep(step)
    }

    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className="fixed inset-0 z-[99] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                />
                <DialogPrimitive.Content
                    className={cn(
                        "fixed inset-0 z-[100] w-screen h-screen bg-white flex flex-col focus:outline-none",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full",
                        "duration-300 ease-in-out"
                    )}
                >
                    {/* Main Container - Full Width/Height */}
                    <div className="w-full h-full flex flex-col relative bg-white">

                        {/* Sticky Header */}
                        <div className="flex-shrink-0 bg-white border-b border-[#e5e5e5] z-10 px-4 py-4 md:px-8 md:py-5 flex items-center justify-between sticky top-0">
                            <div className="flex flex-col">
                                <DialogPrimitive.Title className="text-xl md:text-2xl font-bold text-[#111A4A] font-figtree">Build Your Custom Package</DialogPrimitive.Title>
                                <p className="text-sm text-slate-500 hidden md:block">Select services and add-ons to get an estimated quote.</p>
                            </div>

                            <div className="flex items-center gap-4 md:gap-6">
                                {/* Progress Indicator */}
                                <div className="flex items-center gap-1 md:gap-2 bg-slate-100 rounded-full p-1">
                                    <button
                                        onClick={() => scrollToStep(1)}
                                        className={cn(
                                            "px-3 py-1.5 md:px-4 rounded-full text-xs md:text-sm font-medium transition-all",
                                            activeStep === 1 ? "bg-white text-[#156d95] shadow-sm" : "text-slate-500 hover:text-[#111A4A]"
                                        )}
                                    >
                                        Step 1
                                    </button>
                                    <button
                                        onClick={() => scrollToStep(2)}
                                        className={cn(
                                            "px-3 py-1.5 md:px-4 rounded-full text-xs md:text-sm font-medium transition-all",
                                            activeStep === 2 ? "bg-white text-[#156d95] shadow-sm" : "text-slate-500 hover:text-[#111A4A]"
                                        )}
                                    >
                                        Step 2
                                    </button>
                                </div>

                                <DialogPrimitive.Close asChild>
                                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 h-10 w-10">
                                        <X className="w-6 h-6 text-slate-500" />
                                    </Button>
                                </DialogPrimitive.Close>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto scroll-smooth bg-white" onScroll={handleScroll}>
                            <div className="max-w-[1200px] mx-auto px-4 py-8 md:px-8 md:py-12 space-y-16">

                                {/* Step 1: Services */}
                                <div id="step-1" className="scroll-mt-32">
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#156d95] text-white font-bold text-lg shadow-lg shadow-[#156d95]/20">1</span>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#111A4A]">Select Services</h3>
                                            <p className="text-slate-500 text-sm">Choose the core services for your project</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {SERVICES.map((service) => {
                                            const isSelected = selectedServices.includes(service.id)
                                            return (
                                                <div
                                                    key={service.id}
                                                    onClick={() => toggleService(service.id)}
                                                    className={cn(
                                                        "relative p-6 md:p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 group hover:shadow-xl hover:-translate-y-1",
                                                        isSelected ? "border-[#156d95] bg-[#156d95] text-white shadow-xl shadow-[#156d95]/20" : "border-slate-200 bg-white hover:border-[#156d95]/30"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-start mb-6">
                                                        <h4 className={cn("text-xl font-bold pr-4", isSelected ? "text-white" : "text-[#111A4A]")}>
                                                            {service.title}
                                                        </h4>
                                                        <div className={cn(
                                                            "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0",
                                                            isSelected ? "bg-white border-white" : "border-slate-300 group-hover:border-[#156d95]"
                                                        )}>
                                                            {isSelected && <Check className="w-4 h-4 text-[#156d95]" />}
                                                        </div>
                                                    </div>

                                                    <p className={cn("text-sm mb-6 leading-relaxed", isSelected ? "text-blue-100" : "text-slate-600")}>
                                                        {service.outcome}
                                                    </p>

                                                    <div className={cn(
                                                        "inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wide",
                                                        isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-[#111A4A]"
                                                    )}>
                                                        {service.priceRange}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Step 2: Add-ons */}
                                <div id="step-2" className="scroll-mt-32">
                                    <div className="flex items-center gap-3 mb-8">
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#156d95] text-white font-bold text-lg shadow-lg shadow-[#156d95]/20">2</span>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#111A4A]">Select Add-ons</h3>
                                            <p className="text-slate-500 text-sm">Enhance your package with extras</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {ADD_ONS.map((addon) => {
                                            const isSelected = selectedAddOns.includes(addon.id)
                                            return (
                                                <div
                                                    key={addon.id}
                                                    onClick={() => toggleAddOn(addon.id)}
                                                    className={cn(
                                                        "px-6 py-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4 hover:shadow-lg",
                                                        isSelected ? "border-[#156d95] bg-[#156d95] text-white shadow-lg shadow-[#156d95]/20" : "border-slate-200 bg-white hover:border-[#156d95]/30"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                                        isSelected ? "bg-white border-white" : "border-slate-300"
                                                    )}>
                                                        {isSelected && <Check className="w-3 h-3 text-[#156d95]" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className={cn("font-bold", isSelected ? "text-white" : "text-[#111A4A]")}>{addon.name}</span>
                                                        <span className={cn("text-xs", isSelected ? "text-blue-100" : "text-slate-500")}>{addon.priceDisplay}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Summary Note */}
                                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center max-w-2xl mx-auto">
                                    <h5 className="font-bold text-[#111A4A] mb-2">Estimate Only</h5>
                                    <p className="text-slate-600 text-sm">
                                        This calculator provides a rough estimate based on typical project scopes.
                                        We will provide a formal, itemized quote after our initial consultation.
                                    </p>
                                </div>

                                {/* Bottom spacer for mobile FAB */}
                                <div className="h-32 md:h-12"></div>
                            </div>
                        </div>

                        {/* Sticky Footer */}
                        <div className="flex-shrink-0 bg-white border-t border-[#e5e5e5] p-4 md:px-8 md:py-6 z-10 sticky bottom-0">
                            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                                <div className="w-full md:w-auto flex items-center justify-between md:justify-start md:gap-8">
                                    <div>
                                        <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Estimated Price</div>
                                        <div className="text-2xl md:text-4xl font-bold text-[#111A4A] font-figtree tracking-tight">
                                            {formatPrice(totals.min)} — {formatPrice(totals.max)}
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full md:w-auto bg-[#156d95] hover:bg-[#156d95]/90 text-white rounded-full px-12 py-7 text-lg font-bold shadow-xl shadow-[#156d95]/30 transition-all hover:scale-105 active:scale-95"
                                    onClick={handleBookServices}
                                    disabled={selectedServices.length === 0}
                                >
                                    Book services
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}
