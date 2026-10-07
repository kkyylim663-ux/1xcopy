import Link from "next/link";
import type { HomeGame } from "@/data/home";
import styles from "./GamesShowcase.module.css";

interface Props {
  games: HomeGame[];
}

export default function GamesShowcase({ games }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.left}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.welcomeTitle}>WELCOME TO</h2>
          <h2 className={styles.welcomeBrand}>SLOTSHUB</h2>
          <p className={styles.welcomeDesc}>
            Play the best online slots, live casino games, and more. Register
            now and claim your welcome bonus!
          </p>
          <Link href="/en/games" className={styles.goSection}>GO TO SECTION</Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button type="button" className={`${styles.tabBtn} ${styles.tabActive}`}>All Games</button>
            <button type="button" className={styles.tabBtn}>For you</button>
            <button type="button" className={styles.tabBtn}>Best</button>
            <button type="button" className={styles.tabBtn}>Slots</button>
          </div>
        </div>
        <div className={styles.grid}>
          {games.map((g) => (
            <Link
              key={g.id}
              href={`/en/games`}
              className={styles.gameCard}
              style={{ background: `hsl(${g.hue}, 55%, 22%)` }}
            >
              <div className={styles.gameThumb}
                style={{ background: `linear-gradient(135deg, hsl(${g.hue}, 65%, 30%), hsl(${g.hue + 30}, 65%, 18%))` }}
              />
              <div className={styles.gameInfo}>
                <span className={styles.gameName}>{g.name}</span>
                <span className={styles.gameProvider}>{g.provider}</span>
              </div>
              <div className={styles.gameHover}>
                <button type="button" className={styles.playBtn}>PLAY</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
