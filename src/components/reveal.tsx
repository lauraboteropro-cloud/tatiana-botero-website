"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  Marks [data-reveal] elements with data-in once they scroll into view.
  The CSS only hides un-revealed elements when scripting is on and motion is
  allowed, so the page is complete without this.
*/
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => { target.dataset.in = ""; });
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
