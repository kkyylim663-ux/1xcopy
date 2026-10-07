"use client";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import GameCard from "@/components/sites/slots-ref/ui/GameCard";
import GameRow from "@/components/sites/slots-ref/ui/GameRow";
import SearchInput from "@/components/sites/slots-ref/ui/SearchInput";
import ProviderSlider from "@/components/sites/slots-ref/ui/ProviderSlider";
import SlotsSidebar from "@/components/sites/slots-ref/sections/SlotsSidebar";
import HeroBanner from "@/components/sites/slots-ref/sections/HeroBanner";
import { GAMES, CATEGORIES } from "@/data/games";
import styles from "./page.module.css";

function SlotsContent() {
  const params = useParams();
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab ?? "";

  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("All Providers");
  const [sidebarCat, setSidebarCat] = useState("All Games");
  const [showMore, setShowMore] = useState(false);

  const PAGE_SIZE = 30;

  const isAllTab = !tab || tab === "";

  const filtered = useMemo(() => {
    let games = [...GAMES];
    if (tab === "new") games = games.filter((g) => g.badge === "new" || g.badge === "hot");
    else if (tab === "popular") games = games.filter((_, i) => i % 3 !== 2);
    else if (tab === "recommended") games = games.filter((_, i) => i % 4 !== 1);
    else if (tab === "quick-play") games = games.filter((g) => g.rtp && parseFloat(g.rtp) > 95);

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
  }, [tab, provider, search]);

  const visible = showMore ? filtered : filtered.slice(0, PAGE_SIZE);
  const activeTab = CATEGORIES.find((c) => c.slug === tab)?.label ?? "All";

  // Derived game rows for "All" tab home view
  const popularGames = useMemo(() => GAMES.filter((g) => g.badge === "hot" || g.badge === "jackpot").slice(0, 12), []);
  const newGames = useMemo(() => GAMES.filter((g) => g.badge === "new").slice(0, 12), []);
  const jackpotGames = useMemo(() => GAMES.filter((g) => g.badge === "jackpot").slice(0, 10), []);
  const allGames = useMemo(() => GAMES.slice(0, 12), []);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <SlotsSidebar active={sidebarCat} onSelect={setSidebarCat} />

        <div className={styles.main}>
          {isAllTab && !search && <HeroBanner />}

          <nav className={styles.tabs} aria-label="Slots categories">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug ? `/en/slots/${cat.slug}` : "/en/slots"}
                className={`${styles.tab} ${activeTab === cat.label ? styles.tabActive : ""}`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* "All" tab: show sections + search bar */}
          {isAllTab && !search && provider === "All Providers" ? (
            <div className={styles.sections}>
              {popularGames.length > 0 && (
                <GameRow
                  title="🔥 Popular Games"
                  games={popularGames}
                  viewAllHref="/en/slots/popular"
                />
              )}
              {newGames.length > 0 && (
                <GameRow
                  title="🆕 New Games"
                  games={newGames}
                  viewAllHref="/en/slots/new"
                />
              )}
              {jackpotGames.length > 0 && (
                <GameRow
                  title="🏆 Jackpot"
                  games={jackpotGames}
                  viewAllHref="/en/slots"
                />
              )}
              <GameRow
                title="⭐ Recommended"
                games={allGames}
                viewAllHref="/en/slots/recommended"
              />

              {/* Search toolbar for "All" tab */}
              <div className={styles.allToolbar}>
                <div className={styles.allToolbarInner}>
                  <span className={styles.allToolbarTitle}>All Games ({GAMES.length})</span>
                  <SearchInput value={search} onChange={setSearch} />
                  <ProviderSlider active={provider} onSelect={setProvider} />
                </div>
              </div>

              <ul className={styles.grid} aria-label="All games">
                {GAMES.slice(0, PAGE_SIZE).map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </ul>

              {GAMES.length > PAGE_SIZE && (
                <div className={styles.loadMore}>
                  <Link href="/en/slots/popular" className={styles.loadMoreBtn}>
                    Show More Games →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            /* Filtered view (specific tab, search, or provider) */
            <>
              <div className={styles.toolbar}>
                <SearchInput value={search} onChange={setSearch} />
                <ProviderSlider active={provider} onSelect={setProvider} />
              </div>

              <div className={styles.tabHeader}>
                <span className={styles.tabTitle}>{activeTab}</span>
                <span className={styles.pageCount}>{filtered.length} games</span>
              </div>

              {visible.length > 0 ? (
                <>
                  <ul className={styles.grid} aria-label="Game list">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SlotsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 32, color: "#aaa" }}>Loading…</div>}>
      <SlotsContent />
    </Suspense>
  );
}
