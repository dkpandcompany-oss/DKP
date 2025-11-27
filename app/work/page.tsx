import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel";

export default function WorkPage() {
    return (
        <main className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Our Work</h1>
            <p className="text-lg text-gray-600 mb-8">
                Explore some of the case studies that showcase how we help our clients achieve their goals.
            </p>
            <CaseStudiesCarousel />
        </main>
    );
}
