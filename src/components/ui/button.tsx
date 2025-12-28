"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--mint)] text-black hover:bg-[color-mix(in_srgb,var(--mint)_85%,#fff)]",
        glass:
          "ui-glass ui-glow text-[var(--text)] hover:bg-[var(--surface-2)]",
        outline:
          "border border-[var(--border)] bg-transparent hover:bg-[var(--surface)]",
        subtle: "bg-white/5 text-white hover:bg-white/10",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: { variant: "glass", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

