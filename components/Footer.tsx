"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/") {
      // On home page, scroll to pricing section
      const element = document.querySelector("#pricing");
      if (element) {
        const offset =
          element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    } else {
      // On other pages, redirect to home with hash
      router.push("/#pricing");
    }
  };

  return (
    <footer className="w-full bg-[#f4f4f4] border-t border-black/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
        {/* Top CTA */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20 gap-8">
          <h2 className="text-3xl md:text-5xl font-light leading-tight text-black max-w-2xl">
            Guiding founders & companies toward clarity and growth.
          </h2>

          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 
    rounded-full border border-black text-black text-lg font-medium 
    overflow-hidden transition-all duration-300"
          >
            {/* Background Hover Fill */}
            <span
              className="absolute inset-0 bg-black scale-0 group-hover:scale-100 
      rounded-full transition-transform duration-200 ease-out origin-center"
            />

            {/* Button Text */}
            <span className="relative z-10 group-hover:text-white">
              Let's talk
            </span>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-20">
          {/* Column 1 */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wide text-black mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-black transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-black transition"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-gray-600 hover:text-black transition"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wide text-black mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#pricing"
                  onClick={handlePricingClick}
                  className="text-gray-600 hover:text-black transition cursor-pointer"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-black transition"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-black transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Social */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wide text-black mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-700 hover:text-black">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-black">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-black">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-700 hover:text-black">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        {/* <div className="relative flex justify-center select-none">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 0.15, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold tracking-tight text-black"
          >
            DKP
          </motion.h1>
        </div> */}

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} DKP Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-black">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
