"use client";
import { useRef } from "react";
import styles from "./ProviderSlider.module.css";
import { PROVIDERS } from "@/data/games";

export default function ProviderSlider({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (p: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => scroll("left")}
        aria-label="Scroll providers left"
        type="button"
      >
        ‹
      </button>

      <div className={styles.track} ref={trackRef}>
        {PROVIDERS.map((p) => (
          <button
            key={p}
            className={`${styles.slide} ${active === p ? styles.active : ""}`}
            onClick={() => onSelect(p)}
            type="button"
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => scroll("right")}
        aria-label="Scroll providers right"
        type="button"
      >
        ›
      </button>
    </div>
  );
}
