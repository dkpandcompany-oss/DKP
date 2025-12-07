"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const processDetails = {
  "discover-analyze": {
    number: "01",
    title: "Discover & Analyze",
    subtitle: "Understanding Your Business Foundation",
    description: "We begin by understanding your business—how you operate, manage finances, generate growth, and present yourself online.",
    overview: "Our discovery phase is designed to give us a comprehensive understanding of your business operations, challenges, and opportunities. We take a deep dive into every aspect of your organization to identify areas for improvement and growth potential.",
    keyActivities: [
      "Business operations assessment",
      "Financial systems review",
      "Growth strategy evaluation",
      "Digital presence audit",
      "Team structure analysis",
      "Market positioning review"
    ],
    deliverables: [
      "Comprehensive business assessment report",
      "Identified pain points and opportunities",
      "Preliminary recommendations",
      "Foundation for strategic roadmap"
    ],
    timeline: "1-2 weeks",
    nextStep: "build-strategy"
  },
  "build-strategy": {
    number: "02",
    title: "Build a Clear Strategy",
    subtitle: "Creating Your Roadmap to Success",
    description: "Based on our findings, we create a simple, structured roadmap that outlines what needs to improve and how to get there effectively.",
    overview: "Using insights from the discovery phase, we develop a tailored strategic plan that addresses your specific challenges and leverages your unique opportunities. Our strategies are practical, actionable, and designed for real-world implementation.",
    keyActivities: [
      "Strategic planning sessions",
      "Priority setting and goal definition",
      "Resource allocation planning",
      "Timeline development",
      "Risk assessment and mitigation",
      "Success metrics definition"
    ],
    deliverables: [
      "Detailed strategic roadmap",
      "Clear action items with timelines",
      "Resource requirements outline",
      "KPI framework",
      "Implementation guidelines"
    ],
    timeline: "1-2 weeks",
    nextStep: "implement-improvements"
  },
  "implement-improvements": {
    number: "03",
    title: "Implement Improvements",
    subtitle: "Executing Your Strategic Plan",
    description: "We assist you in executing the plan—optimizing workflows, improving cost control, strengthening BD efforts, and enhancing your digital presence.",
    overview: "Implementation is where strategy meets action. We work closely with your team to execute the strategic plan, ensuring smooth transitions, effective change management, and measurable results.",
    keyActivities: [
      "Workflow optimization",
      "Process automation setup",
      "Financial systems implementation",
      "Business development initiatives",
      "Digital presence enhancement",
      "Team training and onboarding"
    ],
    deliverables: [
      "Optimized operational workflows",
      "Improved financial controls",
      "Enhanced business development processes",
      "Upgraded digital presence",
      "Training materials and documentation",
      "Performance tracking systems"
    ],
    timeline: "2-4 weeks",
    nextStep: "monitor-refine"
  },
  "monitor-refine": {
    number: "04",
    title: "Monitor & Refine",
    subtitle: "Ensuring Long-term Success",
    description: "Once implemented, we review performance, measure results, and fine-tune strategies to ensure long-term stability and growth.",
    overview: "Continuous improvement is key to sustained success. We monitor the performance of implemented strategies, analyze results, and make data-driven refinements to optimize outcomes and ensure your business continues to thrive.",
    keyActivities: [
      "Performance monitoring and tracking",
      "Data analysis and reporting",
      "Strategy refinement",
      "Continuous optimization",
      "Stakeholder feedback collection",
      "Best practices documentation"
    ],
    deliverables: [
      "Performance dashboards",
      "Regular progress reports",
      "Optimization recommendations",
      "Updated strategic plans",
      "Success case studies",
      "Ongoing support framework"
    ],
    timeline: "Ongoing",
    nextStep: null
  }
}

export default function ProcessDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const process = processDetails[slug as keyof typeof processDetails]

  if (!process) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Process not found</h1>
          <button
            onClick={() => router.push("/#process")}
            className="text-[#156d95] hover:underline"
          >
            Back to Our Process
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Back Button */}
        <button
          onClick={() => router.push("/#process")}
          className="flex items-center gap-2 text-[#156d95] hover:text-[#156d95]/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Our Process</span>
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <div className="w-16 h-16 rounded-full bg-[#156d95] flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-6">
              {process.number}
            </div>
          </div>
          
          <h1 
            className="text-5xl font-bold text-[#111A4A] mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            {process.title}
          </h1>
          
          <p className="text-xl text-[#156d95] font-medium mb-6">
            {process.subtitle}
          </p>
          
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {process.description}
          </p>
        </motion.div>

        {/* Overview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#111A4A] mb-4">Overview</h2>
          <p className="text-slate-600 leading-relaxed">{process.overview}</p>
        </motion.section>

        {/* Key Activities */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#111A4A] mb-6">Key Activities</h2>
          <div className="grid gap-4">
            {process.keyActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#156d95] mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{activity}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Deliverables */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#111A4A] mb-6">What You Get</h2>
          <div className="grid gap-4">
            {process.deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <CheckCircle2 className="w-5 h-5 text-[#156d95] mt-0.5 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{deliverable}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-[#111A4A] mb-2">Estimated Timeline</h3>
            <p className="text-2xl font-bold text-[#156d95]">{process.timeline}</p>
          </div>
        </motion.section>

        {/* Next Step */}
        {process.nextStep && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t pt-12"
          >
            <h3 className="text-lg text-slate-600 mb-4">Next Step</h3>
            <button
              onClick={() => router.push(`/process/${process.nextStep}`)}
              className="inline-flex items-center gap-2 bg-[#156d95] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#156d95]/90 transition-colors"
            >
              Continue to Step {processDetails[process.nextStep as keyof typeof processDetails].number}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.section>
        )}

        {/* CTA if last step */}
        {!process.nextStep && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t pt-12"
          >
            <div className="bg-gradient-to-r from-[#156d95] to-[#1a7ea8] p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="mb-6">Let's transform your business with our proven process.</p>
              <button
                onClick={() => router.push("/contact")}
                className="bg-white text-[#156d95] px-6 py-3 rounded-full font-semibold hover:bg-slate-50 transition-colors"
              >
                Book a Consultation
              </button>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
