import Head from "next/head";
import Link from "next/link";

export default function CookiePolicyPage() {
    return (
        <>
            <Head>
                <title>Cookie Policy — DPK & Company</title>
                <meta
                    name="description"
                    content="Information about how DPK & Company uses cookies and similar technologies."
                />
            </Head>

            <main className="prose max-w-4xl mx-auto p-8 py-16">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Cookie Policy</h1>
                <p className="text-lg text-[#666666] mb-12">This policy explains how we use cookies and similar technologies to recognize you when you visit our website.</p>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">What are cookies?</h2>
                    <p className="text-[#666666] mb-4">
                        Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide reporting information.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">Why do we use cookies?</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li><strong>Essential cookies:</strong> Necessary for the website to function properly (e.g., secure login).</li>
                        <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website so we can improve it.</li>
                        <li><strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant ads.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">How can you control cookies?</h2>
                    <p className="text-[#666666] mb-4">
                        You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
                    </p>
                </section>

                <div className="mt-12 p-8 bg-[#F0F9FF] rounded-2xl text-center">
                    <h3 className="text-xl font-semibold mb-4 text-[#202020]">Update your preferences</h3>
                    <button
                        className="inline-block bg-[#156d95] text-white px-8 py-3 rounded-full font-medium hover:bg-[#156d95]/90 transition-colors"
                    >
                        Manage Cookies
                    </button>
                </div>
            </main>
        </>
    );
}
