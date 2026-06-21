"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Add reveal animation to elements when they scroll into view
const SELECTOR = ".section-head, .experience-item, .project-item, .list, .prose";

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let raf2 = 0;

    // Wait until the page finishes loading to start
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
        if (els.length === 0) return;

        // If IntersectionObserver is not supported, show all at once
        if (!("IntersectionObserver" in window)) {
          els.forEach((el) => el.classList.add("in"));
          return;
        }

        // Reveal each element as it comes into view
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in");
                io?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
        );

        els.forEach((el) => io!.observe(el));
      });
    });

    // Clean up when the component unloads
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
