"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2, Check } from "lucide-react"
import { ContactFormData } from "@/types/database"

const servicesList = [
    {
        id: "operations",
        title: "Operations & Small Business Optimization",
        subtext: "Streamline workflows, SOPs, scalable systems",
    },
    {
        id: "financial",
        title: "Financial Management & Cost Control",
        subtext: "Budgeting, forecasting & cost reduction",
    },
    {
        id: "business_dev",
        title: "Business Development & Strategic Partnerships",
        subtext: "Market expansion & partnership strategy",
    },
    {
        id: "marketing",
        title: "Marketing & Web Consulting",
        subtext: "Website strategy, digital branding & visibility",
    },
]

export const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [isOtherSelected, setIsOtherSelected] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const toggleService = (id: string) => {
        setSelectedServices((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const formData = new FormData(e.target as HTMLFormElement)
            const otherServiceInput = (e.target as HTMLFormElement).querySelector('input[placeholder="Other (please specify)"]') as HTMLInputElement

            const contactData: ContactFormData = {
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string || undefined,
                email: formData.get('email') as string,
                designation: formData.get('designation') as string || undefined,
                companyName: formData.get('companyName') as string || undefined,
                businessField: formData.get('businessField') as string || undefined,
                selectedServices: selectedServices,
                otherServiceDescription: isOtherSelected ? otherServiceInput?.value || undefined : undefined,
            }

            const response = await fetch('/api/consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            })

            const result = await response.json()

            if (!result.success) {
                setError(result.error || 'Failed to submit form')
                return
            }

            setIsSuccess(true)
        } catch (error) {
            console.error('Form submission error:', error)
            setError('Failed to submit form. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="w-full py-24 px-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    {/* Left Column - Contact Info */}
                    <div className="space-y-8 lg:col-span-4">
                        <div>
                            <h2
                                className="text-[40px] font-normal leading-tight tracking-tight text-[#111A4A] mb-6"
                                style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                                Let's Start the Conversation
                            </h2>
                            <p
                                className="text-lg text-[#111A4A] opacity-60 max-w-md"
                                style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                                Ready to optimize your operations and grow your business? Reach out to us directly or fill out the form.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-[#156d95]">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#111A4A] mb-1">Email Us</h3>
                                    <a href="mailto:hello@dpkconsultants.com" className="text-slate-600 hover:text-[#156d95] transition-colors">
                                        hello@dpkconsultants.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-[#156d95]">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#111A4A] mb-1">Call Us</h3>
                                    <a href="tel:+15551234567" className="text-slate-600 hover:text-[#156d95] transition-colors">
                                        +1 (555) 123-4567
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-[#156d95]">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#111A4A] mb-1">Visit Us</h3>
                                    <p className="text-slate-600">
                                        123 Business District,<br />
                                        Suite 400<br />
                                        New York, NY 10001
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 lg:col-span-8">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-semibold text-[#111A4A] mb-2">Message Sent!</h3>
                                <p className="text-slate-600 max-w-xs">
                                    Thank you for reaching out. We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-8 text-[#156d95] font-medium hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                                {error && (
                                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                        {error}
                                    </div>
                                )}
                                
                                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                                    {/* Left Column: Fields */}
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label htmlFor="companyName" className="text-sm font-medium text-[#111A4A]">Company name</label>
                                            <input
                                                id="companyName"
                                                name="companyName"
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 outline-none transition-all"
                                                placeholder="Company name"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="businessField" className="text-sm font-medium text-[#111A4A]">Field of business</label>
                                            <input
                                                id="businessField"
                                                name="businessField"
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 outline-none transition-all"
                                                placeholder="E.g., Retail / SaaS / Food service"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label htmlFor="firstName" className="text-sm font-medium text-[#111A4A]">First name *</label>
                                                <input
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 outline-none transition-all"
                                                    placeholder="First name"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="lastName" className="text-sm font-medium text-[#111A4A]">Last name</label>
                                                <input
                                                    id="lastName"
                                                    name="lastName"
                                                    type="text"
                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 outline-none transition-all"
                                                    placeholder="Last name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="designation" className="text-sm font-medium text-[#111A4A]">Your designation</label>
                                            <input
                                                id="designation"
                                                name="designation"
                                                type="text"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 outline-none transition-all"
                                                placeholder="Founder / COO / Head of Ops"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-sm font-medium text-[#111A4A]">Email address *</label>
                                            <input
                                                id="email"
                                                name="email"
                                                required
                                                type="email"
                                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 outline-none transition-all"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column: Services */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium text-[#111A4A] block mb-1">Services we offer</label>
                                        <div className="grid grid-cols-1 gap-2.5">
                                            {servicesList.map((service) => {
                                                const isSelected = selectedServices.includes(service.id)
                                                return (
                                                    <button
                                                        key={service.id}
                                                        type="button"
                                                        onClick={() => toggleService(service.id)}
                                                        aria-pressed={isSelected}
                                                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 group ${isSelected
                                                            ? "bg-[#156d95] border-[#156d95] text-white shadow-md"
                                                            : "bg-white border-slate-200 text-[#111A4A] hover:border-[#156d95]/50"
                                                            }`}
                                                    >
                                                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "border-white bg-white/20" : "border-slate-300 group-hover:border-[#156d95]"
                                                            }`}>
                                                            {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-sm leading-tight">{service.title}</div>
                                                            <div className={`text-xs mt-0.5 leading-tight ${isSelected ? "text-white/80" : "text-slate-500"}`}>
                                                                {service.subtext}
                                                            </div>
                                                        </div>
                                                    </button>
                                                )
                                            })}

                                            <button
                                                type="button"
                                                onClick={() => setIsOtherSelected(!isOtherSelected)}
                                                aria-pressed={isOtherSelected}
                                                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 group ${isOtherSelected
                                                    ? "bg-[#156d95] border-[#156d95] text-white shadow-md"
                                                    : "bg-white border-slate-200 text-[#111A4A] hover:border-[#156d95]/50"
                                                    }`}
                                            >
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${isOtherSelected ? "border-white bg-white/20" : "border-slate-300 group-hover:border-[#156d95]"
                                                    }`}>
                                                    {isOtherSelected && <Check className="w-2.5 h-2.5 text-white" />}
                                                </div>
                                                <span className="font-medium text-sm">Other</span>
                                            </button>

                                            <AnimatePresence>
                                                {isOtherSelected && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#156d95] focus:ring-2 focus:ring-[#156d95]/20 outline-none transition-all text-sm"
                                                            placeholder="Other (please specify)"
                                                        />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#156d95] text-white font-semibold py-4 rounded-xl hover:bg-[#156d95]/90 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
