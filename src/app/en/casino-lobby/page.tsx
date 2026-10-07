"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CasinoLobbyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en/casino");
  }, [router]);

  return (
    <div style={{ padding: 32, color: "var(--color-text-muted)", textAlign: "center" }}>
      Redirecting to Casino…
    </div>
  );
}
