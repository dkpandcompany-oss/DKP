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
    const isFinancialCard = service.id === "financial"
    
    return (
        <Card className={`flex flex-col h-full border-slate-200 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${
            isFinancialCard 
                ? 'bg-[#156d95] shadow-lg hover:shadow-xl' 
                : 'shadow-md hover:shadow-lg'
        }`}>
            {service.popular && (
                <div className="absolute top-0 right-0">
                    <Badge className="bg-[#156d95] text-white rounded-bl-xl rounded-tr-none px-3 py-1 font-medium text-xs uppercase tracking-wide">
                        Popular
                    </Badge>
                </div>
            )}

            <CardHeader className="pb-4 pt-8">
                <h3 className={`text-xl font-bold font-figtree leading-tight min-h-[3.5rem] ${
                    isFinancialCard ? 'text-white' : 'text-[#111A4A]'
                }`}>
                    {service.title}
                </h3>
                <p className={`text-sm min-h-[2.5rem] ${
                    isFinancialCard ? 'text-white/90' : 'text-slate-500'
                }`}>
                    {service.outcome}
                </p>
            </CardHeader>

            <CardContent className="flex-grow space-y-6">
                <div>
                    <div className={`text-2xl font-bold ${
                        isFinancialCard ? 'text-white' : 'text-[#111A4A]'
                    }`}>{service.priceRange}</div>
                    <div className={`text-xs font-medium mt-1 ${
                        isFinancialCard ? 'text-white/80' : 'text-slate-400'
                    }`}>Typical range</div>
                </div>

                <ul className="space-y-3">
                    {service.bullets.map((bullet, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${
                            isFinancialCard ? 'text-white/95' : 'text-slate-600'
                        }`}>
                            <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                isFinancialCard ? 'text-white' : 'text-[#156d95]'
                            }`} />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
                <Button
                    asChild
                    className={`w-full rounded-full group-hover:shadow-lg transition-all ${
                        isFinancialCard 
                            ? 'bg-white hover:bg-white/95 text-[#156d95]' 
                            : 'bg-[#156d95] hover:bg-[#156d95]/90 text-white'
                    }`}
                >
                    <Link href={`/checkout?service=${service.id}`}>
                        Book Now
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => onViewDetails(service)}
                    className={`w-full rounded-full text-sm ${
                        isFinancialCard 
                            ? 'text-white hover:text-white hover:bg-white/10' 
                            : 'text-slate-500 hover:text-[#156d95] hover:bg-slate-50'
                    }`}
                >
                    View details
                </Button>
            </CardFooter>
        </Card>
    )
}
