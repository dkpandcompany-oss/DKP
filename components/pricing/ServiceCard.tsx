"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight } from "lucide-react"
import { Service } from "./data"
import Link from "next/link"

interface ServiceCardProps {
    service: Service
    onViewDetails: (service: Service) => void
}

export function ServiceCard({ service, onViewDetails }: ServiceCardProps) {
    return (
        <Card className="flex flex-col h-full border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            {service.popular && (
                <div className="absolute top-0 right-0">
                    <Badge className="bg-[#156d95] text-white rounded-bl-xl rounded-tr-none px-3 py-1 font-medium text-xs uppercase tracking-wide">
                        Popular
                    </Badge>
                </div>
            )}

            <CardHeader className="pb-4 pt-8">
                <h3 className="text-xl font-bold text-[#111A4A] font-figtree leading-tight min-h-[3.5rem]">
                    {service.title}
                </h3>
                <p className="text-sm text-slate-500 min-h-[2.5rem]">
                    {service.outcome}
                </p>
            </CardHeader>

            <CardContent className="flex-grow space-y-6">
                <div>
                    <div className="text-2xl font-bold text-[#111A4A]">{service.priceRange}</div>
                    <div className="text-xs text-slate-400 font-medium mt-1">Typical range</div>
                </div>

                <ul className="space-y-3">
                    {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <Check className="w-4 h-4 text-[#156d95] mt-0.5 flex-shrink-0" />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
                <Button
                    asChild
                    className="w-full bg-[#156d95] hover:bg-[#156d95]/90 text-white rounded-full group-hover:shadow-lg transition-all"
                >
                    <Link href={`/contact?service=${service.id}`}>
                        Book Now
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => onViewDetails(service)}
                    className="w-full text-slate-500 hover:text-[#156d95] hover:bg-slate-50 rounded-full text-sm"
                >
                    View details
                </Button>
            </CardFooter>
        </Card>
    )
}
