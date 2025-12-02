import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | DKP Consulting',
  description: 'Frequently asked questions about our strategic consulting services and process.',
}

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I know if DKP is right for my business?',
        answer: 'We work best with businesses that are experiencing growth challenges, need operational clarity, or want to strengthen their financial foundation. Our free consultation helps determine if we\'re a good fit for your specific needs and goals.'
      },
      {
        question: 'What happens during the initial consultation?',
        answer: 'Our 60-minute consultation includes a comprehensive assessment of your current business situation, identification of key challenges and opportunities, and personalized recommendations for next steps. It\'s completely free with no commitment required.'
      },
      {
        question: 'How quickly can we get started?',
        answer: 'Most consultations can be scheduled within 48-72 hours. For project work, we typically begin within 1-2 weeks after finalizing the scope and agreement, depending on our current capacity and your timeline requirements.'
      }
    ]
  },
  {
    category: 'Services & Process',
    questions: [
      {
        question: 'What types of businesses do you work with?',
        answer: 'We specialize in working with growing companies, early-stage startups, and founders who need strategic guidance. Our clients range from solo entrepreneurs to companies with 50+ employees across various industries including tech, consulting, e-commerce, and professional services.'
      },
      {
        question: 'Do you work remotely or on-site?',
        answer: 'We primarily work remotely using modern collaboration tools, which allows us to serve clients globally while keeping costs efficient. For larger projects or strategic workshops, we can arrange on-site visits when beneficial.'
      },
      {
        question: 'How do you measure success?',
        answer: 'Success metrics are defined collaboratively based on your specific goals. Common measurements include improved cash flow, streamlined processes, increased operational efficiency, successful fundraising, or achievement of growth milestones.'
      },
      {
        question: 'What deliverables can I expect?',
        answer: 'Deliverables vary by project but typically include strategic frameworks, process documentation, financial models, implementation roadmaps, and regular progress reports. Everything is designed to be actionable and sustainable for your team.'
      }
    ]
  },
  {
    category: 'Pricing & Engagement',
    questions: [
      {
        question: 'How do you structure your pricing?',
        answer: 'We offer three main engagement models: free consultations, fixed-price projects, and ongoing monthly partnerships. Pricing is always transparent and discussed upfront based on scope, complexity, and expected outcomes.'
      },
      {
        question: 'Do you require long-term contracts?',
        answer: 'No long-term contracts required. Project work has defined timelines, and ongoing partnerships can be adjusted or canceled with 30 days\' notice. We believe in earning your business through results, not contracts.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including bank transfers, credit cards, and digital payment platforms. For ongoing partnerships, we typically bill monthly. Project work can be structured with milestone payments.'
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes, we can structure payment plans for larger projects to align with your cash flow needs. This is discussed during the proposal phase to ensure a comfortable arrangement for both parties.'
      }
    ]
  },
  {
    category: 'Results & Timeline',
    questions: [
      {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary significantly based on scope. Strategic assessments might take 2-4 weeks, while comprehensive operational overhauls can take 3-6 months. We always provide clear timelines during the proposal phase.'
      },
      {
        question: 'When will I start seeing results?',
        answer: 'Many clients see initial improvements within the first few weeks through quick wins and process optimizations. Deeper strategic changes typically show meaningful results within 2-3 months, with full impact realized over 6-12 months.'
      },
      {
        question: 'What ongoing support do you provide?',
        answer: 'All projects include a brief post-project support period. For ongoing needs, we offer monthly partnership arrangements with regular check-ins, strategic guidance, and implementation support as your business evolves.'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-light text-black mb-6 leading-tight">
            FAQ
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about our services, process, and how we can help your business grow.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16 last:mb-0">
              <h2 className="text-3xl font-light text-black mb-8 pb-4 border-b border-gray-200">
                {section.category}
              </h2>
              
              <div className="space-y-8">
                {section.questions.map((faq, faqIndex) => (
                  <div key={faqIndex}>
                    <h3 className="text-xl font-medium text-black mb-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-200">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-black mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're here to help. Schedule a free consultation to discuss your specific needs and get personalized answers.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}