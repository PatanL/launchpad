"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { TokenSummary } from "@/lib/types";
import { Sparkline } from "@/components/charts/sparkline";

export function formatNumber(n: number) {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function TokenCard({ token }: { token: TokenSummary }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="ui-glass ui-glow rounded-xl overflow-hidden group relative"
    >
      <Link href={`/tokens/${token.id}`} className="block">
        <div className="flex items-center gap-3 px-5 pt-5">
          <Image src={token.image} alt={token.name} width={40} height={40} className="h-10 w-10 rounded-md object-contain" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-semibold">{token.name}</h3>
              <span className="text-mint text-xs">{token.symbol}</span>
            </div>
            <p className="caption truncate">by {token.creator}</p>
          </div>
          <div className="ml-auto rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] text-white/80 capitalize">
            {token.status}
          </div>
        </div>
        <div className="px-5 pt-4 pb-5 grid grid-cols-3 gap-3 text-sm items-center">
          <div className="rounded-md bg-white/5 p-3 text-center">
            <div className="caption">mcap</div>
            <div className="font-semibold">${formatNumber(token.mcap)}</div>
          </div>
          <div className="rounded-md bg-white/5 p-3 text-center">
            <div className="caption">24h vol</div>
            <div className="font-semibold">${formatNumber(token.vol24h)}</div>
          </div>
          <div className="rounded-md bg-white/5 p-3 text-center">
            <div className="caption">price</div>
            <div className="font-semibold">{token.price.toFixed(3)}</div>
          </div>
          <div className="col-span-3 mt-2 flex items-center justify-center">
            <Sparkline id={token.id} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
