
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { VICTORIES, type Victory } from "@/lib/journey";
import { Torch } from "./Torch";
import { Banner, StoneBlock } from "./SceneParts";
import { AmbientParticles } from "./AmbientParticles";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

function TrophyShape({ kind }: { kind: Victory["kind"] }) {
  if (kind === "medal") {
    return (
      <svg viewBox="0 0 80 110" width="76" aria-hidden>
        <path
          d="M28 4 L40 44 L52 4"
          stroke="oklch(0.5 0.14 34)"
          strokeWidth="10"
          fill="none"
        />
        <circle cx="40" cy="72" r="30" fill="url(#brassg)" />
        <circle
          cx="40"
          cy="72"
          r="21"
          fill="none"
          stroke="oklch(0.4 0.07 52)"
          strokeWidth="2"
        />
        <path
          d="M40 56 L45 68 L58 69 L48 77 L51 90 L40 82 L29 90 L32 77 L22 69 L35 68 Z"
          fill="oklch(0.42 0.08 52)"
        />
        <defs>
          <linearGradient id="brassg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.92 0.1 94)" />
            <stop offset="60%" stopColor="oklch(0.74 0.13 78)" />
            <stop offset="100%" stopColor="oklch(0.5 0.1 60)" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (kind === "seal") {
    return (
      <svg viewBox="0 0 100 110" width="76" aria-hidden>
        <path
          d="M50 8 C64 12 78 8 84 20 C96 26 96 42 92 54 C98 66 90 80 80 86 C76 98 60 102 50 98 C40 102 24 98 20 86 C10 80 2 66 8 54 C4 42 4 26 16 20 C22 8 36 12 50 8 Z"
          fill="oklch(0.5 0.16 32)"
        />
        <circle
          cx="50"
          cy="55"
          r="26"
          fill="none"
          stroke="oklch(0.85 0.11 88)"
          strokeWidth="2.5"
        />
        <path
          d="M50 34 C58 46 70 50 82 50 C70 56 60 66 50 78 C40 66 30 56 18 50 C30 50 42 46 50 34 Z"
          fill="oklch(0.82 0.11 86)"
          opacity="0.9"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 90 120" width="80" aria-hidden>
      <defs>
        <linearGradient id="tg" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.93 0.1 94)" />
          <stop offset="55%" stopColor="oklch(0.75 0.13 78)" />
          <stop offset="100%" stopColor="oklch(0.48 0.1 58)" />
        </linearGradient>
      </defs>
      <path
        d="M22 12 H68 V38 C68 58 58 68 45 68 C32 68 22 58 22 38 Z"
        fill="url(#tg)"
      />
      <path
        d="M22 20 C8 20 6 42 22 46"
        stroke="url(#tg)"
        strokeWidth="6"
        fill="none"
      />
      <path
        d="M68 20 C82 20 84 42 68 46"
        stroke="url(#tg)"
        strokeWidth="6"
        fill="none"
      />
      <rect x="40" y="68" width="10" height="20" fill="url(#tg)" />
      <rect x="26" y="88" width="38" height="10" rx="2" fill="url(#tg)" />
      <rect x="20" y="98" width="50" height="12" rx="2" fill="oklch(0.32 0.05 44)" />
      <path
        d="M34 24 L45 30 L56 24"
        stroke="oklch(0.42 0.08 52)"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}

function LaurelDecoration() {
  return (
    <svg viewBox="0 0 70 90" width="46" height="58" fill="none" aria-hidden>
      <path
        d="M55 82 C12 63 10 25 34 7"
        stroke="#C58B37"
        strokeWidth="2"
        fill="none"
      />
      {[18, 28, 39, 50, 60].map((y, i) => (
        <ellipse
          key={i}
          cx={y < 40 ? 27 - i * 2 : 19 + i * 2}
          cy={y}
          rx="4"
          ry="9"
          transform={`rotate(-35 ${y < 40 ? 27 - i * 2 : 19 + i * 2} ${y})`}
          fill="#D5A44D"
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

function VictoryPedestal({
  victory,
  active,
  onSelect,
  index,
}: {
  victory: Victory;
  active: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`View achievement: ${victory.title}`}
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.2 + index * 0.12,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex w-[125px] shrink-0 flex-col items-center focus-visible:outline-none sm:w-[155px]"
    >
      {/* Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 h-64 w-36"
        animate={{
          opacity: active ? 0.8 : 0.3,
          scale: active ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,205,105,0.35), transparent 85%)",
          clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0 100%)",
          filter: "blur(9px)",
        }}
      />

      {/* Trophy */}
      <motion.div
        className="relative z-10"
        animate={
          active
            ? {
                y: -16,
                rotateY: 360,
                filter:
                  "drop-shadow(0 0 25px rgba(255,190,70,0.95))",
              }
            : {
                y: 0,
                rotateY: 0,
                filter:
                  "drop-shadow(0 8px 12px rgba(0,0,0,0.6))",
              }
        }
        whileHover={{
          scale: 1.08,
          filter: "drop-shadow(0 0 20px rgba(255,190,70,0.7))",
        }}
        transition={{
          duration: active ? 1.1 : 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <TrophyShape kind={victory.kind} />
      </motion.div>

      {/* Golden pedestal top */}
      <div
        className="relative z-10 -mt-1 h-3 w-24 rounded-sm sm:w-28"
        style={{
          background:
            "linear-gradient(180deg, #F5CF7C, #9A5C20 60%, #4B2814)",
          boxShadow: "0 0 14px rgba(225,165,65,0.4)",
        }}
      />

      {/* Main stone pedestal */}
      <motion.div
        className="relative flex h-[62px] w-28 items-center justify-center sm:w-32"
        animate={{
          boxShadow: active
            ? "0 0 28px rgba(232,173,75,0.55)"
            : "0 8px 18px rgba(0,0,0,0.5)",
        }}
        style={{
          background:
            "linear-gradient(180deg, #665044 0%, #34251D 55%, #21150F 100%)",
          clipPath:
            "polygon(8% 0, 92% 0, 100% 100%, 0 100%)",
          borderTop: "2px solid #D5A44D",
        }}
      >
        <div
          className="absolute inset-x-3 top-2 bottom-2 flex items-center justify-center border border-[#D5A44D]/30"
        >
          <span
            className="font-royal text-xl tracking-wider"
            style={{
              color: "#F4D18A",
              textShadow: "0 2px 5px rgba(0,0,0,0.8)",
            }}
          >
            {victory.year}
          </span>
        </div>
      </motion.div>

      {/* Base */}
      <div
        className="h-3 w-32 rounded-sm sm:w-36"
        style={{
          background:
            "linear-gradient(180deg, #A36B32, #4A2916)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.6)",
        }}
      />

      {/* Active indicator */}
      <motion.span
        className="mt-3 h-1 rounded-full bg-[#E8B85E]"
        animate={{
          width: active ? 65 : 18,
          opacity: active ? 1 : 0.35,
        }}
        transition={{ duration: 0.3 }}
      />

      <span className="sr-only">{victory.title}</span>
    </motion.button>
  );
}

export function HallOfVictories() {
  const [active, setActive] = useState<Victory | null>(null);

  // Achievement sound effect
  const achievementAudio = useRef<HTMLAudioElement | null>(null);

  const handleVictorySelect = (victory: Victory) => {
    if (active?.id === victory.id) {
      setActive(null);
      return;
    }

    if (!achievementAudio.current) {
      achievementAudio.current = new Audio("/sounds/Achievement.mp3");
      achievementAudio.current.volume = 0.7;
    }

    achievementAudio.current.currentTime = 0;
    achievementAudio.current.play().catch((error) => {
      console.warn("Achievement sound could not be played:", error);
    });

    setActive(victory);
  };

  return (
    <CinematicTransition variant="corridor">
      {/* Main hall background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 28%, #573018 0%, #28130B 48%, #100804 100%)",
        }}
      />

      {/* Grand central arch */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-15%] left-1/2 h-[90%] w-[88%] -translate-x-1/2"
        style={{
          border: "16px solid rgba(169,112,52,0.35)",
          borderBottom: "none",
          borderRadius: "50% 50% 0 0 / 38% 38% 0 0",
          boxShadow:
            "inset 0 0 45px rgba(255,179,79,0.08), 0 0 45px rgba(0,0,0,0.7)",
          background:
            "linear-gradient(180deg, rgba(122,69,30,0.13), transparent 75%)",
        }}
      />

      {/* Side pillars */}
      {[3, 14, 86, 97].map((x, i) => (
        <div
          key={x}
          aria-hidden
          className="absolute top-0 h-[78%] w-[7%]"
          style={{
            left: `${x}%`,
            transform: "translateX(-50%)",
          }}
        >
          <StoneBlock className="inset-0" />

          <div
            className="absolute -inset-x-3 top-0 h-8"
            style={{
              backgroundImage: "var(--gradient-brass)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.6)",
            }}
          />

          <div
            className="absolute -inset-x-4 bottom-0 h-8"
            style={{
              backgroundImage: "var(--gradient-brass)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.6)",
            }}
          />

          <Banner
            className="top-10 left-1/2 -translate-x-1/2"
            height={170}
            delay={i * 0.5}
            color={i % 2 ? "#7B2C19" : "#963D20"}
          />
        </div>
      ))}

      {/* Side torches */}
      <Torch className="top-[28%] left-[19%]" scale={0.85} />
      <Torch className="top-[28%] right-[19%]" scale={0.85} flip />

      {/* Golden spotlights */}
      {[32, 50, 68].map((x, i) => (
        <motion.div
          key={x}
          aria-hidden
          className="pointer-events-none absolute top-[20%] h-[65%] w-[15%]"
          animate={{
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${x}%`,
            transform: "translateX(-50%)",
            background:
              "linear-gradient(180deg, rgba(255,190,85,0.22), transparent 90%)",
            clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
            filter: "blur(12px)",
          }}
        />
      ))}

      {/* Marble floor */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background:
            "linear-gradient(180deg, #3A2418 0%, #24150E 55%, #100804 100%)",
          borderTop: "2px solid rgba(206,151,72,0.35)",
        }}
      />

      {/* Floor lines */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 75px, rgba(210,157,85,0.09) 75px 77px), repeating-linear-gradient(0deg, transparent 0 45px, rgba(210,157,85,0.07) 45px 47px)",
          opacity: 0.8,
        }}
      />

      {/* Central royal compass on the floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[13%] left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex h-28 w-28 items-center justify-center rounded-full border border-[#B88743]/40"
          style={{
            boxShadow: "0 0 28px rgba(208,151,65,0.1)",
          }}
        >
          <svg viewBox="0 0 100 100" width="90" fill="none">
            <circle cx="50" cy="50" r="44" stroke="#B88743" strokeWidth="1" />
            <circle cx="50" cy="50" r="31" stroke="#B88743" strokeWidth="1" />
            <path
              d="M50 8L58 44L50 50L42 44Z"
              fill="#E8B85E"
            />
            <path
              d="M50 92L42 56L50 50L58 56Z"
              fill="#8C5628"
            />
            <path
              d="M8 50L44 42L50 50L44 58Z"
              fill="#B88743"
            />
            <path
              d="M92 50L56 58L50 50L56 42Z"
              fill="#B88743"
            />
            <circle cx="50" cy="50" r="4" fill="#FFE3A0" />
          </svg>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-30 mx-auto min-h-svh max-w-6xl px-5 pt-20 pb-40 sm:pt-24">
        {/* Header */}
        <header className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-3 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-[#C58B37]" />
            <p
              className="font-royal text-xs tracking-[0.45em] uppercase sm:text-sm"
              style={{ color: "#E2B65F" }}
            >
              Chapter 05
            </p>
            <span className="h-px w-10 bg-[#C58B37]" />
          </motion.div>

          <div className="flex items-center justify-center gap-2 sm:gap-5">
            <div className="hidden sm:block">
              <LaurelDecoration />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="font-royal text-3xl tracking-wide sm:text-5xl"
              style={{
                color: "#F6D58E",
                textShadow:
                  "0 3px 8px rgba(0,0,0,0.9), 0 0 22px rgba(218,165,75,0.4)",
              }}
            >
              Hall of Victories
            </motion.h1>

            <div className="hidden sm:block">
              <LaurelDecoration />
            </div>
          </div>

          <p
            className="mt-3 font-script text-lg sm:text-xl"
            style={{
              color: "#E8D5B5",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            A Journey of Innovation, Competition & Recognition
          </p>

          <div className="mx-auto mt-5 flex w-48 items-center justify-center gap-2">
            <span className="h-px flex-1 bg-[#B88743]/70" />
            <span className="h-2 w-2 rotate-45 border border-[#E2B65F]" />
            <span className="h-px flex-1 bg-[#B88743]/70" />
          </div>
        </header>

        {/* Trophy gallery */}
        <section
          aria-label="Achievements"
          className="relative mt-16 flex flex-wrap items-end justify-center gap-x-3 gap-y-12 sm:mt-24 sm:gap-x-7"
        >
          {VICTORIES.map((victory, index) => (
            <VictoryPedestal
              key={victory.id}
              victory={victory}
              index={index}
              active={active?.id === victory.id}
              onSelect={() => handleVictorySelect(victory)}
            />
          ))}
        </section>

        {/* Achievement detail plaque */}
        <div className="relative mt-10 flex min-h-[150px] justify-center sm:mt-12">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.92,
                  rotateX: -12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full max-w-xl px-7 py-6 text-center sm:px-10"
                style={{
                  background:
                    "linear-gradient(180deg, #E7B75E, #A66A2B 55%, #70401D)",
                  boxShadow:
                    "0 0 0 2px #3B2112, 0 0 0 3px #C58B37, 0 12px 30px rgba(0,0,0,0.7)",
                  clipPath:
                    "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
                }}
              >
                <p className="mb-2 font-royal text-[13px] tracking-[0.3em] text-[#5b351b] uppercase">
                  Royal Recognition
                </p>

                <h2 className="font-royal text-xl tracking-wider text-[#321B10] uppercase sm:text-2xl">
                  {active.title}
                </h2>

                <div className="mx-auto my-3 h-px w-24 bg-[#6F421D]/50" />

                <p className="font-script text-xl leading-relaxed text-[#422515] ">
                  {active.detail}
                </p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="self-center px-4 text-center font-script text-lg"
                style={{
                  color: "#E7D2B0",
                  textShadow: "0 2px 8px rgba(0,0,0,0.95)",
                }}
              >
                Select a royal trophy to reveal its story of achievement.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Ambient atmosphere */}
      <AmbientParticles count={24} seed={23} />
      <ChapterFooter />
    </CinematicTransition>
  );
}
