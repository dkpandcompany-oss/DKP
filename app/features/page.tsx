import Head from "next/head";
import Link from "next/link";

export default function FeaturesPage() {
    return (
        <>
            <Head>
                <title>Features — DPK & Company</title>
                <meta
                    name="description"
                    content="Discover the core features of DPK & Company's consulting services: Operational Clarity, Cost Control, and Strategic Growth."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Features</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">What we offer</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Operational Clarity</strong> – Transparent processes, real‑time dashboards, and KPI‑driven reporting.</li>
                        <li><strong>Cost Control</strong> – Rigorous expense analysis, budgeting frameworks, and waste‑reduction tactics.</li>
                        <li><strong>Workflow Redesign</strong> – Lean‑principles, SOP creation, and automation road‑maps.</li>
                        <li><strong>Digital Transformation</strong> – Cloud migration, data‑platform integration, and low‑code tooling.</li>
                        <li><strong>Strategic Consulting</strong> – Market entry, growth‑strategy, and organisational design.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Who it’s for</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Scale‑up founders</strong> who need rapid, sustainable growth.</li>
                        <li><strong>C‑level executives</strong> seeking clear, data‑driven decision frameworks.</li>
                        <li><strong>Operations teams</strong> looking to eliminate bottlenecks and improve throughput.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Why it matters</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Speed</strong> – Reduce time‑to‑value by up to <strong>40%</strong>.</li>
                        <li><strong>Cleanliness</strong> – Cut discretionary spend by <strong>15‑30%</strong> on average.</li>
                        <li><strong>Confidence</strong> – Board‑level reporting that removes guesswork.</li>
                    </ul>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Outcomes</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>Measurable KPI improvement (e.g., <strong>+20%</strong> net‑margin).</li>
                        <li>Faster product cycles (average <strong>‑30%</strong> time‑to‑market).</li>
                        <li>Scalable processes that survive leadership transitions.</li>
                    </ul>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Ready to optimize your business?</h3>
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
