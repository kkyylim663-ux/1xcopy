"use client";
import { useState } from "react";
import MatchCard from "@/components/sites/slots-ref/ui/MatchCard";
import styles from "./page.module.css";

const TOURNAMENTS = [
  { id: "cl", name: "Champions League", sport: "Football", region: "Europe", teams: 32, prize: "€2.03B" },
  { id: "el", name: "Europa League", sport: "Football", region: "Europe", teams: 24, prize: "€465M" },
  { id: "wc", name: "World Cup 2026", sport: "Football", region: "World", teams: 48, prize: "$440M" },
  { id: "nba", name: "NBA Playoffs", sport: "Basketball", region: "North America", teams: 16, prize: "$100M" },
  { id: "atp", name: "ATP Finals", sport: "Tennis", region: "World", teams: 8, prize: "$15M" },
  { id: "nhl", name: "Stanley Cup", sport: "Hockey", region: "North America", teams: 16, prize: "$26M" },
];

const MATCHES: Record<string, Array<{ id: number; home: string; away: string; league: string; time: string; odds: { h: string; d: string; a: string } }>> = {
  cl: [
    { id: 1, home: "Real Madrid", away: "Bayern Munich", league: "UCL QF Leg 1", time: "Tue 03:00", odds: { h: "1.85", d: "3.50", a: "2.20" } },
    { id: 2, home: "Man City", away: "PSG", league: "UCL QF Leg 1", time: "Wed 03:00", odds: { h: "1.65", d: "3.80", a: "2.80" } },
    { id: 3, home: "Barcelona", away: "Inter Milan", league: "UCL QF Leg 2", time: "Thu 03:00", odds: { h: "1.70", d: "3.60", a: "2.70" } },
  ],
  el: [
    { id: 4, home: "Bayer Leverkusen", away: "Roma", league: "UEL SF Leg 1", time: "Thu 02:00", odds: { h: "1.90", d: "3.30", a: "2.15" } },
    { id: 5, home: "Villarreal", away: "Atalanta", league: "UEL SF Leg 1", time: "Thu 02:00", odds: { h: "2.10", d: "3.20", a: "1.95" } },
  ],
  wc: [
    { id: 6, home: "Brazil", away: "Argentina", league: "WC Group Stage", time: "Mon 02:00", odds: { h: "2.00", d: "3.10", a: "2.10" } },
    { id: 7, home: "France", away: "Germany", league: "WC Group Stage", time: "Mon 22:00", odds: { h: "1.95", d: "3.20", a: "2.15" } },
    { id: 8, home: "England", away: "Spain", league: "WC Group Stage", time: "Tue 02:00", odds: { h: "2.20", d: "3.00", a: "1.90" } },
  ],
  nba: [
    { id: 9, home: "Celtics", away: "Heat", league: "NBA EC Finals G4", time: "Fri 09:00", odds: { h: "1.75", d: "-", a: "2.25" } },
    { id: 10, home: "Warriors", away: "Suns", league: "NBA WC Finals G5", time: "Sat 09:30", odds: { h: "1.60", d: "-", a: "2.60" } },
  ],
  atp: [
    { id: 11, home: "Djokovic N.", away: "Alcaraz C.", league: "ATP Finals SF", time: "Sat 22:00", odds: { h: "1.55", d: "-", a: "2.80" } },
    { id: 12, home: "Medvedev D.", away: "Sinner J.", league: "ATP Finals SF", time: "Sat 20:00", odds: { h: "2.00", d: "-", a: "1.95" } },
  ],
  nhl: [
    { id: 13, home: "Maple Leafs", away: "Bruins", league: "SC R1 G6", time: "Sun 09:00", odds: { h: "2.10", d: "4.00", a: "1.90" } },
    { id: 14, home: "Lightning", away: "Rangers", league: "SC R1 G7", time: "Mon 09:00", odds: { h: "1.85", d: "3.80", a: "2.20" } },
  ],
};

export default function ChampsPage() {
  const [active, setActive] = useState("cl");

  const tournament = TOURNAMENTS.find((t) => t.id === active)!;
  const matches = MATCHES[active] ?? [];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Championships</h1>
        <p className={styles.pageSubtitle}>Major tournaments &amp; competitions</p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          {TOURNAMENTS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.sideItem} ${active === t.id ? styles.sideItemActive : ""}`}
              onClick={() => setActive(t.id)}
            >
              <span className={styles.sideItemName}>{t.name}</span>
              <span className={styles.sideItemSport}>{t.sport}</span>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <div className={styles.tournamentCard}>
            <div className={styles.tournamentInfo}>
              <h2 className={styles.tournamentName}>{tournament.name}</h2>
              <div className={styles.tournamentMeta}>
                <span>{tournament.sport}</span>
                <span>·</span>
                <span>{tournament.region}</span>
                <span>·</span>
                <span>{tournament.teams} teams</span>
                <span>·</span>
                <span className={styles.prize}>Prize: {tournament.prize}</span>
              </div>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Upcoming Matches</h3>

          <div className={styles.grid}>
            {matches.map((m) => (
              <MatchCard key={m.id} {...m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
