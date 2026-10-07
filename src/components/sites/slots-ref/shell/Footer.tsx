import Link from "next/link";
import styles from "./Footer.module.css";

const FOOTER_LINKS_COL1 = [
  { label: "About us", href: "/en/information/about" },
  { label: "Terms and Conditions", href: "/en/information/rules" },
  { label: "Affiliate Program", href: "#" },
  { label: "Become an agent", href: "#" },
  { label: "Privacy Policy", href: "/en/information/rules/privacy_policy" },
  { label: "Cookie Policy", href: "/en/information/cookies" },
  { label: "Contacts", href: "/en/information/contacts" },
  { label: "Payment methods", href: "/en/information/payment" },
  { label: "Mobile version", href: "/en" },
  { label: "Registration", href: "/en/registration" },
];

const FOOTER_LINKS_COL2 = [
  { label: "Sports", href: "/en/line" },
  { label: "Multi-LIVE", href: "/en/multi" },
  { label: "Live", href: "/en/live" },
  { label: "Slots", href: "/en/slots" },
  { label: "1xGames", href: "/en/games" },
  { label: "Live Casino", href: "/en/casino" },
  { label: "Statistics", href: "/en/statistic" },
  { label: "Results", href: "/en/results" },
];

const APPS = [
  { label: "iOS", href: "/en/mobile" },
  { label: "Android", href: "/en/mobile" },
  { label: "Other apps", href: "/en/desktop" },
];

const SOCIAL = [
  { label: "X (Twitter)", href: "#", icon: "𝕏" },
  { label: "Telegram", href: "#", icon: "✈" },
  { label: "Instagram", href: "#", icon: "◫" },
  { label: "Facebook", href: "#", icon: "ƒ" },
];

// Swiper 6: 合作伙伴标志滑条（仅 placeholder，不下载图片）
const PARTNERS = [
  "FC Barcelona",
  "Serie A",
  "PSG",
  "CAF",
  "Volleyball World",
  "FIBA",
  "Billie Jean",
  "Nexo Dallas",
  "PGL",
  "MIBR",
  "MongolZ",
  "Aurora",
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ── 链接组 ── */}
        <div className={styles.linkSection}>
          <div className={styles.linkGroup}>
            <ul className={styles.groupList}>
              {FOOTER_LINKS_COL1.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <ul className={styles.groupList}>
              {FOOTER_LINKS_COL2.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={styles.footerLink}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <p className={styles.groupTitle}>Applications</p>
            <ul className={styles.groupList}>
              {APPS.map((a) => (
                <li key={a.label}>
                  <Link href={a.href} className={styles.footerLink}>{a.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 合作伙伴滑条 ── */}
        <div className={styles.partnersTrack}>
          {PARTNERS.map((p) => (
            <div key={p} className={styles.partnerChip}>{p}</div>
          ))}
        </div>

        {/* ── 客服区 ── */}
        <div className={styles.supportRow}>
          <div className={styles.supportPhone}>
            <a href="tel:#" className={styles.phoneLink}>+60 (0)3 9212 1188</a>
          </div>
          <div className={styles.socialRow}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label}>
                <span aria-hidden="true">{s.icon}</span>
              </a>
            ))}
          </div>
          <Link href="/en" className={styles.mobileVersionBtn}>MOBILE VERSION</Link>
        </div>

        {/* ── Cookie 提示 ── */}
        <div className={styles.cookieBar}>
          <p className={styles.cookieText}>
            We use cookies to improve your experience.{" "}
            <Link href="/en/information/cookies" className={styles.cookieLink}>Find out more</Link>
          </p>
        </div>

        {/* ── 底部法律文字 ── */}
        <div className={styles.bottom}>
          <p className={styles.legal}>
            &copy; 2025 SLOTSHUB. For entertainment purposes only — must be 18+ to gamble. Gamble responsibly.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>18+</span>
            <span className={styles.badge}>SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
