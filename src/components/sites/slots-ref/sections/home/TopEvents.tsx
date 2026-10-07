import Link from "next/link";
import type { HomeEvent } from "@/data/home";
import styles from "./TopEvents.module.css";

interface Props {
  events: HomeEvent[];
}

function OddsBtn({ value, label }: { value: string; label: string }) {
  return (
    <button type="button" className={styles.oddsBtn} aria-label={label}>
      <span className={styles.oddsBtnLabel}>{label}</span>
      <span className={styles.oddsBtnValue}>{value}</span>
    </button>
  );
}

function EventCard({ event }: { event: HomeEvent }) {
  const hasDraw = event.odds.draw !== undefined;
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.sport}>{event.sport}</span>
        <span className={styles.tournament}>{event.tournament}</span>
        {event.live && <span className={styles.liveBadge}>LIVE</span>}
      </div>
      <Link href={event.href} className={styles.matchRow}>
        <div className={styles.teams}>
          <span className={styles.team}>{event.teamA.name}</span>
          {event.teamA.score !== undefined && <span className={styles.score}>{event.teamA.score}</span>}
          <span className={styles.vs}>–</span>
          {event.teamB.score !== undefined && <span className={styles.score}>{event.teamB.score}</span>}
          <span className={styles.team}>{event.teamB.name}</span>
        </div>
      </Link>
      <div className={styles.oddsRow}>
        <OddsBtn value={event.odds.w1} label="1" />
        {hasDraw && <OddsBtn value={event.odds.draw!} label="X" />}
        <OddsBtn value={event.odds.w2} label="2" />
        <button type="button" className={styles.moreOdds} aria-label="More odds">+</button>
      </div>
    </div>
  );
}

export default function TopEvents({ events }: Props) {
  const row1 = events.slice(0, 5);
  const row2 = events.slice(5);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>TOP EVENTS</h2>
        <Link href="/en/line" className={styles.seeAll}>See all</Link>
      </div>
      <div className={styles.track}>
        {row1.map((ev) => <EventCard key={ev.id} event={ev} />)}
      </div>
      {row2.length > 0 && (
        <div className={styles.track}>
          {row2.map((ev) => <EventCard key={ev.id} event={ev} />)}
        </div>
      )}
    </section>
  );
}
