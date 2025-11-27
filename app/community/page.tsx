import Head from "next/head";
import Link from "next/link";

export default function CommunityPage() {
    return (
        <>
            <Head>
                <title>Community — DPK & Company</title>
                <meta
                    name="description"
                    content="Join the DPK & Company community of consultants and business leaders."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Community</h1>

                <p className="text-lg text-[#666666] mb-8">
                    We are building a network of forward-thinking consultants, founders, and operators who are passionate about operational excellence and sustainable growth.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-12">
                    <h3 className="text-lg font-semibold text-amber-800 mb-2">Coming Soon</h3>
                    <p className="text-amber-700">
                        Our dedicated community platform is currently under development. It will feature peer-to-peer networking, exclusive resources, and regular virtual meetups.
                    </p>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">What to expect</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Networking</strong> – Connect with peers facing similar challenges.</li>
                        <li><strong>Knowledge Sharing</strong> – Access exclusive templates, playbooks, and case studies.</li>
                        <li><strong>Events</strong> – Invitations to private webinars and roundtables.</li>
                    </ul>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Want to be notified when we launch?</h3>
                    <Link
                        href="/contact"
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Join Waitlist →
                    </Link>
                </div>
            </main>
        </>
    );
}
