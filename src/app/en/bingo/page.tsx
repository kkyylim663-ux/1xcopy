"use client";
import GameLobby from "@/components/sites/slots-ref/sections/GameLobby";
import type { HeroBannerItem } from "@/components/sites/slots-ref/sections/HeroBanner";

const BANNERS: HeroBannerItem[] = [
  { id: 1, tag: "Bingo Night", title: "Jackpot Bingo Rooms", subtitle: "Join a room and win up to RM 20,000 every hour", cta: "Play Bingo", hue: 260, accent: 45, emoji: "🎱" },
  { id: 2, tag: "Free Tickets", title: "Daily Free Tickets", subtitle: "Claim your free bingo tickets every day", cta: "Claim Tickets", hue: 310, accent: 80, emoji: "🎟️" },
];

export default function BingoPage() {
  return <GameLobby title="Bingo" banners={BANNERS} offset={6} rowTitles={["Popular Rooms","New Rooms"] as [string, string]} />;
}
