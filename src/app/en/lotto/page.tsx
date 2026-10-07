"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "Lotto", title: "Draws Every 5 Minutes", subtitle: "Pick your numbers and chase the big prize", cta: "Play Lotto", hue: 40, accent: 120, emoji: "🍀" },
  { id: 2, tag: "Mega Prize", title: "Mega Jackpot Draw", subtitle: "Weekly jackpot grows with every ticket sold", cta: "Buy Ticket", hue: 20, accent: 60, emoji: "💰" },
];

export default function LottoPage() {
  return <GameLobby title="Lotto" banners={BANNERS} offset={12} rowTitles={["Popular Draws","New Draws"] as [string, string]} />;
}
