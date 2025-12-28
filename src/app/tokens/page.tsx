"use client";
import { TokenCard } from "@/components/patterns/token-card";
import { TOKENS } from "@/lib/mock";
import type { TokenSummary } from "@/lib/types";
import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";

// single grid view only

function Section({ title, tokens }: { title: string; tokens: TokenSummary[] }) {
  if (tokens.length === 0) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-sm uppercase tracking-wider text-white/70">{title}</h2>
      <div className="forge-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((t) => (
          <TokenCard key={t.id} token={t} />
        ))}
      </div>
    </section>
  );
}

// list view removed

export default function TokensPage() {
  const [query, setQuery] = useState("");

  const matches = (t: TokenSummary, q: string) => {
    if (!q) return true;
    const s = q.trim().toLowerCase();
    return (
      t.name.toLowerCase().includes(s) ||
      t.symbol.toLowerCase().includes(s) ||
      (t.contract ?? "").toLowerCase().includes(s)
    );
  };

  const trending = useMemo(() =>
    TOKENS.filter((t) => t.status === "trending").sort((a, b) => b.mcap - a.mcap),
  []);
  const graduating = useMemo(() =>
    TOKENS.filter((t) => t.status === "graduating").sort((a, b) => b.mcap - a.mcap),
  []);
  const newest = useMemo(() =>
    TOKENS.filter((t) => t.status === "new").sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
  []);

  const all = useMemo(() => [...trending, ...graduating, ...newest], [trending, graduating, newest]);

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-8 space-y-6">
      <div className="absolute inset-0 -z-10 pattern-dots" />

      {/* Header + Search */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Tokens</h1>
          <p className="caption">Trending • Graduating • New</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 ui-glass rounded-md px-3 py-2">
            <SearchIcon size={16} className="text-white/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, symbol, or contract"
              className="bg-transparent outline-none text-sm placeholder:text-white/50 w-64"
            />
          </div>
          
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-wider text-white/70">Trending</h2>
            <div className="forge-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {trending.filter((t) => matches(t, query)).map((t) => (
                <TokenCard key={t.id} token={t} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-wider text-white/70">Graduating</h2>
            <div className="forge-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {graduating.filter((t) => matches(t, query)).map((t) => (
                <TokenCard key={t.id} token={t} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-wider text-white/70">New</h2>
            <div className="forge-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {newest.filter((t) => matches(t, query)).map((t) => (
                <TokenCard key={t.id} token={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
