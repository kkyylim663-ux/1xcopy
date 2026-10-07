import Link from "next/link";
import styles from "./page.module.css";

const BONUSES = [
  { slug: "welcome-sports", title: "100% First Sports Deposit Bonus", value: "up to 588 MYR", type: "Sports", badge: "NEW", desc: "Deposit and get 100% match bonus on your first sports bet deposit." },
  { slug: "welcome-casino", title: "Welcome Casino Package", value: "up to 9888 MYR + 350 Free Spins", type: "Casino", badge: "POPULAR", desc: "Claim our massive casino welcome package spread across your first 4 deposits." },
  { slug: "cashback", title: "Weekly Cashback", value: "up to 10%", type: "Sports", badge: "", desc: "Get cashback on your net sports losses every week, up to 10%." },
  { slug: "reload", title: "Reload Bonus", value: "50% up to 200 MYR", type: "Casino", badge: "", desc: "Boost your deposits every Friday with a 50% reload bonus on casino games." },
  { slug: "birthday", title: "Birthday Bonus", value: "Surprise Gift", type: "Both", badge: "", desc: "We celebrate your birthday with an exclusive bonus on your special day." },
  { slug: "referral", title: "Refer a Friend", value: "50 MYR per referral", type: "Both", badge: "", desc: "Earn 50 MYR for every friend you refer who makes their first deposit." },
];

export default function BonusRulesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Promotions &amp; Bonuses</h1>
        <p className={styles.subtitle}>Exclusive offers and promotions for SLOTSHUB players</p>
      </div>

      <div className={styles.filters}>
        {["All", "Sports", "Casino", "Special"].map(f => (
          <button key={f} type="button" className={`${styles.filterBtn} ${f === "All" ? styles.filterActive : ""}`}>{f}</button>
        ))}
      </div>

      <div className={styles.grid}>
        {BONUSES.map(b => (
          <div key={b.slug} className={styles.card}>
            <div className={styles.cardBanner}>
              <div className={styles.cardType}>{b.type}</div>
              {b.badge && <div className={styles.cardBadge}>{b.badge}</div>}
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <div className={styles.cardValue}>{b.value}</div>
              <p className={styles.cardDesc}>{b.desc}</p>
              <Link href={`/en/bonus/rules/${b.slug}`} className={styles.cardBtn}>More Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
