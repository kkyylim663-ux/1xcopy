import { Suspense } from "react";
import SportsSidebar from "@/components/sites/slots-ref/shell/SportsSidebar";
import styles from "./page.module.css";

const SPORTS = [
  { href: "/en/line/football", label: "Football", icon: "⚽", count: 248 },
  { href: "/en/line/tennis", label: "Tennis", icon: "🎾", count: 82 },
  { href: "/en/line/basketball", label: "Basketball", icon: "🏀", count: 46 },
  { href: "/en/line/volleyball", label: "Volleyball", icon: "🏐", count: 24 },
  { href: "/en/line/hockey", label: "Ice Hockey", icon: "🏒", count: 30 },
  { href: "/en/line/baseball", label: "Baseball", icon: "⚾", count: 18 },
  { href: "/en/line/cricket", label: "Cricket", icon: "🏏", count: 12 },
  { href: "/en/line/mma", label: "MMA / UFC", icon: "🥊", count: 8 },
  { href: "/en/line/golf", label: "Golf", icon: "⛳", count: 4 },
  { href: "/en/line/boxing", label: "Boxing", icon: "🥊", count: 3 },
];

const MATCHES = [
  { id: 1, league: "Premier League", home: "Arsenal", away: "Tottenham", time: "Feb 1, 17:30", odds: [1.8, 3.6, 4.5] },
  { id: 2, league: "La Liga", home: "Real Madrid", away: "Valencia", time: "Feb 1, 20:00", odds: [1.5, 4.0, 7.0] },
  { id: 3, league: "Bundesliga", home: "Bayern Munich", away: "Borussia Dortmund", time: "Feb 2, 21:30", odds: [1.4, 4.5, 8.5] },
  { id: 4, league: "Serie A", home: "AC Milan", away: "Juventus", time: "Feb 2, 18:00", odds: [2.0, 3.3, 3.8] },
  { id: 5, league: "Ligue 1", home: "PSG", away: "Lyon", time: "Feb 3, 21:00", odds: [1.3, 5.5, 11.0] },
];

export default function LinePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Suspense fallback={null}><SportsSidebar title="Pre-Match Betting" items={SPORTS} /></Suspense>
        <main className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>Pre-Match Betting</h1>
            <span className={styles.totalCount}>{MATCHES.length} events</span>
          </div>
          <div className={styles.matchList}>
            {MATCHES.map(m => (
              <div key={m.id} className={styles.matchRow}>
                <div className={styles.matchInfo}>
                  <span className={styles.league}>{m.league}</span>
                  <span className={styles.matchTime}>{m.time}</span>
                </div>
                <div className={styles.teams}>
                  <span>{m.home}</span>
                  <span className={styles.vs}>vs</span>
                  <span>{m.away}</span>
                </div>
                <div className={styles.odds}>
                  {m.odds.map((o, i) => (
                    <button key={i} type="button" className={styles.oddsBtn}>
                      <span className={styles.oddsLabel}>{["1","X","2"][i]}</span>
                      <span className={styles.oddsVal}>{o.toFixed(2)}</span>
                    </button>
                  ))}
                  <button type="button" className={styles.moreBtn}>+48</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
