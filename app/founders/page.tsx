import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, User, Briefcase, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Founders & Solopreneurs - Strategic Consulting | DKP & Company',
  description: 'For individuals doing everything, we streamline daily workflows, bring financial clarity, and create a professional digital presence that supports growth.',
}

export default function FoundersPage() {
  const services = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Workflow Optimization",
      description: "Streamline your daily operations and eliminate time-wasting activities",
      features: ["Task automation", "Process documentation", "Time management", "Productivity systems"]
    },
    {
      icon: <User className="w-6 h-6" />,
      title: "Financial Clarity", 
      description: "Bring order to your finances with clear tracking and planning",
      features: ["Personal finance setup", "Business accounting", "Tax planning", "Investment strategy"]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Digital Presence",
      description: "Create a professional online presence that attracts customers",
      features: ["Website optimization", "Social media strategy", "Online branding", "Content planning"]
    }
  ]

  const benefits = [
    "Streamline workflows to focus on high-value activities",
    "Get clear financial visibility and control", 
    "Build a professional brand that stands out",
    "Automate repetitive tasks to save time",
    "Create systems that scale with your growth",
    "Balance personal and business finances effectively"
  ]

  const founderChallenges = [
    {
      challenge: "Wearing Too Many Hats",
      solution: "We help prioritize and systematize your key activities"
    },
    {
      challenge: "Financial Overwhelm",
      solution: "Simple systems for tracking income, expenses, and growth"
    },
    {
      challenge: "Lack of Professional Presence",
      solution: "Professional branding and digital presence that converts"
    },
    {
      challenge: "No Time for Strategy",
      solution: "Quick wins and automated systems that work while you sleep"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Strategic Consulting for Founders & Solopreneurs
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              For individuals doing everything, we streamline daily workflows, bring financial clarity, and create a professional digital presence that supports growth.
            </p>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Founder Challenges We Solve
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              As a founder or solopreneur, you're juggling everything. We help you focus on what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {founderChallenges.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-red-600 mb-3">
                  Challenge: {item.challenge}
                </h3>
                <p className="text-gray-700">
                  <span className="font-semibold text-green-600">Our Solution:</span> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Help Founders Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our founder-focused approach is designed for busy entrepreneurs who need results fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="text-green-600 mb-4">
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
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
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
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Founders Choose Us
              </h2>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">Perfect for:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Solo founders running everything</li>
                  <li>• Freelancers scaling their business</li>
                  <li>• Small business owners seeking clarity</li>
                  <li>• Entrepreneurs preparing for growth</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Work Smarter?
              </h3>
              <p className="text-gray-600 mb-6">
                Stop doing everything yourself. Get the systems and clarity you need to focus on growing your business.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/contact" 
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Schedule a Consultation
                </Link>
                <Link 
                  href="/checkout" 
                  className="block w-full border border-green-600 text-green-600 text-center py-3 rounded-lg font-semibold hover:bg-green-600/5 transition-colors"
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