"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, ArrowRight, Star, Users, Calendar } from "lucide-react"
import { Service } from "./data"
import Link from "next/link"

interface ServiceModalProps {
    service: Service | null
    isOpen: boolean
    onClose: () => void
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
    if (!service) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="md:min-w-[1200px] w-[95vw] max-w-none max-h-[90vh] overflow-y-auto p-0 bg-white">
                {/* Header Section */}
                <div className="border-b border-gray-200 p-8 md:p-16">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                {service.popular && (
                                    <Badge className="bg-[#156d95] text-white mb-4 px-3 py-1 font-medium">
                                        Most Popular
                                    </Badge>
                                )}
                                <DialogTitle className="text-3xl font-bold text-[#111A4A] mb-3 leading-tight">
                                    {service.title}
                                </DialogTitle>
                                <DialogDescription className="text-lg text-gray-600 leading-relaxed">
                                    {service.outcome}
                                </DialogDescription>
                            </div>
                            <div className="text-right ml-8 bg-gray-50 p-6 rounded-lg border">
                                <div className="text-2xl font-bold text-[#111A4A] mb-1">{service.priceRange}</div>
                                <div className="text-sm text-gray-500 flex items-center justify-end gap-1">
                                    <Calendar className="w-4 h-4" />
                                    One-time project
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                {/* Main Content - Horizontal Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[500px]">
                    {/* Left Column - Overview & Timeline */}
                    <div className="lg:col-span-3 p-8 border-r border-gray-200">
                        <div className="space-y-8">
                            {/* Overview */}
                            <div>
                                <h4 className="text-xl font-semibold text-[#111A4A] mb-4 border-b border-gray-100 pb-2">
                                    Service Overview
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-base">{service.fullDescription}</p>
                            </div>

                            {/* Timeline & Stats Row */}
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border">
                                    <Clock className="w-5 h-5 text-[#156d95]" />
                                    <div>
                                        <div className="text-sm text-gray-500">Duration</div>
                                        <div className="font-semibold text-[#111A4A]">{service.timeline}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border">
                                    <Users className="w-5 h-5 text-[#156d95]" />
                                    <div>
                                        <div className="text-sm text-gray-500">Clients</div>
                                        <div className="font-semibold text-[#111A4A]">50+</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg border">
                                    <Star className="w-5 h-5 text-[#156d95]" />
                                    <div>
                                        <div className="text-sm text-gray-500">Success Rate</div>
                                        <div className="font-semibold text-[#111A4A]">98%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Deliverables */}
                    <div className="lg:col-span-2 p-8 bg-gray-50">
                        <h4 className="text-xl font-semibold text-[#111A4A] mb-6 border-b border-gray-200 pb-2">
                            What's Included
                        </h4>
                        <div className="space-y-4">
                            {service.deliverables.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-white rounded border hover:border-[#156d95]/30 transition-colors">
                                    <Check className="w-4 h-4 text-[#156d95] mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm font-medium leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="border-t border-gray-200 p-8 bg-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <div className="text-lg font-semibold text-[#111A4A] mb-1">
                                Ready to get started?
                            </div>
                            <div className="text-sm text-gray-600">
                                Trusted by 50+ businesses worldwide
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button 
                                variant="outline" 
                                onClick={onClose}
                                className="px-6 border-gray-300 hover:border-[#156d95] hover:text-[#156d95]"
                            >
                                Close
                            </Button>
                            <Button asChild className="bg-[#156d95] hover:bg-[#156d95]/90 text-white px-8">
                                <Link href={`/checkout?service=${service.id}`}>
                                    Book this service 
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
