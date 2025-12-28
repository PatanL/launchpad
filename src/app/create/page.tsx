"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const schema = z.object({
  name: z.string().min(3, "min 3 characters").max(24, "max 24 characters"),
  symbol: z
    .string()
    .min(2, "min 2 characters")
    .max(6, "max 6 characters")
    .regex(/^[a-zA-Z]{2,6}$/, "letters only")
    .transform((s) => s.toUpperCase()),
  description: z
    .union([z.string().max(240, "max 240 characters"), z.literal("")])
    .optional()
    .default(""),
  website: z.union([z.string().url("invalid url"), z.literal("")]).optional().default(""),
  x: z.union([z.string().url("invalid url"), z.literal("")]).optional().default(""),
  telegram: z.union([z.string().url("invalid url"), z.literal("")]).optional().default(""),
});

type FormValues = z.infer<typeof schema>;

export default function CreatePage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openSocials, setOpenSocials] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", symbol: "", description: "", website: "", x: "", telegram: "" },
  });

  const onSubmit = async (v: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    alert(
      `Pretend launch: ${v.name} (${v.symbol})\nwebsite: ${v.website}\nx: ${v.x}\ntelegram: ${v.telegram}`
    );
  };

  const name = watch("name");
  const symbol = watch("symbol");
  const description = watch("description");

  const handleFile = useCallback((file: File) => {
    const maxBytes = 5 * 1024 * 1024; // 5MB UI cap
    if (file.size > maxBytes) {
      alert("Image too large (max 5MB)");
      return;
    }
    if (!/image\/(png|jpeg|webp)/.test(file.type)) {
      alert("Unsupported file type. Use PNG/JPG/WebP");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        if (img.width > 1024 || img.height > 1024) {
          alert("Image dimensions too large (max 1024x1024)");
          return;
        }
        setImagePreview(dataUrl);
      };
      img.onerror = () => {
        alert("Could not read image");
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create a token</h1>
          <p className="caption">One page. Launch in minutes.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <form onSubmit={handleSubmit(onSubmit)} className="ui-glass rounded-xl p-5 space-y-6 md:col-span-2">
          {/* Big Image Upload */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`relative mx-auto w-full max-w-[360px] aspect-square rounded-xl border border-[var(--border)] ${
              isDragging ? "bg-white/10" : "bg-white/5"
            } overflow-hidden grid place-items-center`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview || "/forge-assets/3d/sphere-mint.svg"}
              alt="token image preview"
              className={`h-full w-full object-cover ${imagePreview ? "opacity-100" : "opacity-90 p-12"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            {!imagePreview && (
              <div className="absolute inset-x-0 bottom-0 p-3 text-center pointer-events-none">
                <p className="caption">PNG/JPG/WebP up to 5MB · max 1024×1024</p>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="ui-glass rounded-md px-3 py-1.5 text-sm hover:bg-white/10"
              >
                {imagePreview ? "Replace image" : "Drag & drop or click to upload"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-1">Token name</label>
              <input
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mint)]"
                placeholder="Mint Glass"
                {...register("name")}
              />
              {errors.name && <p className="caption text-red-300">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Ticker</label>
              <input
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 uppercase"
                placeholder="MINT"
                {...register("symbol")}
              />
              {errors.symbol && <p className="caption text-red-300">{errors.symbol.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Description (optional)</label>
              <textarea
                rows={5}
                className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
                placeholder="Describe your token in 1–2 sentences"
                {...register("description")}
              />
              {errors.description && (
                <p className="caption text-red-300">{String(errors.description.message)}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setOpenSocials((s) => !s)}
              aria-expanded={openSocials}
              className="w-full ui-glass rounded-md px-3 py-2 text-left flex items-center justify-between"
            >
              <span className="text-sm">Socials (optional)</span>
              <ChevronDown size={16} className={`transition-transform ${openSocials ? "rotate-180" : "rotate-0"}`} />
            </button>

            {openSocials && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm mb-1">Website</label>
                  <input
                    className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
                    placeholder="https://example.com"
                    {...register("website")}
                  />
                  {errors.website && <p className="caption text-red-300">{String(errors.website.message)}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">x.com link</label>
                  <input
                    className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
                    placeholder="https://x.com/username"
                    {...register("x")}
                  />
                  {errors.x && <p className="caption text-red-300">{String(errors.x.message)}</p>}
                </div>
                <div>
                  <label className="block text-sm mb-1">Telegram</label>
                  <input
                    className="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2"
                    placeholder="https://t.me/yourchannel"
                    {...register("telegram")}
                  />
                  {errors.telegram && <p className="caption text-red-300">{String(errors.telegram.message)}</p>}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "launching…" : "launch token"}
            </Button>
          </div>
        </form>

        <aside className="ui-glass rounded-xl p-5 space-y-4 sticky top-24 self-start">
          <div className="ui-glass rounded-lg p-4 space-y-3">
            <div className="font-semibold">Preview</div>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-md bg-white/10 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview || "/forge-assets/3d/sphere-mint.svg"} alt="preview" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="caption">{name || "Token Name"} <span className="text-mint">({(symbol || "TICK").toUpperCase()})</span></div>
                <div className="caption text-white/80 mt-1 max-w-[36ch]">{description || "Short description will appear here."}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
