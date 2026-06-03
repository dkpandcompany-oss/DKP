import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full h-[70vh] flex items-center">
        <Image
          src="/about/about-hero.png"
          alt="Business consultancy office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-white">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
            Helping Businesses Make Smarter Decisions
          </h1>

          <p className="mt-6 text-lg text-white/90 max-w-2xl">
            We are a premium business consultancy delivering clarity,
            structure, and execution for growing companies and leaders.
          </p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Who We Are
          </h2>

          <p className="text-gray-700 mb-4">
            We are not a traditional consulting firm that delivers reports
            and walks away. We work closely with founders, leadership teams,
            and decision-makers to solve real business challenges.
          </p>

          <p className="text-gray-700 mb-4">
            Our work focuses on strategy, operations, financial clarity,
            and scalable execution. Every engagement is structured,
            time-bound, and outcome-driven.
          </p>

          <p className="text-gray-700">
            We believe clarity leads to confidence — and confident
            decisions build strong businesses.
          </p>
        </div>

        <div className="relative h-[420px] rounded-xl overflow-hidden">
          <Image
            src="/about/team-dicussion.png"
            alt="Consultants discussing strategy"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[380px] rounded-xl overflow-hidden">
            <Image
              src="/about/strategy-board.jpg"
              alt="Business strategy planning"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-900">
              Our Philosophy
            </h2>

            <ul className="space-y-4 text-gray-700">
              <li>
                <strong>Clarity over complexity:</strong> We simplify
                problems into clear, actionable decisions.
              </li>
              <li>
                <strong>Execution over theory:</strong> Strategy matters
                only when it can be implemented.
              </li>
              <li>
                <strong>Impact over activity:</strong> Success is measured
                by outcomes, not effort.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900">
          What We Do
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            "Strategic Planning",
            "Operational Optimization",
            "Financial Visibility",
            "Scalability & Growth",
          ].map((item) => (
            <div
              key={item}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                {item}
              </h3>
              <p className="text-sm text-gray-600">
                Structured, practical solutions tailored to your
                business context.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHO WE WORK WITH ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-900">
              Who We Work With
            </h2>

            <p className="text-gray-700 mb-4">
              We partner with founders, growing companies, and leadership
              teams who value clarity and long-term thinking.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li>• Startups building structure</li>
              <li>• Growing businesses facing complexity</li>
              <li>• Leadership teams preparing for scale</li>
            </ul>
          </div>

          <div className="relative h-[380px] rounded-xl overflow-hidden">
            <Image
              src="/about/executive.png"
              alt="Business executive thinking"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900">
          Our Values
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            ["Clarity", "We simplify decisions."],
            ["Ownership", "We take responsibility."],
            ["Integrity", "Honest guidance always."],
            ["Impact", "Results matter most."],
          ].map(([title, desc]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="relative py-24">
        <Image
          src="/about/closing.png"
          alt="Modern office"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Built on clarity. Driven by impact.
          </h2>
          <p className="text-white/90">
            We help businesses move forward with confidence,
            discipline, and purpose.
          </p>
        </div>
      </section>
    </main>
  );
}
