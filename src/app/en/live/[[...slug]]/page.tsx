import { Suspense } from "react";
import SportsSidebar from "@/components/sites/slots-ref/shell/SportsSidebar";
import styles from "./page.module.css";

const LIVE_SPORTS = [
  { href: "/en/live/football", label: "Football", icon: "⚽", count: 24 },
  { href: "/en/live/basketball", label: "Basketball", icon: "🏀", count: 12 },
  { href: "/en/live/tennis", label: "Tennis", icon: "🎾", count: 8 },
  { href: "/en/live/volleyball", label: "Volleyball", icon: "🏐", count: 6 },
  { href: "/en/live/hockey", label: "Ice Hockey", icon: "🏒", count: 5 },
  { href: "/en/live/esports", label: "Esports", icon: "🎮", count: 9 },
  { href: "/en/live/cricket", label: "Cricket", icon: "🏏", count: 3 },
  { href: "/en/live/baseball", label: "Baseball", icon: "⚾", count: 4 },
];

const LIVE_MATCHES = [
  { id: 1, sport: "Football", league: "Premier League", home: "Man City", away: "Liverpool", minute: "67'", homeScore: 1, awayScore: 1, odds: [2.3, 3.1, 3.2] },
  { id: 2, sport: "Football", league: "La Liga", home: "Barcelona", away: "Athletic Club", minute: "34'", homeScore: 0, awayScore: 0, odds: [1.6, 3.8, 6.5] },
  { id: 3, sport: "Basketball", league: "NBA", home: "Celtics", away: "Heat", minute: "Q3 5:20", homeScore: 76, awayScore: 71, odds: [1.4, null, 2.9] },
  { id: 4, sport: "Tennis", league: "ATP Vienna", home: "Medvedev", away: "Rublev", minute: "Set 2", homeScore: 6, awayScore: 4, odds: [1.7, null, 2.1] },
  { id: 5, sport: "Football", league: "Bundesliga", home: "Leverkusen", away: "Mainz", minute: "52'", homeScore: 2, awayScore: 0, odds: [1.2, 7.0, 12.0] },
  { id: 6, sport: "Esports", league: "CS2 ESL", home: "Navi", away: "Vitality", minute: "LIVE", homeScore: 11, awayScore: 14, odds: [2.8, null, 1.4] },
];

export default function LivePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Suspense fallback={null}><SportsSidebar title="Live Betting" items={LIVE_SPORTS} /></Suspense>
        <main className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.title}>Live Betting</h1>
            <span className={styles.liveCount}>{LIVE_MATCHES.length} LIVE</span>
          </div>
          <div className={styles.matchList}>
            {LIVE_MATCHES.map(m => (
              <div key={m.id} className={styles.matchRow}>
                <div className={styles.matchInfo}>
                  <span className={styles.sport}>{m.sport}</span>
                  <span className={styles.league}>{m.league}</span>
                  <span className={styles.minute}>{m.minute}</span>
                </div>
                <div className={styles.teams}>
                  <div className={styles.teamRow}>
                    <span className={styles.teamName}>{m.home}</span>
                    <span className={styles.scoreVal}>{m.homeScore}</span>
                  </div>
                  <div className={styles.teamRow}>
                    <span className={styles.teamName}>{m.away}</span>
                    <span className={styles.scoreVal}>{m.awayScore}</span>
                  </div>
                </div>
                <div className={styles.odds}>
                  {m.odds.map((o, i) => o !== null ? (
                    <button key={i} type="button" className={styles.oddsBtn}>
                      <span className={styles.oddsLabel}>{["1","X","2"][i]}</span>
                      <span className={styles.oddsVal}>{o.toFixed(2)}</span>
                    </button>
                  ) : (
                    <div key={i} className={`${styles.oddsBtn} ${styles.oddsDash}`}>—</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
