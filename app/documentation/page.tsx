import Head from "next/head";
import Link from "next/link";

export default function DocumentationPage() {
    return (
        <>
            <Head>
                <title>Documentation — DPK & Company</title>
                <meta
                    name="description"
                    content="Overview of DPK & Company's consulting processes, deliverables, and communication protocols."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Documentation</h1>
                <p className="text-lg text-[#666666] mb-12">An overview of our consulting engagement process.</p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">1. Onboarding flow</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Kick‑off questionnaire</strong> – capture business goals, current metrics, and stakeholder map.</li>
                        <li><strong>Discovery workshops</strong> – deep‑dive sessions to surface pain points and opportunities.</li>
                        <li><strong>Scope definition</strong> – formalize deliverables, timelines, and success criteria.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">2. Deliverables</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Strategic roadmap</strong> – high‑level milestones, KPIs, and ownership matrix.</li>
                        <li><strong>SOP library</strong> – step‑by‑step operating procedures for critical processes.</li>
                        <li><strong>Dashboard templates</strong> – ready‑to‑use visualisations (financial, operational, product).</li>
                        <li><strong>Executive summary</strong> – concise briefing for board or investors.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">3. Communication process</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Weekly status calls</strong> (30 min) – progress updates, blockers, next steps.</li>
                        <li><strong>Dedicated Slack channel</strong> – real‑time Q&A, file sharing, and quick decisions.</li>
                        <li><strong>Bi‑weekly written reports</strong> – KPI tracking, variance analysis.</li>
                    </ul>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Ready to start?</h3>
                        <Link
                            href="/checkout"
                            className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                        >
                            Book a Consultation →
                        </Link>
                </div>
            </main>
        </>
    );
}
