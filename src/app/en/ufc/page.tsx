"use client";
import styles from "./page.module.css";

const EVENTS = [
  {
    id: 1,
    event: "UFC 310",
    date: "Dec 7, 2024",
    venue: "T-Mobile Arena, Las Vegas",
    mainCard: [
      { home: "Jon Jones", away: "Stipe Miocic", belt: "HW Championship", odds: { h: "1.30", d: "-", a: "3.80" } },
      { home: "Shavkat Rakhimov", away: "Ilia Topuria", belt: "FW Championship", odds: { h: "2.50", d: "-", a: "1.65" } },
    ],
    prelims: [
      { home: "Brandon Moreno", away: "Amir Albazi", belt: "FL Main Event", odds: { h: "1.75", d: "-", a: "2.25" } },
      { home: "Mackenzie Dern", away: "Loopy Godinez", belt: "WSW Co-Main", odds: { h: "1.55", d: "-", a: "2.80" } },
      { home: "Michel Pereira", away: "Ihor Potieria", belt: "LHW Prelim", odds: { h: "1.90", d: "-", a: "2.10" } },
    ],
  },
  {
    id: 2,
    event: "UFC Fight Night",
    date: "Dec 14, 2024",
    venue: "UFC Apex, Las Vegas",
    mainCard: [
      { home: "Sergei Pavlovich", away: "Ciryl Gane", belt: "HW Main Event", odds: { h: "2.10", d: "-", a: "1.85" } },
      { home: "Sodiq Yusuff", away: "Arnold Allen", belt: "FW Co-Main", odds: { h: "1.80", d: "-", a: "2.15" } },
    ],
    prelims: [
      { home: "Tabatha Ricci", away: "Luana Pinheiro", belt: "WSW Prelim", odds: { h: "1.65", d: "-", a: "2.50" } },
      { home: "Mateusz Gamrot", away: "Benoît Saint Denis", belt: "LW Prelim", odds: { h: "1.70", d: "-", a: "2.35" } },
      { home: "Josh Fremd", away: "Chris Curtis", belt: "MW Prelim", odds: { h: "2.30", d: "-", a: "1.75" } },
    ],
  },
];

export default function UFCPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.ufcBadge}>UFC</div>
        <div>
          <h1 className={styles.pageTitle}>UFC Betting</h1>
          <p className={styles.pageSubtitle}>Ultimate Fighting Championship · Mixed Martial Arts</p>
        </div>
      </div>

      {EVENTS.map((event) => (
        <div key={event.id} className={styles.eventBlock}>
          <div className={styles.eventHeader}>
            <div>
              <h2 className={styles.eventName}>{event.event}</h2>
              <div className={styles.eventMeta}>
                <span>📅 {event.date}</span>
                <span>·</span>
                <span>📍 {event.venue}</span>
              </div>
            </div>
            <a href="#" className={styles.viewBtn}>View All Bets</a>
          </div>

          <h3 className={styles.cardTitle}>Main Card</h3>
          <div className={styles.fights}>
            {event.mainCard.map((fight, i) => (
              <div key={i} className={styles.fightCard}>
                <div className={styles.fightBelt}>{fight.belt}</div>
                <div className={styles.fighters}>
                  <div className={styles.fighter}>
                    <div className={styles.fighterAvatar} aria-hidden="true" />
                    <span className={styles.fighterName}>{fight.home}</span>
                  </div>
                  <div className={styles.fightVs}>VS</div>
                  <div className={`${styles.fighter} ${styles.fighterRight}`}>
                    <div className={styles.fighterAvatar} aria-hidden="true" />
                    <span className={styles.fighterName}>{fight.away}</span>
                  </div>
                </div>
                <div className={styles.fightOdds}>
                  <a href="#" className={styles.oddBtn}>
                    <span className={styles.oddFighter}>{fight.home.split(" ").pop()}</span>
                    <span className={styles.oddVal}>{fight.odds.h}</span>
                  </a>
                  <a href="#" className={styles.oddBtn}>
                    <span className={styles.oddFighter}>{fight.away.split(" ").pop()}</span>
                    <span className={styles.oddVal}>{fight.odds.a}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <h3 className={styles.cardTitle}>Preliminary Card</h3>
          <div className={styles.prelims}>
            {event.prelims.map((fight, i) => (
              <div key={i} className={styles.prelimRow}>
                <span className={styles.prelimBelt}>{fight.belt}</span>
                <span className={styles.prelimHome}>{fight.home}</span>
                <div className={styles.prelimOdds}>
                  <a href="#" className={styles.prelimOddBtn}>{fight.odds.h}</a>
                  <span className={styles.prelimVs}>VS</span>
                  <a href="#" className={styles.prelimOddBtn}>{fight.odds.a}</a>
                </div>
                <span className={styles.prelimAway}>{fight.away}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
