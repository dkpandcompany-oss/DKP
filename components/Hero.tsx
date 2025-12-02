'use client'
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TrendingUp, Wallet, Smartphone } from "lucide-react";

const services = [
  {
    id: 1,
    icon: TrendingUp,
    title: "+30%",
    subtitle: "Revenue efficiency",
    position: "top-[50%] left-[2%] md:top-[50%]  md:-left-[5%] transform -translate-y-1/2",
  },
  {
    id: 2,
    icon: Wallet,
    title: "₹1.2L",
    subtitle: "Saved with cost control",
    position: "top-[20%] right-[2%] md:top-[25%] md:-right-[10%]",
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Digital first",
    subtitle: "Modern web presence",
    position: "bottom-[25%] right-[2%] md:bottom-[30%] md:-right-[10%]",
  },
];

const Hero = () => {
  return (
    <div className="h-screen bg-[#ececec]  w-full relative overflow-hidden">
      <div className="absolute left-1/2 top-10 transform -translate-x-1/2 w-full px-4 sm:px-0">
        <div className="mx-auto w-full max-w-[1000px]">
          <Image
            src="/heroPage/grid.png"
            alt="grid background image"
            width={1000}
            height={1000}
            className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] "
            sizes="100vw"
          />
        </div>
        <div className="">
          <h1
            className="absolute inset-x-0 top-20 sm:top-[5%] md:top-[4%] lg:top-[15%] mx-auto max-w-4xl  px-4 text-center tracking-wide font-bold leading-tight text-[#0A0A0A]
                                         text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[4rem]"
          >
            Clarity. Efficiency.{" "}
            <span className="relative ">
              Growth
              <div className="absolute -bottom-13 md:-bottom-[99%] left-0">
                <Image
                  src="/heroPage/dash.png"
                  alt="ring background image"
                  width={200}
                  height={200}
                  className="object-contain  "
                  sizes="10vw"
                />
              </div>
            </span>
            .
            <br />
            <span className="block mt-2 text-base sm:text-lg md:text-xl lg:text-2xl font-normal">
              Premium consulting for startups & growing companies.
            </span>
          </h1>
        </div>
      </div>
      <div className="absolute left-1/2 md:-bottom-[30%] -bottom-[10%] transform -translate-x-1/2 w-full md:w-[560px] lg:w-[850px]">
        <Image
          src="/heroPage/ring.png"
          alt="ring background image"
          width={2200}
          height={2200}
          className="object-cover w-full h-[400px] sm:h-[600px] md:h-[600px] lg:h-[700px]"
          sizes="120vw"
        />
      </div>
      <div className="absolute   -bottom-[6%] left-1/2 transform -translate-x-1/2 w-full md:w-[560px] lg:w-[850px]">
        <div className="relative w-full h-[78vh]">
          <Image
            src="/heroPage/women.svg"
            alt="hero women"
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>

        {/* Service Cards */}
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className={`absolute ${service.position} z-20`}
            >
              <div className="bg-white/30 backdrop-blur-3xl border border-gray-200 rounded-xl md:rounded-2xl p-2 md:p-4 shadow-lg min-w-[10vw] md:min-w-[200px]">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="bg-[#156d95]/10 p-1.5 md:p-2 rounded-lg">
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-[#156d95]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold font-[var(--font-inter)] text-sm md:text-3xl text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute left-1/2 bottom-5 sm:bottom-6 md:bottom-10 transform -translate-x-1/2 w-[80%] sm:w-full max-w-xl px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl z-30">
          <div className="flex relative flex-row justify-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="bg-[#156d95] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-sm sm:text-base whitespace-nowrap inline-flex items-center justify-center"
          >
            Book a Consultation
          </Link>
          <button 
            onClick={() => {
              // Try multiple possible service section IDs
              const servicesElement = document.getElementById('services-section') || 
                                    document.getElementById('services') ||
                                    document.querySelector('[id*="service"]') ||
                                    document.querySelector('.services');
              
              if (servicesElement) {
                servicesElement.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start' 
                });
              } else {
                // If no services section found, scroll down to next section
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }
            }}
            className="bg-white/20 shadow-2xl text-black px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full backdrop-blur-sm text-sm sm:text-base whitespace-nowrap"
          >
            Explore Services
          </button>
          <div className="absolute -top-[120px] -left-[60px] sm:-top-[150px] sm:-left-[80px] md:-top-[200px] md:-left-[100px]">
                <Image
                  src="/heroPage/arrow.png"
                  alt="arrow pointing to button"
                  width={200}
                  height={200}
                  className="object-contain w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, 200px"
                />
              </div>
        </div>
      </div>
           {/* <div className="absolute left-[2%] scale-[0.2] bottom-5 sm:bottom-6 md:bottom-10 transform  w-[100%] sm:w-full max-w-xl px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3     rounded-2xl sm:rounded-3xl  z-30">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" className="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet" fill="#156d95" stroke="#156d95"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.128"></g><g id="SVGRepo_iconCarrier"><path d="M22.625 2c0 15.834-8.557 30-20.625 30c12.068 0 20.625 14.167 20.625 30c0-15.833 8.557-30 20.625-30c-12.068 0-20.625-14.166-20.625-30" fill="#156d95"></path><path d="M47 32c0 7.918-4.277 15-10.313 15C42.723 47 47 54.084 47 62c0-7.916 4.277-15 10.313-15C51.277 47 47 39.918 47 32z" fill="#156d95"></path><path d="M51.688 2c0 7.917-4.277 15-10.313 15c6.035 0 10.313 7.084 10.313 15c0-7.916 4.277-15 10.313-15c-6.036 0-10.313-7.083-10.313-15" fill="#156d95"></path></g></svg>
      </div> */}
    </div>
  );
};

export default Hero;
