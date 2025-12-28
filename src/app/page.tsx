import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-[92dvh]">

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[calc(92dvh-72px)] max-w-6xl flex-col items-center justify-center gap-6 px-4 text-center md:gap-8">
        <div className="absolute inset-0 -z-10 pattern-dots" />
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] ui-glass px-3 py-1 text-[12px] text-white/80">
          LAUNCH TOKENS BEAUTIFULLY
        </div>
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight md:text-6xl drop-shadow-[0_2px_24px_rgba(167,243,208,0.14)]">
          forge your launch in <span className="text-mint">minutes</span>
        </h1>
        <p className="max-w-2xl text-pretty text-white/80 md:text-lg ui-glass rounded-md px-3 py-2">
          A modern, glassy launchpad with live analytics, clean design and shareable moments.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/create"><Button variant="primary">start a launch</Button></Link>
          <Link href="/tokens"><Button variant="glass">browse tokens</Button></Link>
        </div>

        {/* Decorative row */}
        <div className="mt-10 flex items-center gap-6 opacity-95">
          <Image src="/forge-assets/3d/sphere-mint.svg" alt="mint sphere" width={64} height={64} className="h-14 w-14" />
          <Image src="/forge-assets/3d/cube-mint.svg" alt="mint cube" width={70} height={70} className="h-[70px] w-[70px]" />
        </div>
      </section>
    </main>
  );
}
