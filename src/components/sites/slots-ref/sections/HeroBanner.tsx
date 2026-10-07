"use client";
import { useState, useEffect } from "react";
import styles from "./HeroBanner.module.css";

export interface HeroBannerItem {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  cta: string;
  hue: number;
  accent: number;
  emoji: string;
}

const BANNERS: HeroBannerItem[] = [
  {
    id: 1,
    tag: "Welcome Offer",
    title: "100% Bonus",
    subtitle: "Up to RM 800 on your first deposit",
    cta: "Claim Now",
    hue: 220,
    accent: 82,
    emoji: "🎰",
  },
  {
    id: 2,
    tag: "Daily Prize Pool",
    title: "Win up to RM 50,000",
    subtitle: "Join the Jackpot Slots tournament — new rounds every day",
    cta: "Play Now",
    hue: 260,
    accent: 45,
    emoji: "🏆",
  },
  {
    id: 3,
    tag: "Live Casino",
    title: "Real Dealers 24/7",
    subtitle: "Baccarat, Roulette, Blackjack — streamed in HD",
    cta: "Join Table",
    hue: 160,
    accent: 180,
    emoji: "🃏",
  },
];

export default function HeroBanner({ banners = BANNERS }: { banners?: HeroBannerItem[] }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % banners.length);
        setAnimating(false);
      }, 200);
    }, 5000);
    return () => clearInterval(id);
  }, [banners.length]);

  const handleDot = (i: number) => {
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 150);
  };

  const banner = banners[active];
  const bg = `linear-gradient(135deg,
    hsl(${banner.hue},55%,9%) 0%,
    hsl(${(banner.hue + 40) % 360},60%,18%) 45%,
    hsl(${(banner.hue + 80) % 360},45%,12%) 100%)`;

  return (
    <div className={styles.hero} style={{ background: bg }}>
      {/* Decorative orb */}
      <div
        className={styles.orb}
        style={{ background: `radial-gradient(circle, hsl(${banner.accent},70%,50%) 0%, transparent 70%)` }}
      />

      <div className={`${styles.content} ${animating ? styles.contentOut : styles.contentIn}`}>
        <span className={styles.tag}>{banner.tag}</span>
        <h2 className={styles.title}>{banner.title}</h2>
        <p className={styles.subtitle}>{banner.subtitle}</p>
        <div className={styles.actions}>
          <button className={styles.cta} type="button">{banner.cta}</button>
          <span className={styles.terms}>18+ · T&amp;Cs apply</span>
        </div>
      </div>

      <div className={styles.emojiArt} aria-hidden="true">{banner.emoji}</div>

      {/* Dots */}
      <div className={styles.dots} role="tablist">
        {banners.map((b, i) => (
          <button
            key={b.id}
            className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
            onClick={() => handleDot(i)}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
