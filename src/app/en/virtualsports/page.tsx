"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "Virtual", title: "Sports 24/7", subtitle: "Football, horses, racing and more every minute", cta: "Bet Now", hue: 100, accent: 140, emoji: "⚽" },
  { id: 2, tag: "Racing", title: "Virtual Racing", subtitle: "Dogs, horses and cars with fast results", cta: "Place Bet", hue: 60, accent: 100, emoji: "🏇" },
];

export default function VirtualSportsPage() {
  return <GameLobby title="Virtual Sports" banners={BANNERS} offset={42} rowTitles={["Popular Sports","New Sports"] as [string, string]} />;
}
