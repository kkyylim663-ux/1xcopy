"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import styles from "./page.module.css";

const TABS = [
  { id: "account", label: "My Account", href: "/en/office/account" },
  { id: "bets", label: "My Bets", href: "/en/office/bets" },
  { id: "deposits", label: "Deposits", href: "/en/office/deposits" },
  { id: "bonuses", label: "Bonuses", href: "/en/office/bonuses" },
  { id: "settings", label: "Settings", href: "/en/office/settings" },
];

const MOCK_BETS = [
  { id: "10293847", date: "2025-01-15", event: "Arsenal vs Chelsea", market: "Match Winner", odds: 2.10, stake: 50, status: "won", payout: 105 },
  { id: "10293848", date: "2025-01-14", event: "Barcelona vs Real Madrid", market: "Both Teams Score", odds: 1.75, stake: 100, status: "lost", payout: 0 },
  { id: "10293849", date: "2025-01-13", event: "Liverpool vs Man City", market: "Over 2.5 Goals", odds: 1.90, stake: 75, status: "pending", payout: null },
  { id: "10293850", date: "2025-01-12", event: "PSG vs Bayern", market: "1X2 Draw", odds: 3.50, stake: 30, status: "won", payout: 105 },
];

const MOCK_DEPOSITS = [
  { id: "D001", date: "2025-01-15 14:32", method: "Online Banking", amount: 200, currency: "MYR", status: "completed" },
  { id: "D002", date: "2025-01-10 09:18", method: "Touch 'n Go", amount: 500, currency: "MYR", status: "completed" },
  { id: "D003", date: "2025-01-05 20:45", method: "Online Banking", amount: 100, currency: "MYR", status: "completed" },
];

