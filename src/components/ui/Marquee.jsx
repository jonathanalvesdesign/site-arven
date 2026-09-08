import { useEffect, useRef } from "react";
import styles from "./Marquee.module.css";

const SPEED = 0.5;

export default function Marquee({ children }) {
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const offsetRef = useRef(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    let frame = null;

    const updatePosition = () => {
      frame = null;
      const groupWidth = groupRef.current?.offsetWidth || 0;
      if (!groupWidth || !trackRef.current) return;

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      offsetRef.current += delta * SPEED;
      offsetRef.current = ((offsetRef.current % groupWidth) + groupWidth) % groupWidth;

      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    };

    const handleScroll = () => {
      if (frame === null) {
        frame = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track} ref={trackRef}>
        <div className={styles.group} ref={groupRef}>
          {children}
        </div>
        <div className={styles.group} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
