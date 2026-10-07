"use client";
import styles from "./SearchInput.module.css";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search games…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={styles.wrap}>
      <svg
        className={styles.icon}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        width="16"
        height="16"
      >
        <circle cx="7" cy="7" r="5" />
        <path d="M11 11l3 3" strokeLinecap="round" />
      </svg>
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange("")}
          type="button"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
