"use client";
import { useState } from "react";
import styles from "./SlotsSidebar.module.css";

const PROVIDERS = [
  { id: "all", name: "All", logo: null },
  { id: "winfinity", name: "Winfinity", logo: "WINFINITY" },
  { id: "mancala", name: "Mancala Gaming", logo: "MANCALA" },
  { id: "evolution", name: "Evolution", logo: "EVOLUTION" },
  { id: "aviatrix", name: "Aviatrix", logo: "AVIATRIX" },
  { id: "spinomenal", name: "Spinomenal", logo: "SPINOMENAL" },
  { id: "pragmatic", name: "Pragmatic Play", logo: "PRAGMATIC" },
  { id: "netent", name: "NetEnt", logo: "NETENT" },
  { id: "betsoft", name: "Betsoft", logo: "BETSOFT" },
  { id: "playtech", name: "Playtech", logo: "PLAYTECH" },
  { id: "microgaming", name: "Microgaming", logo: "MICROGAMING" },
  { id: "habanero", name: "Habanero", logo: "HABANERO" },
];

interface SlotsSidebarProps {
  activeProvider?: string;
  onProviderSelect?: (id: string) => void;
}

export default function SlotsSidebar({
  activeProvider = "all",
  onProviderSelect,
}: SlotsSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [providerSearch, setProviderSearch] = useState("");
  const [providersOpen, setProvidersOpen] = useState(true);

  const filteredProviders = PROVIDERS.filter(p =>
    p.name.toLowerCase().includes(providerSearch.toLowerCase())
  );

  if (collapsed) {
    return (
      <aside className={`${styles.aside} ${styles.asideCollapsed}`}>
        <button
          type="button"
          className={styles.expandBtn}
          onClick={() => setCollapsed(false)}
          title="Expand sidebar"
        >
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </aside>
    );
  }

  return (
    <aside className={styles.aside}>
      {/* Collapse button */}
      <button
        type="button"
        className={styles.collapseBtn}
        onClick={() => setCollapsed(true)}
      >
        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
          <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        COLLAPSE
      </button>

      {/* 2×2 Quick nav */}
      <div className={styles.quickNav}>
        <button type="button" className={styles.quickBtn}>
          <span className={styles.quickIcon}>
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <path d="M12 21C12 21 3 14.5 3 8.5C3 5.4 5.4 3 8.5 3C10.1 3 11.5 3.8 12 5C12.5 3.8 13.9 3 15.5 3C18.6 3 21 5.4 21 8.5C21 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
            </svg>
          </span>
          <span className={styles.quickLabel}>MY CASINO</span>
        </button>
        <button type="button" className={styles.quickBtn}>
          <span className={styles.quickIcon}>
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <rect x="3" y="3" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.8"/>
              <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
          </span>
          <span className={styles.quickLabel}>CATEGORIES</span>
        </button>
        <button type="button" className={styles.quickBtn}>
          <span className={styles.quickIcon}>
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <path d="M12 2C10 6 6 8 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 8 14 6 12 2Z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <path d="M9 15C9 17 10.3 19 12 20C13.7 19 15 17 15 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </span>
          <span className={styles.quickLabel}>PROMO</span>
        </button>
        <button type="button" className={styles.quickBtn}>
          <span className={styles.quickIcon}>
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <path d="M8 3H16L18 8H6L8 3Z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <path d="M6 8C6 11.3 8.7 14 12 14C15.3 14 18 11.3 18 8" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <path d="M12 14V19M8 21H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <span className={styles.quickLabel}>TOURNAMENTS</span>
        </button>
      </div>

      {/* Clear filter */}
      <button type="button" className={styles.clearFilterBtn} onClick={() => onProviderSelect?.("all")}>
        <svg viewBox="0 0 18 18" fill="none" width="14" height="14">
          <path d="M2 4H16M6 9H12M9 14H9.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M1 2L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
        CLEAR FILTER
      </button>

      {/* Providers section */}
      <div className={styles.providersSection}>
        <div className={styles.providersHeader}>
          <div className={styles.providersHeaderLeft}>
            <svg viewBox="0 0 18 18" fill="none" width="14" height="14">
              <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="11" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="1" y="11" width="6" height="6" rx="1" fill="currentColor" opacity="0.7"/>
              <rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor" opacity="0.7"/>
            </svg>
            <span className={styles.providersTitle}>PROVIDERS</span>
          </div>
          <div className={styles.providersHeaderRight}>
            <button type="button" className={styles.providerAllBtn} onClick={() => onProviderSelect?.("all")}>
              ALL
            </button>
            <button type="button" className={styles.providersToggle} onClick={() => setProvidersOpen(v => !v)}>
              <svg viewBox="0 0 12 8" fill="none" width="12" height="8"
                style={{ transform: providersOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                <path d="M1 7L6 2L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {providersOpen && (
          <>
            {/* Provider search */}
            <div className={styles.providerSearch}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14" className={styles.searchIcon}>
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                className={styles.providerSearchInput}
                placeholder="Search"
                value={providerSearch}
                onChange={e => setProviderSearch(e.target.value)}
              />
            </div>

            {/* Provider grid */}
            <div className={styles.providerGrid}>
              {filteredProviders.map(p => (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.providerBtn} ${activeProvider === p.id ? styles.providerBtnActive : ""}`}
                  onClick={() => onProviderSelect?.(p.id)}
                  title={p.name}
                >
                  {p.id === "all" ? (
                    <span className={styles.providerLogoAll}>
                      <svg viewBox="0 0 32 20" fill="none" width="40" height="22">
                        <path d="M8 10C8 7 10 4 13 4C15 4 17 5.5 18 7.5C17 4 19 1 22 1C25.3 1 28 3.7 28 7C28 13 22 17 18 19C14 17 8 13 8 10Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <circle cx="8" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <text x="16" y="14" fontSize="7" fill="currentColor" textAnchor="middle" fontWeight="600">All</text>
                      </svg>
                    </span>
                  ) : (
                    <span className={styles.providerLogoText}>{p.logo}</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
