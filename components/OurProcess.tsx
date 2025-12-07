"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

const steps = [
    {
        number: "01",
        title: "Discover & Analyze",
        slug: "discover-analyze",
        description:
            "We begin by understanding your business—how you operate, manage finances, generate growth, and present yourself online.",
    },
    {
        number: "02",
        title: "Build a Clear Strategy",
        slug: "build-strategy",
        description:
            "Based on our findings, we create a simple, structured roadmap that outlines what needs to improve and how to get there effectively.",
    },
    {
        number: "03",
        title: "Implement Improvements",
        slug: "implement-improvements",
        description:
            "We assist you in executing the plan—optimizing workflows, improving cost control, strengthening BD efforts, and enhancing your digital presence.",
    },
    {
        number: "04",
        title: "Monitor & Refine",
        slug: "monitor-refine",
        description:
            "Once implemented, we review performance, measure results, and fine-tune strategies to ensure long-term stability and growth.",
    },
]

// @component: OurProcess
export const OurProcess = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-20%" })

    return (
        <section
            id="process"
            aria-labelledby="our-process-heading"
            className="w-full bg-white py-24 px-8 overflow-hidden"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto relative">
                <div className="mb-16 text-center md:text-left">
                    <h2
                        id="our-process-heading"
                        className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-4"
                        style={{
                            fontFamily: "var(--font-figtree), Figtree",
                        }}
                    >
                        Our Process
                    </h2>
                    <p
                        className="text-lg text-[#111A4A] opacity-60 max-w-2xl"
                        style={{
                            fontFamily: "var(--font-figtree), Figtree",
                        }}
                    >
                        Simple, structured steps to deliver measurable improvements.
                    </p>
                </div>

                {/* Desktop/Tablet Connecting Line (Horizontal/Curved) */}
                <div className="absolute top-[140px] left-0 w-full h-[2px] hidden lg:block pointer-events-none z-0">
                    <svg className="w-full h-[100px] overflow-visible" preserveAspectRatio="none">
                        <motion.path
                            d="M 0 0 L 1200 0"
                            fill="none"
                            stroke="#156d95"
                            strokeWidth="2"
                            strokeDasharray="1200"
                            strokeDashoffset="1200"
                            initial={{ strokeDashoffset: 1200 }}
                            animate={isInView ? { strokeDashoffset: 0 } : {}}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="opacity-20"
                        />
                    </svg>
                </div>

                {/* Mobile Connecting Line (Vertical) */}
                <div className="absolute top-[120px] left-[28px] bottom-0 w-[2px] bg-[#156d95]/20 block lg:hidden z-0 rounded-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
                    {steps.map((step, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col gap-4 relative"
                            tabIndex={0}
                            role="group"
                            aria-labelledby={`step-title-${index}`}
                        >
                            {/* Step Number Badge */}
                            <div className="w-14 h-14 rounded-full bg-white border-2 border-[#156d95]/10 flex items-center justify-center text-xl font-bold text-[#156d95] shadow-sm group-hover:border-[#156d95] group-hover:bg-[#156d95] group-hover:text-white transition-colors duration-300 relative z-10">
                                {step.number}
                            </div>

                            <h3
                                id={`step-title-${index}`}
                                className="text-xl font-bold text-[#111A4A] mt-2"
                                style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                                {step.title}
                            </h3>

                            <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                                {step.description}
                            </p>

                            <div className="pt-2">
                                <Link 
                                    href={`/process/${step.slug}`}
                                    className="text-sm font-medium text-[#156d95] group-hover:underline cursor-pointer inline-flex items-center gap-1"
                                >
                                    Learn more
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
