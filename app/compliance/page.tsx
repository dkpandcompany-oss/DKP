import Head from "next/head";
import Link from "next/link";

export default function CompliancePage() {
    return (
        <>
            <Head>
                <title>Compliance — DPK & Company</title>
                <meta
                    name="description"
                    content="DPK & Company's commitment to regulatory compliance and industry standards."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Compliance</h1>
                <p className="text-lg text-[#666666] mb-12">We are committed to adhering to applicable laws and regulations.</p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Data Privacy</h2>
                    <p className="text-[#666666] mb-4">
                        We comply with the Digital Personal Data Protection Act (DPDP Act) of India and other relevant data privacy regulations. We respect your rights to access, correct, and delete your personal data.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Confidentiality</h2>
                    <p className="text-[#666666] mb-4">
                        We maintain strict confidentiality agreements with all our clients. Your proprietary information is protected and used solely for the purpose of the engagement.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Anti-Corruption</h2>
                    <p className="text-[#666666] mb-4">
                        We have a zero-tolerance policy for bribery and corruption. We conduct our business with integrity and in compliance with all applicable anti-corruption laws.
                    </p>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Questions about compliance?</h3>
                    <Link
                        href="mailto:dkpandcompany@gmail.com"
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Contact Legal Team →
                    </Link>
                </div>
            </main>
        </>
    );
}
