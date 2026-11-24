
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";

import { AnimatedParchment } from "./AnimatedParchment";
import { Candle, InkPot, Quill, WaxSeal } from "./DeskProps";
import { Torch } from "./Torch";
import { AmbientParticles } from "./AmbientParticles";
import { StoneBlock } from "./SceneParts";
import { CinematicTransition } from "./CinematicTransition";
import { ChapterFooter } from "./ChapterFooter";

// ==========================================
// RESUME DATA
// ==========================================

const PROJECTS = [
  {
    name: "Pralay",
    subtitle:
      "Integrated Platform for Crowdsourced Ocean Hazard Reporting and Social Media Analytics",
    period: "October 2025",
    description:
      "Developed an integrated disaster intelligence platform for ocean hazard reporting with geo-tagged citizen reports and AI-based validation.",
    highlights: [
      "Implemented social media analytics for disaster-related posts.",
      "Designed role-based access for authorities.",
      "Built emergency alerts using Twilio and SendGrid.",
      "Integrated Leaflet maps for location tracking.",
    ],
    stack:
      "React.js, TypeScript, Python, Django REST Framework, PostgreSQL, Leaflet, Tailwind CSS, Twilio, SendGrid",
  },
  {
    name: "HR Analytics Dashboard",
    subtitle: "Employee Attrition Analysis",
    period: "September 2025",
    description:
      "Created an interactive Power BI dashboard to analyze employee attrition across different organizational dimensions.",
    highlights: [
      "Analyzed attrition by education, age, salary and job role.",
      "Created KPI cards for employee count and attrition rate.",
      "Used DAX, filters and charts for interactive insights.",
    ],
    stack: "Power BI, Excel, DAX, Data Visualization",
  },
  {
    name: "Sinhgad Hackathon Registration Platform",
    subtitle: "Hackathon Registration Website",
    period: "2025",
    description:
      "Developed a website for hackathon team registrations with form validation and participant data management.",
    highlights: [
      "Implemented team registration forms.",
      "Managed participant data.",
      "Deployed the platform on GoDaddy.",
    ],
    stack: "HTML, CSS, PHP, GoDaddy",
  },
];

const SKILLS = [
  {
    title: "Programming & Web Development",
    items:
      "Python, JavaScript, Django, React.js, REST APIs, HTML5, CSS3, Tailwind CSS",
  },
  {
    title: "Data & Analytics",
    items: "Power BI, Microsoft Fabric",
  },
  {
    title: "Databases",
    items: "PostgreSQL, MySQL",
  },
  {
    title: "Tools & Platforms",
    items: "Git, GitHub, Render, Postman",
  },
  {
    title: "Core Skills",
    items: "Data Structures & Algorithms, OOP, Prompt Engineering",
  },
  {
    title: "Soft Skills",
    items: "Leadership & Mentoring, Public Speaking, Quick Learner",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech – Computer Science & Engineering",
    institution: "SKNSCOE, Pandharpur",
    year: "2023 – 2027",
    score: "GPA: 9.56/10",
  },
  {
    degree: "Higher Secondary Education",
    institution: "L.S.V.D Vidyalaya and Jr. College, Javale",
    year: "2023",
    score: "84%",
  },
  {
    degree: "Secondary Education",
    institution: "L.S.V.D Vidyalaya, Javale",
    year: "2021",
    score: "84.20%",
  },
];

const ACHIEVEMENTS = [
  "Microsoft Certified: Fabric Data Engineer Associate",
  "Solved 250+ problems on LeetCode",
  "Golden Badge – Python Programming",
  "MHT-CET 2023 – 98.20 Percentile",
  "Winner – Sinhgad Hackathon 2024",
  "Winner – Hackathon at NBN Solapur",
];

const ACTIVITIES = [
  "Coordinated college activities.",
  "Conducted activities under the HackBreakers technical team.",
];

const LANGUAGES = ["English", "Hindi", "Marathi"];

const INTERESTS = [
  "Sketching",
  "Self Improvement",
  "Teaching",
  "Movies",
];

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

function ResumeHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-ink/30 pb-2 font-royal text-lg font-bold tracking-wide text-ink">
      {children}
    </h2>
  );
}

