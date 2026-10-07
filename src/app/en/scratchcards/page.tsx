"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "Scratch", title: "Instant Win Cards", subtitle: "Scratch to reveal and win up to 1,000x", cta: "Scratch Now", hue: 120, accent: 160, emoji: "🪙" },
  { id: 2, tag: "Lucky", title: "Lucky Cards Weekend", subtitle: "Double prizes on selected cards", cta: "Try Your Luck", hue: 140, accent: 200, emoji: "🍀" },
];

export default function ScratchCardsPage() {
  return <GameLobby title="Scratch Cards" banners={BANNERS} offset={30} rowTitles={["Popular Cards","New Cards"] as [string, string]} />;
}
