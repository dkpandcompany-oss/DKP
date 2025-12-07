"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { isAdminEmail } from "@/lib/admin";
import Image from "next/image";
import gsap from "gsap";

// Desktop links
const navigationLinks = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Review", href: "#reviews" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

// Mobile full-screen links
const mobileNavLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Review", href: "#reviews" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

export const PortfolioNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);

  const topLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconTl = useRef<gsap.core.Timeline | null>(null);

  const pagesWithoutSections =
    pathname.startsWith("/checkout") || 
    pathname === "/contact" ||
    pathname === "/pricing" ||
    pathname === "/about" ||
    pathname === "/services" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");
  
  const isHomePage = pathname === "/";

  // Scroll behavior for desktop transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP ANIMATIONS INIT (Drawer + Icon)
  useEffect(() => {
    // Set initial drawer hidden
    gsap.set(navRef.current, { xPercent: 100 });

    // Hide links & contact initially
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    // Set initial burger lines state
    gsap.set([topLineRef.current, bottomLineRef.current], {
      rotate: 0,
      y: 0,
      transformOrigin: "center",
    });

    // Drawer timeline
    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    // Burger → Cross animation
    iconTl.current = gsap.timeline({ paused: true }).to(topLineRef.current, {
      rotate: 45,
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    })
    .to(
      bottomLineRef.current,
      {
        rotate: -45,
        y: -1,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "<"
    );
  }, []);

  // Auto-hide burger on scroll
  useEffect(() => {
    let last = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      setShowBurger(current <= last || current < 10);
      last = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse();
      iconTl.current?.reverse();
    } else {
      tl.current?.play();
      iconTl.current?.play();
    }
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    if (href === "/") {
      router.push("/");
      if (isOpen) toggleMenu();
    } else if (isHomePage) {
      // On home page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        const offset = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
      if (isOpen) toggleMenu();
    } else {
      // On any other page, redirect to home with hash
      router.push(`/${href}`);
      if (isOpen) toggleMenu();
    }
  };

  const { user, loading, signOut } = useSupabaseAuth();

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md py-4 shadow-sm"
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <Image
                src={"/Logo.png"}
                width={115}
                height={115}
                alt="Logo"
                className="object-cover scale-110"
              />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[#111A4A] hover:text-[#156d95] px-1 py-1 text-base font-medium transition-all duration-300 relative group"
                  style={{ fontFamily: "var(--font-figtree), sans-serif" }}
                >
                  <span className="md:text-xl">{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#156d95] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Auth */}
            <div className="hidden md:flex items-center relative">
              {!loading && !user && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push("/login")}
                    className="bg-white border border-slate-200 text-[#156d95] px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-50"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => router.push("/signup")}
                    className="bg-[#156d95] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#156d95]/90"
                  >
                    Sign up
                  </button>
                </div>
              )}

              {!loading && user && !isAdminEmail(user.email || "") && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">{user.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-white border border-slate-200 text-[#156d95] px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER NAV */}
      <nav
        ref={navRef}
        className="md:hidden fixed z-40 flex flex-col justify-between w-full h-full px-8 bg-[#111A4A] text-white py-28 gap-y-16"
      >
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8">
          <Image
            src="/Logo.png"
            width={75}
            height={75}
            alt="Logo"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col text-4xl gap-y-6 font-semibold mt-6">
          {mobileNavLinks.map((link, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) linksRef.current[index] = el;
              }}
            >
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-[#156d95] transition-all cursor-pointer"
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div ref={contactRef} className="flex flex-col gap-8 pb-10">
          <div>
            <p className="text-white/50 text-sm mb-2">E-mail</p>
            <p className="text-base">dkpandcompany@gmail.com</p>
          </div>

          <div>
            <p className="text-white/50 text-sm mb-2">Follow Us</p>
            <div className="flex gap-4 uppercase text-sm">
              <a href="https://linkedin.com" className="hover:text-[#156d95]">LinkedIn</a>
              <a href="https://twitter.com" className="hover:text-[#156d95]">Twitter</a>
              <a href="https://instagram.com" className="hover:text-[#156d95]">Instagram</a>
            </div>
          </div>
        </div>
      </nav>

      {/* BURGER BUTTON */}
      <button
        onClick={toggleMenu}
        className={`md:hidden  fixed z-50 flex flex-col items-center justify-center bg-[#156d95] rounded-full w-14 h-14 top-6 right-6 gap transition-all  ${isOpen?"":"gap-1.5"}`}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-6 h-0.5 bg-white rounded-full"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-6 h-0.5 bg-white rounded-full"
        ></span>
      </button>
    </>
  );
};
