"use client";
import styles from "./MatchCard.module.css";

export interface MatchCardProps {
  home: string;
  away: string;
  league: string;
  time: string;
  odds: { h: string; d: string; a: string };
  live?: boolean;
}

export default function MatchCard({ home, away, league, time, odds, live }: MatchCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.league}>{league}</span>
        <span className={`${styles.time} ${live ? styles.timeLive : ""}`}>
          {live ? "● LIVE" : time}
        </span>
      </div>

      <div className={styles.teams}>
        <div className={styles.teamHome}>
          <div className={styles.teamCrest} aria-hidden="true" />
          <span className={styles.teamName}>{home}</span>
        </div>
        <div className={styles.vs}>VS</div>
        <div className={styles.teamAway}>
          <div className={styles.teamCrest} aria-hidden="true" />
          <span className={styles.teamName}>{away}</span>
        </div>
      </div>

      <div className={styles.odds}>
        <a href="#" className={styles.oddBtn}>
          <span className={styles.oddLabel}>1</span>
          <span className={styles.oddValue}>{odds.h}</span>
        </a>
        <a href="#" className={styles.oddBtn}>
          <span className={styles.oddLabel}>X</span>
          <span className={styles.oddValue}>{odds.d}</span>
        </a>
        <a href="#" className={styles.oddBtn}>
          <span className={styles.oddLabel}>2</span>
          <span className={styles.oddValue}>{odds.a}</span>
        </a>
      </div>
    </div>
  );
}
