import Head from "next/head";
import Link from "next/link";

export default function ChangelogPage() {
    return (
        <>
            <Head>
                <title>Changelog — DPK & Company</title>
                <meta
                    name="description"
                    content="Latest updates, improvements, and news from DPK & Company."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Changelog</h1>

                <div className="relative border-l border-gray-200 ml-4 space-y-12">

                    <div className="relative pl-8">
                        <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[#156d95] ring-4 ring-white"></span>
                        <time className="block text-sm font-medium text-gray-500 mb-1">November 20, 2025</time>
                        <h3 className="text-lg font-semibold text-[#202020]">Strategic Growth Module</h3>
                        <p className="text-[#666666]">Added <strong>Strategic Growth</strong> consulting module to the <em>Growth</em> pricing tier.</p>
                    </div>

                    <div className="relative pl-8">
                        <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white"></span>
                        <time className="block text-sm font-medium text-gray-500 mb-1">October 15, 2025</time>
                        <h3 className="text-lg font-semibold text-[#202020]">Digital Transformation Playbook</h3>
                        <p className="text-[#666666]">Launched <strong>Digital Transformation</strong> playbook – includes low‑code automation recommendations.</p>
                    </div>

                    <div className="relative pl-8">
                        <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white"></span>
                        <time className="block text-sm font-medium text-gray-500 mb-1">September 1, 2025</time>
                        <h3 className="text-lg font-semibold text-[#202020]">New Enterprise Tier</h3>
                        <p className="text-[#666666]">Revised <strong>Pricing</strong> structure: introduced <em>Enterprise</em> tier with dedicated C‑suite advisory.</p>
                    </div>

                    <div className="relative pl-8">
                        <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white"></span>
                        <time className="block text-sm font-medium text-gray-500 mb-1">August 12, 2025</time>
                        <h3 className="text-lg font-semibold text-[#202020]">Features Update</h3>
                        <p className="text-[#666666]">Updated <strong>Features</strong> page – added <em>Workflow Redesign</em> KPI examples.</p>
                    </div>

                    <div className="relative pl-8">
                        <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-gray-300 ring-4 ring-white"></span>
                        <time className="block text-sm font-medium text-gray-500 mb-1">July 5, 2025</time>
                        <h3 className="text-lg font-semibold text-[#202020]">Automation Guidelines</h3>
                        <p className="text-[#666666]">Integrated <strong>Zapier‑style</strong> workflow automation guidelines into <em>Integrations</em> section.</p>
                    </div>

                </div>

                <div className="mt-16 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Stay updated with our progress</h3>
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
