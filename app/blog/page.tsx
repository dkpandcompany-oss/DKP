import Head from "next/head";
import Link from "next/link";

export default function BlogPage() {
    return (
        <>
            <Head>
                <title>Blog — DPK & Company</title>
                <meta
                    name="description"
                    content="Insights on operational excellence, digital transformation, and strategic growth from DPK & Company."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Blog</h1>
                <p className="text-lg text-[#666666] mb-12">Insights on operational excellence, digital transformation, and strategic growth.</p>

                <div className="grid gap-8">

                    <article className="border-b border-gray-100 pb-8">
                        <span className="text-sm text-[#156d95] font-medium mb-2 block">Operations</span>
                        <h2 className="text-2xl font-semibold mb-3 text-[#202020]">Workflow Optimization: 5 Steps to Cut Cycle Time by 30%</h2>
                        <p className="text-[#666666] mb-4">Explore a practical framework for mapping, bottleneck removal, and automation that delivers measurable speed gains.</p>
                        <Link href="#" className="text-[#156d95] font-medium hover:underline">Read more →</Link>
                    </article>

                    <article className="border-b border-gray-100 pb-8">
                        <span className="text-sm text-[#156d95] font-medium mb-2 block">Finance</span>
                        <h2 className="text-2xl font-semibold mb-3 text-[#202020]">Cost Reduction in High‑Growth Companies</h2>
                        <p className="text-[#666666] mb-4">Learn how to audit spend, negotiate SaaS contracts, and implement zero‑based budgeting without slowing growth.</p>
                        <Link href="#" className="text-[#156d95] font-medium hover:underline">Read more →</Link>
                    </article>

                    <article className="border-b border-gray-100 pb-8">
                        <span className="text-sm text-[#156d95] font-medium mb-2 block">Strategy</span>
                        <h2 className="text-2xl font-semibold mb-3 text-[#202020]">Scaling Sustainably: The Founder’s Playbook</h2>
                        <p className="text-[#666666] mb-4">Balancing rapid expansion with culture, governance, and risk management – essential reading for ambitious founders.</p>
                        <Link href="#" className="text-[#156d95] font-medium hover:underline">Read more →</Link>
                    </article>

                </div>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Want to discuss these topics?</h3>
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
