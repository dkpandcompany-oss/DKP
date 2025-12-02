"use client"

import { useRef, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"

const segments = [
    {
        title: "Growing Companies",
        description:
            "We help businesses scaling quickly to remove operational friction, align finance and growth priorities, and build systems for stable expansion.",
        href: "/growing-companies"
    },
    {
        title: "Startups",
        description:
            "For early-stage ventures we validate business models, create practical processes, improve cash efficiency, and prepare firms for investor readiness.",
        href: "/startups"
    },
    {
        title: "Founders & Solopreneurs",
        description:
            "For individuals doing everything, we streamline daily workflows, bring financial clarity, and create a professional digital presence that supports growth.",
        href: "/founders"
    },
]

// @component: WhoWeServeSection
export const WhoWeServeSection = () => {
    return (
        <section id="services" className="w-full bg-white py-24 px-8 relative">
            {/* Dotted background */}
            <div 
                className="absolute inset-0 opacity-10"
               
            />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16">
                    <h2
                        className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-4"
                        style={{
                            fontFamily: "var(--font-figtree), Figtree",
                        }}
                    >
                        Who We Serve
                    </h2>
                    <p
                        className="text-lg text-[#111A4A] opacity-60 max-w-2xl"
                        style={{
                            fontFamily: "var(--font-figtree), Figtree",
                        }}
                    >
                        We work with teams that want clarity, structure and measurable growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {segments.map((segment, index) => (
                        <Card key={index} {...segment} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const Card = ({ title, description, href }: { title: string; description: string; href: string }) => {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        x.set(clientX - left)
        y.set(clientY - top)
    }

    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`
    const style = { maskImage, WebkitMaskImage: maskImage }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group relative border border-slate-100 bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
            {/* Cursor-aware shadow effect */}
            <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#156d95]/10 to-[#167E6C]/10 opacity-20"
                    style={style}
                />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-semibold text-[#111A4A] mb-4">{title}</h3>
                <p className="text-base text-slate-600 leading-relaxed mb-8 flex-grow">{description}</p>

                <a href={href} className="inline-flex items-center text-[#156d95] font-medium text-sm hover:gap-2 transition-all group-hover:text-[#167E6C]">
                    Learn how we help <ArrowRight className="w-4 h-4 ml-1" />
                </a>
            </div>
        </motion.div>
    )
}
