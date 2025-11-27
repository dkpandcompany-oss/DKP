import Head from "next/head";
import Link from "next/link";

export default function CaseStudiesPage() {
    return (
        <>
            <Head>
                <title>Case Studies — DPK & Company</title>
                <meta
                    name="description"
                    content="Real-world examples of how DPK & Company helps businesses achieve operational clarity and growth."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Case Studies</h1>
                <p className="text-lg text-[#666666] mb-12">See how we help clients achieve measurable impact.</p>

                <div className="space-y-16">

                    <section id="case-1" className="border-b border-gray-100 pb-12">
                        <h2 className="text-2xl font-semibold mb-2 text-[#202020]">Meridian Foods – Operations Redesign</h2>
                        <div className="flex gap-4 text-sm text-[#666666] mb-6">
                            <span><strong>Industry:</strong> Food & Beverage</span>
                            <span>•</span>
                            <span><strong>Problem:</strong> Inefficient production line causing 40% longer processing time.</span>
                        </div>

                        <h3 className="text-lg font-medium text-[#156d95] mb-2">Approach</h3>
                        <ul className="list-disc pl-6 mb-4 text-[#666666]">
                            <li>Mapped end‑to‑end workflow and identified bottlenecks.</li>
                            <li>Implemented lean‑principles and standardized work instructions.</li>
                            <li>Introduced real‑time KPI dashboards for floor managers.</li>
                        </ul>

                        <h3 className="text-lg font-medium text-[#156d95] mb-2">Results</h3>
                        <ul className="list-disc pl-6 mb-6 text-[#666666]">
                            <li>Processing time reduced by <strong>40%</strong>.</li>
                            <li>Labor cost savings of <strong>₹2.5M</strong> per quarter.</li>
                            <li>Quality defect rate dropped from <strong>5%</strong> to <strong>1.2%</strong>.</li>
                        </ul>

                        <blockquote className="border-l-4 border-[#156d95] pl-4 italic text-gray-700">
                            “The clarity they brought transformed how our team functions.” – COO, Meridian Foods
                        </blockquote>
                    </section>

                    <section id="case-2" className="border-b border-gray-100 pb-12">
                        <h2 className="text-2xl font-semibold mb-2 text-[#202020]">BrightHire – Financial Visibility</h2>
                        <div className="flex gap-4 text-sm text-[#666666] mb-6">
                            <span><strong>Industry:</strong> HR Tech</span>
                            <span>•</span>
                            <span><strong>Problem:</strong> Lack of real‑time financial reporting hindered strategic decisions.</span>
                        </div>

                        <h3 className="text-lg font-medium text-[#156d95] mb-2">Approach</h3>
                        <ul className="list-disc pl-6 mb-4 text-[#666666]">
                            <li>Integrated a cloud‑based financial reporting suite.</li>
                            <li>Automated expense categorization and forecasting models.</li>
                            <li>Trained finance team on KPI‑driven decision making.</li>
                        </ul>

                        <h3 className="text-lg font-medium text-[#156d95] mb-2">Results</h3>
                        <ul className="list-disc pl-6 mb-6 text-[#666666]">
                            <li>Reporting cycle cut from <strong>30 days</strong> to <strong>3 days</strong>.</li>
                            <li>Operating expense reduction of <strong>15%</strong> within 6 months.</li>
                            <li>Investor confidence improved – new funding round secured.</li>
                        </ul>

                        <blockquote className="border-l-4 border-[#156d95] pl-4 italic text-gray-700">
                            “Our financial visibility improved dramatically with their cost‑control strategies.” – CFO, BrightHire
                        </blockquote>
                    </section>

                    <section id="case-3">
                        <h2 className="text-2xl font-semibold mb-2 text-[#202020]">CoreEdge – Market Expansion</h2>
                        <div className="flex gap-4 text-sm text-[#666666] mb-6">
                            <span><strong>Industry:</strong> Technology Services</span>
                            <span>•</span>
                            <span><strong>Problem:</strong> Stagnant growth and limited market presence outside India.</span>
                        </div>

                        <h3 className="text-lg font-medium text-[#156d95] mb-2">Approach</h3>
                        <ul className="list-disc pl-6 mb-4 text-[#666666]">
                            <li>Conducted market‑entry analysis for Europe & APAC.</li>
                            <li>Developed partnership framework and joint‑go‑to‑market playbook.</li>
                            <li>Implemented a sales enablement platform for remote teams.</li>
                        </ul>

                        <h3 className="text-lg font-medium text-[#156d95] mb-2">Results</h3>
                        <ul className="list-disc pl-6 mb-6 text-[#666666]">
                            <li>Secured <strong>3 strategic partnerships</strong> within 4 months.</li>
                            <li>Revenue growth of <strong>28%</strong> YoY from new markets.</li>
                            <li>Customer acquisition cost reduced by <strong>22%</strong>.</li>
                        </ul>

                        <blockquote className="border-l-4 border-[#156d95] pl-4 italic text-gray-700">
                            “With DPK’s guidance, we secured multiple strategic partnerships within months.” – CEO, CoreEdge Technologies
                        </blockquote>
                    </section>

                </div>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Ready to achieve similar results?</h3>
                    <Link
                        href="/contact#consultation"
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Book a Consultation →
                    </Link>
                </div>
            </main>
        </>
    );
}
