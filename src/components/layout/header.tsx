"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:py-5">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="inline-grid place-items-center h-9 w-9 rounded-md ui-glass border border-[var(--border)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-mint">
              <path d="M4 14h16M6 10h12M9 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="text-base font-semibold tracking-tight">Forge</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <Link className="hover:text-white" href="/tokens">tokens</Link>
          <Link className="hover:text-white" href="/create">create</Link>
          <Link className="hover:text-white" href="/leaderboard">leaderboard</Link>
          <Link className="hover:text-white" href="/staking">staking</Link>
          <Button variant="primary" size="md">connect</Button>
        </nav>
        <button className="md:hidden ui-glass rounded-md h-9 w-9 grid place-items-center" onClick={() => setOpen(v=>!v)}>
          <Menu size={18} />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="ui-glass rounded-lg p-3 flex flex-col gap-2 text-sm">
            <Link href="/tokens" onClick={()=>setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">tokens</Link>
            <Link href="/create" onClick={()=>setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">create</Link>
            <Link href="/leaderboard" onClick={()=>setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">leaderboard</Link>
            <Link href="/staking" onClick={()=>setOpen(false)} className="px-2 py-2 rounded hover:bg-white/5">staking</Link>
            <Button className="mt-1" variant="primary">connect</Button>
          </div>
        </div>
      )}
    </header>
  );
}

