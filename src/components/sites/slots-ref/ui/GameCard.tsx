import Link from "next/link";
import styles from "./GameCard.module.css";

export interface GameCardProps {
  id: string | number;
  slug: string;
  name: string;
  provider?: string;
  /** gradient seed for placeholder (0-360) */
  colorSeed?: number;
  badge?: "new" | "hot" | "jackpot";
  rtp?: string;
  /** extra class on the outer <li> — used by GameRow for slide width */
  itemClassName?: string;
}

function hueFromSeed(seed: number) {
  return seed % 360;
}

export default function GameCard({
  id,
  slug,
  name,
  provider,
  colorSeed = 0,
  badge,
  rtp,
  itemClassName,
}: GameCardProps) {
  const hue = hueFromSeed(colorSeed);
  const gradientStyle = {
    background: `linear-gradient(135deg,
      hsl(${hue},60%,20%) 0%,
      hsl(${(hue + 40) % 360},70%,30%) 50%,
      hsl(${(hue + 80) % 360},50%,15%) 100%)`,
  };

  return (
    <li className={`${styles.item}${itemClassName ? ` ${itemClassName}` : ""}`}>
      <Link href={`/en/slots/game/${id}/${slug}`} className={styles.link}>
        <div className={styles.card}>
          {/* Placeholder thumbnail */}
          <div className={styles.thumb} style={gradientStyle} aria-hidden="true">
            <span className={styles.thumbLabel}>{name}</span>
          </div>

          {/* Hover overlay */}
          <div className={styles.overlay} aria-hidden="true">
            <div className={styles.playBtn}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {provider && <span className={styles.providerLabel}>{provider}</span>}
          </div>

          {/* Badge */}
          {badge && (
            <span className={`${styles.badge} ${styles[`badge--${badge}`]}`}>
              {badge}
            </span>
          )}

          {/* RTP */}
          {rtp && <span className={styles.rtp}>RTP {rtp}</span>}
        </div>

        <div className={styles.nameRow}>
          {provider && (
            <span className={styles.providerDot} title={provider}>
              {provider.slice(0, 2)}
            </span>
          )}
          <p className={styles.name}>{name}</p>
        </div>
      </Link>
    </li>
  );
}
