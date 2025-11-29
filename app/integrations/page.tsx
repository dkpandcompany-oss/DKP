import Head from "next/head";
import Link from "next/link";

export default function IntegrationsPage() {
    return (
        <>
            <Head>
                <title>Integrations — DPK & Company</title>
                <meta
                    name="description"
                    content="Learn how DPK & Company integrates with your existing tools and workflows to drive efficiency."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Integrations</h1>

                <p className="text-lg text-[#666666] mb-12">
                    DPK works <strong>conceptually</strong> with the tools you already use. We map, align, and automate across three layers:
                </p>

                <div className="overflow-x-auto mb-12">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4 pr-4 font-semibold text-[#202020]">Layer</th>
                                <th className="py-4 pr-4 font-semibold text-[#202020]">Typical Tools</th>
                                <th className="py-4 font-semibold text-[#202020]">What we do</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#666666]">
                            <tr className="border-b border-gray-100">
                                <td className="py-4 pr-4 font-medium">Accounting</td>
                                <td className="py-4 pr-4">Xero, QuickBooks, Zoho Books</td>
                                <td className="py-4">Unified chart of accounts, automated expense capture, financial KPI sync.</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-4 pr-4 font-medium">CRM / Sales</td>
                                <td className="py-4 pr-4">HubSpot, Salesforce, Pipedrive</td>
                                <td className="py-4">Lead‑to‑cash pipeline mapping, data enrichment, sales‑ops dashboards.</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-4 pr-4 font-medium">Workflow Automation</td>
                                <td className="py-4 pr-4">Zapier, Make, Power Automate</td>
                                <td className="py-4">Trigger‑based task routing, SOP enforcement, cross‑system notifications.</td>
                            </tr>
                            <tr>
                                <td className="py-4 pr-4 font-medium">Website / Digital</td>
                                <td className="py-4 pr-4">Webflow, WordPress, Shopify</td>
                                <td className="py-4">Conversion‑focused analytics, SEO audit integration, content‑workflow hand‑off.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-12">
                    <p className="text-sm text-[#666666]">
                        <strong>Note:</strong> These are <strong>conceptual integrations</strong> – we design the process, configure the connectors, and hand‑off documentation for your internal team.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Need help connecting your stack?</h3>
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
