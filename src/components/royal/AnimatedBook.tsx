import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { BookChapter } from "@/lib/journey";

/**
 * A physical book: it flies out of the shelf, rotates, its cover swings open
 * and its pages turn in 3D.
 */
export function AnimatedBook({
  book,
  onClose,
}: {
  book: BookChapter;
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState<null | "next" | "prev">(null);

  const turn = (dir: "next" | "prev") => {
    const target = dir === "next" ? page + 1 : page - 1;
    if (target < 0 || target > book.pages.length - 1) return;
    setFlipping(dir);
    window.setTimeout(() => {
      setPage(target);
      setFlipping(null);
    }, 620);
  };

  return (
    <motion.div
      className="relative"
      initial={{ x: -160, y: 60, rotateY: 65, rotateZ: -12, opacity: 0, scale: 0.7 }}
      animate={{ x: 0, y: 0, rotateY: 0, rotateZ: 0, opacity: 1, scale: 1 }}
      exit={{ x: -120, rotateY: 55, opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", perspective: 1600 }}
    >
      <div
        className="relative grid grid-cols-1 gap-0 sm:grid-cols-2"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* left page */}
        <Page side="left">
          <p className="font-royal text-[13px] tracking-[0.35em] text-ink/90 uppercase">{book.n}</p>
          <h2 className="mt-2 font-royal text-2xl text-ink">{book.title}</h2>
          <p className="mt-1 font-royal text-xs tracking-[0.3em] text-ink/80">{book.year}</p>
          <div className="my-4 h-px w-24 bg-ink/25" />
          <p className="font-script text-[17px] leading-relaxed text-ink/85">{book.pages[0]}</p>
        </Page>

        {/* right page + turning sheet */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          <Page side="right">
            <p className="font-script text-[17px] leading-relaxed text-ink/85">
              {book.pages[Math.min(page + 1, book.pages.length - 1)]}
            </p>
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => turn("prev")}
                disabled={page === 0}
                className="font-royal text-[10px] tracking-[0.25em] text-ink/90 uppercase "
              >
                ← Previous page
              </button>
              <span className="font-royal text-[10px] tracking-[0.2em] text-ink/50">
                {page + 1} / {book.pages.length}
              </span>
              <button
                onClick={() => turn("next")}
                disabled={page >= book.pages.length - 1}
                className="font-royal text-[10px] tracking-[0.25em] text-ink/90 uppercase "
              >
                Next page →
              </button>
            </div>
          </Page>

          <AnimatePresence>
            {flipping && (
              <motion.div
                className="absolute inset-0 origin-left"
                initial={{ rotateY: flipping === "next" ? 0 : -180 }}
                animate={{ rotateY: flipping === "next" ? -180 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.62, ease: "easeInOut" }}
                style={{
                  transformStyle: "preserve-3d",
                  backgroundImage: "var(--gradient-parchment)",
                  boxShadow: "0 0 40px oklch(0 0 0 / 0.55)",
                  zIndex: 5,
                }}
                aria-hidden
              />
            )}
          </AnimatePresence>
        </div>

        {/* spine */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 hidden w-6 -translate-x-1/2 sm:block"
          style={{
            background:
              "linear-gradient(90deg, oklch(0 0 0 / 0.5), oklch(0.5 0.09 44 / 0.25) 50%, oklch(0 0 0 / 0.5))",
          }}
        />
      </div>

      {/* cover, swinging open */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-full origin-left sm:w-1/2"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -168 }}
        transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, oklch(0.36 0.1 32), oklch(0.24 0.07 30))",
          boxShadow: "0 20px 50px oklch(0 0 0 / 0.7)",
          zIndex: 6,
          backfaceVisibility: "hidden",
        }}
      >
        <div className="absolute inset-3 border border-[oklch(0.78_0.11_84)]/60" />
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <p className="font-royal text-[10px] tracking-[0.4em] text-[oklch(0.85_0.1_86)] uppercase">
            {book.n}
          </p>
          <p className="font-royal text-xl text-[oklch(0.88_0.1_88)]">{book.title}</p>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute -top-9 right-0 font-royal text-[10px] tracking-[0.25em] text-foreground/60 uppercase hover:text-primary"
      >
        Close the book
      </button>
    </motion.div>
  );
}

function Page({ children, side }: { children: React.ReactNode; side: "left" | "right" }) {
  return (
    <div
      className="min-h-[320px] px-7 py-8"
      style={{
        backgroundImage: "var(--gradient-parchment)",
        boxShadow:
          side === "left"
            ? "inset -22px 0 34px -22px oklch(0 0 0 / 0.7), 0 18px 44px -20px oklch(0 0 0 / 0.8)"
            : "inset 22px 0 34px -22px oklch(0 0 0 / 0.7), 0 18px 44px -20px oklch(0 0 0 / 0.8)",
      }}
    >
      {children}
    </div>
  );
}

/** A book spine sitting on the shelf. */
export function BookSpine({
  book,
  onOpen,
  index,
  hidden,
}: {
  book: BookChapter;
  onOpen: () => void;
  index: number;
  hidden: boolean;
}) {
  const hues = [
    "oklch(0.38 0.1 32)",
    "oklch(0.34 0.07 140)",
    "oklch(0.33 0.08 258)",
    "oklch(0.36 0.09 68)",
    "oklch(0.3 0.06 300)",
  ];
  return (
    <motion.button
      onClick={onOpen}
      className="group relative flex items-end focus-visible:outline-none"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: hidden ? 0.15 : 1, y: 0, x: hidden ? -10 : 0 }}
      whileHover={{ y: -14, rotateZ: -3 }}
      transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 240, damping: 20 }}
      style={{ transformOrigin: "bottom center" }}
      aria-label={`Open ${book.n}: ${book.title}`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 44,
          height: 170 + (index % 3) * 14,
          background: `linear-gradient(90deg, oklch(0 0 0 / 0.45), ${hues[index % hues.length]} 30%, oklch(0 0 0 / 0.35))`,
          boxShadow: "0 10px 22px oklch(0 0 0 / 0.65)",
          borderRadius: "3px 3px 2px 2px",
        }}
      >
        <span
          className="font-royal text-[10px] tracking-[0.22em] whitespace-nowrap text-[oklch(0.88_0.09_88)] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {book.title} · {book.year}
        </span>
        <span className="absolute inset-x-1 top-3 h-px bg-[oklch(0.8_0.1_86)]/60" />
        <span className="absolute inset-x-1 bottom-3 h-px bg-[oklch(0.8_0.1_86)]/60" />
      </div>
    </motion.button>
  );
}
