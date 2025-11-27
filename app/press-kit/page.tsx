import Head from "next/head";
import Link from "next/link";

export default function PressKitPage() {
    return (
        <>
            <Head>
                <title>Press Kit — DPK & Company</title>
                <meta
                    name="description"
                    content="Download brand assets and media resources for DPK & Company."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Press Kit</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Downloadable assets</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Logo</strong> – <code>logo.png</code> (high‑resolution, transparent background)</li>
                        <li><strong>Brand colors</strong> – Primary <code>#156d95</code>, Dark <code>#0A0D12</code>, Accent <code>#F0F9FF</code></li>
                        <li><strong>Typography</strong> – Primary: <em>Inter</em> (weights 400‑600); Secondary: <em>Roboto</em></li>
                        <li><strong>Brand description</strong> – “DPK & Company is a strategic consulting firm delivering operational clarity, cost control, and digital transformation for high‑growth businesses across India and Asia.”</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Media contact</h2>
                    <p className="text-[#666666]">
                        <strong>press@dpkconsultants.com</strong> – for interview requests, high‑resolution assets, and story pitches.
                    </p>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Need something else?</h3>
                    <Link
                        href="/contact"
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Contact Us →
                    </Link>
                </div>
            </main>
        </>
    );
}
