"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"


const services = [
  {
    title: "Operations & Small Business Optimization",
    description: "Streamline workflows, create SOPs, and build scalable operational systems.",
  },
  {
    title: "Financial Management & Cost Control",
    description: "Budgeting, forecasting, cash-flow clarity, and targeted cost-reduction strategies.",
  },
  {
    title: "Business Development & Strategic Partnerships",
    description: "Market expansion, partner identification, and sales pipeline structure.",
  },
  {
    title: "Marketing & Web Consulting",
    description: "Website strategy, digital branding, messaging, and visibility improvements.",
  },
]

// @component: BankingScaleHero
export const BankingScaleHero = () => {


  const [typingComplete, setTypingComplete] = useState(false)
  const [showServicesDropdown, setShowServicesDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showServicesDropdown && dropdownRef.current) {
      dropdownRef.current.focus()
    }
  }, [showServicesDropdown])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (
        !target.closest(".relative.inline-block") &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setShowServicesDropdown(false)
      }
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowServicesDropdown(false)
      }
    }

    if (showServicesDropdown) {
      document.addEventListener("click", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [showServicesDropdown])

  useEffect(() => {
    const timer = setTimeout(() => setTypingComplete(true), 1000)
    return () => clearTimeout(timer)
  }, [])



  // @return
  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-8 py-24 pt-16">
        <div className="grid grid-cols-12 gap-5 gap-y-16">
          <div className="col-span-12 md:col-span-6 relative z-10">
            <div
              className="relative h-6 inline-flex items-center font-mono uppercase text-xs text-[#167E6C] mb-12 px-2"
              style={{
                fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace",
              }}
            >
              <div className="flex items-center gap-0.5 overflow-hidden">
                <motion.span
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "auto",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="block whitespace-nowrap overflow-hidden text-[#167E6C] relative z-10"
                  style={{
                    color: "#146e96",
                  }}
                >
                  Strategic Consulting
                </motion.span>
                <motion.span
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: typingComplete ? [1, 0, 1, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="block w-1.5 h-3 bg-[#167E6C] ml-0.5 relative z-10 rounded-sm"
                  style={{
                    color: "#146e96",
                  }}
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
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                aria-expanded={showServicesDropdown}
                aria-controls="services-dropdown"
                className="relative inline-flex justify-center items-center leading-4 text-center cursor-pointer whitespace-nowrap outline-none font-medium h-9 text-[#232730] bg-white/50 backdrop-blur-sm shadow-[0_1px_1px_0_rgba(255,255,255,0),0_0_0_1px_rgba(87,90,100,0.12)] transition-all duration-200 ease-in-out rounded-lg px-4 mt-5 text-sm group hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_1px_rgba(87,90,100,0.18)]"
              >
                <span className="relative z-10 flex items-center gap-1">
                  Explore Our Services
                  <ArrowRight
                    className={`w-4 h-4 -mr-1 transition-transform duration-200 ${showServicesDropdown ? "rotate-90" : "group-hover:translate-x-1"}`}
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
            {showServicesDropdown && (
              <motion.div
                id="services-dropdown"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="col-span-12 overflow-hidden"
              >
                <div
                  ref={dropdownRef}
                  className="bg-slate-50/80 rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm outline-none"
                  tabIndex={-1}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-base font-semibold text-[#111A4A]">{service.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
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
  )
}
