"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "Fast Bet", title: "Results In Seconds", subtitle: "Short rounds, instant payouts, no waiting", cta: "Bet Now", hue: 0, accent: 30, emoji: "⚡" },
  { id: 2, tag: "Turbo", title: "Turbo Rounds", subtitle: "One-minute rounds with boosted odds", cta: "Play Turbo", hue: 15, accent: 50, emoji: "🚀" },
];

export default function FastBetPage() {
  return <GameLobby title="Fast Bet" banners={BANNERS} offset={24} rowTitles={["Quick Hits","New Rounds"] as [string, string]} />;
}
