
import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { CHAPTERS, chapterFor } from "@/lib/journey";

/* Circular royal profile portrait */
function ProfileSeal({ open }: { open: boolean }) {
  return (
    <motion.div
      animate={{
        scale: open ? 0.94 : 1,
        rotate: open ? 5 : 0,
      }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="
        relative h-[68px] w-[68px]
        sm:h-[80px] sm:w-[80px]
        overflow-hidden rounded-full
        border-[3px] border-[#D9A441]
        bg-[#241509]
        shadow-[0_0_0_3px_rgba(125,78,24,0.55),0_0_22px_rgba(218,157,51,0.55)]
      "
    >
      <img
        src="/images/profile.jpeg"
        alt="Profile"
        className="h-full w-full rounded-full object-cover object-center"
        draggable={false}
      />

      {/* Golden inner ring */}
      <div className="pointer-events-none absolute inset-[3px] rounded-full border border-[#FFE3A0]/50" />

      {/* Subtle golden shine */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,225,150,0.2), transparent 45%, rgba(0,0,0,0.18))",
        }}
      />
    </motion.div>
  );
}

/* Small decorative divider */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#A87532]" />
      <span className="h-1.5 w-1.5 rotate-45 border border-[#D9A441]" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#A87532]" />
    </div>
  );
}

export function JourneyNavigation() {
  const [open, setOpen] = useState(false);

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const current = chapterFor(pathname);

  return (
    <>
      {/* TOP RIGHT PROFILE NAVIGATION */}
      <div className="fixed top-5 right-5 z-[60] flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="font-royal text-[13px] tracking-[0.3em] text-primary/80 uppercase">
            Chapter {String(current.n).padStart(2, "0")} / 08
          </p>

          <p className="font-script text-lg text-foreground/75">
            {current.name}
          </p>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close journey menu" : "Open journey menu"}
          aria-expanded={open}
          className="
            rounded-full transition-transform duration-300
            hover:scale-110
            focus-visible:ring-2 focus-visible:ring-primary
            focus-visible:outline-none
          "
        >
          <ProfileSeal open={open} />
        </button>
      </div>

      {/* ROYAL JOURNEY MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-5 py-24 backdrop-blur-[3px]"
            style={{
              background: "rgba(15, 6, 2, 0.94)",
            }}
            onClick={() => setOpen(false)}
          >
            {/* Subtle background glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 48%, rgba(130, 76, 25, 0.13), transparent 55%),
                  radial-gradient(ellipse at 15% 80%, rgba(105, 49, 16, 0.08), transparent 35%),
                  radial-gradient(ellipse at 85% 20%, rgba(105, 49, 16, 0.08), transparent 35%)
                `,
              }}
            />

            <motion.nav
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 25, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 15, opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 mx-auto w-full max-w-[760px]"
            >
              {/* Heading */}
              <div className="mb-9 text-center">
                <p className="mb-3 font-royal text-[25px] tracking-[0.3em] text-[#B8893F] uppercase ">
                  ✦ The Ranjit Chronicles ✦
                </p>

                <h2 className="font-royal text-2xl tracking-wide text-[#F0DFC0] sm:text-3xl">
                  The Journey
                </h2>

                <p className="mt-2 font-script text-base text-[#BDA17A] sm:text-base">
                  A journey of learning, building and growing.
                </p>

                <div className="mt-5">
                  <GoldDivider />
                </div>

                <p className="mt-4 font-royal text-[15px] tracking-[0.3em] text-[#8F7045] uppercase sm:text-[20px]">
                  Choose your next destination
                </p>
              </div>

              {/* Chapter navigation */}
              <ul className="grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-2 sm:gap-x-3">
                {CHAPTERS.map((c, i) => {
                  const active = pathname === c.to;

                  return (
                    <motion.li
                      key={c.to}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.045,
                        duration: 0.35,
                      }}
                    >
                      <Link
                        to={c.to}
                        onClick={() => setOpen(false)}
                        activeOptions={{ exact: true }}
                        className={`
                          group relative flex min-h-[48px] items-center gap-3
                          border-l border-[#8B612C]/50
                          px-3 py-3 transition-all duration-300
                          hover:border-[#D9A441]
                          hover:bg-[#A87532]/10
                          ${active ? "border-[#D9A441] bg-[#A87532]/15" : ""}
                        `}
                      >
                        {/* Chapter number */}
                        <span
                          className={`
                            shrink-0 font-royal text-[20px] tracking-wider
                            ${active ? "text-[#E6B85C]" : "text-[#98702F]"}
                          `}
                        >
                          {String(c.n).padStart(2, "0")}
                        </span>

                        {/* Chapter name */}
                        <span
                          className={`
                            whitespace-nowrap font-royal text-xl tracking-wide
                            transition-colors duration-300 sm:text-base
                            ${active ? "text-[#F5D28A]" : "text-[#E0D1B6]"}
                            group-hover:text-[#F5D28A]
                          `}
                        >
                          {c.name}
                        </span>

                        {/* Subtitle */}
                        <span className="ml-auto whitespace-nowrap font-script text-[11px] text-[#A58D6D]">
                          {c.subtitle}
                        </span>

                        {/* Active indicator */}
                        {active && (
                          <motion.span
                            layoutId="activeChapter"
                            className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#E6B85C] shadow-[0_0_8px_#D9A441]"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Footer decoration */}
              <div className="mt-9 text-center">
                <GoldDivider />

                <p className="mt-4 font-royal text-[19px] tracking-[0.3em] text-[#987443] uppercase">
                  Every chapter builds a legacy
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
