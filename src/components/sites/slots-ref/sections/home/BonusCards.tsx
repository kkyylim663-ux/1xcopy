import Link from "next/link";
import type { HomeBonusCard } from "@/data/home";
import styles from "./BonusCards.module.css";

interface Props {
  cards: HomeBonusCard[];
}

export default function BonusCards({ cards }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {cards.map((c) => (
          <div key={c.id} className={styles.card} style={{ background: `hsl(${c.hue}, 55%, 22%)` }}>
            <div className={styles.glow} style={{ background: `hsl(${c.hue}, 80%, 50%)` }} />
            <div className={styles.content}>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.subtitle}>{c.subtitle}</p>
              <Link href={c.href} className={styles.cta}>{c.cta}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.allBonuses}>
        <Link href="/en/bonus/rules" className={styles.allBonusesBtn}>ALL BONUSES</Link>
      </div>
    </section>
  );
}
