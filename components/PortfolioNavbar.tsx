"use client"

import { useState, useEffect } from "react"
import { Menu, X, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"

const navigationLinks = [
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Process",
    href: "#process",
  },
  {
    name: "Reviews",
    href: "#reviews",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
] as any[]

export const PortfolioNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isContactPage = pathname === "/contact"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (isContactPage) {
      router.push(`/${href}`)
    } else {
      const element = document.querySelector(href)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={handleHomeClick}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#156d95] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-[#111A4A] font-bold text-xl tracking-tight">DPK & Co.</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[#111A4A] hover:text-[#156d95] px-1 py-2 text-base font-medium transition-colors duration-200 relative group"
                style={{ fontFamily: "var(--font-figtree), sans-serif" }}
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#156d95] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button & Home Button */}
          <div className="hidden md:flex items-center relative">
            <AnimatePresence>
              {isContactPage && (
                <motion.button
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onClick={handleHomeClick}
                  aria-label="Home"
                  className="absolute right-0 flex items-center justify-center w-[46px] h-[46px] bg-white rounded-full border border-slate-200 text-[#156d95] shadow-[0_6px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.10)] hover:-translate-y-[1px] transition-all duration-200 z-10"
                >
                  <Home className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              animate={{ x: isContactPage ? -60 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => router.push("/contact")}
              aria-expanded={isContactPage}
              className="bg-[#156d95] text-white px-[18px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap leading-4 py-[15px] z-20 relative"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              Book a Consultation
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#111A4A] p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block text-lg font-medium text-[#111A4A] hover:text-[#156d95] py-2"
                  style={{ fontFamily: "var(--font-figtree), sans-serif" }}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <button
                  onClick={() => {
                    router.push("/contact")
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-[#156d95] text-white px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  Book a Consultation
                </button>

                {isContactPage && (
                  <button
                    onClick={() => {
                      handleHomeClick()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full bg-white border border-slate-200 text-[#156d95] px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" /> Back to Home
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
