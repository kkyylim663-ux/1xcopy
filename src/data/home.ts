// 首页数据 — 接后台时替换 fetch 调用，结构保持不变

export interface HomeBanner {
  id: number;
  tag?: string;
  title: string;
  subtitle: string;
  href: string;
  hue: number;
  accent: number;
}

export interface HomeProduct {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string;
}

export interface MatchTeam {
  name: string;
  score?: string;
}

export interface MatchOdds {
  w1: string;
  draw?: string;
  w2: string;
}

export interface HomeEvent {
  id: number;
  sport: string;
  tournament: string;
  live?: boolean;
  teamA: MatchTeam;
  teamB: MatchTeam;
  odds: MatchOdds;
  href: string;
}

export interface HomeBonusCard {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  hue: number;
}

export interface HomeGame {
  id: number;
  name: string;
  provider: string;
  hue: number;
}

// ── Mock 数据 ──────────────────────────────────────────────────────────────────

export const HOME_BANNERS: HomeBanner[] = [
  { id: 1, tag: "NEW", title: "FIRST DEPOSIT MEGABONUS", subtitle: "Welcome Package Up to 9888 MYR + 350 Free Spins", href: "/en/bonus/casino/promotions/slot_first_deposit", hue: 210, accent: 126 },
  { id: 2, tag: "SPORT", title: "SPORT SINGLE", subtitle: "100% up to 588 MYR – just 3 bets to the bonus!", href: "/en/bonus/rules/sport-single", hue: 240, accent: 180 },
  { id: 3, tag: "HOT", title: "WINNING FIVE", subtitle: "Place bets on Europe's top leagues, get up to 30% cashback", href: "/en/promotions/winning-five", hue: 180, accent: 60 },
  { id: 4, tag: "CASINO", title: "AVIATOR THURSDAY", subtitle: "Deposit every Thursday and get free spins", href: "/en/bonus/casino/promotions/aviator-thursday", hue: 20, accent: 200 },
  { id: 5, title: "LUCKY FRIDAY", subtitle: "Make a deposit and get a bonus every Friday", href: "/en/promotions/lucky-friday", hue: 270, accent: 90 },
  { id: 6, title: "HAPPY MONDAY", subtitle: "Get cashback every Monday!", href: "/en/bonus/rules/happy-monday", hue: 160, accent: 40 },
];

export const HOME_PRODUCTS: HomeProduct[] = [
  { id: "sports", label: "Sports", icon: "⚽", href: "/en/line" },
  { id: "live", label: "Live", icon: "📡", href: "/en/live", badge: "LIVE" },
  { id: "slots", label: "Slots", icon: "🎰", href: "/en/slots", badge: "HOT" },
  { id: "casino", label: "Live Casino", icon: "🎲", href: "/en/casino" },
  { id: "esports", label: "Esports", icon: "🎮", href: "/en/esports" },
  { id: "games", label: "1xGames", icon: "🕹️", href: "/en/games" },
  { id: "promo", label: "Promotions", icon: "🎁", href: "/en/bonus/rules" },
  { id: "toto", label: "Toto", icon: "🔢", href: "/en/lotto" },
  { id: "virtual", label: "Virtual Sports", icon: "🏆", href: "/en/virtualsports" },
];

export const HOME_EVENTS: HomeEvent[] = [
  { id: 1, sport: "Tennis", tournament: "ATP. Shanghai", live: true, teamA: { name: "Djokovic N.", score: "1" }, teamB: { name: "Alcaraz C.", score: "0" }, odds: { w1: "1.55", draw: undefined, w2: "2.30" }, href: "/en/live/tennis/5596-atp-shanghai" },
  { id: 2, sport: "Tennis", tournament: "WTA. Beijing", live: true, teamA: { name: "Swiatek I.", score: "0" }, teamB: { name: "Sabalenka A.", score: "1" }, odds: { w1: "1.90", draw: undefined, w2: "1.85" }, href: "/en/live/tennis/5063-wta-beijing" },
  { id: 3, sport: "Football", tournament: "La Liga", teamA: { name: "Barcelona" }, teamB: { name: "Real Madrid" }, odds: { w1: "2.10", draw: "3.40", w2: "3.10" }, href: "/en/line/football/123" },
  { id: 4, sport: "Football", tournament: "Premier League", teamA: { name: "Man City" }, teamB: { name: "Arsenal" }, odds: { w1: "1.75", draw: "3.60", w2: "4.50" }, href: "/en/line/football/456" },
  { id: 5, sport: "Football", tournament: "Champions League", teamA: { name: "Bayern München" }, teamB: { name: "Paris Saint-Germain" }, odds: { w1: "1.95", draw: "3.50", w2: "3.80" }, href: "/en/line/football/789" },
  { id: 6, sport: "Basketball", tournament: "NBA", teamA: { name: "Los Angeles Lakers" }, teamB: { name: "Golden State Warriors" }, odds: { w1: "1.85", draw: undefined, w2: "1.90" }, href: "/en/line/basketball/101" },
  { id: 7, sport: "Tennis", tournament: "ATP. Shanghai", teamA: { name: "Sinner J." }, teamB: { name: "Zverev A." }, odds: { w1: "1.60", draw: undefined, w2: "2.20" }, href: "/en/line/tennis/202" },
  { id: 8, sport: "Football", tournament: "Serie A", teamA: { name: "AC Milan" }, teamB: { name: "Inter" }, odds: { w1: "2.50", draw: "3.20", w2: "2.70" }, href: "/en/line/football/303" },
];

export const HOME_BONUS_CARDS: HomeBonusCard[] = [
  { id: 1, title: "WELCOME BONUS", subtitle: "Up to 9888 MYR + 350 Free Spins on first deposit", cta: "GET BONUS", href: "/en/bonus/casino/promotions/slot_first_deposit", hue: 120 },
  { id: 2, title: "SPORT BONUS", subtitle: "100% up to 588 MYR on your first sports bet", cta: "GET BONUS", href: "/en/bonus/rules/sport-single", hue: 210 },
];

export const HOME_GAMES: HomeGame[] = [
  { id: 1, name: "Fortune Tiger", provider: "PG Soft", hue: 25 },
  { id: 2, name: "Gates of Olympus", provider: "Pragmatic Play", hue: 270 },
  { id: 3, name: "Sweet Bonanza", provider: "Pragmatic Play", hue: 330 },
  { id: 4, name: "Aviator", provider: "Spribe", hue: 0 },
];

export const HOME_ESPORTS: HomeEvent[] = [
  { id: 101, sport: "CS2", tournament: "PGL Major 2025", live: true, teamA: { name: "NAVI", score: "5" }, teamB: { name: "G2", score: "3" }, odds: { w1: "1.65", w2: "2.10" }, href: "/en/esports/real/csgo/123" },
  { id: 102, sport: "Dota 2", tournament: "The International", live: true, teamA: { name: "Team Liquid", score: "1" }, teamB: { name: "OG", score: "0" }, odds: { w1: "1.80", w2: "1.95" }, href: "/en/esports/real/dota2/456" },
  { id: 103, sport: "LoL", tournament: "Worlds 2025", teamA: { name: "T1" }, teamB: { name: "JDG" }, odds: { w1: "1.45", w2: "2.60" }, href: "/en/esports/real/lol/789" },
];
