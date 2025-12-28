import Image from "next/image";
import { TOKENS } from "@/lib/mock";
import { Button } from "@/components/ui/button";

interface Params { params: { id: string } }

export default function TokenDetailPage({ params }: Params) {
  const token = TOKENS.find(t => t.id === params.id);
  if (!token) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="ui-glass rounded-xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Token not found</h1>
          <p className="caption">We couldn’t find this token (id: {params.id}). Try the tokens page.</p>
        </div>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="flex items-center gap-4">
        <Image src={token.image} alt={token.name} width={56} height={56} className="h-14 w-14 rounded-lg object-contain" />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">{token.name} <span className="text-mint">({token.symbol})</span></h1>
          <p className="caption">by {token.creator}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="glass">share</Button>
          <Button variant="primary">buy</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="ui-glass rounded-xl p-5 md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Price</h2>
            <div className="caption">mock chart</div>
          </div>
          <div className="h-56 rounded-md bg-white/5"></div>
        </div>
        <div className="ui-glass rounded-xl p-5 space-y-4">
          <h2 className="font-semibold">Swap</h2>
          <div className="rounded-lg bg-white/5 p-3 text-sm">
            This is a placeholder swap widget UI.
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" variant="primary">buy</Button>
            <Button className="flex-1" variant="glass">sell</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
