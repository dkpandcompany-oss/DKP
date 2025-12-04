import Head from "next/head";

export default function PrivacyPage() {
    return (
        <>
            {/* ==================== SEO ==================== */}
            <Head>
                <title>Privacy Policy — DPK &amp; Company</title>
                <meta
                    name="description"
                    content="DPK &amp; Company’s privacy policy explains what personal data we collect, how we use it, and how we protect your privacy."
                />
                <meta property="og:title" content="Privacy Policy — DPK &amp; Company" />
                <meta
                    property="og:description"
                    content="DPK &amp; Company’s privacy policy explains what personal data we collect, how we use it, and how we protect your privacy."
                />
                <meta
                    property="og:image"
                    content="/mnt/data/c5e016b4-5a93-44e2-b8b6-33fa2760bf5a.png"
                />
            </Head>

            {/* ==================== CONTENT ==================== */}
            <main className="prose max-w-3xl mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Privacy Policy</h1>
                <p className="text-lg mb-8 text-[#666666]">
                    We collect only the information needed to provide our consulting
                    services, improve the website, and communicate with you. Your data is
                    treated with the highest security standards.
                </p>

                {/* ----- What Data We Collect ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">1. What Data We Collect</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            <strong>Personal data</strong>: name, email, phone, company name,
                            job title.
                        </li>
                        <li>
                            <strong>Form submissions</strong>: information you provide when
                            requesting a quote or contacting us.
                        </li>
                        <li>
                            <strong>Analytics &amp; cookies</strong>: usage data collected via
                            Google Analytics, HubSpot, or similar tools.
                        </li>
                        <li>
                            <strong>Technical data</strong>: IP address, browser type,
                            operating system, device information.
                        </li>
                    </ul>
                </section>

                {/* ----- How We Use Your Data ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">2. How We Use Your Data</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>Deliver consulting services and project deliverables.</li>
                        <li>Respond to inquiries and send transactional emails.</li>
                        <li>
                            Send marketing communications (you can opt‑out at any time via the
                            email footer or your account settings).
                        </li>
                        <li>Analyze website traffic and improve user experience.</li>
                        <li>Comply with legal obligations.</li>
                    </ul>
                </section>

                {/* ----- Cookies & Tracking ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">3. Cookies &amp; Tracking</h2>
                    <p className="mb-4 text-[#666666]">
                        We use three categories of cookies. You can manage them through your
                        browser settings.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-2 pr-4 font-semibold text-[#202020]">Category</th>
                                    <th className="py-2 pr-4 font-semibold text-[#202020]">Purpose</th>
                                    <th className="py-2 font-semibold text-[#202020]">Examples</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#666666]">
                                <tr className="border-b border-gray-100">
                                    <td className="py-2 pr-4">Essential</td>
                                    <td className="py-2 pr-4">Enable core site functions (e.g., session).</td>
                                    <td className="py-2">session_id</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2 pr-4">Analytics</td>
                                    <td className="py-2 pr-4">Measure usage and improve performance.</td>
                                    <td className="py-2">_ga, _gid</td>
                                </tr>
                                <tr>
                                    <td className="py-2 pr-4">Marketing</td>
                                    <td className="py-2 pr-4">Targeted ads &amp; email campaigns.</td>
                                    <td className="py-2">fbp, hubspotutk</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ----- Data Sharing ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">4. Data Sharing</h2>
                    <p className="text-[#666666]">
                        We share data only with trusted third‑party service providers that
                        help us deliver the service (email providers, CRM, analytics). All
                        partners are contractually obligated to protect your data.
                    </p>
                </section>

                {/* ----- Data Retention ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">5. Data Retention</h2>
                    <p className="text-[#666666]">
                        Lead information is retained for up to 24 months after the last
                        interaction. Project files are kept for the duration of the
                        engagement plus 12 months thereafter. Logs are retained for 90 days.
                    </p>
                </section>

                {/* ----- Security Measures ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">6. Security Measures</h2>
                    <p className="text-[#666666]">
                        We employ TLS encryption, regular security audits, role‑based access
                        controls, and secure backups. No data is stored on public servers.
                    </p>
                </section>

                {/* ----- Your Rights ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">7. Your Rights</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            <strong>Access &amp; correction</strong>: Request a copy of your
                            data or ask for updates.
                        </li>
                        <li>
                            <strong>Deletion &amp; portability</strong>: Ask us to delete or
                            export your data.
                        </li>
                        <li>
                            <strong>Complaint</strong>: Raise concerns with the
                            <a href="mailto:dkpandcompany@gmail.com" className="text-[#156d95] ml-1 hover:underline">support email</a>.
                        </li>
                    </ul>
                </section>

                {/* ----- Children’s Privacy ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">8. Children’s Privacy</h2>
                    <p className="text-[#666666]">
                        Our services are not directed at children under 18, and we do not
                        knowingly collect data from them.
                    </p>
                </section>

                {/* ----- International Transfers ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">9. International Transfers</h2>
                    <p className="text-[#666666]">
                        If data is processed outside India, it is done only with providers
                        that offer adequate safeguards (e.g., EU‑U.S. Privacy Shield
                        alternatives).
                    </p>
                </section>

                {/* ----- Changes & Effective Date ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">10. Changes to This Policy</h2>
                    <p className="mb-2 text-[#666666]">
                        We may update this policy from time to time. The “Effective Date”
                        below reflects the latest revision.
                    </p>
                    <p className="text-[#666666]">
                        <strong>Effective Date:</strong> <span className="font-medium">[INSERT EFFECTIVE DATE]</span>
                    </p>
                </section>

                {/* ----- Contact ----- */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">11. Contact Us</h2>
                    <p className="text-[#666666]">
                        For any privacy‑related questions, please email{" "}
                        <a href="mailto:dkpandcompany@gmail.com" className="text-[#156d95] hover:underline">
                            dkpandcompany@gmail.com
                        </a>
                        .
                    </p>
                </section>
            </main>
        </>
    );
}
