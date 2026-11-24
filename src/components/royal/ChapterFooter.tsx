
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { nextChapter, prevChapter } from "@/lib/journey";

/**
 * Royal navigation plaques:
 * Previous chapter, Map Room, and Next chapter.
 */

function playButtonSound() {
  const audio = new Audio("/sounds/button.mp3");
  audio.volume = 0.5;
  audio.currentTime = 0;
  audio.play().catch(() => {
    // Prevent audio playback errors from affecting navigation.
  });
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden>
      <path
        d="M14 7H34V19C34 27 29 32 24 32C19 32 14 27 14 19V7Z"
        fill="#D9A441"
        stroke="#FFE4A0"
        strokeWidth="1.5"
      />
      <path
        d="M14 12H7V17C7 23 11 26 17 26M34 12H41V17C41 23 37 26 31 26"
        stroke="#D9A441"
        strokeWidth="3"
      />
      <path d="M24 32V39M17 40H31" stroke="#D9A441" strokeWidth="3" />
      <path
        d="M24 11L26 16L31 16L27 20L28 25L24 22L20 25L21 20L17 16L22 16L24 11Z"
        fill="#70431B"
      />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none" aria-hidden>
      <path
        d="M24 13C18 8 10 9 5 11V37C12 34 19 35 24 40C29 35 36 34 43 37V11C38 9 30 8 24 13Z"
        fill="#F5D28A"
        stroke="#FFE8AD"
        strokeWidth="1.5"
      />
      <path d="M24 13V40" stroke="#80501D" strokeWidth="2" />
      <path
        d="M10 17C14 16 18 17 21 19M10 23C14 22 18 23 21 25M27 19C31 17 35 16 39 17M27 25C31 23 35 22 39 23"
        stroke="#94602B"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="21" fill="#25140D" stroke="#D9A441" strokeWidth="2" />
      <circle cx="24" cy="24" r="16" stroke="#A87532" strokeWidth="1" />
      <path d="M24 5L28 22L24 19L20 22L24 5Z" fill="#F7D98E" />
      <path d="M24 43L20 26L24 29L28 26L24 43Z" fill="#A87532" />
      <path d="M5 24L22 20L19 24L22 28L5 24Z" fill="#D9A441" />
      <path d="M43 24L26 28L29 24L26 20L43 24Z" fill="#D9A441" />
      <circle cx="24" cy="24" r="3" fill="#FFE7A5" />
    </svg>
  );
}

function RoyalPlaque({
  to,
  children,
  icon,
  side = "left",
}: {
  to: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  side?: "left" | "center" | "right";
}) {
  return (
    <Link
      to={to}
      onClick={playButtonSound}
      className="pointer-events-auto block"
    >
      <motion.div
        whileHover={{ y: -5, scale: 1.035 }}
        whileTap={{ scale: 0.97 }}
        className="group relative flex min-h-[58px] items-center gap-3 px-4 py-2 sm:px-6"
        style={{
          background:
            "linear-gradient(180deg, #482318 0%, #29130E 50%, #1D100C 100%)",
          border: "1px solid #D49A3E",
          boxShadow:
            "0 0 0 2px #2B170E, 0 0 0 3px #A66D2B, inset 0 1px 0 rgba(255,225,160,0.3), 0 5px 18px rgba(0,0,0,0.65)",
          clipPath:
            "polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)",
        }}
      >
        <span
          className="absolute inset-[4px] border border-[#D9A441]/30 transition-colors group-hover:border-[#F7D98E]/80"
          style={{
            clipPath:
              "polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)",
          }}
        />

        {side !== "right" && (
          <span className="relative z-10 shrink-0">{icon}</span>
        )}

        <span className="relative z-10 whitespace-nowrap font-royal text-xs tracking-[0.08em] text-[#F5D28A] transition-colors group-hover:text-[#FFF0C2] sm:text-sm">
          {children}
        </span>

        {side === "right" && (
          <span className="relative z-10 shrink-0">{icon}</span>
        )}

        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,190,90,0.18), transparent 70%)",
          }}
        />
      </motion.div>
    </Link>
  );
}

export function ChapterFooter() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const next = nextChapter(pathname);
  const prev = prevChapter(pathname);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 px-4 py-5 sm:px-7 sm:py-7">
      {/* Previous chapter */}
      <RoyalPlaque to={prev.to} icon={<TrophyIcon />} side="left">
        ← {prev.name}
      </RoyalPlaque>

      {/* Map Room */}
      <div className="hidden sm:block">
        <RoyalPlaque to="/map-room" icon={<BookIcon />} side="center">
          Open the Map
        </RoyalPlaque>
      </div>

      {/* Next chapter */}
      <RoyalPlaque to={next.to} icon={<CompassIcon />} side="right">
        Continue the Journey →
      </RoyalPlaque>
    </div>
  );
}
