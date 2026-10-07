"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "Fishing", title: "Hunt For Big Catches", subtitle: "Shoot the fish and collect huge multipliers", cta: "Start Fishing", hue: 190, accent: 210, emoji: "🐟" },
  { id: 2, tag: "Ocean", title: "Deep Ocean Bonus", subtitle: "Boss fish pay up to 2,000x your bet", cta: "Dive In", hue: 210, accent: 170, emoji: "🌊" },
];

export default function FishingPage() {
  return <GameLobby title="Fishing" banners={BANNERS} offset={36} rowTitles={["Popular Games","New Games"] as [string, string]} />;
}
