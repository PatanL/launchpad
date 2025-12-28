"use client";
import * as React from "react";

function seeded(seed: number) {
  // simple LCG for deterministic pseudo-random
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 48271) % 2147483647) / 2147483647;
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export function Sparkline({ id, width = 96, height = 28 }: { id: string; width?: number; height?: number }) {
  const rnd = React.useMemo(() => seeded(hash(id)), [id]);
  const points = React.useMemo(() => {
    const n = 24;
    const arr = Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      // generate noise-y curve with light trends
      const base = Math.sin(t * Math.PI * 2) * 0.2 + 0.5;
      const noise = (rnd() - 0.5) * 0.25;
      return Math.max(0.05, Math.min(0.95, base + noise));
    });
    return arr.map((v, i) => [i / (arr.length - 1), v] as const);
  }, [rnd]);

  const d = React.useMemo(() => {
    return points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${(x * width).toFixed(1)},${(height - y * height).toFixed(1)}`)
      .join(" ");
  }, [points, width, height]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={d} fill="none" stroke="rgba(167,243,208,0.9)" strokeWidth={1.5} />
    </svg>
  );
}

