"use client"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ADD_ONS } from "./data"
import { useState } from "react"
import { Check } from "lucide-react"

export function AddOnsSection() {
    // Local state for visual feedback, though in a real app this might lift up
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])

    const toggleAddOn = (id: string) => {
        setSelectedAddOns(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    return (
        <div className="w-full overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            <div className="flex flex-nowrap md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-max md:min-w-0">
                {ADD_ONS.map((addon) => {
                    const isSelected = selectedAddOns.includes(addon.id)
                    return (
                        <Card
                            key={addon.id}
                            className={`p-4 min-w-[280px] md:min-w-0 transition-all duration-200 border cursor-pointer select-none ${isSelected ? "border-[#156d95] bg-[#156d95]/5 shadow-sm" : "border-slate-200 hover:border-slate-300"
                                }`}
                            onClick={() => toggleAddOn(addon.id)}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-[#111A4A] text-sm">{addon.name}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-1" title={addon.description}>
                                        {addon.description}
                                    </p>
                                    <div className="text-sm font-medium text-[#156d95] pt-1">
                                        {addon.priceDisplay}
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${isSelected ? "bg-[#156d95] border-[#156d95]" : "border-slate-300"
                                    }`}>
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
