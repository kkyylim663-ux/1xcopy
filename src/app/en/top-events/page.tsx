import Link from "next/link";
import styles from "./page.module.css";

const TOURNAMENTS = [
  { slug: "la-liga", name: "La Liga", sport: "Football" },
  { slug: "premier-league", name: "Premier League", sport: "Football" },
  { slug: "champions-league", name: "Champions League", sport: "Football" },
  { slug: "nba", name: "NBA", sport: "Basketball" },
  { slug: "atp-tour", name: "ATP Tour", sport: "Tennis" },
];

const MOCK_EVENTS = [
  { id: 1, tournament: "La Liga", home: "Real Madrid", away: "Barcelona", time: "LIVE 67'", homeScore: 2, awayScore: 1, odds: [1.9, 3.4, 4.2] },
  { id: 2, tournament: "La Liga", home: "Atletico Madrid", away: "Sevilla", time: "20:00", homeScore: null, awayScore: null, odds: [1.7, 3.8, 5.0] },
  { id: 3, tournament: "Premier League", home: "Arsenal", away: "Chelsea", time: "21:30", homeScore: null, awayScore: null, odds: [2.1, 3.3, 3.6] },
  { id: 4, tournament: "Champions League", home: "PSG", away: "Bayern Munich", time: "LIVE 34'", homeScore: 0, awayScore: 1, odds: [2.4, 3.2, 2.9] },
  { id: 5, tournament: "NBA", home: "LA Lakers", away: "Golden State", time: "LIVE Q3", homeScore: 78, awayScore: 82, odds: [1.85, null, 1.95] },
  { id: 6, tournament: "ATP Tour", home: "Djokovic", away: "Alcaraz", time: "18:00", homeScore: null, awayScore: null, odds: [1.5, null, 2.6] },
];

export default function TopEventsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.tournamentTabs}>
          {TOURNAMENTS.map((t, i) => (
            <button key={t.slug} type="button" className={`${styles.tab} ${i === 0 ? styles.tabActive : ""}`}>
              {t.name}
            </button>
          ))}
        </div>

        <div className={styles.eventList}>
          {MOCK_EVENTS.map(e => (
            <div key={e.id} className={styles.eventRow}>
              <div className={styles.eventMeta}>
                <span className={styles.eventTournament}>{e.tournament}</span>
                {e.time.startsWith("LIVE") ? <span className={styles.livePill}>{e.time}</span> : <span className={styles.eventTime}>{e.time}</span>}
              </div>
              <div className={styles.eventTeams}>
                <span className={styles.teamName}>{e.home}</span>
                {e.homeScore !== null ? (
                  <span className={styles.eventScore}>{e.homeScore} : {e.awayScore}</span>
                ) : (
                  <span className={styles.eventVs}>vs</span>
                )}
                <span className={`${styles.teamName} ${styles.teamRight}`}>{e.away}</span>
              </div>
              <div className={styles.eventOdds}>
                {e.odds.map((o, i) => o !== null ? (
                  <button key={i} type="button" className={styles.oddsBtn}>
                    <span className={styles.oddsLabel}>{i === 0 ? "1" : i === 1 ? "X" : "2"}</span>
                    <span className={styles.oddsVal}>{o.toFixed(2)}</span>
                  </button>
                ) : (
                  <div key={i} className={`${styles.oddsBtn} ${styles.oddsDash}`}>—</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
