
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { GateDoor } from "./GateDoors";
import { AmbientParticles } from "./AmbientParticles";
import {
  Banner,
  Fog,
  MountainRange,
  StoneBlock,
} from "./SceneParts";
import { RoyalButton } from "./RoyalButton";

/* --------------------------------------------------
   CUSTOM ROYAL WALL TORCH
-------------------------------------------------- */

function RoyalTorch({
  intensity = 1,
  scale = 1,
  flip = false,
}: {
  intensity?: number;
  scale?: number;
  flip?: boolean;
}) {
  return (
    <div
      className="relative h-[140px] w-[76px]"
      style={{
        transform: `scale(${scale}) scaleX(${flip ? -1 : 1})`,
        transformOrigin: "center bottom",
      }}
    >
      {/* Red and orange wall glow */}
      <motion.div
        className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full"
        animate={{
          opacity: [0.45 * intensity, 0.8 * intensity, 0.5 * intensity],
          scale: [0.9, 1.12, 0.95],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,65,15,0.42) 0%, rgba(255,30,0,0.16) 45%, transparent 75%)",
          filter: "blur(13px)",
        }}
      />

      {/* Flame */}
      <div className="absolute left-1/2 top-0 h-[76px] w-[52px] -translate-x-1/2">
        <motion.svg
          viewBox="0 0 100 130"
          className="h-full w-full overflow-visible"
          animate={{
            scaleX: [1, 0.91, 1.06, 0.96, 1],
            scaleY: [1, 1.08, 0.94, 1.05, 1],
            rotate: [-2, 2, -1, 2, -2],
          }}
          transition={{
            duration: 1.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "50% 100%",
            filter: `drop-shadow(0 0 ${8 * intensity}px rgba(255,65,0,0.9))`,
          }}
        >
          {/* Outer red flame */}
          <path
            d="M50 3
               C57 22 78 31 72 57
               C91 42 88 28 85 20
               C111 56 91 106 66 119
               C54 127 33 125 20 112
               C-2 91 12 60 27 43
               C28 61 36 67 39 72
               C45 53 35 32 50 3Z"
            fill="#E21C16"
          />

          {/* Orange flame */}
          <path
            d="M50 36
               C61 54 75 66 67 89
               C64 104 43 113 31 96
               C21 82 34 66 40 57
               C42 72 48 75 50 36Z"
            fill="#FF6A00"
          />

          {/* Yellow inner flame */}
          <path
            d="M50 68
               C57 80 61 87 55 101
               C51 110 40 108 39 98
               C36 88 46 78 50 68Z"
            fill="#FFD52A"
          />

          {/* Bright core */}
          <path
            d="M49 87
               C55 94 55 101 50 106
               C44 108 43 99 49 87Z"
            fill="#FFF4A5"
          />
        </motion.svg>
      </div>

      {/* Metal torch bowl */}
      <div
        className="absolute left-1/2 top-[66px] h-[14px] w-[54px] -translate-x-1/2"
        style={{
          clipPath: "polygon(0 0, 100% 0, 82% 100%, 18% 100%)",
          background:
            "linear-gradient(180deg, #FFD45C 0%, #B76B13 38%, #67330C 100%)",
          filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.8))",
        }}
      />

      {/* Golden bowl rim */}
      <div
        className="absolute left-1/2 top-[65px] h-[5px] w-[58px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, #FFF0A0, #E99A20 55%, #81400D)",
          boxShadow: "0 0 8px rgba(255,155,25,0.65)",
        }}
      />

      {/* Holder neck */}
      <div
        className="absolute left-1/2 top-[77px] h-[28px] w-[12px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, #5B290B, #F3B33D 35%, #A85B12 65%, #512407)",
          border: "1px solid #8B4D13",
        }}
      />

      {/* Decorative holder band */}
      <div
        className="absolute left-1/2 top-[83px] h-[5px] w-[18px] -translate-x-1/2"
        style={{
          background: "linear-gradient(180deg, #FFE18A, #B76B13)",
          borderRadius: "2px",
        }}
      />

      {/* Wall mounting bracket */}
      <div
        className="absolute left-1/2 top-[102px] h-[17px] w-[24px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, #522409, #C47A1B, #5B2C0A)",
          clipPath: "polygon(15% 0, 85% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Decorative base */}
      <div
        className="absolute left-1/2 top-[116px] h-[7px] w-[28px] -translate-x-1/2 rounded-sm"
        style={{
          background:
            "linear-gradient(180deg, #F4C45D, #9C5411 60%, #482006)",
          boxShadow: "0 3px 5px rgba(0,0,0,0.7)",
        }}
      />
    </div>
  );
}

/* --------------------------------------------------
   PAGE 01 — THE ROYAL GATE
-------------------------------------------------- */

