import Head from "next/head";
import Link from "next/link";

export default function ApiDocsPage() {
    return (
        <>
            <Head>
                <title>API Docs — DPK & Company</title>
                <meta
                    name="description"
                    content="Information on secure data sharing and confidentiality protocols for DPK & Company clients."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">API Docs</h1>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-12">
                    <p className="text-amber-800">
                        <strong>DPK does not provide a public API.</strong> This section describes how clients share data securely with our consulting team.
                    </p>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Data‑Sharing Guidelines</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Secure Upload Portal</strong> – Encrypted (TLS 1.3) file drop‑zone for spreadsheets, contracts, and logs.</li>
                        <li><strong>Access Controls</strong> – Role‑based permissions; only assigned consultants can view your data.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Security Commitment</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>At‑rest encryption</strong> – AES‑256 for all stored assets.</li>
                        <li><strong>Transit protection</strong> – End‑to‑end TLS, signed JWT tokens for temporary links.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Confidentiality</h2>
                    <p className="text-[#666666]">
                        All client data is treated as <strong>strictly confidential</strong> under a signed NDA. No data is used for any purpose other than the agreed‑upon engagement.
                    </p>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Have security questions?</h3>
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
