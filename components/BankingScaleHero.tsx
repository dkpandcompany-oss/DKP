"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Settings, TrendingUp, Users, Globe } from "lucide-react"

interface BankingScaleHeroProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

// @component: BankingScaleHero
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
    "Average 30% growth boost"
  ]

  const [typingComplete, setTypingComplete] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const fullText = "Strategic Consulting"

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      dropdownRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        !target.closest(".relative.inline-block") &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, setIsOpen])

  // Continuous typing effect (type and delete)
  useEffect(() => {
    const typingSpeed = 100
    const deletingSpeed = 50
    const pauseAfterTyping = 2000
    const pauseAfterDeleting = 500

    let timeout: NodeJS.Timeout

    if (!isDeleting && displayedText.length < fullText.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, typingSpeed)
    } else if (!isDeleting && displayedText.length === fullText.length) {
      // Pause after typing complete
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseAfterTyping)
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length - 1))
      }, deletingSpeed)
    } else if (isDeleting && displayedText.length === 0) {
      // Pause after deleting complete
      timeout = setTimeout(() => {
        setIsDeleting(false)
      }, pauseAfterDeleting)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, fullText])



  // @return
  return (
    <>
      {/* Stats Marquee */}
      <div className="w-full  bg-[#156d95] py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...stats, ...stats, ...stats].map((stat, index) => (
            <div key={index} className="inline-flex items-center mx-8">
              <span className="text-white font-extrabold font-inter text-sm md:text-3xl ">{stat}</span>
              <span className="text-white/50 mx-8 text-sm md:text-3xl">•</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-8 py-24 pt-16">
        <div className="grid grid-cols-12 gap-5 gap-y-16">
          <div className="col-span-12 md:col-span-6 relative z-10">
            <div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-[#146e96] mb-12 px-2"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
              }}
            >
              <div className="flex items-center gap-0.5">
                <span className="text-[#146e96]">
                  {displayedText}
                </span>
                <motion.span
                  initial={{
                    opacity: 1,
                  }}
                  animate={{
                    opacity: [1, 0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="block w-1.5 h-3 bg-[#146e96] ml-0.5 rounded-sm"
                />
              </div>
            </div>

            <h2
              className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontSize: "40px",
                fontWeight: "400",
              }}
            >
              Strategic Consulting for Growth, Efficiency &{" "}
              <span
                className="opacity-40"
                style={{
                  fontWeight: "400",
                  fontSize: "40px",
                }}
              >
                Digital Advantage
              </span>
            </h2>

            <p
              className="text-lg leading-6 text-[#111A4A] opacity-60 mt-0 mb-6"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              We help businesses optimize operations, strengthen financial systems, unlock new growth opportunities, and
              enhance their digital presence with clarity and precision.
            </p>

            <div className="relative inline-block">
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  if (!isOpen) {
                    setTimeout(() => {
                      const servicesElement = document.getElementById('services-section');
                      if (servicesElement) {
                        servicesElement.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        });
                      }
                    }, 350);
                  }
                }}
                aria-expanded={isOpen}
                aria-controls="services-dropdown"
                className="relative inline-flex justify-center items-center leading-4 text-center cursor-pointer whitespace-nowrap outline-none font-medium h-9 text-[#232730] bg-white/50 backdrop-blur-sm shadow-[0_1px_1px_0_rgba(255,255,255,0),0_0_0_1px_rgba(87,90,100,0.12)] transition-all duration-200 ease-in-out rounded-lg px-4 mt-5 text-sm group hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(87,90,100,0.18)]"
              >
                <span className="relative z-10 flex items-center gap-1">
                  Explore Our Services
                  <ArrowRight
                    className={`w-4 h-4 -mr-1 transition-transform duration-200 ${isOpen ? "rotate-90" : "group-hover:translate-x-1"}`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 flex justify-center items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full h-[500px]"
            >
              <img
                src="/images/hero.png"
                alt="Strategic Consulting"
                className="w-full h-full object-cover rounded-[32px] shadow-sm"
              />
            </motion.div>
          </div>

<AnimatePresence>
  {isOpen && (
    <motion.div
      id="services-section"
      initial={{ opacity: 0, height: 0, marginTop: 0 }}
      animate={{ opacity: 1, height: "auto", marginTop: 32 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="col-span-12 overflow-hidden"
    >
      <div
        ref={dropdownRef}
        className="rounded-2xl mt-10 p-6 md:p-8 border border-slate-100  outline-none"
        tabIndex={-1}
      >
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-4 
            gap-6 
            divide-y md:divide-y-0 md:divide-x 
            divide-slate-200
          "
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className={`
                flex flex-col 
                p-6 
                bg-white 
                rounded-xl 
                shadow-sm 
                hover:shadow-2xl 
                hover:shadow-[#156d95]/10
                transition-all 
                duration-300 
                ease-out
                relative
                cursor-pointer
                group
                h-full
                
              `}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#156d95]/10 rounded-lg flex items-center justify-center group-hover:bg-[#156d95] transition-colors duration-300">
                  <service.icon className="w-5 h-5 text-[#156d95] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#111A4A] group-hover:text-[#156d95] transition-colors duration-300">
                    {service.title}
                  </h3>
                  {service.popular && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-[#156d95] text-white rounded-full mt-1">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 mb-4 flex-grow">
                {service.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
                  <span className="font-medium">Price Range:</span>
                  <span className="font-semibold text-[#156d95]">{service.priceRange}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600">
                  <span className="font-medium">Timeline:</span>
                  <span className="font-semibold">{service.timeline}</span>
                </div>
              </div>

              <div className="mt-auto">
                <h4 className="text-xs font-medium text-[#111A4A] mb-3 opacity-70 group-hover:opacity-90 transition-opacity duration-300">
                  Key Deliverables:
                </h4>

                <ul className="text-xs text-slate-600 space-y-2">
                  {service.highlights.map((highlight, highlightIndex) => (
                    <motion.li
                      key={highlightIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (highlightIndex * 0.05), duration: 0.3 }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="flex items-start gap-2 group-hover:text-slate-700 transition-colors duration-300"
                    >
                      <span className="text-[#156d95] mt-0.5 group-hover:text-[#156d95] transition-colors duration-300 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>



        </div>
      </div>
    </div>
    </>
  )
}