export function RoyalGate() {
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();

  // Camera parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const bgX = useTransform(sx, [-1, 1], [14, -14]);
  const midX = useTransform(sx, [-1, 1], [26, -26]);
  const fgX = useTransform(sx, [-1, 1], [48, -48]);
  const fgY = useTransform(sy, [-1, 1], [16, -16]);

  const handleMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  // Enter kingdom + door sound
  const enter = () => {
    if (opening) return;

    setOpening(true);

    const doorAudio = new Audio("/sounds/Door.mp3");
    doorAudio.volume = 0.65;

    doorAudio.play().catch((error) => {
      console.warn("Door sound could not be played:", error);
    });

    window.dispatchEvent(
      new CustomEvent("kingdom:gate-open")
    );

    window.setTimeout(() => {
      navigate({ to: "/chronicle" });
    }, 3600);
  };

  return (
    <div
      className="scene relative overflow-hidden bg-background"
      onMouseMove={handleMove}
    >
      {/* CAMERA RIG */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          opening
            ? { scale: 2.5, y: "6%" }
            : { scale: 1, y: 0 }
        }
        transition={{
          duration: 3.4,
          ease: [0.5, 0, 0.4, 1],
          delay: 0.35,
        }}
        style={{ transformOrigin: "50% 62%" }}
      >
        {/* NIGHT SKY */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                180deg,
                rgba(5, 8, 22, 0.08) 0%,
                rgba(5, 8, 22, 0.18) 50%,
                rgba(5, 8, 22, 0.60) 100%
              ),
              url('/images/royal-night-sky.webp')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* DISTANT MOUNTAINS */}
        <motion.div
          className="absolute inset-x-0"
          style={{ x: bgX, top: "26%" }}
        >
          <MountainRange
            tone="oklch(0.22 0.035 268)"
            variant={0}
            className="h-[26vh]"
          />
        </motion.div>

        <motion.div
          className="absolute inset-x-0"
          style={{ x: midX, top: "34%" }}
        >
          <MountainRange
            tone="oklch(0.17 0.03 262)"
            variant={1}
            className="h-[22vh]"
          />
        </motion.div>

        {/* FORT WALL */}
        <motion.div
          className="absolute inset-x-0 bottom-[9%] h-[58%]"
          style={{ x: bgX }}
        >
          <StoneBlock className="inset-0" />

          {/* CASTLE MERLONS */}
          <div className="absolute -top-6 right-0 left-0 flex justify-around">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 34,
                  height: 26,
                  clipPath:
                    "polygon(0 100%, 0 30%, 50% 0, 100% 30%, 100% 100%)",
                  backgroundImage: "var(--gradient-stone)",
                }}
              />
            ))}
          </div>

          {/* MAIN GATE */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: "min(40vw, 400px)",
              height: "78%",
            }}
          >
            {/* GATE INTERIOR */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: "50% 50% 0 0 / 34% 34% 0 0",
                background:
                  "linear-gradient(180deg, oklch(0.1 0.02 50) 0%, oklch(0.14 0.03 45) 55%, oklch(0.2 0.04 48) 100%)",
              }}
            >
              <motion.div
                className="absolute inset-x-0 bottom-0 h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: opening ? 1 : 0 }}
                transition={{ duration: 2, delay: 1.6 }}
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, oklch(0.86 0.16 72 / 0.8) 0%, oklch(0.62 0.15 50 / 0.35) 38%, transparent 72%)",
                }}
              />

              <AmbientParticles count={16} seed={7} size={4} />
            </motion.div>

            {/* PHYSICAL DOORS */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: "50% 50% 0 0 / 34% 34% 0 0",
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              <GateDoor side="left" open={opening} />
              <GateDoor side="right" open={opening} />
            </div>

            {/* GOLDEN ARCH */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 z-20"
              style={{
                borderRadius: "50% 50% 0 0 / 34% 34% 0 0",
                border: "14px solid #D99A35",
                boxShadow: `
                  0 0 0 5px #4A2B12,
                  0 0 12px rgba(255, 184, 65, 0.45),
                  inset 0 0 12px rgba(0, 0, 0, 0.7)
                `,
              }}
            />

            {/* LOTUS KEYSTONE */}
            <svg
              viewBox="0 0 100 60"
              width="86"
              className="absolute -top-10 left-1/2 -translate-x-1/2"
              aria-hidden
            >
              <path
                d="M50 6 C60 22 76 26 92 26 C76 34 62 44 50 56 C38 44 24 34 8 26 C24 26 40 22 50 6 Z"
                fill="oklch(0.74 0.13 78)"
                stroke="oklch(0.4 0.07 55)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* FOUR ROYAL TORCHES */}

          {/* LEFT MAIN TORCH */}
          <div className="absolute bottom-[30%] left-[calc(50%-min(34vw,360px))]">
            <RoyalTorch intensity={opening ? 1.5 : 1} />
          </div>

          {/* RIGHT MAIN TORCH */}
          <div className="absolute bottom-[30%] right-[calc(50%-min(34vw,360px))]">
            <RoyalTorch
              intensity={opening ? 1.5 : 1}
              flip
            />
          </div>

          {/* LEFT WALL TORCH */}
          <div className="absolute bottom-[42%] left-[9%]">
            <RoyalTorch
              intensity={opening ? 1.35 : 0.85}
              scale={0.8}
            />
          </div>

          {/* RIGHT WALL TORCH */}
          <div className="absolute bottom-[42%] right-[9%]">
            <RoyalTorch
              intensity={opening ? 1.35 : 0.85}
              scale={0.8}
              flip
            />
          </div>

          {/* LEFT LION BANNER */}
          <motion.img
            src="/images/lion-banner.png"
            alt="Royal crimson banner with crowned golden lion"
            draggable={false}
            initial={{ opacity: 0, y: -25 }}
            animate={{
              opacity: opening ? 0 : 1,
              y: 0,
              rotate: [0, -1.2, 0, 1.2, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              y: { duration: 1.1 },
              rotate: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="
              pointer-events-none absolute top-[2%] left-[20%] z-20
              h-[190px] w-auto origin-top object-contain
              drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)]
              sm:h-[220px] lg:h-[245px]
            "
            style={{ transformOrigin: "50% 0%" }}
          />

          {/* RIGHT LION BANNER */}
          <motion.img
            src="/images/lion-banner.png"
            alt="Royal crimson banner with crowned golden lion"
            draggable={false}
            initial={{ opacity: 0, y: -25 }}
            animate={{
              opacity: opening ? 0 : 1,
              y: 0,
              rotate: [0, 1.2, 0, -1.2, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              y: { duration: 1.1 },
              rotate: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="
              pointer-events-none absolute top-[2%] right-[20%] z-20
              h-[190px] w-auto origin-top object-contain
              drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)]
              sm:h-[220px] lg:h-[245px]
            "
            style={{ transformOrigin: "50% 0%" }}
          />
        </motion.div>

        {/* FOREGROUND GROUND */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[11%]"
          style={{
            x: fgX,
            y: fgY,
            background:
              "linear-gradient(180deg, oklch(0.2 0.03 55), oklch(0.12 0.02 50))",
            boxShadow: "0 -18px 50px oklch(0 0 0 / 0.8)",
          }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent 0 60px, oklch(0.3 0.03 60 / 0.35) 60px 64px)",
            }}
          />
        </motion.div>

        {/* ATMOSPHERIC FOG AND PARTICLES */}
        <Fog
          className="inset-x-0 bottom-0 h-[42%]"
          opacity={0.55}
        />

        <AmbientParticles count={30} seed={3} />
      </motion.div>

      {/* WELCOME CONTENT */}
      <motion.div
        className="absolute inset-x-0 top-0 z-30 flex flex-col items-center px-5 pt-[6vh] text-center"
        animate={{
          opacity: opening ? 0 : 1,
          y: opening ? -30 : 0,
        }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="
            font-royal
            text-[12px] sm:text-sm
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#FFC247]
            [text-shadow:0_0_10px_rgba(255,185,45,0.8),0_2px_5px_rgba(0,0,0,0.95)]
          "        >
          ✦ The Kingdom of Innovation ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="
            mt-3
            font-royal
            text-4xl sm:text-6xl lg:text-7xl
            text-[#FFD36A]
            [text-shadow:0_0_8px_rgba(255,190,65,0.65),0_0_22px_rgba(255,150,25,0.4),0_3px_5px_rgba(0,0,0,0.95)]
          "        >
          Welcome, Traveller.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="
            mt-3
            max-w-xl
            font-script
            text-lg sm:text-xl
            text-[#FFE8B5]
            [text-shadow:0_0_8px_rgba(255,190,100,0.3),0_2px_6px_rgba(0,0,0,1)]
          "        >
          Beyond these gates lies a journey of ideas, code &amp; ambition.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-6"
        >
          <RoyalButton onClick={enter} disabled={opening}>
            Enter the Kingdom
          </RoyalButton>
        </motion.div>
      </motion.div>

      {/* CINEMATIC LIGHT BLOOM */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-45"
        initial={{ opacity: 0 }}
        animate={{
          opacity: opening ? [0, 0, 0.9, 1] : 0,
        }}
        transition={{
          duration: 3.6,
          times: [0, 0.55, 0.9, 1],
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 62%, oklch(0.95 0.1 82) 0%, oklch(0.7 0.14 60) 35%, oklch(0.1 0.02 50) 80%)",
        }}
      />

      {/* VIGNETTE */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 55%, transparent 40%, oklch(0.06 0.02 60 / 0.85) 100%)",
        }}
      />
    </div>
  );
}
