import Head from "next/head";

export default function TermsPage() {
    return (
        <>
            {/* ==================== SEO ==================== */}
            <Head>
                <title>Terms of Service — DPK &amp; Company</title>
                <meta
                    name="description"
                    content="DPK &amp; Company’s Terms of Service outline the scope of our consulting, payment, liability and governing law."
                />
                <meta property="og:title" content="Terms of Service — DPK &amp; Company" />
                <meta
                    property="og:description"
                    content="DPK &amp; Company’s Terms of Service outline the scope of our consulting, payment, liability and governing law."
                />
                <meta
                    property="og:image"
                    content="/mnt/data/c5e016b4-5a93-44e2-b8b6-33fa2760bf5a.png"
                />
            </Head>

            {/* ==================== CONTENT ==================== */}
            <main className="prose max-w-3xl mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8 text-[#202020]">Terms of Service</h1>
                <p className="text-lg mb-8 text-[#666666]">
                    By accessing or using DPK &amp; Company’s website and services you
                    agree to these Terms of Service (“Terms”). If you do not agree, please
                    do not use our services.
                </p>

                {/* ----- Definitions & Scope ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">1. Definitions &amp; Scope of Services</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            <strong>“Consulting Services”</strong> – strategic, operational,
                            and implementation advice provided by DPK &amp; Company.
                        </li>
                        <li>
                            <strong>“Client”</strong> – the person or entity that engages us.
                        </li>
                        <li>
                            <strong>“Deliverables”</strong> – reports, presentations,
                            frameworks, or any tangible output produced for the Client.
                        </li>
                    </ul>
                </section>

                {/* ----- User Obligations ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">2. User Obligations / Acceptable Use</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            Provide accurate information and cooperate with us throughout the
                            engagement.
                        </li>
                        <li>
                            Not use the services for illegal activities, fraud, or to infringe
                            third‑party rights.
                        </li>
                    </ul>
                </section>

                {/* ----- Fees & Payments ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">3. Fees, Payment &amp; Cancellations</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            Fees are quoted in the proposal and payable as per the schedule
                            therein (e.g., 50 % upfront, 50 % on delivery).
                        </li>
                        <li>
                            All invoices are due within 15 days of receipt. Late payments
                            incur a 1.5 % monthly interest.
                        </li>
                        <li>
                            Cancellations must be submitted in writing. Refunds, if any, are
                            subject to the following: <strong>[INSERT REFUND POLICY]</strong>.
                        </li>
                        <li>
                            Payments are processed via <strong>[INSERT PAYMENT PROCESSOR]</strong>
                            (e.g., Stripe, Razorpay).
                        </li>
                    </ul>
                </section>

                {/* ----- Deliverables & Timelines ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">4. Deliverables &amp; Timelines</h2>
                    <p className="text-[#666666]">
                        We will use commercially reasonable efforts to meet agreed timelines,
                        but we do not guarantee specific dates. Delays caused by the Client
                        (e.g., late feedback) may extend delivery dates.
                    </p>
                </section>

                {/* ----- Confidentiality ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">5. Confidentiality &amp; Data Handling</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            Both parties will keep each other’s confidential information
                            confidential and use it solely for the purpose of the engagement.
                        </li>
                        <li>
                            Client data will be stored securely and only accessed by authorized
                            personnel.
                        </li>
                    </ul>
                </section>

                {/* ----- Intellectual Property ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">6. Intellectual Property</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            All pre‑existing IP of DPK &amp; Company remains our property.
                        </li>
                        <li>
                            Deliverables created for the Client are owned by the Client upon
                            full payment, with a non‑exclusive, royalty‑free license to use any
                            underlying tools or templates that remain our IP.
                        </li>
                    </ul>
                </section>

                {/* ----- Warranties & Disclaimers ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">7. Warranties &amp; Disclaimers</h2>
                    <p className="text-[#666666]">
                        Services are provided “as is” and “as available”. We do not warrant
                        that results will be error‑free or that specific outcomes will be
                        achieved.
                    </p>
                </section>

                {/* ----- Limitation of Liability ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">8. Limitation of Liability</h2>
                    <p className="text-[#666666]">
                        To the maximum extent permitted by law, DPK &amp; Company’s total
                        liability for any claim shall not exceed the fees paid by the Client
                        in the twelve (12) months preceding the claim.
                    </p>
                </section>

                {/* ----- Termination ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">9. Termination &amp; Suspension</h2>
                    <ul className="list-disc pl-6 space-y-2 text-[#666666]">
                        <li>
                            Either party may terminate the agreement with 30 days written
                            notice.
                        </li>
                        <li>
                            Upon termination, the Client shall pay for all work performed up
                            to the termination date.
                        </li>
                    </ul>
                </section>

                {/* ----- Governing Law & Dispute Resolution ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">10. Governing Law &amp; Dispute Resolution</h2>
                    <p className="text-[#666666]">
                        These Terms are governed by the laws of India. Any dispute shall be
                        resolved first through good‑faith negotiation; if unresolved, it
                        shall be submitted to arbitration in{" "}
                        <strong>[INSERT ARBITRATION CITY]</strong>, India, under the
                        Arbitration and Conciliation Act, 1996.
                    </p>
                </section>

                {/* ----- Legal Notices ----- */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">11. Legal Notices</h2>
                    <p className="text-[#666666]">
                        All legal notices must be sent to:{" "}
                        <a href="mailto:hello@dpkconsultants.com" className="text-[#156d95] hover:underline">
                            hello@dpkconsultants.com
                        </a>
                    </p>
                </section>

                {/* ----- Contact ----- */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold mb-4 text-[#156d95]">12. Contact</h2>
                    <p className="text-[#666666]">
                        For any questions regarding these Terms, please email{" "}
                        <a href="mailto:hello@dpkconsultants.com" className="text-[#156d95] hover:underline">
                            hello@dpkconsultants.com
                        </a>
                        .
                    </p>
                </section>
            </main>
        </>
    );
}
