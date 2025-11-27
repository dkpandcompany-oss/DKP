"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Clock, ArrowRight } from "lucide-react"
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <DialogTitle className="text-2xl font-figtree text-[#111A4A]">{service.title}</DialogTitle>
                            <DialogDescription className="text-base mt-2 text-slate-600">
                                {service.outcome}
                            </DialogDescription>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="text-xl font-bold text-[#156d95]">{service.priceRange}</div>
                            <div className="text-sm text-slate-500">One-time / Project</div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div>
                        <h4 className="font-semibold text-[#111A4A] mb-2">Overview</h4>
                        <p className="text-slate-600 leading-relaxed">{service.fullDescription}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-[#111A4A] mb-3">What's Included</h4>
                            <ul className="space-y-2">
                                {service.deliverables.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                        <Check className="w-4 h-4 text-[#156d95] mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#111A4A] mb-3">Timeline</h4>
                            <div className="flex items-center gap-2 text-slate-600">
                                <Clock className="w-4 h-4 text-[#156d95]" />
                                <span>Typical duration: {service.timeline}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between items-center gap-4 border-t pt-6">
                    <div className="text-sm text-slate-500">
                        Trusted by 50+ businesses
                    </div>
                    <Button asChild className="bg-[#156d95] hover:bg-[#156d95]/90 text-white rounded-full px-6">
                        <Link href={`/contact?service=${service.id}`}>
                            Book this service <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
