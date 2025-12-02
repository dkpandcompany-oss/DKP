import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Rocket, Lightbulb, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Startups - Strategic Consulting | DKP & Company',
  description: 'For early-stage ventures we validate business models, create practical processes, improve cash efficiency, and prepare firms for investor readiness.',
}

export default function StartupsPage() {
  const services = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Business Model Validation",
      description: "Validate and refine your business model for market success",
      features: ["Market research", "Product-market fit", "Revenue model design", "Competitive analysis"]
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Cash Efficiency", 
      description: "Optimize cash flow and financial management for lean operations",
      features: ["Burn rate optimization", "Financial forecasting", "Fundraising preparation", "Unit economics"]
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Investor Readiness",
      description: "Prepare your startup for investment opportunities and scaling",
      features: ["Pitch deck creation", "Financial modeling", "Due diligence prep", "Growth strategy"]
    }
  ]

  const benefits = [
    "Validate your business model before significant investment",
    "Create lean, practical processes that grow with you", 
    "Optimize cash efficiency and extend runway",
    "Build investor-ready financial models and projections",
    "Establish scalable operations from day one",
    "Navigate early-stage challenges with expert guidance"
  ]

  const startupStats = [
    { number: "85%", label: "Of startups improve cash efficiency" },
    { number: "3x", label: "Faster time to market" },
    { number: "₹50L+", label: "Average funding prepared" },
    { number: "90%", label: "Successfully raise follow-on funding" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Strategic Consulting for Startups
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              For early-stage ventures we validate business models, create practical processes, improve cash efficiency, and prepare firms for investor readiness.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {startupStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Help Startups Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our startup-focused approach addresses the unique challenges of early-stage ventures, from validation to scaling.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="text-purple-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Startups Choose Us
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Validate and Scale?
              </h3>
              <p className="text-gray-600 mb-6">
                Get expert guidance for your startup journey. We'll help you validate your model, optimize operations, and prepare for growth.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/contact" 
                  className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Schedule a Consultation
                </Link>
                <Link 
                  href="/checkout" 
                  className="block w-full border border-purple-600 text-purple-600 text-center py-3 rounded-lg font-semibold hover:bg-purple-600/5 transition-colors"
                >
                  View Service Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}