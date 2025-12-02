import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services | DKP Consulting',
  description: 'Strategic consulting services for operational clarity, financial strength, and business growth.',
}

const services = [
  {
    title: 'Financial Planning',
    description: 'Strategic financial guidance to strengthen your business foundation and prepare for growth.',
    features: [
      'Cash flow optimization',
      'Financial forecasting',
      'Investment planning',
      'Risk assessment'
    ],
    href: '/contact'
  },
  {
    title: 'Operations Consulting',
    description: 'Streamline processes and remove operational friction to scale efficiently.',
    features: [
      'Process optimization',
      'Workflow automation',
      'Team alignment',
      'Performance metrics'
    ],
    href: '/contact'
  },
  {
    title: 'Digital Transformation',
    description: 'Modernize your business with digital-first approaches and technology integration.',
    features: [
      'Technology strategy',
      'Digital workflows',
      'Data analytics',
      'System integration'
    ],
    href: '/contact'
  },
  {
    title: 'Business Strategy',
    description: 'Comprehensive strategic planning to align your vision with actionable growth plans.',
    features: [
      'Market analysis',
      'Competitive positioning',
      'Growth planning',
      'Strategic roadmaps'
    ],
    href: '/contact'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-black mb-6 leading-tight">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Strategic consulting services designed to bring clarity to your operations, 
            strengthen your financial foundation, and accelerate sustainable growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 h-full hover:bg-gray-100 transition-all duration-300">
                  <h3 className="text-3xl font-medium text-black mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={service.href}
                    className="inline-flex items-center text-black font-medium group-hover:gap-2 transition-all duration-300"
                  >
                    Get started <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help your business achieve clarity and growth.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  )
}