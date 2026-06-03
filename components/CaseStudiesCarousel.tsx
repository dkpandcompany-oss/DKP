"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ClientTestimonial = {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
  highlight: string;
};

const testimonials: ClientTestimonial[] = [
  {
    id: 1,
    name: "David Park",
    title: "Managing Director",
    company: "Venture Capital Partners",
    image: "/person1.png",
    quote:
      "We recommend DKP to all our portfolio companies. Their strategic planning consistently delivers measurable results.",
    highlight: "PROVEN TRACK RECORD.",
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "CEO",
    company: "TechFlow Solutions",
    image: "/person6.png",
    quote:
      "DKP transformed our operational chaos into streamlined processes. Revenue efficiency improved by 40% within 3 months.",
    highlight: "OPERATIONAL EXCELLENCE.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Founder",
    company: "GrowthLab",
    image: "/person2.png",
    quote:
      "Their financial planning expertise helped us raise Series A. Clear forecasting made all the difference with investors.",
    highlight: "INVESTOR-READY FINANCE.",
  },
  {
    id: 4,
    name: "Priya Sharma",
    title: "COO",
    company: "InnovateNow",
    image: "/person3.png",
    quote:
      "From startup chaos to enterprise-ready operations. DKP's guidance was invaluable during our scaling phase.",
    highlight: "DIGITAL-FIRST APPROACH.",
  },
  {
    id: 5,
    name: "Michael Thompson",
    title: "CFO",
    company: "FinanceHub",
    image: "/person4.png",
    quote:
      "DKP's financial systems revolutionized our accounting processes. We saved 30 hours per month on reporting alone.",
    highlight: "STREAMLINED WORKFLOWS.",
  },
  {
    id: 6,
    name: "Jessica Martinez",
    title: "VP Operations",
    company: "CloudScale Inc",
    image: "/person5.png",
    quote:
      "The operational frameworks they implemented scaled perfectly with our growth from 10 to 100 employees.",
    highlight: "SCALABLE SOLUTIONS.",
  },
];

const TestimonialCard = ({ data }: { data: ClientTestimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="
        bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden
        h-[520px] md:h-[420px]
      "
    >
      <div className="flex flex-col md:flex-row h-full p-4">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-[260px] md:h-full">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-6 md:p-8 md:w-1/2">
          <blockquote
            className="
              relative text-lg text-gray-800 mb-6
              line-clamp-5 md:line-clamp-4
              after:absolute after:bottom-0 after:left-0
              after:h-8 after:w-full
              after:bg-gradient-to-t after:from-white after:to-transparent
            "
          >
            “{data.quote}”
          </blockquote>

          <span
            className="
              inline-block mb-6 max-w-full
              text-xs font-semibold text-gray-600
              px-4 py-2 rounded-full
              bg-gray-100 line-clamp-1
            "
          >
            {data.highlight}
          </span>

          <div>
            <h4 className="font-bold text-gray-900 text-lg">{data.name}</h4>
            <p className="text-gray-600 text-sm">{data.title}</p>
            <p className="text-[#156d95] font-semibold text-sm">
              {data.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CaseStudiesCarousel = () => {
  return (
    <section
      id="reviews"
      className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-20"
    >
      <div className="px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What Our <span className="text-[#156d95]">Clients</span> Say
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Trusted by businesses worldwide to optimize operations and scale with
            confidence.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation */}
          <button className="swiper-prev nav-btn left-0">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="swiper-next nav-btn right-0">
            <ChevronRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            loop
            autoHeight={false}
            spaceBetween={28}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.2 },
              1280: { slidesPerView: 2.5 },
            }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <TestimonialCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination-custom flex justify-center mt-8" />
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 9999px;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4b5563;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
        }
        .nav-btn:hover {
          color: #156d95;
          border-color: #156d95;
        }

        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 26px;
          border-radius: 6px;
          background: #156d95;
        }
      `}</style>
    </section>
  );
};
