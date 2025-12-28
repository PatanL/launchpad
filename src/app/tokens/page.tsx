import { TokenCard } from "@/components/patterns/token-card";
import { TOKENS } from "@/lib/mock";

export default function TokensPage() {
  const tokens = TOKENS;
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="absolute inset-0 -z-10 pattern-dots" />
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tokens</h1>
          <p className="caption">Trending • Newly Launched • Graduating</p>
        </div>
      </div>
      <div className="forge-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((t) => (
          <TokenCard key={t.id} token={t} />
        ))}
      </div>
    </main>
  );
}
