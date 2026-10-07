"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { HomeBanner } from "@/data/home";
import styles from "./ShowcaseHeader.module.css";

interface Props {
  banners: HomeBanner[];
}

export default function ShowcaseHeader({ banners }: Props) {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setIdx((next + banners.length) % banners.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => go(idx + 1), 3000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, banners.length]);

  const cur = banners[idx];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* 左：活动轮播 900×248 */}
        <div className={styles.bannerWrap}>
          <Link
            href={cur.href}
            className={`${styles.slide} ${animating ? styles.slideOut : styles.slideIn}`}
            style={{ background: `hsl(${cur.hue}, 55%, 22%)` }}
          >
            <div className={styles.orb} style={{ background: `hsl(${cur.accent}, 80%, 50%)` }} />
            {cur.tag && <span className={styles.tag}>{cur.tag}</span>}
            <p className={styles.title}>{cur.title}</p>
            <p className={styles.subtitle}>{cur.subtitle}</p>
          </Link>

          {/* 箭头 */}
          <button type="button" className={styles.prev} aria-label="Previous slide" onClick={() => go(idx - 1)}>
            <svg viewBox="0 0 8 14" width="8" height="14" fill="currentColor"><path d="M7 1L1 7l6 6"/></svg>
          </button>
          <button type="button" className={styles.next} aria-label="Next slide" onClick={() => go(idx + 1)}>
            <svg viewBox="0 0 8 14" width="8" height="14" fill="currentColor"><path d="M1 1l6 6-6 6"/></svg>
          </button>

          {/* 分页条 */}
          <div className={styles.dots}>
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>

        {/* 右：首充奖励面板 500×248 */}
        <div className={styles.depositPanel}>
          <div className={styles.depositBg} />
          <div className={styles.depositContent}>
            <h2 className={styles.depositTitle}>FIRST DEPOSIT BONUS</h2>
            <p className={styles.depositAmt}>up to 9888 MYR</p>
            <p className={styles.depositSub}>+ 350 Free Spins</p>
            <Link href="/en/registration" className={styles.depositCta}>GET BONUS</Link>
          </div>
        </div>
      </div>

      {/* 下：3 个 CTA 块 */}
      <div className={styles.ctaRow}>
        <Link href="/en/registration" className={styles.ctaBlock}>
          <span className={styles.ctaIcon}>📝</span>
          <span>
            <strong>REGISTER ON THE WEBSITE</strong>
            <em>Quick and easy registration</em>
          </span>
        </Link>
        <Link href="/en/information/payment" className={styles.ctaBlock}>
          <span className={styles.ctaIcon}>💳</span>
          <span>
            <strong>MAKE YOUR FIRST DEPOSIT</strong>
            <em>Secure deposits and withdrawals</em>
          </span>
        </Link>
        <Link href="/en/bonus/rules" className={styles.ctaBlock}>
          <span className={styles.ctaIcon}>🎁</span>
          <span>
            <strong>GET YOUR BONUS</strong>
            <em>Get a big bonus</em>
          </span>
        </Link>
      </div>
    </section>
  );
}
