import Head from "next/head";
import Link from "next/link";

export default function CareersPage() {
    return (
        <>
            <Head>
                <title>Careers — DPK & Company</title>
                <meta
                    name="description"
                    content="Join DPK & Company. We hire curious problem-solvers to help businesses scale faster and operate cleaner."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Careers</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Our hiring philosophy</h2>
                    <p className="text-lg text-[#666666]">
                        We hire <strong>curious problem‑solvers</strong> who thrive in ambiguous environments and love turning data into action. Growth is nurtured through mentorship, continuous learning, and exposure to high‑impact client work.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-[#156d95]">Open roles</h2>

                    <div className="grid gap-6">
                        <div className="border border-gray-200 rounded-xl p-6 hover:border-[#156d95] transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-[#202020]">Operations Analyst</h3>
                                <span className="bg-blue-100 text-[#156d95] text-xs font-medium px-2.5 py-0.5 rounded">Associate</span>
                            </div>
                            <p className="text-[#666666]">Map client processes, identify inefficiencies, build KPI dashboards.</p>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 hover:border-[#156d95] transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-[#202020]">Business Consultant</h3>
                                <span className="bg-blue-100 text-[#156d95] text-xs font-medium px-2.5 py-0.5 rounded">Senior</span>
                            </div>
                            <p className="text-[#666666]">Lead end‑to‑end transformation projects, manage client relationships.</p>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6 hover:border-[#156d95] transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-[#202020]">Growth Strategist</h3>
                                <span className="bg-blue-100 text-[#156d95] text-xs font-medium px-2.5 py-0.5 rounded">Mid‑level</span>
                            </div>
                            <p className="text-[#666666]">Design go‑to‑market frameworks, conduct market sizing, advise on fundraising.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">How to apply</h2>
                    <p className="text-[#666666]">
                        Send your CV and a brief cover letter to <a href="mailto:careers@dpkconsultants.com" className="text-[#156d95] hover:underline">careers@dpkconsultants.com</a> with the subject line <strong>“DPK – [Role] Application”</strong>.
                    </p>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Not finding the right role?</h3>
                    <p className="text-[#666666] mb-6">We are always looking for talent. Send us a general application.</p>
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
