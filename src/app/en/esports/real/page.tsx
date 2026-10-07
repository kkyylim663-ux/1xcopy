import { Suspense } from "react";
import SportsSidebar from "@/components/sites/slots-ref/shell/SportsSidebar";
import styles from "./page.module.css";

const ESPORTS_GAMES = [
  { href: "/en/esports/real", label: "All Esports", icon: "🎮", count: 42 },
  { href: "/en/esports/real/cs2", label: "CS2", icon: "🔫", count: 8 },
  { href: "/en/esports/real/dota2", label: "Dota 2", icon: "🛡", count: 6 },
  { href: "/en/esports/real/lol", label: "League of Legends", icon: "⚔️", count: 10 },
  { href: "/en/esports/real/ml", label: "Mobile Legends", icon: "📱", count: 7 },
  { href: "/en/esports/real/valorant", label: "Valorant", icon: "🎯", count: 5 },
  { href: "/en/esports/real/r6", label: "Rainbow Six", icon: "🏹", count: 4 },
  { href: "/en/esports/real/pubg", label: "PUBG", icon: "🪖", count: 2 },
];

const MOCK_MATCHES = [
  { id: 1, game: "CS2", tournament: "ESL Pro League Season 19", teamA: "Team Spirit", teamB: "G2 Esports", time: "LIVE", score: "14:12", odds: [2.1, 1.7] },
  { id: 2, game: "Dota 2", tournament: "The International 2025", teamA: "Team Secret", teamB: "OG", time: "19:00", score: null, odds: [3.0, 1.4] },
  { id: 3, game: "League of Legends", tournament: "LEC Spring 2025", teamA: "Fnatic", teamB: "Cloud9", time: "21:00", score: null, odds: [1.9, 1.9] },
  { id: 4, game: "CS2", tournament: "BLAST Premier Spring", teamA: "Natus Vincere", teamB: "Astralis", time: "LIVE", score: "9:6", odds: [1.6, 2.3] },
  { id: 5, game: "Valorant", tournament: "VCT Champions 2025", teamA: "Sentinels", teamB: "100 Thieves", time: "20:00", score: null, odds: [2.5, 1.5] },
  { id: 6, game: "Mobile Legends", tournament: "MPL Season 15", teamA: "ONIC", teamB: "Alter Ego", time: "18:00", score: null, odds: [1.8, 2.0] },
];

export default function EsportsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Suspense fallback={null}><SportsSidebar title="Esports" items={ESPORTS_GAMES} /></Suspense>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>Esports Betting</h1>
            <span className={styles.liveCount}>{MOCK_MATCHES.filter(m => m.time === "LIVE").length} LIVE</span>
          </div>
          <div className={styles.matchList}>
            {MOCK_MATCHES.map(m => (
              <div key={m.id} className={styles.matchCard}>
                <div className={styles.matchMeta}>
                  <span className={styles.matchGame}>{m.game}</span>
                  <span className={styles.matchTournament}>{m.tournament}</span>
                  {m.time === "LIVE" ? <span className={styles.liveBadge}>LIVE</span> : <span className={styles.matchTime}>{m.time}</span>}
                </div>
                <div className={styles.matchTeams}>
                  <span className={styles.teamName}>{m.teamA}</span>
                  {m.score ? <span className={styles.score}>{m.score}</span> : <span className={styles.vs}>vs</span>}
                  <span className={styles.teamName}>{m.teamB}</span>
                </div>
                <div className={styles.matchOdds}>
                  <button type="button" className={styles.oddsBtn}>{m.teamA.split(" ")[0]}<br /><strong>{m.odds[0].toFixed(2)}</strong></button>
                  <button type="button" className={`${styles.oddsBtn} ${styles.oddsDraw}`}>Draw<br /><strong>—</strong></button>
                  <button type="button" className={styles.oddsBtn}>{m.teamB.split(" ")[0]}<br /><strong>{m.odds[1].toFixed(2)}</strong></button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
