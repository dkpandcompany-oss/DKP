"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Settings, TrendingUp, Users, Globe } from "lucide-react"

interface BankingScaleHeroProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const BankingScaleHero = ({ isOpen, setIsOpen }: BankingScaleHeroProps) => {
  const services = [
    {
      icon: Settings,
      title: "Operations & Small Business Optimization",
      description: "Streamline workflows, SOPs, and scale your operations.",
      priceRange: "₹14,999 – ₹24,999",
      timeline: "2-3 weeks",
      highlights: [
        "Workflow audit",
        "SOP creation",
        "Operational roadmap",
        "Comprehensive Operational Audit Report",
        "Tool Stack Recommendations"
      ]
    },
    {
      icon: TrendingUp,
      title: "Financial Management & Cost Control",
      description: "Improve cash visibility, budgeting and reduce costs.",
      priceRange: "₹12,999 – ₹22,999",
      timeline: "2 weeks",
      highlights: [
        "Financial health check",
        "Cashflow clarity",
        "Cost reduction plan",
        "Financial Health Assessment",
        "Budgeting Templates"
      ]
    },
    {
      icon: Users,
      title: "Business Development & Strategic Partnerships",
      description: "Find partners and build a repeatable pipeline for growth.",
      priceRange: "₹19,999 – ₹34,999",
      timeline: "3-4 weeks",
      popular: true,
      highlights: [
        "Partner mapping",
        "Pipeline design",
        "Outreach templates",
        "Strategic Partner Map",
        "Partnership Pitch Deck Structure"
      ]
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Get a modern, responsive, high-performance website for your business.",
      priceRange: "₹24,999 – ₹79,999",
      timeline: "2-5 weeks",
      highlights: [
        "Custom UI/UX design",
        "Responsive development",
        "SEO & speed optimized",
        "Contact/Lead Form Integration",
        "30-Day Bug Fix Support"
      ]
    }
  ]

  const stats = [
    "Trusted by 120+ startups",
    "4.9/5 client rating",
    "₹25Cr+ revenue optimized",
    "Average 30% growth boost",
  ]

  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const fullText = "Strategic Consulting"

  /* Typing Effect */
  useEffect(() => {
    const speed = isDeleting ? 50 : 90
    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1)
      )
    }, speed)

    if (!isDeleting && displayedText === fullText) {
      setTimeout(() => setIsDeleting(true), 1800)
    }
    if (isDeleting && displayedText === "") {
      setTimeout(() => setIsDeleting(false), 500)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting])

  // Removed outside click handler so dropdown only toggles via button

  return (
    <>
      {/* ===== MARQUEE (UNCHANGED) ===== */}
      <div className="w-full bg-[#156d95] py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...stats, ...stats, ...stats].map((stat, index) => (
            <div key={index} className="inline-flex items-center mx-8">
              <span className="text-white font-extrabold text-md md:text-3xl">
                {stat}
              </span>
              <span className="text-white/50 mx-8 text-sm md:text-3xl">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="w-full bg-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 py-24 items-center">
          {/* Left */}
          <div className="col-span-12 md:col-span-6">
            <div className="font-mono uppercase text-xs text-[#146e96] mb-6 flex items-center gap-1">
              {displayedText}
              <span className="w-1.5 h-3 bg-[#146e96] animate-pulse rounded-sm" />
            </div>

            <h1 className="text-4xl leading-tight font-normal text-[#111A4A] mb-6">
              Strategic Consulting for Growth, Efficiency &{" "}
              <span className="opacity-40">Digital Advantage</span>
            </h1>

            <p className="text-lg text-[#111A4A]/60 max-w-xl mb-8">
              We help businesses remove bottlenecks, strengthen financial clarity,
              unlock growth opportunities, and build a strong digital foundation.
            </p>

            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setTimeout(() => {
                  const el = document.getElementById('services-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 300);
              }}
              className="inline-flex items-center gap-2 px-5 h-10 rounded-lg bg-white shadow-sm ring-1 ring-black/10 hover:ring-black/20 transition text-sm"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Image */}
          <div className="col-span-12 md:col-span-6 ">
            <motion.img
              src="/Aboutus.svg"
              alt="Strategic Consulting"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[620px] object-contain rounded-3xl"
            />
          </div>

          {/* ===== SERVICES ===== */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="services-section"
                ref={dropdownRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="col-span-12 bg-slate-50 rounded-3xl p-8 mt-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {services.map((s, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#156d95]/10 flex items-center justify-center mb-4">
                        <s.icon className="w-5 h-5 text-[#156d95]" />
                      </div>

                      <h3 className="text-lg font-bold text-[#156d95] mb-2">
                        {s.title}
                        {s.popular && (
                          <span className="ml-2 px-2 py-1 text-xs bg-[#156d95] text-white rounded-full">Popular</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-700 mb-2">{s.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                        <span className="font-medium">Price Range:</span>
                        <span className="font-semibold text-[#156d95]">{s.priceRange}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-4">
                        <span className="font-medium">Timeline:</span>
                        <span className="font-semibold">{s.timeline}</span>
                      </div>
                      <div className="mt-auto">
                        <h4 className="text-xs font-medium text-[#111A4A] mb-2 opacity-70">Key Deliverables:</h4>
                        <ul className="text-xs text-gray-600 space-y-2">
                          {s.highlights.map((h, hi) => (
                            <li key={hi} className="flex items-start gap-2">
                              <span className="text-[#156d95] mt-0.5 flex-shrink-0">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
