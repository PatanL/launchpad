export default function StakingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Staking & Rewards</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="ui-glass rounded-xl p-5 min-h-40">
          <h2 className="font-semibold mb-2">Stake</h2>
          <p className="text-sm text-white/80">Pretty staking UI lives here. This is a placeholder.</p>
        </div>
        <div className="ui-glass rounded-xl p-5 min-h-40">
          <h2 className="font-semibold mb-2">Claim</h2>
          <p className="text-sm text-white/80">Claimable airdrops and fees will appear here.</p>
        </div>
      </div>
    </main>
  );
}

