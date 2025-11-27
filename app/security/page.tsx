import Head from "next/head";
import Link from "next/link";

export default function SecurityPage() {
    return (
        <>
            <Head>
                <title>Security — DPK & Company</title>
                <meta
                    name="description"
                    content="Learn about the security measures DPK & Company takes to protect your data."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Security</h1>
                <p className="text-lg text-[#666666] mb-12">We take the security of your data seriously. Here is an overview of our security practices.</p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Data Encryption</h2>
                    <p className="text-[#666666] mb-4">
                        All data transmitted between your browser and our servers is encrypted using TLS 1.3. Data at rest is encrypted using AES-256 standards.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Access Control</h2>
                    <p className="text-[#666666] mb-4">
                        We employ strict role-based access control (RBAC). Only authorized personnel with a legitimate business need have access to client data. Multi-factor authentication (MFA) is enforced for all internal accounts.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Infrastructure Security</h2>
                    <p className="text-[#666666] mb-4">
                        Our infrastructure is hosted on secure cloud providers with industry-leading physical and network security controls. We perform regular vulnerability scans and security audits.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Incident Response</h2>
                    <p className="text-[#666666] mb-4">
                        We have a defined incident response plan to handle any security events promptly. In the event of a data breach, we will notify affected clients in accordance with applicable laws.
                    </p>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Report a security issue</h3>
                    <Link
                        href="mailto:security@dpkconsultants.com"
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Contact Security Team →
                    </Link>
                </div>
            </main>
        </>
    );
}
