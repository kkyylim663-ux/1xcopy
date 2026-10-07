import Link from "next/link";
import type { HomeEvent } from "@/data/home";
import styles from "./CyberShowcase.module.css";

interface Props {
  events: HomeEvent[];
}

function EsportsCard({ event }: { event: HomeEvent }) {
  return (
    <Link href={event.href} className={styles.card}>
      <div className={styles.cardBg} />
      <div className={styles.cardContent}>
        <div className={styles.cardHead}>
          <span className={styles.sport}>{event.sport}</span>
          <span className={styles.tournament}>{event.tournament}</span>
          {event.live && <span className={styles.liveBadge}>LIVE</span>}
        </div>
        <div className={styles.matchRow}>
          <div className={styles.teamBlock}>
            <div className={styles.teamLogo}>{event.teamA.name.slice(0, 1)}</div>
            <span className={styles.teamName}>{event.teamA.name}</span>
            {event.teamA.score !== undefined && <span className={styles.score}>{event.teamA.score}</span>}
          </div>
          <span className={styles.vs}>VS</span>
          <div className={styles.teamBlock}>
            <div className={styles.teamLogo}>{event.teamB.name.slice(0, 1)}</div>
            <span className={styles.teamName}>{event.teamB.name}</span>
            {event.teamB.score !== undefined && <span className={styles.score}>{event.teamB.score}</span>}
          </div>
        </div>
        <div className={styles.oddsRow}>
          <button type="button" className={styles.oddsBtn}><span>1</span><strong>{event.odds.w1}</strong></button>
          <button type="button" className={styles.oddsBtn}><span>2</span><strong>{event.odds.w2}</strong></button>
        </div>
      </div>
    </Link>
  );
}

export default function CyberShowcase({ events }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>ESPORTS</h2>
        <Link href="/en/esports" className={styles.seeAll}>See all</Link>
      </div>
      <div className={styles.track}>
        {events.map((ev) => <EsportsCard key={ev.id} event={ev} />)}
      </div>
    </section>
  );
}
