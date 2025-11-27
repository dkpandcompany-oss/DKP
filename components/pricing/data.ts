export interface Service {
    id: string
    title: string
    outcome: string
    priceRange: string
    minPrice: number
    maxPrice: number
    bullets: string[]
    fullDescription: string
    timeline: string
    deliverables: string[]
    popular?: boolean
}

export interface AddOn {
    id: string
    name: string
    priceDisplay: string
    priceValue: number // For calculation (using min or fixed)
    description: string
}

export const SERVICES: Service[] = [
    {
        id: "operations",
        title: "Operations & Small Business Optimization",
        outcome: "Streamline workflows, SOPs, and scale your operations.",
        priceRange: "₹14,999 – ₹24,999",
        minPrice: 14999,
        maxPrice: 24999,
        bullets: ["Workflow audit", "SOP creation", "Operational roadmap"],
        fullDescription: "We analyze your current operations to identify bottlenecks and inefficiencies. Our team creates detailed Standard Operating Procedures (SOPs) and a strategic roadmap to ensure your business runs smoothly and scales effectively.",
        timeline: "2-3 weeks",
        deliverables: [
            "Comprehensive Operational Audit Report",
            "Customized SOPs for Key Processes",
            "Implementation Roadmap & Training Session",
            "Tool Stack Recommendations"
        ]
    },
    {
        id: "financial",
        title: "Financial Management & Cost Control",
        outcome: "Improve cash visibility, budgeting and reduce costs.",
        priceRange: "₹12,999 – ₹22,999",
        minPrice: 12999,
        maxPrice: 22999,
        bullets: ["Financial health check", "Cashflow clarity", "Cost reduction plan"],
        fullDescription: "Gain control over your finances with our expert analysis. We help you understand your cash flow, set realistic budgets, and identify areas where you can reduce costs without compromising quality.",
        timeline: "2 weeks",
        deliverables: [
            "Financial Health Assessment",
            "Cash Flow Forecast Model",
            "Cost Reduction Strategy Document",
            "Budgeting Templates"
        ]
    },
    {
        id: "bizdev",
        title: "Business Development & Strategic Partnerships",
        outcome: "Find partners and build a repeatable pipeline for growth.",
        priceRange: "₹19,999 – ₹34,999",
        minPrice: 19999,
        maxPrice: 34999,
        bullets: ["Partner mapping", "Pipeline design", "Outreach templates"],
        fullDescription: "Accelerate your growth by leveraging strategic partnerships. We help you identify potential partners, design a robust sales pipeline, and provide the tools you need to reach out and close deals.",
        timeline: "3-4 weeks",
        deliverables: [
            "Strategic Partner Map",
            "Sales Pipeline Architecture",
            "Custom Outreach Scripts & Templates",
            "Partnership Pitch Deck Structure"
        ],
        popular: true
    },
    {
        id: "marketing",
        title: "Marketing & Web Consulting",
        outcome: "Better digital presence and conversion-ready website advice.",
        priceRange: "₹14,999 – ₹29,999",
        minPrice: 14999,
        maxPrice: 29999,
        bullets: ["Website audit", "Brand & positioning", "Go-to-market plan"],
        fullDescription: "Enhance your online presence and attract more customers. We audit your website, refine your brand positioning, and create a go-to-market plan that drives conversions and growth.",
        timeline: "2-3 weeks",
        deliverables: [
            "Website UX/UI Audit",
            "Brand Positioning Strategy",
            "Go-to-Market Action Plan",
            "Conversion Rate Optimization Tips"
        ]
    }
]

export const ADD_ONS: AddOn[] = [
    {
        id: "website",
        name: "Custom Website Build",
        priceDisplay: "₹29,999 – ₹79,999",
        priceValue: 29999,
        description: "Professional, responsive website built for conversion."
    },
    {
        id: "retainer",
        name: "Monthly Retainer",
        priceDisplay: "₹9,999 / month",
        priceValue: 9999,
        description: "Ongoing support and advisory services."
    },
    {
        id: "implementation",
        name: "In-office Implementation",
        priceDisplay: "₹4,999 / day",
        priceValue: 4999,
        description: "On-site assistance to ensure smooth adoption."
    },
    {
        id: "priority",
        name: "Priority Support",
        priceDisplay: "₹3,999 / month",
        priceValue: 3999,
        description: "Faster response times and dedicated channel."
    }
]
