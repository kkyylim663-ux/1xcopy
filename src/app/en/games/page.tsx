"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "All Games", title: "Every Game In One Place", subtitle: "Slots, table games, crash and more from top providers", cta: "Browse Games", hue: 210, accent: 82, emoji: "🎮" },
  { id: 2, tag: "Weekly Promo", title: "Free Spins Every Week", subtitle: "Play selected games and unlock bonus spins", cta: "Get Spins", hue: 280, accent: 45, emoji: "🎁" },
];

export default function GamesPage() {
  return <GameLobby title="All Games" banners={BANNERS} offset={0} count={86} rowTitles={["Popular", "New"]} />;
}
