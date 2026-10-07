"use client";
import { useEffect, useState } from "react";
import styles from "./FloatingButtons.module.css";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Back to top"
        className={`${styles.up} ${showTop ? styles.upVisible : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M12 8l6 6-1.4 1.4L12 10.8l-4.6 4.6L6 14z" />
        </svg>
      </button>
      <button type="button" className={styles.support} aria-label="Support chat">
        <span aria-hidden="true">💬</span> Support
      </button>
    </>
  );
}
