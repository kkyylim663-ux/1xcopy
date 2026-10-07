"use client";
import styles from "./SlotsSidebar.module.css";

const SIDEBAR_ITEMS = [
  { icon: "🎰", label: "All Games" },
  { icon: "🔥", label: "Popular" },
  { icon: "⭐", label: "Recommended" },
  { icon: "🆕", label: "New" },
  { icon: "⚡", label: "Quick Play" },
  { icon: "🏆", label: "Jackpot" },
  { icon: "💎", label: "Live Casino" },
  { icon: "🎴", label: "Table Games" },
  { icon: "🎱", label: "Crash Games" },
  { icon: "🃏", label: "Card Games" },
  { icon: "🎲", label: "Dice Games" },
  { icon: "💰", label: "Bonus Buy" },
];

export default function SlotsSidebar({
  active = "All Games",
  onSelect,
}: {
  active?: string;
  onSelect?: (label: string) => void;
}) {
  return (
    <aside className={styles.aside} aria-label="Game categories">
      {SIDEBAR_ITEMS.map((item) => (
        <button
          key={item.label}
          className={`${styles.btn} ${active === item.label ? styles.active : ""}`}
          onClick={() => onSelect?.(item.label)}
          type="button"
        >
          <span className={styles.ico} aria-hidden="true">{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </aside>
  );
}
