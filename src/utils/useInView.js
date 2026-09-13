import { useEffect, useRef, useState } from "react";

let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
let scrollDirection = "down";

if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > lastScrollY) scrollDirection = "down";
      else if (y < lastScrollY) scrollDirection = "up";
      lastScrollY = y;
    },
    { passive: true }
  );
}

// Reveals only animate when the element enters the viewport while scrolling
// down; scrolling back up into it snaps to the visible state instantly.
export default function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setAnimate(scrollDirection === "down");
        } else {
          setInView(false);
          setAnimate(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView, animate];
}