function ResumeProject({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative border-l-2 border-ink/25 pl-4"
    >
      <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-ink" />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-royal text-sm font-bold text-ink">
          {project.name}
        </h3>

        <span className="font-script text-sm text-ink/60">
          {project.period}
        </span>
      </div>

      <p className="mt-1 font-script text-lg italic text-ink/70">
        {project.subtitle}
      </p>

      <p className="mt-2 font-script text-lg leading-relaxed text-ink/85">
        {project.description}
      </p>

      <ul className="mt-2 space-y-1">
        {project.highlights.map((item) => (
          <li
            key={item}
            className="flex gap-2 font-script text-base leading-relaxed text-ink/80"
          >
            <span className="shrink-0">✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-2 font-script text-base leading-relaxed text-ink/70">
        <strong className="text-ink">Technologies:</strong> {project.stack}
      </p>
    </motion.article>
  );
}

// ==========================================
// MAIN ROYAL RECORDS PAGE
// ==========================================

export function RoyalChronicle() {
  // Royal edict sound reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play royal sound when this page mounts
  useEffect(() => {
    const audio = new Audio("/sounds/Royal-edict.mp3");

    audio.volume = 0.45;
    audio.preload = "auto";

    audioRef.current = audio;

    audio.play().catch((error) => {
      console.warn("Royal edict audio could not autoplay:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  return (
    <CinematicTransition variant="doors">
      {/* ROYAL CHAMBER BACKGROUND */}

      <div
        className="absolute inset-0"
        style={{ background: "var(--color-night)" }}
      />

      <StoneBlock className="inset-0" />

      {/* Ambient golden light */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 40%, oklch(0.72 0.13 62 / 0.22), transparent 70%)",
        }}
      />

      {/* Wall arches */}

      {[12, 88].map((x) => (
        <div
          key={x}
          aria-hidden
          className="absolute top-[16%] hidden h-[34%] w-[9%] md:block"
          style={{
            left: `${x}%`,
            transform: "translateX(-50%)",
            borderRadius: "50% 50% 0 0 / 40% 40% 0 0",
            background:
              "linear-gradient(180deg, oklch(0.13 0.02 50), oklch(0.19 0.03 52))",
            boxShadow: "inset 0 0 40px oklch(0 0 0 / 0.8)",
          }}
        />
      ))}

      {/* Torches */}

      <Torch className="top-[26%] left-[6%]" scale={0.9} />
      <Torch className="top-[26%] right-[6%]" scale={0.9} flip />

      {/* ROYAL DESK */}

      <div className="absolute inset-x-0 bottom-0 z-20 h-[26%]">
        <div
          className="absolute inset-x-0 top-0 h-6 wood-surface"
          style={{
            boxShadow: "0 -8px 30px oklch(0 0 0 / 0.7)",
          }}
        />

        <div
          className="absolute inset-x-0 top-6 bottom-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.24 0.045 44), oklch(0.14 0.03 42))",
          }}
        />

        <Candle className="bottom-[68%] left-[10%]" scale={1.1} />

        <Candle
          className="bottom-[68%] right-[14%]"
          scale={0.85}
          height={40}
        />

        <InkPot className="bottom-[62%] left-[26%] hidden sm:block" />
        <Quill className="bottom-[60%] left-[30%] hidden sm:block" />

        <WaxSeal
          className="bottom-[62%] right-[26%] hidden sm:block"
          size={58}
        />

        {/* Royal books */}

        <div
          className="absolute right-[6%] bottom-[62%] hidden sm:block"
          aria-hidden
        >
          {[
            "oklch(0.4 0.09 34)",
            "oklch(0.34 0.06 60)",
            "oklch(0.3 0.05 120)",
          ].map((color, index) => (
            <div
              key={index}
              style={{
                width: 96 - index * 6,
                height: 13,
                background: color,
                marginTop: 2,
                borderRadius: 2,
                boxShadow: "0 3px 8px oklch(0 0 0 / 0.6)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ======================================
          ONLY RESUME CONTENT
      ====================================== */}

      <main className="relative z-30 mx-auto w-full max-w-5xl px-5 pt-24 pb-48">
        {/* PAGE TITLE */}

        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 text-center"
        >
          <p className="font-royal text-xs tracking-[0.4em] text-primary">
            THE ROYAL RECORDS
          </p>

          <h1 className="mt-3 font-royal text-3xl text-foreground sm:text-4xl">
            The Professional Record
          </h1>

          <p className="mt-2 font-script text-base text-foreground/60">
            Skills, achievements and works of the traveller
          </p>
        </motion.div> */}

        {/* RESUME PARCHMENT */}

        <motion.section
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <AnimatedParchment delay={0.3}>
            {/* HEADER */}

            <header className="text-center">
              <h2 className="font-royal text-3xl font-bold text-ink sm:text-4xl">
                Ranjit Chavan
              </h2>

              <p className="font-script text-base text-ink/80">
                Full Stack Developer
              </p>

              <p className="-mt-1 font-script text-sm text-ink/70">
                Solapur, Maharashtra, India
              </p>

              <div className="-mt-1 flex flex-wrap justify-center gap-x-5 gap-y-2 font-script text-base text-ink">
                <a href="tel:+918432457236">+91 8432457236</a>

                <a href="mailto:ranjit.chavan.sknscoe.comp@gmail.com">
                  Email
                </a>

                <a
                  href="https://github.com/RanjitChavan1818"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/ranjit-chavan-9746872a4/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </header>

            <div className="my-4 h-px w-full bg-ink/30" />

            {/* TWO COLUMN LAYOUT */}

            <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
              {/* LEFT COLUMN */}

              <div className="space-y-8">
                {/* PROJECTS */}

                <section>
                  <ResumeHeading>Projects</ResumeHeading>

                  <div className="space-y-7">
                    {PROJECTS.map((project) => (
                      <ResumeProject
                        key={project.name}
                        project={project}
                      />
                    ))}
                  </div>
                </section>

                {/* LANGUAGES */}

                <section>
                  <ResumeHeading>Languages</ResumeHeading>

                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((language) => (
                      <span
                        key={language}
                        className="border border-ink/30 px-3 py-1 font-script text-sm text-ink/85"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </section>

                {/* INTERESTS */}

                <section>
                  <ResumeHeading>Interests</ResumeHeading>

                  <div className="-mt-2 flex flex-wrap gap-2">
                    {INTERESTS.map((interest) => (
                      <span
                        key={interest}
                        className="border border-ink/30 px-3 py-1 font-script text-sm text-ink/85"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* RIGHT COLUMN */}

              <div className="space-y-8">
                {/* TECHNICAL SKILLS */}

                <section>
                  <h2 className="mb-3 border-b border-ink/30 pb-1 font-royal text-lg font-bold tracking-wide text-ink">
                    Technical Skills
                  </h2>

                  <div className="space-y-3">
                    {SKILLS.map((skill) => (
                      <div key={skill.title}>
                        <h3 className="font-royal text-sm font-bold text-ink">
                          {skill.title}
                        </h3>

                        <p className="mt-1 font-script text-base leading-snug text-ink/85">
                          {skill.items}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* EDUCATION */}

                <section>
                  <ResumeHeading>Education</ResumeHeading>

                  <div className="space-y-2.5">
                    {EDUCATION.map((edu) => (
                      <div key={edu.degree}>
                        <h3 className="font-royal text-base font-bold text-ink">
                          {edu.degree}
                        </h3>

                        <p className="mt-1 font-script text-base text-ink/80">
                          {edu.institution}
                        </p>

                        <div className="mt-1 flex flex-wrap justify-between gap-2 font-script text-base text-ink/65">
                          <span>{edu.year}</span>
                          <span>{edu.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ACHIEVEMENTS */}

                <section>
                  <ResumeHeading>Achievements & Honors</ResumeHeading>

                  <ul className="space-y-3">
                    {ACHIEVEMENTS.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 font-script text-lg text-ink/85"
                      >
                        <span>✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* LEADERSHIP */}

                <section>
                  <ResumeHeading>Leadership & Activities</ResumeHeading>

                  <ul className="space-y-3">
                    {ACTIVITIES.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 font-script text-lg text-ink/85"
                      >
                        <span>✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* FOOTER */}

            <div className="mt-10 border-t border-ink/30 pt-6 text-center">
              <p className="font-royal text-xs tracking-[0.3em] text-ink/70">
                THE KINGDOM IS STILL GROWING
              </p>

            
<motion.a
  href="https://drive.google.com/file/d/1GgP8jtCz9v7vydrgWs2PG0LW5YddQ-FG/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{
    scale: 1.06,
    y: -3,
    boxShadow: "0 8px 20px rgba(120, 75, 25, 0.35)",
  }}
  whileTap={{ scale: 0.96 }}
  className="
    mt-4 inline-flex items-center justify-center gap-2
    rounded-md border-2 border-[#A87932]
    bg-gradient-to-b from-[#F2D18A] via-[#D6A64F] to-[#A8752E]
    px-5 py-1.5
    font-royal text-xs font-bold tracking-[0.15em]
    text-[#432512]
    shadow-[0_4px_10px_rgba(70,40,10,0.3)]
    transition-all duration-300
    hover:brightness-110
  "
>
  <span className="text-base">📜</span>
  - Ranjit Chavan
  <span className="text-sm">↗</span>
</motion.a>

            </div>
          </AnimatedParchment>
        </motion.section>
      </main>
      

      {/* ATMOSPHERE */}

      <AmbientParticles count={18} seed={11} />

      <ChapterFooter />
    </CinematicTransition>
  );
}
