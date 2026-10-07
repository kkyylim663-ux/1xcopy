"use client";
import { useState } from "react";
import styles from "./page.module.css";

const SPORTS = ["Football", "Basketball", "Tennis", "Hockey"];

const TEAM_STATS = [
  { id: 1, team: "Man City", sport: "Football", played: 8, won: 7, drawn: 1, lost: 0, gf: 22, ga: 5, pts: 22 },
  { id: 2, team: "Arsenal", sport: "Football", played: 8, won: 6, drawn: 1, lost: 1, gf: 18, ga: 7, pts: 19 },
  { id: 3, team: "Liverpool", sport: "Football", played: 8, won: 5, drawn: 2, lost: 1, gf: 17, ga: 9, pts: 17 },
  { id: 4, team: "Chelsea", sport: "Football", played: 8, won: 4, drawn: 3, lost: 1, gf: 14, ga: 10, pts: 15 },
  { id: 5, team: "Spurs", sport: "Football", played: 8, won: 3, drawn: 2, lost: 3, gf: 11, ga: 12, pts: 11 },
  { id: 6, team: "Newcastle", sport: "Football", played: 8, won: 3, drawn: 1, lost: 4, gf: 10, ga: 14, pts: 10 },
  { id: 7, team: "Celtics", sport: "Basketball", played: 6, won: 5, drawn: 0, lost: 1, gf: 678, ga: 610, pts: 10 },
  { id: 8, team: "Warriors", sport: "Basketball", played: 6, won: 4, drawn: 0, lost: 2, gf: 655, ga: 630, pts: 8 },
  { id: 9, team: "Lakers", sport: "Basketball", played: 6, won: 3, drawn: 0, lost: 3, gf: 640, ga: 645, pts: 6 },
  { id: 10, team: "Djokovic N.", sport: "Tennis", played: 5, won: 5, drawn: 0, lost: 0, gf: 30, ga: 8, pts: 25 },
  { id: 11, team: "Alcaraz C.", sport: "Tennis", played: 5, won: 4, drawn: 0, lost: 1, gf: 26, ga: 12, pts: 20 },
  { id: 12, team: "Maple Leafs", sport: "Hockey", played: 7, won: 5, drawn: 1, lost: 1, gf: 24, ga: 15, pts: 11 },
  { id: 13, team: "Bruins", sport: "Hockey", played: 7, won: 4, drawn: 2, lost: 1, gf: 21, ga: 17, pts: 10 },
];

export default function StatisticPage() {
  const [sport, setSport] = useState("Football");

  const filtered = TEAM_STATS.filter((t) => t.sport === sport);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Statistics</h1>
        <p className={styles.pageSubtitle}>League standings &amp; team performance</p>
      </div>

      <nav className={styles.tabs} aria-label="Sport selection">
        {SPORTS.map((s) => (
          <button
            key={s}
            type="button"
            className={`${styles.tab} ${sport === s ? styles.tabActive : ""}`}
            onClick={() => setSport(s)}
          >
            {s}
          </button>
        ))}
      </nav>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thRank}>#</th>
              <th className={styles.thTeam}>Team</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id} className={i < 3 ? styles.topRow : ""}>
                <td className={styles.rank}>{i + 1}</td>
                <td className={styles.teamCell}>
                  <div className={styles.teamIcon} aria-hidden="true" />
                  {t.team}
                </td>
                <td>{t.played}</td>
                <td className={styles.win}>{t.won}</td>
                <td>{t.drawn}</td>
                <td className={styles.loss}>{t.lost}</td>
                <td>{t.gf}</td>
                <td>{t.ga}</td>
                <td className={styles.pts}>{t.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
