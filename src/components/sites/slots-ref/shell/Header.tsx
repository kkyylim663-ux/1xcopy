"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "TOP-EVENTS", href: "/en/top-events" },
  { label: "SPORTS", href: "/en/line" },
  { label: "LIVE", href: "/en/live" },
  { label: "1XGAMES", href: "/en/games" },
  { label: "SLOTS", href: "/en/slots" },
  { label: "LIVE CASINO", href: "/en/casino" },
  { label: "ESPORTS", href: "/en/esports" },
  { label: "PROMO", href: "/en/bonus/rules" },
];

const MORE_ITEMS = [
  { label: "Multi-LIVE", href: "/en/multi" },
  { label: "Fast Bet", href: "/en/fast-bet" },
  { label: "TV Games", href: "/en/tvgames" },
  { label: "Virtual Sports", href: "/en/virtualsports" },
  { label: "Bingo", href: "/en/bingo" },
  { label: "Fishing", href: "/en/fishinghunting" },
  { label: "Lotto", href: "/en/lotto" },
  { label: "Results", href: "/en/results" },
];

function DepositIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2zm1 11H9V9h2v4zm0-6H9V5h2v2z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7-3a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
    </svg>
  );
}

function LoginDropdown({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [showPwd, setShowPwd] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div className={styles.loginDropdown} ref={ref}>
      <div className={styles.loginTabs}>
        <button
          type="button"
          className={`${styles.loginTab} ${tab === "email" ? styles.loginTabActive : ""}`}
          onClick={() => setTab("email")}
        >
          E-mail or ID
        </button>
        <button
          type="button"
          className={`${styles.loginTab} ${tab === "phone" ? styles.loginTabActive : ""}`}
          onClick={() => setTab("phone")}
        >
          Your phone number
        </button>
      </div>

      {tab === "email" ? (
        <div className={styles.loginFields}>
          <input
            type="text"
            placeholder="E-mail or ID"
            autoComplete="username"
            className={styles.loginInput}
          />
          <div className={styles.loginPwdRow}>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              className={styles.loginInput}
            />
            <button
              type="button"
              className={styles.showPwd}
              aria-label={showPwd ? "Hide password" : "Show password"}
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.loginFields}>
          <div className={styles.phoneRow}>
            <button type="button" className={styles.dialCode}>+60</button>
            <input
              type="tel"
              name="phone"
              placeholder="12 345 67891"
              autoComplete="tel"
              className={`${styles.loginInput} ${styles.loginInputPhone}`}
            />
          </div>
          <div className={styles.loginPwdRow}>
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              className={styles.loginInput}
            />
            <button
              type="button"
              className={styles.showPwd}
              aria-label={showPwd ? "Hide password" : "Show password"}
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? "🙈" : "👁"}
            </button>
          </div>
        </div>
      )}

      <div className={styles.loginActions}>
        <button type="button" className={styles.forgotPwd}>Forgot your password?</button>
        <button type="button" className={styles.loginSubmit}>LOG IN</button>
      </div>
    </div>
  );
}

function MoreDropdown({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div className={styles.moreDropdown} ref={ref}>
      {MORE_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={styles.moreItem} onClick={onClose}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* ── 第一行：Logo + 右侧操作区 ── */}
      <div className={styles.headerTop}>
        <div className={styles.container}>
          <Link href="/en" className={styles.logo} aria-label="SLOTSHUB home">
            <span className={styles.logoText}>SLOTSHUB</span>
          </Link>

          {/* 右侧：Deposit / REGISTRATION / LOG IN / Settings / Language */}
          <div className={styles.authArea}>
            <Link href="/en/information/payment" className={styles.iconBtn} aria-label="Deposit">
              <DepositIcon />
            </Link>
            <Link href="/en/registration" className={styles.btnRegister}>
              REGISTRATION
            </Link>

            {/* LOG IN 下拉 */}
            <div className={styles.loginWrap}>
              <button
                type="button"
                className={styles.btnLogin}
                aria-expanded={loginOpen}
                aria-label="Log in"
                onClick={() => setLoginOpen((v) => !v)}
              >
                LOG IN
              </button>
              {loginOpen && <LoginDropdown onClose={() => setLoginOpen(false)} />}
            </div>

            <button type="button" className={styles.iconBtnGroup} aria-label="Settings">
              <SettingsIcon />
              <span className={styles.iconBtnGroupLabel}>Settings</span>
            </button>
            <button type="button" className={styles.iconBtnRight} aria-label="Language and time">
              <span>EN</span>
            </button>
          </div>

          {/* 移动端汉堡 */}
          <button
            className={styles.hamburger}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>

      {/* ── 第二行：主导航 ── */}
      <div className={styles.navRow}>
        <div className={styles.container}>
          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={styles.navItem}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
              {/* MORE 下拉 */}
              <li className={styles.navItem}>
                <div className={styles.moreWrap}>
                  <button
                    type="button"
                    className={styles.navLink}
                    aria-expanded={moreOpen}
                    onClick={() => setMoreOpen((v) => !v)}
                  >
                    MORE ▾
                  </button>
                  {moreOpen && <MoreDropdown onClose={() => setMoreOpen(false)} />}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {[...NAV_ITEMS, ...MORE_ITEMS].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileAuth}>
            <button className={styles.btnLogin} type="button">Log In</button>
            <Link href="/en/registration" className={styles.btnRegister}>Register</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