const MOCK_BONUSES = [
  { id: "B001", name: "Welcome Casino Package", amount: "up to 9888 MYR", status: "active", expiry: "2025-02-15", wagering: "35x", progress: 42 },
  { id: "B002", name: "100% Sports Deposit Bonus", amount: "up to 588 MYR", status: "expired", expiry: "2024-12-31", wagering: "5x", progress: 100 },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    if (!user) router.push("/en/user/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>{user.username ? user.username[0].toUpperCase() : "U"}</div>
            <div className={styles.userInfo}>
              <div className={styles.userId}>ID: {user.id}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
          </div>
          <div className={styles.balanceCard}>
            <div className={styles.balanceLabel}>Available Balance</div>
            <div className={styles.balanceAmount}>{user.currency} {user.balance.toFixed(2)}</div>
            <Link href="/en/office/deposits" className={styles.depositBtn}>DEPOSIT</Link>
          </div>
          <nav className={styles.sideNav}>
            {TABS.map(t => (
              <button key={t.id} type="button" className={`${styles.sideNavItem} ${activeTab === t.id ? styles.sideNavActive : ""}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
            <button type="button" className={styles.logoutBtn} onClick={() => { logout(); router.push("/en"); }}>Log Out</button>
          </nav>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          {activeTab === "account" && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Account ID</span>
                  <span className={styles.infoValue}>{user.id}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoValue}>{user.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Currency</span>
                  <span className={styles.infoValue}>{user.currency}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Status</span>
                  <span className={`${styles.infoValue} ${styles.statusActive}`}>Active</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Verification</span>
                  <span className={`${styles.infoValue} ${styles.statusPending}`}>Pending</span>
                </div>
              </div>

              <h2 className={styles.sectionTitle} style={{ marginTop: "32px" }}>Quick Actions</h2>
              <div className={styles.quickActions}>
                <Link href="/en/office/deposits" className={styles.actionCard}>
                  <div className={styles.actionIcon}>💳</div>
                  <span>Deposit</span>
                </Link>
                <button type="button" className={styles.actionCard} onClick={() => setActiveTab("bets")}>
                  <div className={styles.actionIcon}>📊</div>
                  <span>My Bets</span>
                </button>
                <button type="button" className={styles.actionCard} onClick={() => setActiveTab("bonuses")}>
                  <div className={styles.actionIcon}>🎁</div>
                  <span>Bonuses</span>
                </button>
                <button type="button" className={styles.actionCard} onClick={() => setActiveTab("settings")}>
                  <div className={styles.actionIcon}>⚙️</div>
                  <span>Settings</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "bets" && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>My Bets</h2>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Market</th>
                      <th>Odds</th>
                      <th>Stake</th>
                      <th>Status</th>
                      <th>Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_BETS.map(b => (
                      <tr key={b.id}>
                        <td>{b.date}</td>
                        <td>{b.event}</td>
                        <td>{b.market}</td>
                        <td>{b.odds}</td>
                        <td>{user.currency} {b.stake}</td>
                        <td><span className={`${styles.badge} ${styles["badge_" + b.status]}`}>{b.status}</span></td>
                        <td>{b.payout !== null ? `${user.currency} ${b.payout}` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "deposits" && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Deposit History</h2>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_DEPOSITS.map(d => (
                      <tr key={d.id}>
                        <td>{d.date}</td>
                        <td>{d.method}</td>
                        <td>{d.currency} {d.amount}</td>
                        <td><span className={`${styles.badge} ${styles.badge_won}`}>{d.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Link href="/en/office/deposits" className={styles.depositBtn}>Make a Deposit</Link>
              </div>
            </div>
          )}

          {activeTab === "bonuses" && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>My Bonuses</h2>
              <div className={styles.bonusList}>
                {MOCK_BONUSES.map(b => (
                  <div key={b.id} className={`${styles.bonusCard} ${b.status === "expired" ? styles.bonusExpired : ""}`}>
                    <div className={styles.bonusHeader}>
                      <strong className={styles.bonusName}>{b.name}</strong>
                      <span className={`${styles.badge} ${b.status === "active" ? styles.badge_won : styles.badge_lost}`}>{b.status}</span>
                    </div>
                    <div className={styles.bonusAmount}>{b.amount}</div>
                    <div className={styles.bonusMeta}>
                      <span>Wagering: {b.wagering}</span>
                      <span>Expires: {b.expiry}</span>
                    </div>
                    {b.status === "active" && (
                      <div className={styles.wageringBar}>
                        <div className={styles.wageringFill} style={{ width: `${b.progress}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link href="/en/bonus/rules" className={styles.allBonusesBtn}>ALL BONUSES</Link>
            </div>
          )}

          {activeTab === "settings" && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Settings</h2>
              <div className={styles.settingsGroup}>
                <h3 className={styles.settingsGroupTitle}>Account Settings</h3>
                <div className={styles.settingRow}>
                  <div><div className={styles.settingLabel}>Language</div><div className={styles.settingDesc}>Interface language</div></div>
                  <select className={styles.settingSelect}><option>English</option><option>Malay</option><option>Chinese</option></select>
                </div>
                <div className={styles.settingRow}>
                  <div><div className={styles.settingLabel}>Odds format</div><div className={styles.settingDesc}>How odds are displayed</div></div>
                  <select className={styles.settingSelect}><option>Decimal</option><option>Fractional</option><option>American</option></select>
                </div>
              </div>
              <div className={styles.settingsGroup} style={{ marginTop: "24px" }}>
                <h3 className={styles.settingsGroupTitle}>Notifications</h3>
                <div className={styles.settingRow}>
                  <div><div className={styles.settingLabel}>Email Notifications</div><div className={styles.settingDesc}>Promotions and results</div></div>
                  <label className={styles.toggle}><input type="checkbox" defaultChecked /><span className={styles.toggleSlider} /></label>
                </div>
                <div className={styles.settingRow}>
                  <div><div className={styles.settingLabel}>SMS Notifications</div><div className={styles.settingDesc}>Bet results</div></div>
                  <label className={styles.toggle}><input type="checkbox" /><span className={styles.toggleSlider} /></label>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
