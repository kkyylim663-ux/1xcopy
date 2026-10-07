"use client";
import { useState } from "react";
import MatchCard from "@/components/sites/slots-ref/ui/MatchCard";
import styles from "./page.module.css";

const ALL_MATCHES = [
  { id: 1, home: "Man United", away: "Arsenal", league: "Premier League", time: "Today 20:00", odds: { h: "2.10", d: "3.40", a: "1.75" } },
  { id: 2, home: "Barcelona", away: "Real Madrid", league: "La Liga", time: "Today 21:00", odds: { h: "1.90", d: "3.20", a: "2.10" } },
  { id: 3, home: "Bayern Munich", away: "Dortmund", league: "Bundesliga", time: "Sat 18:30", odds: { h: "1.55", d: "4.10", a: "3.80" } },
  { id: 4, home: "PSG", away: "Lyon", league: "Ligue 1", time: "Sat 20:45", odds: { h: "1.40", d: "4.50", a: "5.20" } },
  { id: 5, home: "Lakers", away: "Warriors", league: "NBA", time: "Today 03:00", odds: { h: "1.85", d: "-", a: "2.05" } },
  { id: 6, home: "Celtics", away: "Heat", league: "NBA", time: "Today 05:30", odds: { h: "1.70", d: "-", a: "2.30" } },
  { id: 7, home: "Juventus", away: "AC Milan", league: "Serie A", time: "Sun 17:00", odds: { h: "2.30", d: "3.10", a: "1.90" } },
  { id: 8, home: "Atletico", away: "Sevilla", league: "La Liga", time: "Sun 19:30", odds: { h: "1.75", d: "3.30", a: "2.80" } },
  { id: 9, home: "Ajax", away: "PSV", league: "Eredivisie", time: "Sat 19:00", odds: { h: "1.60", d: "3.80", a: "3.20" } },
  { id: 10, home: "Benfica", away: "Porto", league: "Primeira Liga", time: "Sun 20:00", odds: { h: "2.05", d: "3.20", a: "2.05" } },
  { id: 11, home: "Rangers", away: "Celtic", league: "Scottish Prem", time: "Sat 12:30", odds: { h: "2.40", d: "3.00", a: "1.85" } },
  { id: 12, home: "Spurs", away: "Newcastle", league: "Premier League", time: "Sun 14:00", odds: { h: "2.10", d: "3.20", a: "2.00" } },
];

interface BetSlip {
  matchId: number;
  pick: "h" | "d" | "a";
  value: string;
  teams: string;
}

export default function MultiPage() {
  const [betSlip, setBetSlip] = useState<BetSlip[]>([]);
  const [stake, setStake] = useState("10");

  function addBet(matchId: number, pick: "h" | "d" | "a", value: string, home: string, away: string) {
    const existing = betSlip.findIndex((b) => b.matchId === matchId);
    if (existing >= 0) {
      const updated = [...betSlip];
      updated[existing] = { matchId, pick, value, teams: `${home} vs ${away}` };
      setBetSlip(updated);
    } else {
      setBetSlip([...betSlip, { matchId, pick, value, teams: `${home} vs ${away}` }]);
    }
  }

  function removeBet(matchId: number) {
    setBetSlip(betSlip.filter((b) => b.matchId !== matchId));
  }

  const totalOdds = betSlip.reduce((acc, b) => acc * parseFloat(b.value), 1);
  const potentialWin = (parseFloat(stake || "0") * totalOdds).toFixed(2);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Multi Bet</h1>
            <p className={styles.pageSubtitle}>Select outcomes from multiple matches</p>
          </div>

          <div className={styles.grid}>
            {ALL_MATCHES.map((m) => (
              <div key={m.id} className={styles.matchWrap}>
                <MatchCard {...m} />
                <div className={styles.pickRow}>
                  {(["h", "d", "a"] as const).map((pick) => {
                    const val = m.odds[pick];
                    if (val === "-") return null;
                    const isSelected = betSlip.some((b) => b.matchId === m.id && b.pick === pick);
                    return (
                      <button
                        key={pick}
                        type="button"
                        className={`${styles.pickBtn} ${isSelected ? styles.pickBtnActive : ""}`}
                        onClick={() => addBet(m.id, pick, val, m.home, m.away)}
                      >
                        {pick === "h" ? "1" : pick === "d" ? "X" : "2"} · {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.slip}>
          <h2 className={styles.slipTitle}>Bet Slip ({betSlip.length})</h2>

          {betSlip.length === 0 ? (
            <p className={styles.slipEmpty}>Click odds to add matches to your multi bet.</p>
          ) : (
            <>
              <ul className={styles.slipList}>
                {betSlip.map((b) => (
                  <li key={b.matchId} className={styles.slipItem}>
                    <div className={styles.slipTeams}>{b.teams}</div>
                    <div className={styles.slipOdd}>
                      {b.pick === "h" ? "1" : b.pick === "d" ? "X" : "2"} · {b.value}
                    </div>
                    <button
                      type="button"
                      className={styles.slipRemove}
                      onClick={() => removeBet(b.matchId)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.slipSummary}>
                <div className={styles.slipRow}>
                  <span>Total Odds</span>
                  <strong>{totalOdds.toFixed(2)}</strong>
                </div>
                <div className={styles.stakeRow}>
                  <label className={styles.stakeLabel}>Stake (MYR)</label>
                  <input
                    type="number"
                    className={styles.stakeInput}
                    value={stake}
                    min="1"
                    onChange={(e) => setStake(e.target.value)}
                  />
                </div>
                <div className={styles.slipRow}>
                  <span>Potential Win</span>
                  <strong className={styles.winAmount}>MYR {potentialWin}</strong>
                </div>
                <a href="#" className={styles.placeBetBtn}>
                  Place Multi Bet
                </a>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
