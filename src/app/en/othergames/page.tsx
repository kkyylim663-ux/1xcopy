"use client";
import { useState } from "react";
import styles from "./page.module.css";

const CATEGORIES = ["All", "Arcade", "Board", "Card", "Puzzle", "Action"];

const GAMES = [
  { id: 1, name: "Wheel of Fortune", category: "Arcade", provider: "Evolution", players: "1.2K", colorSeed: 45 },
  { id: 2, name: "Deal or No Deal", category: "Arcade", provider: "Playtech", players: "890", colorSeed: 120 },
  { id: 3, name: "Monopoly Live", category: "Board", provider: "Evolution", players: "2.1K", colorSeed: 200 },
  { id: 4, name: "Crazy Time", category: "Arcade", provider: "Evolution", players: "3.5K", colorSeed: 30 },
  { id: 5, name: "Lightning Dice", category: "Arcade", provider: "Evolution", players: "760", colorSeed: 270 },
  { id: 6, name: "Andar Bahar", category: "Card", provider: "Ezugi", players: "430", colorSeed: 310 },
  { id: 7, name: "Dragon Tiger", category: "Card", provider: "Evolution", players: "980", colorSeed: 15 },
  { id: 8, name: "Sic Bo", category: "Board", provider: "Microgaming", players: "310", colorSeed: 180 },
  { id: 9, name: "Cash or Crash", category: "Arcade", provider: "Evolution", players: "550", colorSeed: 90 },
  { id: 10, name: "Gonzo's Treasure", category: "Action", provider: "NetEnt", players: "720", colorSeed: 240 },
  { id: 11, name: "Gold Vault Roulette", category: "Arcade", provider: "Evolution", players: "1.8K", colorSeed: 60 },
  { id: 12, name: "Sudoku", category: "Puzzle", provider: "InHouse", players: "120", colorSeed: 150 },
];

function hue(seed: number) { return seed % 360; }

export default function OtherGamesPage() {
  const [cat, setCat] = useState("All");

  const filtered = cat === "All" ? GAMES : GAMES.filter((g) => g.category === cat);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Other Games</h1>
        <p className={styles.pageCount}>{filtered.length} games</p>
      </div>

      <nav className={styles.tabs} aria-label="Game categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`${styles.tab} ${cat === c ? styles.tabActive : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </nav>

      <ul className={styles.grid} aria-label="Other games">
        {filtered.map((g) => {
          const h = hue(g.colorSeed);
          const grad = `linear-gradient(135deg,hsl(${h},55%,18%) 0%,hsl(${(h+50)%360},65%,28%) 50%,hsl(${(h+100)%360},45%,14%) 100%)`;
          return (
            <li key={g.id} className={styles.item}>
              <a href="#" className={styles.link}>
                <div className={styles.thumb} style={{ background: grad }} aria-hidden="true">
                  <span className={styles.thumbLabel}>{g.name}</span>
                </div>
                <div className={styles.overlay} aria-hidden="true">
                  <div className={styles.playBtn}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className={styles.provider}>{g.provider}</span>
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{g.name}</p>
                  <p className={styles.players}>{g.players} playing</p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
