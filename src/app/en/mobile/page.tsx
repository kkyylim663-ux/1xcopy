import Link from "next/link";
import styles from "./page.module.css";

export default function MobilePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>SLOTSHUB Mobile App</h1>
          <p className={styles.subtitle}>Bet on sports, play casino games, and manage your account anywhere, anytime.</p>
          <div className={styles.appBtns}>
            <a href="#" className={`${styles.appBtn} ${styles.ios}`}>
              <span className={styles.appIcon}>🍎</span>
              <div><div className={styles.appSmall}>Download on the</div><div className={styles.appBig}>App Store</div></div>
            </a>
            <a href="#" className={`${styles.appBtn} ${styles.android}`}>
              <span className={styles.appIcon}>🤖</span>
              <div><div className={styles.appSmall}>Get it on</div><div className={styles.appBig}>Google Play</div></div>
            </a>
            <a href="#" className={`${styles.appBtn} ${styles.apk}`}>
              <span className={styles.appIcon}>📦</span>
              <div><div className={styles.appSmall}>Direct</div><div className={styles.appBig}>APK Download</div></div>
            </a>
          </div>
        </div>
        <div className={styles.heroPhone} />
      </div>

      <div className={styles.features}>
        {[
          { icon: "⚡", title: "Fast & Smooth", desc: "Optimized for speed with instant bet placement and live updates." },
          { icon: "🔒", title: "Secure Login", desc: "Biometric authentication and 2-factor security for your account." },
          { icon: "📺", title: "Live Streaming", desc: "Watch live sports events directly in the app with real-time odds." },
          { icon: "💰", title: "Easy Deposits", desc: "Deposit via FPX, Touch 'n Go, GrabPay, and more with one tap." },
          { icon: "🎰", title: "All Games", desc: "Full access to slots, live casino, esports, and sports betting." },
          { icon: "🔔", title: "Push Notifications", desc: "Get instant alerts for bet results, promotions, and score updates." },
        ].map(f => (
          <div key={f.title} className={styles.featureCard}>
            <div className={styles.featureIcon}>{f.icon}</div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.howTo}>
        <h2 className={styles.howTitle}>How to Install</h2>
        <div className={styles.steps}>
          {[
            { n: "1", text: "Download the APK file or install from App Store / Google Play" },
            { n: "2", text: "For Android: Enable \"Unknown Sources\" in your device settings if prompted" },
            { n: "3", text: "Install the app and open it" },
            { n: "4", text: "Log in with your SLOTSHUB account or register a new one" },
          ].map(s => (
            <div key={s.n} className={styles.step}>
              <div className={styles.stepNum}>{s.n}</div>
              <p className={styles.stepText}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
