"use client";
import { useState } from "react";
import styles from "./page.module.css";

const RESULTS = [
  { id: 1, home: "Liverpool", away: "Man City", league: "Premier League", date: "05 Oct", score: "2 - 1", status: "FT" },
  { id: 2, home: "Real Madrid", away: "Atletico", league: "La Liga", date: "05 Oct", score: "3 - 0", status: "FT" },
  { id: 3, home: "Bayern Munich", away: "Leverkusen", league: "Bundesliga", date: "04 Oct", score: "1 - 1", status: "FT" },
  { id: 4, home: "PSG", away: "Marseille", league: "Ligue 1", date: "04 Oct", score: "4 - 1", status: "FT" },
  { id: 5, home: "Celtics", away: "Lakers", league: "NBA", date: "04 Oct", score: "108 - 97", status: "FT" },
  { id: 6, home: "Djokovic N.", away: "Medvedev D.", league: "ATP Finals", date: "03 Oct", score: "6-3 7-5", status: "FT" },
  { id: 7, home: "Juventus", away: "Roma", league: "Serie A", date: "03 Oct", score: "2 - 2", status: "FT" },
  { id: 8, home: "Ajax", away: "Feyenoord", league: "Eredivisie", date: "03 Oct", score: "1 - 2", status: "FT" },
  { id: 9, home: "Man United", away: "Everton", league: "Premier League", date: "02 Oct", score: "3 - 1", status: "FT" },
  { id: 10, home: "Barcelona", away: "Villarreal", league: "La Liga", date: "02 Oct", score: "2 - 0", status: "FT" },
  { id: 11, home: "Warriors", away: "Nets", league: "NBA", date: "01 Oct", score: "115 - 112", status: "FT" },
  { id: 12, home: "Inter Milan", away: "Lazio", league: "Serie A", date: "01 Oct", score: "0 - 1", status: "FT" },
  { id: 13, home: "Celtic", away: "Rangers", league: "Scottish Prem", date: "30 Sep", score: "1 - 1", status: "FT" },
  { id: 14, home: "Alcaraz C.", away: "Tsitsipas S.", league: "ATP 500", date: "30 Sep", score: "6-4 6-3", status: "FT" },
  { id: 15, home: "Dortmund", away: "Schalke", league: "Bundesliga", date: "29 Sep", score: "5 - 2", status: "FT" },
];

const LEAGUES = ["All Leagues", "Premier League", "La Liga", "Bundesliga", "Serie A", "NBA", "ATP", "Ligue 1"];

export default function ResultsPage() {
  const [league, setLeague] = useState("All Leagues");

  const filtered = league === "All Leagues"
    ? RESULTS
    : RESULTS.filter((r) => r.league === league);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Results</h1>
        <p className={styles.pageCount}>{filtered.length} results</p>
      </div>

      <nav className={styles.tabs} aria-label="League filter">
        {LEAGUES.map((l) => (
          <button
            key={l}
            type="button"
            className={`${styles.tab} ${league === l ? styles.tabActive : ""}`}
            onClick={() => setLeague(l)}
          >
            {l}
          </button>
        ))}
      </nav>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>League</span>
          <span>Date</span>
          <span>Home</span>
          <span className={styles.scoreCol}>Score</span>
          <span>Away</span>
          <span>Status</span>
        </div>

        {filtered.map((r) => (
          <a key={r.id} href="#" className={styles.row}>
            <span className={styles.rowLeague}>{r.league}</span>
            <span className={styles.rowDate}>{r.date}</span>
            <span className={styles.rowTeam}>{r.home}</span>
            <span className={styles.rowScore}>{r.score}</span>
            <span className={styles.rowTeam}>{r.away}</span>
            <span className={styles.rowStatus}>{r.status}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
