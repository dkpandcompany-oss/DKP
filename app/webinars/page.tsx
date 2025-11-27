import Head from "next/head";
import Link from "next/link";

export default function WebinarsPage() {
    return (
        <>
            <Head>
                <title>Webinars — DPK & Company</title>
                <meta
                    name="description"
                    content="Watch past webinars and register for upcoming sessions on business strategy and operations."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Webinars</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-[#156d95]">Upcoming sessions</h2>
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <span className="text-sm font-medium text-[#156d95] mb-2 block">December 10, 2025 • 2:00 PM IST</span>
                        <h3 className="text-xl font-semibold text-[#202020] mb-2">Cost Control Strategies for 2026</h3>
                        <p className="text-[#666666] mb-4">Learn practical techniques to audit your expenses and optimize your budget for the coming year.</p>
                        <Link href="/contact" className="inline-block bg-[#156d95] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#156d95]/90 transition-colors">
                            Register Now
                        </Link>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-[#156d95]">Archive</h2>
                    <div className="grid gap-6">

                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-[#202020] mb-2">Workflow Redesign Masterclass</h3>
                            <p className="text-[#666666] mb-4">A deep dive into mapping processes and identifying bottlenecks.</p>
                            <Link href="#" className="text-[#156d95] font-medium hover:underline">Watch Recording →</Link>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-[#202020] mb-2">Scaling for Founders</h3>
                            <p className="text-[#666666] mb-4">Key strategies for managing growth without losing control.</p>
                            <Link href="#" className="text-[#156d95] font-medium hover:underline">Watch Recording →</Link>
                        </div>

                    </div>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Don't miss the next one</h3>
                    <Link
                        href="/contact"
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Subscribe to Updates →
                    </Link>
                </div>
            </main>
        </>
    );
}
