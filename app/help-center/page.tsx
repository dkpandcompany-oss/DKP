import Head from "next/head";
import Link from "next/link";

export default function HelpCenterPage() {
    return (
        <>
            <Head>
                <title>Help Center — DPK & Company</title>
                <meta
                    name="description"
                    content="Frequently asked questions about DPK & Company's services, billing, and project management."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Help Center</h1>

                <div className="space-y-8">

                    <div>
                        <h3 className="text-xl font-semibold text-[#202020] mb-2">How does billing work?</h3>
                        <p className="text-[#666666]">We typically structure engagements with a 50% upfront retainer and 50% upon delivery of key milestones. For ongoing advisory, we bill monthly.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-[#202020] mb-2">What is the typical project timeline?</h3>
                        <p className="text-[#666666]">Timelines vary by scope. A standard audit takes 2 weeks, while a full operational redesign can take 3-6 months. We define clear timelines during the proposal phase.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-[#202020] mb-2">Do you offer revisions?</h3>
                        <p className="text-[#666666]">Yes, we include two rounds of revisions for all major deliverables to ensure they meet your specific needs and expectations.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-[#202020] mb-2">How do we communicate during the project?</h3>
                        <p className="text-[#666666]">We use a combination of weekly video calls, a dedicated Slack channel for quick queries, and email for formal deliverables.</p>
                    </div>

                </div>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Still have questions?</h3>
                    <Link
                        href="/contact"
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Contact Support →
                    </Link>
                </div>
            </main>
        </>
    );
}
