"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

// styles
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
    name: "Sarah Chen",
    title: "CEO",
    company: "TechFlow Solutions",
    image: "/heroPage/women.png",
    quote:
      "DKP transformed our operational chaos into streamlined processes. Revenue efficiency improved by 40% within 3 months.",
    highlight: "KEEP TRACK OF THE HOTTEST OPERATIONS.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Founder",
    company: "GrowthLab",
    image: "/heroPage/women.png",
    quote:
      "Their financial planning expertise helped us raise Series A. Clear forecasting made all the difference with investors.",
    highlight: "NO EXTRA CHARGES. LESS ROYALTIES.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    title: "COO",
    company: "InnovateNow",
    image: "/heroPage/women.png",
    quote:
      "From startup chaos to enterprise-ready operations. DKP's guidance was invaluable during our scaling phase.",
    highlight: "DIGITAL-FIRST APPROACH.",
  },
];

const TestimonialCard = ({ data }: { data: ClientTestimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row h-full p-4">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-[280px] md:h-auto">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
          <blockquote className="text-lg text-gray-800 mb-6">
            “{data.quote}”
          </blockquote>

          <span className="inline-block bg--100 text-gray-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            {data.highlight}
          </span>

          <div>
            <h4 className="font-bold text-gray-900 text-lg">{data.name}</h4>
            <p className="text-gray-600 text-sm">{data.title}</p>
            <p className="text-blue-600 font-semibold text-sm">{data.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CaseStudiesCarousel = () => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 font-inter">
            What Our <span className="text-[#156d95]">Clients</span> Say
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Trusted by businesses worldwide to optimize operations, streamline
            workflows, and strengthen financial systems.
          </p>
        </motion.div>

        {/* Swiper */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={28}
            loop
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.2 },
              1324: { slidesPerView: 2.5 },
            }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <TestimonialCard data={t} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-8"></div>
        </div>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #cdd5e1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active-custom {
          width: 28px;
          border-radius: 6px;
          background: #2563eb;
        }
      `}</style>
    </section>
  );
};
