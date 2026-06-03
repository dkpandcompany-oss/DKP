'use client'
// useSectionFadeIn.ts
// React hook to add fade-in effect to sections on scroll for About page
import { useEffect } from "react";

export function useSectionFadeIn() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".fade-in-section"));
    const images = Array.from(document.querySelectorAll<HTMLElement>(".image-reveal"));

    function reveal(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }

    const sectionObserver = new window.IntersectionObserver(reveal, {
      threshold: 0.15,
    });
    const imageObserver = new window.IntersectionObserver(reveal, {
      threshold: 0.2,
    });

    sections.forEach(section => sectionObserver.observe(section));
    images.forEach(img => imageObserver.observe(img));

    return () => {
      sectionObserver.disconnect();
      imageObserver.disconnect();
    };
  }, []);
}
