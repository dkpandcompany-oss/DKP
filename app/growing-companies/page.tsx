import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, TrendingUp, Users, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Growing Companies - Strategic Consulting | DKP & Company',
  description: 'We help businesses scaling quickly to remove operational friction, align finance and growth priorities, and build systems for stable expansion.',
}

export default function GrowingCompaniesPage() {
  const services = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Operational Scaling",
      description: "Remove friction points and build systems that scale with your growth",
      features: ["Process optimization", "Team efficiency", "Workflow automation", "Quality control systems"]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Financial Alignment", 
      description: "Align financial strategies with growth objectives for sustainable expansion",
      features: ["Growth budgeting", "Cash flow management", "Investment planning", "Cost optimization"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Strategic Systems",
      description: "Build robust systems and processes for stable, predictable growth",
      features: ["Strategic planning", "Performance metrics", "Governance frameworks", "Risk management"]
    }
  ]

  const benefits = [
    "Remove operational bottlenecks that slow growth",
    "Align financial resources with strategic priorities", 
    "Build scalable systems before they become problems",
    "Create predictable processes for consistent results",
    "Optimize team productivity and resource allocation",
    "Establish metrics and KPIs for data-driven decisions"
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#156d95] to-[#1a7aa6] text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Strategic Consulting for Growing Companies
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We help businesses scaling quickly to remove operational friction, align finance and growth priorities, and build systems for stable expansion.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Help Growing Companies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our specialized approach focuses on the unique challenges that growing companies face when scaling operations and managing rapid expansion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="text-[#156d95] mb-4">
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
                      <CheckCircle className="w-4 h-4 text-[#156d95] mr-2 flex-shrink-0" />
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
                Why Growing Companies Choose Us
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#156d95] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Scale Efficiently?
              </h3>
              <p className="text-gray-600 mb-6">
                Get a customized strategy for your growing company. We'll assess your current operations and create a roadmap for sustainable scaling.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/contact" 
                  className="block w-full bg-[#156d95] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#134a6b] transition-colors"
                >
                  Schedule a Consultation
                </Link>
                <Link 
                  href="/checkout" 
                  className="block w-full border border-[#156d95] text-[#156d95] text-center py-3 rounded-lg font-semibold hover:bg-[#156d95]/5 transition-colors"
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