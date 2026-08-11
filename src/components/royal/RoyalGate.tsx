import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { GateDoor } from "./GateDoors";
import { Torch } from "./Torch";
import { AmbientParticles } from "./AmbientParticles";
import { Banner, Fog, MountainRange, StoneBlock } from "./SceneParts";
import { RoyalButton } from "./RoyalButton";

/**
 * PAGE 01 — The Royal Gate.
 * Layered 2.5D scene: sky → mountains → fort wall → archway interior →
 * two physical doors → pillars → torches → banners → foreground → fog → dust.
 */
export function RoyalGate() {
  const [opening, setOpening] = useState(false);
  const navigate = useNavigate();

  // camera parallax
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

  const enter = () => {
    if (opening) return;
    setOpening(true);
    // sound-ready hook: consumers can listen for this event
    window.dispatchEvent(new CustomEvent("kingdom:gate-open"));
    window.setTimeout(() => navigate({ to: "/chronicle" }), 3600);
  };

  return (
    <div className="scene bg-background" onMouseMove={handleMove}>
      {/* ── camera rig ────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={opening ? { scale: 2.5, y: "6%" } : { scale: 1, y: 0 }}
        transition={{ duration: 3.4, ease: [0.5, 0, 0.4, 1], delay: 0.35 }}
        style={{ transformOrigin: "50% 62%" }}
      >
        {/* sky */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-sky-night)" }} />
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full bg-parchment animate-glow-pulse"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 13) % 42}%`,
              width: 2,
              height: 2,
              animationDelay: `${i * 0.21}s`,
            }}
          />
        ))}
        <div
          aria-hidden
          className="absolute rounded-full"
          style={{
            left: "72%",
            top: "10%",
            width: 90,
            height: 90,
            background: "radial-gradient(circle, oklch(0.95 0.05 90), oklch(0.8 0.06 84 / 0.2) 62%, transparent)",
          }}
        />

        {/* mountains */}
        <motion.div className="absolute inset-x-0" style={{ x: bgX, top: "26%" }}>
          <MountainRange tone="oklch(0.22 0.035 268)" variant={0} className="h-[26vh]" />
        </motion.div>
        <motion.div className="absolute inset-x-0" style={{ x: midX, top: "34%" }}>
          <MountainRange tone="oklch(0.17 0.03 262)" variant={1} className="h-[22vh]" />
        </motion.div>

        {/* fort wall */}
        <motion.div className="absolute inset-x-0 bottom-[9%] h-[58%]" style={{ x: bgX }}>
          <StoneBlock className="inset-0" />
          {/* merlons along the top */}
          <div className="absolute -top-6 right-0 left-0 flex justify-around">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 34,
                  height: 26,
                  clipPath: "polygon(0 100%, 0 30%, 50% 0, 100% 30%, 100% 100%)",
                  backgroundImage: "var(--gradient-stone)",
                }}
              />
            ))}
          </div>

          {/* ── the gateway ── */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{ width: "min(40vw, 400px)", height: "78%" }}
          >
            {/* interior of the fort revealed behind the doors */}
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

            {/* the two physical doors */}
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

            {/* carved arch frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4"
              style={{
                borderRadius: "50% 50% 0 0 / 34% 34% 0 0",
                border: "14px solid transparent",
                borderImage: "var(--gradient-brass) 1",
                boxShadow: "0 0 0 6px oklch(0.24 0.02 55), inset 0 0 40px oklch(0 0 0 / 0.6)",
              }}
            />
            {/* lotus keystone */}
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

          {/* torches */}
          <Torch
            className="bottom-[30%] left-[calc(50%-min(34vw,360px))]"
            intensity={opening ? 1.5 : 1}
          />
          <Torch
            className="bottom-[30%] right-[calc(50%-min(34vw,360px))]"
            intensity={opening ? 1.5 : 1}
            flip
          />
          <Torch className="bottom-[42%] left-[9%]" intensity={opening ? 1.35 : 0.85} scale={0.8} />
          <Torch
            className="bottom-[42%] right-[9%]"
            intensity={opening ? 1.35 : 0.85}
            scale={0.8}
            flip
          />

          {/* banners */}
          <Banner className="top-[4%] left-[18%]" height={150} />
          <Banner
            className="top-[4%] right-[18%]"
            height={150}
            delay={1.2}
            color="oklch(0.58 0.15 60)"
          />
        </motion.div>


        {/* foreground ground */}
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

        <Fog className="inset-x-0 bottom-0 h-[42%]" opacity={0.55} />
        <AmbientParticles count={30} seed={3} />
      </motion.div>

      {/* ── UI layer ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-30 flex flex-col items-center px-6 pt-[7vh] text-center"
        animate={{ opacity: opening ? 0 : 1, y: opening ? -30 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-royal text-[11px] tracking-[0.5em] text-primary/80 uppercase"
        >
          Ranjit Chavan · The Kingdom of Code
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-4 font-royal text-4xl sm:text-6xl text-foreground text-glow-brass"
        >
          Welcome, Traveller.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="mt-3 max-w-xl font-script text-lg text-foreground/80 sm:text-xl"
        >
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
          <p className="mt-4 font-script text-xs tracking-widest text-foreground/45">
            Eight chapters await beyond the gate
          </p>
        </motion.div>
      </motion.div>

      {/* light bloom + fade to the next chapter */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-45"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? [0, 0, 0.9, 1] : 0 }}
        transition={{ duration: 3.6, times: [0, 0.55, 0.9, 1] }}
        style={{
          background:
            "radial-gradient(circle at 50% 62%, oklch(0.95 0.1 82) 0%, oklch(0.7 0.14 60) 35%, oklch(0.1 0.02 50) 80%)",
        }}
      />

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
