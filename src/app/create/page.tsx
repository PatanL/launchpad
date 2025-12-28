"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(3).max(24),
  symbol: z.string().regex(/^[A-Z]{2,6}$/),
  lore: z.string().min(10).max(240),
});

type FormValues = z.infer<typeof schema>;

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { name: "", symbol: "", lore: "" } });

  const onSubmit = async (v: FormValues) => {
    // placeholder submit
    await new Promise((r) => setTimeout(r, 600));
    alert(`Pretend launch: ${v.name} (${v.symbol})`);
  };

  const name = watch("name");
  const symbol = watch("symbol");
  const lore = watch("lore");

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create a token</h1>
          <p className="caption">Launch in minutes with a clean, guided flow.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <form onSubmit={handleSubmit(onSubmit)} className="ui-glass rounded-xl p-5 space-y-5 md:col-span-2">
          <div className="flex items-center gap-2 caption">
            <span className={`h-6 w-6 grid place-items-center rounded-full ${step>=1?"bg-mint text-black":"bg-white/10"}`}>1</span>
            <span>Basics</span>
            <span className={`ml-2 h-6 w-6 grid place-items-center rounded-full ${step>=2?"bg-mint text-black":"bg-white/10"}`}>2</span>
            <span>Details</span>
            <span className={`ml-2 h-6 w-6 grid place-items-center rounded-full ${step>=3?"bg-mint text-black":"bg-white/10"}`}>3</span>
            <span>Review</span>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Token name</label>
                <input className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mint)]" placeholder="Mint Glass" {...register("name")} />
                {errors.name && <p className="caption text-red-300">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">Ticker (2–6 caps)</label>
                <input className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 uppercase" placeholder="MINT" {...register("symbol")} />
                {errors.symbol && <p className="caption text-red-300">{errors.symbol.message}</p>}
              </div>
              <div className="flex justify-end">
                <Button type="button" variant="primary" onClick={()=>setStep(2)}>continue</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Lore</label>
                <textarea rows={5} className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2" placeholder="Describe your token in 1–2 sentences" {...register("lore")} />
                {errors.lore && <p className="caption text-red-300">{errors.lore.message}</p>}
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="glass" onClick={()=>setStep(1)}>back</Button>
                <Button type="button" variant="primary" onClick={()=>setStep(3)}>review</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="ui-glass rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Image src="/images/boop-coin.png" alt="preview" width={40} height={40} className="h-10 w-10"/>
                  <div>
                    <div className="font-semibold">{name || "Token Name"} <span className="text-mint">({(symbol||"TICK").toUpperCase()})</span></div>
                    <div className="caption max-w-[60ch]">{lore || "Short lore preview goes here to help your buyers understand the vibe."}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button type="button" variant="glass" onClick={()=>setStep(2)}>back</Button>
                <Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting?"launching…":"launch token"}</Button>
              </div>
            </div>
          )}
        </form>

        <aside className="ui-glass rounded-xl p-5 space-y-4">
          <h2 className="font-semibold">Tips</h2>
          <ul className="list-disc pl-5 text-sm text-white/80 space-y-2">
            <li>Short names are catchier. Keep it under 24 characters.</li>
            <li>Use a simple ticker in ALL CAPS, 2–6 letters.</li>
            <li>Write friendly lore that conveys the vibe.</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}

