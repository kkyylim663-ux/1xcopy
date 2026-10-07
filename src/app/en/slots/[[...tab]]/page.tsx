"use client";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import GameCard from "@/components/sites/slots-ref/ui/GameCard";
import SlotsSidebar from "@/components/sites/slots-ref/sections/SlotsSidebar";
import { GAMES } from "@/data/games";
import styles from "./page.module.css";

const TABS = [
  { slug: "", label: "Best Games In Malaysia", icon: "my" },
  { slug: "popular", label: "Popular", icon: "heart" },
  { slug: "recommended", label: "Recommended", icon: "gear" },
  { slug: "quick-play", label: "Quick Play", icon: "bolt" },
  { slug: "new", label: "New", icon: "star" },
  { slug: "exclusive", label: "Exclusive", icon: "crown" },
];

function TabIcon({ type }: { type: string }) {
  if (type === "my") return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="https://flagcdn.com/16x12/my.png" width="16" height="12" alt="MY" style={{ borderRadius: 1 }} />
  );
  if (type === "heart") return (
    <svg viewBox="0 0 16 14" fill="currentColor" width="14" height="13">
      <path d="M8 13C8 13 1 8.5 1 4.5C1 2.5 2.5 1 4.5 1C6 1 7.2 1.9 8 3.1C8.8 1.9 10 1 11.5 1C13.5 1 15 2.5 15 4.5C15 8.5 8 13 8 13Z"/>
    </svg>
  );
  if (type === "gear") return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 1V3M8 13V15M1 8H3M13 8H15M3.1 3.1L4.5 4.5M11.5 11.5L12.9 12.9M3.1 12.9L4.5 11.5M11.5 4.5L12.9 3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
  if (type === "bolt") return (
    <svg viewBox="0 0 12 18" fill="currentColor" width="10" height="16">
      <path d="M7 1L1 10H6L5 17L11 8H6L7 1Z"/>
    </svg>
  );
  if (type === "star") return (
    <svg viewBox="0 0 16 15" fill="currentColor" width="14" height="13">
      <path d="M8 1L10 5.5H15L11 8.5L12.5 13L8 10L3.5 13L5 8.5L1 5.5H6L8 1Z"/>
    </svg>
  );
  if (type === "crown") return (
    <svg viewBox="0 0 16 14" fill="currentColor" width="14" height="12">
      <path d="M1 12H15V14H1V12ZM1 10L3 4L6 7L8 1L10 7L13 4L15 10H1Z"/>
    </svg>
  );
  return null;
}

function SlotsContent() {
  const params = useParams();
  const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab ?? "";

  const [search, setSearch] = useState("");
  const [activeProvider, setActiveProvider] = useState("all");
  const [showMore, setShowMore] = useState(false);

  const PAGE_SIZE = 24;

  const filtered = useMemo(() => {
    let games = [...GAMES];
    if (tab === "new") games = games.filter((g) => g.badge === "new" || g.badge === "hot");
    else if (tab === "popular") games = games.filter((_, i) => i % 3 !== 2);
    else if (tab === "recommended") games = games.filter((_, i) => i % 4 !== 1);
    else if (tab === "quick-play") games = games.filter((g) => g.rtp && parseFloat(g.rtp) > 95);
    else if (tab === "exclusive") games = games.filter((_, i) => i % 5 === 0);

    if (activeProvider !== "all") {
      games = games.filter((g) => g.provider?.toLowerCase().replace(/\s/g, "") === activeProvider);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      games = games.filter(
        (g) => g.name.toLowerCase().includes(q) || (g.provider?.toLowerCase().includes(q) ?? false)
      );
    }
    return games;
  }, [tab, activeProvider, search]);

  const visible = showMore ? filtered : filtered.slice(0, PAGE_SIZE);
  const activeTab = TABS.find((t) => t.slug === tab) ?? TABS[0];

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/en" className={styles.breadHome}>
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M2 7L8 2L14 7V14H10V10H6V14H2V7Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </Link>
        <span className={styles.breadSep}>/</span>
        <span className={styles.breadCurrent}>Slots</span>
      </div>

      <div className={styles.layout}>
        {/* LEFT SIDEBAR */}
        <SlotsSidebar
          activeProvider={activeProvider}
          onProviderSelect={(id) => { setActiveProvider(id); setShowMore(false); }}
        />

        {/* MAIN */}
        <div className={styles.main}>
          {/* Page title */}
          <h1 className={styles.pageTitle}>SLOTS</h1>

          {/* Hero banner placeholder */}
          <div className={styles.heroBanner}>
            <div className={styles.heroBannerContent}>
              <h2 className={styles.heroBannerTitle}>WEEKEND BOOSTER</h2>
              <p className={styles.heroBannerDesc}>Make a deposit every Friday and get a bonus credited to your account!</p>
              <button type="button" className={styles.heroBannerBtn}>FIND OUT MORE</button>
            </div>
            <div className={styles.heroBannerDots}>
              {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                <span key={i} className={`${styles.heroDot} ${i === 7 ? styles.heroDotActive : ""}`} />
              ))}
            </div>
          </div>

          {/* Tab bar */}
          <nav className={styles.tabs}>
            {TABS.map((t) => (
              <Link
                key={t.slug}
                href={t.slug ? `/en/slots/${t.slug}` : "/en/slots"}
                className={`${styles.tab} ${activeTab.slug === t.slug ? styles.tabActive : ""}`}
                onClick={() => { setSearch(""); setShowMore(false); }}
              >
                <span className={styles.tabIconWrap}>
                  <TabIcon type={t.icon} />
                </span>
                {t.label}
              </Link>
            ))}
          </nav>

          {/* Search bar */}
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14" className={styles.searchIcon}>
                <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
                value={search}
                onChange={e => { setSearch(e.target.value); setShowMore(false); }}
              />
            </div>
          </div>

          {/* Game grid */}
          {visible.length > 0 ? (
            <>
              <ul className={styles.grid}>
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
                <button type="button" className={styles.clearBtn} onClick={() => setSearch("")}>
                  Clear search
                </button>
              )}
            </div>
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
