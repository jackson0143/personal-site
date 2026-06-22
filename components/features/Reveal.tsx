"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Add reveal animation to elements when they scroll into view
const SELECTOR = ".section-head, .experience-item, .project-item, .list, .prose";

export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;

    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      if (els.length === 0) return;

      // If IntersectionObserver is not supported, show all at once
      if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("in"));
        return;
      }

      // Anything already on the first screen shows straight away. That way the top looks full
      //and they know there's more below
      const fold = window.innerHeight;
      const below: HTMLElement[] = [];
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < fold) {
          el.classList.add("reveal-instant", "in");
        } else {
          below.push(el);
        }
      });

      if (below.length === 0) return;

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

      below.forEach((el) => io!.observe(el));
    });

    // Clean up when the component unloads
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
