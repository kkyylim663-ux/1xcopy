"use client";
import { useRef } from "react";
import Link from "next/link";
import GameCard from "./GameCard";
import styles from "./GameRow.module.css";
import type { GameCardProps } from "./GameCard";

interface GameRowProps {
  title: string;
  games: GameCardProps[];
  viewAllHref?: string;
}

export default function GameRow({ title, games, viewAllHref }: GameRowProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current as HTMLElement | null;
    if (el) el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className={styles.viewAll}>
            View All →
          </Link>
        )}
      </div>

      <div className={styles.rowWrapper}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          type="button"
        >
          ‹
        </button>

        <ul className={styles.track} ref={trackRef}>
          {games.map((game) => (
            <GameCard key={game.id} {...game} itemClassName={styles.slide} />
          ))}
        </ul>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          type="button"
        >
          ›
        </button>
      </div>
    </section>
  );
}
