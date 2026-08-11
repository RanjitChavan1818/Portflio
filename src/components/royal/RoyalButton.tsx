import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "brass" | "stone" | "ghost";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/**
 * A carved royal plaque button. Variants live here, never inline colors.
 */
export const RoyalButton = forwardRef<HTMLButtonElement, Props>(function RoyalButton(
  { className, variant = "brass", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 px-7 py-3",
        "font-royal text-xs tracking-[0.28em] uppercase transition-all duration-300",
        "carved active:translate-y-[2px] disabled:pointer-events-none disabled:opacity-60",
        variant === "brass" && "brass-surface hover:brightness-110",
        variant === "stone" &&
          "bg-secondary text-foreground hover:bg-secondary/80 border border-primary/30",
        variant === "ghost" &&
          "border border-primary/40 bg-transparent text-primary hover:bg-primary/10 shadow-none",
        className,
      )}
      style={{
        clipPath:
          "polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)",
      }}
    >
      {children}
    </button>
  );
});
