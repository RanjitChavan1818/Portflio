import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { CHAPTERS, chapterFor } from "@/lib/journey";

function SealCompass({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="h-12 w-12 drop-shadow-[0_4px_14px_oklch(0_0_0/0.7)]"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <radialGradient id="sealg" cx="35%" cy="30%">
          <stop offset="0%" stopColor="oklch(0.92 0.1 92)" />
          <stop offset="55%" stopColor="oklch(0.74 0.13 78)" />
          <stop offset="100%" stopColor="oklch(0.45 0.09 55)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#sealg)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="oklch(0.3 0.05 45)" strokeWidth="2" />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect
          key={i}
          x="49"
          y="4"
          width="2"
          height={i % 4 === 0 ? 12 : 6}
          fill="oklch(0.28 0.05 44 / 0.75)"
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      <path d="M50 16 L58 50 L50 84 L42 50 Z" fill="oklch(0.3 0.06 44)" />
      <path d="M16 50 L50 42 L84 50 L50 58 Z" fill="oklch(0.28 0.05 44 / 0.55)" />
      <circle cx="50" cy="50" r="6" fill="oklch(0.9 0.09 92)" />
    </motion.svg>
  );
}

export function JourneyNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = chapterFor(pathname);

  return (
    <>
      <div className="fixed top-5 right-5 z-[60] flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="font-royal text-[10px] tracking-[0.3em] text-primary/80 uppercase">
            Chapter {String(current.n).padStart(2, "0")} / 08
          </p>
          <p className="font-script text-sm text-foreground/75">{current.name}</p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close journey menu" : "Open journey menu"}
          aria-expanded={open}
          className="rounded-full transition-transform duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <SealCompass open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 backdrop-blur-sm"
            style={{ background: "oklch(0.12 0.03 55 / 0.9)" }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex h-full max-w-3xl flex-col justify-center px-6 py-24"
            >
              <p className="mb-6 font-royal text-[11px] tracking-[0.45em] text-primary/70 uppercase">
                The Journey
              </p>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {CHAPTERS.map((c, i) => (
                  <motion.li
                    key={c.to}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      to={c.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-3 border-l-2 border-primary/20 py-2.5 pl-4 transition-colors hover:border-primary hover:bg-primary/5"
                      activeProps={{ className: "border-primary bg-primary/10" }}
                      activeOptions={{ exact: true }}
                    >
                      <span className="font-royal text-[10px] tracking-widest text-primary/60">
                        {String(c.n).padStart(2, "0")}
                      </span>
                      <span className="font-royal text-base tracking-wide text-foreground group-hover:text-primary">
                        {c.name}
                      </span>
                      <span className="font-script text-xs text-muted-foreground">
                        {c.subtitle}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
