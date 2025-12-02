import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing | DKP Consulting',
  description: 'Transparent pricing for strategic consulting services tailored to your business needs.',
}

const pricingPlans = [
  {
    name: 'Consultation',
    price: 'Free',
    description: 'Perfect for understanding your needs and exploring how we can help.',
    features: [
      '60-minute strategy session',
      'Business assessment',
      'Personalized recommendations',
      'No commitment required'
    ],
    cta: 'Schedule consultation',
    href: '/contact',
    highlighted: false
  },
  {
    name: 'Project-Based',
    price: 'Custom',
    description: 'Tailored solutions for specific challenges and growth objectives.',
    features: [
      'Customized scope of work',
      'Fixed-price projects',
      'Dedicated project manager',
      '3-month delivery timeline',
      'Post-project support'
    ],
    cta: 'Get quote',
    href: '/contact',
    highlighted: true
  },
  {
    name: 'Ongoing Partnership',
    price: 'Monthly',
    description: 'Continuous strategic guidance for sustained growth and optimization.',
    features: [
      'Monthly strategy sessions',
      'Quarterly business reviews',
      'Priority email support',
      'Custom reporting dashboards',
      'Flexible engagement model'
    ],
    cta: 'Learn more',
    href: '/contact',
    highlighted: false
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-black mb-6 leading-tight">
            Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transparent pricing designed to deliver exceptional value at every stage of your business journey.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative rounded-3xl p-8 lg:p-10 transition-all duration-300 ${
                  plan.highlighted 
                    ? 'bg-black text-white ring-2 ring-black scale-105' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-medium mb-2 ${
                    plan.highlighted ? 'text-white' : 'text-black'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-light mb-4 ${
                    plan.highlighted ? 'text-white' : 'text-black'
                  }`}>
                    {plan.price}
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        plan.highlighted ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.href}
                  className={`block text-center py-3 px-6 rounded-full font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-white text-black hover:bg-gray-100'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-black mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-black mb-3">
                How do you determine project pricing?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We assess the scope, complexity, and timeline of your project during our initial consultation. 
                This ensures transparent, fair pricing tailored to your specific needs and budget.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-black mb-3">
                What's included in the free consultation?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A comprehensive 60-minute session where we analyze your current situation, identify key challenges, 
                and provide actionable recommendations—with no strings attached.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-black mb-3">
                Can I change plans or cancel anytime?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, our ongoing partnerships are designed to be flexible. You can adjust the engagement model 
                or cancel with 30 days' notice to ensure it continues to meet your evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light text-black mb-6 leading-tight">
            Ready to begin?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start with a free consultation to explore how we can help your business thrive.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            Schedule consultation
          </Link>
        </div>
      </section>
    </div>
  )
}