"use client";
import { useState, useMemo } from "react";
import GameCard from "@/components/sites/slots-ref/ui/GameCard";
import SearchInput from "@/components/sites/slots-ref/ui/SearchInput";
import ProviderSlider from "@/components/sites/slots-ref/ui/ProviderSlider";
import { GAMES } from "@/data/games";
import styles from "./page.module.css";

const CASINO_CATEGORIES = [
  { label: "All Games", slug: "" },
  { label: "Live Dealer", slug: "live-dealer" },
  { label: "Slots", slug: "slots" },
  { label: "Table Games", slug: "table-games" },
  { label: "Roulette", slug: "roulette" },
  { label: "Blackjack", slug: "blackjack" },
];

function filterByCategory(games: typeof GAMES, slug: string) {
  if (!slug) return games;
  if (slug === "live-dealer") return games.filter((_, i) => i % 5 === 0 || i % 7 === 0);
  if (slug === "slots") return games.filter((_, i) => i % 3 !== 0);
  if (slug === "table-games") return games.filter((_, i) => i % 4 === 0 || i % 6 === 0);
  if (slug === "roulette") return games.filter((g) => g.name.toLowerCase().includes("roulette") || g.slug.includes("roulette") || Math.abs(g.colorSeed ?? 0) % 8 === 0);
  if (slug === "blackjack") return games.filter((g) => g.name.toLowerCase().includes("blackjack") || g.slug.includes("blackjack") || Math.abs(g.colorSeed ?? 0) % 9 === 0);
  return games;
}

const PAGE_SIZE = 30;

function CasinoContent() {
  const [activeTab, setActiveTab] = useState("");
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("All Providers");
  const [showMore, setShowMore] = useState(false);

  const filtered = useMemo(() => {
    let games = filterByCategory([...GAMES], activeTab);

    if (provider !== "All Providers") {
      games = games.filter((g) => g.provider === provider);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      games = games.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.slug.includes(q) ||
          (g.provider?.toLowerCase().includes(q) ?? false)
      );
    }
    return games;
  }, [activeTab, provider, search]);

  const visible = showMore ? filtered : filtered.slice(0, PAGE_SIZE);

  function handleTabChange(slug: string) {
    setActiveTab(slug);
    setShowMore(false);
    setSearch("");
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Casino</h1>
        <p className={styles.pageCount}>{filtered.length} games</p>
      </div>

      <nav className={styles.tabs} aria-label="Casino categories">
        {CASINO_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            className={`${styles.tab} ${activeTab === cat.slug ? styles.tabActive : ""}`}
            onClick={() => handleTabChange(cat.slug)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className={styles.toolbar}>
        <SearchInput value={search} onChange={setSearch} />
        <ProviderSlider active={provider} onSelect={setProvider} />
      </div>

      {visible.length > 0 ? (
        <>
          <ul className={styles.grid} aria-label="Casino game list">
            {visible.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </ul>

          {!showMore && filtered.length > PAGE_SIZE && (
            <div className={styles.loadMore}>
              <button
                className={styles.loadMoreBtn}
                type="button"
                onClick={() => setShowMore(true)}
              >
                Show More ({filtered.length - PAGE_SIZE} more)
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty}>
          <p>No games found{search ? ` for "${search}"` : ""}.</p>
          {search && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function CasinoPage() {
  return <CasinoContent />;
}
