"use client";
import { useMemo, useState } from "react";
import GameCard from "../ui/GameCard";
import GameRow from "../ui/GameRow";
import SearchInput from "../ui/SearchInput";
import ProviderSlider from "../ui/ProviderSlider";
import HeroBanner, { type HeroBannerItem } from "./HeroBanner";
import { GAMES } from "@/data/games";
import styles from "./GameLobby.module.css";

interface GameLobbyProps {
  title: string;
  banners: HeroBannerItem[];
  /** 从 GAMES 的哪个位置开始取，让不同页面展示不同游戏 */
  offset: number;
  count?: number;
  /** 横向行的标题 */
  rowTitles?: [string, string];
}

const TABS = ["All", "Popular", "New", "Top RTP"] as const;
type Tab = (typeof TABS)[number];
const PAGE_SIZE = 24;

export default function GameLobby({
  title,
  banners,
  offset,
  count = 48,
  rowTitles = ["Popular", "New"],
}: GameLobbyProps) {
  const [tab, setTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("All Providers");
  const [showAll, setShowAll] = useState(false);

  const pool = useMemo(
    () => Array.from({ length: Math.min(count, GAMES.length) }, (_, i) => GAMES[(offset + i) % GAMES.length]),
    [offset, count]
  );

  const filtered = useMemo(() => {
    let list = pool;
    if (tab === "Popular") list = list.filter((g) => g.badge === "hot" || g.badge === "jackpot" || g.rtp === "95.5%");
    else if (tab === "New") list = list.filter((g) => g.badge === "new");
    else if (tab === "Top RTP") list = [...list].sort((a, b) => parseFloat(b.rtp ?? "0") - parseFloat(a.rtp ?? "0"));
    if (provider !== "All Providers") list = list.filter((g) => g.provider === provider);
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((g) => g.name.toLowerCase().includes(q) || (g.provider ?? "").toLowerCase().includes(q));
    return list;
  }, [pool, tab, provider, search]);

  const isHome = tab === "All" && !search && provider === "All Providers";
  const rowA = useMemo(() => pool.filter((g) => g.badge === "hot" || g.badge === "jackpot").slice(0, 12), [pool]);
  const rowB = useMemo(() => pool.filter((g) => g.badge === "new").slice(0, 12), [pool]);
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <span className={styles.pageCount}>{pool.length} games</span>
      </div>

      {isHome && <HeroBanner banners={banners} />}

      <nav className={styles.tabs} aria-label={`${title} categories`}>
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
            onClick={() => {
              setTab(t);
              setShowAll(false);
            }}
          >
            {t}
          </button>
        ))}
      </nav>

      <div className={styles.toolbar}>
        <SearchInput value={search} onChange={setSearch} />
        <ProviderSlider active={provider} onSelect={setProvider} />
      </div>

      {isHome && rowA.length > 0 && <GameRow title={rowTitles[0]} games={rowA} />}
      {isHome && rowB.length > 0 && <GameRow title={rowTitles[1]} games={rowB} />}

      {isHome && <h2 className={styles.gridTitle}>All {title}</h2>}

      {visible.length > 0 ? (
        <>
          <ul className={styles.grid} aria-label={`${title} list`}>
            {visible.map((g) => (
              <GameCard key={g.id} {...g} />
            ))}
          </ul>
          {!showAll && filtered.length > PAGE_SIZE && (
            <div className={styles.loadMore}>
              <button type="button" className={styles.loadMoreBtn} onClick={() => setShowAll(true)}>
                Show More ({filtered.length - PAGE_SIZE})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={styles.empty}>
          <p>No games found.</p>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={() => {
              setSearch("");
              setProvider("All Providers");
              setTab("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
