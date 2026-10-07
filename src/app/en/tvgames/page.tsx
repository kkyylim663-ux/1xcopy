"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "Live TV", title: "Game Shows On Air", subtitle: "Spin, bet and win with live hosts", cta: "Watch & Play", hue: 200, accent: 300, emoji: "📺" },
  { id: 2, tag: "Wheel", title: "Mega Wheel", subtitle: "Multipliers up to 500x on every spin", cta: "Spin Now", hue: 340, accent: 40, emoji: "🎡" },
];

export default function TvGamesPage() {
  return <GameLobby title="TV Games" banners={BANNERS} offset={18} rowTitles={["Popular Shows","New Shows"] as [string, string]} />;
}
