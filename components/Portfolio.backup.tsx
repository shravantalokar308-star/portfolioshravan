"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import emailjs from "@emailjs/browser";
import {
  ArrowUpRight,
  Blocks,
  Braces,
  Code2,
  Database,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Plane,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { AnimatedBackground } from "./AnimatedBackground";

const navItems = ["About", "Experience", "Contact"];

const techStacks = [
  {
    icon: <Code2 size={24} />,
    title: "Java",
    copy: "Robust backends, APIs, DSA-first problem solving, and clean domain logic."
  },
  {
    icon: <Globe2 size={24} />,
    title: "Web Dev",
    copy: "React, Next.js, Tailwind, motion systems, and responsive product interfaces."
  },
  {
    icon: <Server size={24} />,
    title: "APIs",
    copy: "REST workflows, integration layers, auth-aware services, and reliable data flow."
  },
  {
    icon: <Database size={24} />,
    title: "Data",
    copy: "SQL modeling, persistence, query design, and practical performance tuning."
  }
];

const experiences = [
  {
    title: "Full-Stack Developer",
    company: "Independent Projects",
    date: "2025 - Present",
    points: [
      "Built responsive web applications with production-minded component architecture.",
      "Integrated APIs, form workflows, and polished UI states for real user journeys.",
      "Improved delivery speed by creating reusable Tailwind and React patterns."
    ]
  },
  {
    title: "Java Developer",
    company: "Core Engineering Practice",
    date: "2024 - 2025",
    points: [
      "Designed maintainable Java modules with strong separation of concerns.",
      "Solved algorithmic problems with attention to complexity, correctness, and clarity.",
      "Translated business requirements into testable backend behaviors."
    ]
  },
  {
    title: "Frontend Engineer",
    company: "Modern Web Builds",
    date: "2023 - 2024",
    points: [
      "Created accessible, animated interfaces with responsive layouts across devices.",
      "Used micro-interactions to make dense technical content feel intuitive.",
      "Optimized visual hierarchy and asset loading for fast first impressions."
    ]
  }
];

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 420, damping: 34 });
  const springY = useSpring(cursorY, { stiffness: 420, damping: 34 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX - 14);
      cursorY.set(event.clientY - 14);
    };
    const enter = () => setActive(true);
    const leave = () => setActive(false);
    const selectors = "a, button, input, textarea, [data-cursor]";
    const elements = Array.from(document.querySelectorAll(selectors));

    window.addEventListener("mousemove", move);
    elements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-7 w-7 rounded-full border border-cyan-200/80 mix-blend-difference md:block"
      style={{
        x: springX,
        y: springY,
        scale: active ? 1.85 : 1,
        background: active ? "rgba(33, 212, 253, 0.28)" : "transparent"
      }}
    />
  );
}

function SectionTitle({
  kicker,
  title,
  copy
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
        {kicker}
      </p>
      <h2 className="text-3xl font-black tracking-normal text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{copy}</p>
    </div>
  );
}

function GlassButton({
  href,
  children,
  primary = false
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition duration-300 ${
        primary
          ? "bg-cyan-300 text-slate-950 shadow-[0_0_34px_rgba(33,212,253,0.34)] hover:bg-white hover:shadow-[0_0_58px_rgba(33,212,253,0.68)]"
          : "glass text-white hover:border-cyan-200/60 hover:text-cyan-100"
      }`}
    >
      {children}
      <ArrowUpRight
        size={18}
        className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

function Hero() {
  const y = useMotionValue(0);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 sm:px-8">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
        style={{ y }}
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.07fr_0.93fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-cyan-100">
            <Sparkles size={16} />
            Available for ambitious product builds
          </div>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-7xl lg:text-8xl">
            <span className="block">Engineering</span>
            <span className="typewriter text-gradient mt-2 block">clarity into code.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            I design and build fast, resilient digital products with Java, React,
            Next.js, and a problem-solving mindset that keeps real users at the center.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <GlassButton href="#contact" primary>
              Start a project
            </GlassButton>
            <GlassButton href="#experience">View experience</GlassButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.85, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="glass relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] p-4">
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=1100&q=85"
              alt="Professional developer portrait"
              fill
              priority
              sizes="(min-width: 1024px) 36rem, 90vw"
              className="object-cover opacity-90 saturate-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute bottom-5 left-5 right-5 rounded-2xl p-4"
            >
              <p className="text-sm text-slate-300">Current focus</p>
              <p className="mt-1 text-xl font-black text-white">Shipping polished web systems</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.6fr_0.4fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="glass relative aspect-[16/11] overflow-hidden rounded-[2rem]"
          >
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=85"
              alt="Modern engineering workspace"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/88 via-slate-950/20 to-cyan-400/10" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Best-in-class delivery
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black text-white sm:text-5xl">
                Thoughtful systems, sharp interfaces, measurable outcomes.
              </h2>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
            About
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-normal text-white sm:text-5xl">
            I turn ambiguous problems into maintainable software.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            My strongest work happens where product thinking meets engineering discipline:
            clarifying the problem, choosing the simplest reliable architecture, and making
            the final experience feel fast, calm, and complete.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {techStacks.map((stack) => (
              <Tilt key={stack.title} tiltMaxAngleX={7} tiltMaxAngleY={7} scale={1.02}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="glass h-full rounded-2xl p-5 transition duration-300 hover:border-cyan-200/60"
                  data-cursor
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200">
                    {stack.icon}
                  </div>
                  <h3 className="text-xl font-black text-white">{stack.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{stack.copy}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <SectionTitle
        kicker="Experience"
        title="A timeline that moves with the work"
        copy="Each role sharpens the same craft: understand the goal, build the right abstraction, and make every interaction earn its place."
      />
      <div ref={ref} className="relative mx-auto max-w-6xl py-6">
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-300 via-violet-300 to-cyan-200 md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: scrollYProgress }}
        />
        <div className="space-y-12">
          {experiences.map((item, index) => {
            const left = index % 2 === 0;
            return (
              <motion.div
                key={`${item.company}-${item.title}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6 }}
                className={`relative grid gap-4 pl-12 md:grid-cols-2 md:pl-0 ${
                  left ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                  className={`absolute left-4 top-8 h-px w-8 origin-left bg-cyan-200 md:left-1/2 md:w-16 ${
                    left ? "md:-translate-x-16 md:origin-right" : "md:origin-left"
                  }`}
                />
                <div className="absolute left-[0.55rem] top-6 h-4 w-4 rounded-full border-2 border-cyan-200 bg-slate-950 shadow-[0_0_26px_rgba(33,212,253,0.65)] md:left-1/2 md:-translate-x-1/2" />
                <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01}>
                  <motion.article
                    whileHover={{ y: -7 }}
                    className="glass rounded-2xl p-6 transition duration-300 hover:border-violet-200/50"
                    data-cursor
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-black text-white">{item.title}</h3>
                        <p className="mt-1 text-cyan-200">{item.company}</p>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                        {item.date}
                      </span>
                    </div>
                    <ul className="space-y-3 text-sm leading-6 text-slate-300">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <Zap className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setMessage("Add your EmailJS environment variables to send this directly to Gmail.");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.get("name"),
          reply_to: formData.get("email"),
          message: formData.get("message")
        },
        { publicKey }
      );
      setStatus("success");
      setMessage("Message sent. I will get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something blocked the send. Please try again in a moment.");
    }
  }

  return (
    <section id="contact" className="px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
            Contact
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-normal text-white sm:text-6xl">
            Let&apos;s build something that feels expensive to use.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Send the idea, the problem, or the messy first draft. I&apos;ll help turn it
            into a focused plan and a product that can scale past the first version.
          </p>
          <div className="mt-8 flex gap-3">
            <a className="glass rounded-full p-3 text-cyan-100 transition hover:text-white" href="mailto:yourname@gmail.com" aria-label="Email">
              <Mail size={20} />
            </a>
            <a className="glass rounded-full p-3 text-cyan-100 transition hover:text-white" href="https://github.com/" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a className="glass rounded-full p-3 text-cyan-100 transition hover:text-white" href="https://www.linkedin.com/" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-8">
            <label className="float-label relative block pt-6">
              <input
                name="name"
                type="text"
                required
                placeholder=" "
                className="w-full border-0 border-b border-white/15 bg-transparent pb-3 text-white outline-none transition focus:border-cyan-200"
              />
              <span className="pointer-events-none absolute left-0 top-6 origin-left text-slate-400 transition duration-200">
                Name
              </span>
            </label>
            <label className="float-label relative block pt-6">
              <input
                name="email"
                type="email"
                required
                placeholder=" "
                className="w-full border-0 border-b border-white/15 bg-transparent pb-3 text-white outline-none transition focus:border-cyan-200"
              />
              <span className="pointer-events-none absolute left-0 top-6 origin-left text-slate-400 transition duration-200">
                Email
              </span>
            </label>
            <label className="float-label relative block pt-6">
              <textarea
                name="message"
                required
                placeholder=" "
                rows={5}
                className="w-full resize-none border-0 border-b border-white/15 bg-transparent pb-3 text-white outline-none transition focus:border-cyan-200"
              />
              <span className="pointer-events-none absolute left-0 top-6 origin-left text-slate-400 transition duration-200">
                Message
              </span>
            </label>
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 text-sm font-black text-slate-950 shadow-[0_0_34px_rgba(33,212,253,0.34)] transition duration-300 hover:bg-white hover:shadow-[0_0_58px_rgba(33,212,253,0.68)] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Sending" : "Send message"}
              <Plane size={18} className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
            <div className="min-h-8 text-sm text-slate-300">
              {status === "success" && (
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 text-cyan-100"
                >
                  <motion.span
                    initial={{ x: -20, y: 18, opacity: 0, rotate: -18 }}
                    animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Plane size={18} />
                  </motion.span>
                  {message}
                </motion.span>
              )}
              {status === "error" && <span className="text-rose-200">{message}</span>}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0.45, 0.9]);
  const headerBg = useTransform(
    headerOpacity,
    (value) => `rgba(7, 9, 15, ${value})`
  );

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <CustomCursor />
      <motion.div
        className="fixed left-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-cyan-300 via-violet-300 to-white"
        style={{ scaleX: progress }}
      />
      <motion.header
        style={{ backgroundColor: headerBg }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 px-5 py-4 backdrop-blur-xl sm:px-8"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="flex items-center gap-3 font-black text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 text-slate-950">
              <Braces size={22} />
            </span>
            <span>Shravan</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-bold text-cyan-100 transition hover:border-cyan-200/60 hover:text-white"
          >
            <Rocket size={16} />
            Hire me
          </a>
        </nav>
      </motion.header>
      <Hero />
      <About />
      <section className="px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["20+", "polished UI flows", <Blocks key="blocks" size={22} />],
            ["Fast", "performance-first builds", <Zap key="zap" size={22} />],
            ["Secure", "clean integration patterns", <ShieldCheck key="shield" size={22} />]
          ].map(([metric, label, icon]) => (
            <div key={String(label)} className="glass rounded-2xl p-6">
              <div className="mb-6 text-cyan-200">{icon}</div>
              <p className="text-4xl font-black text-white">{metric}</p>
              <p className="mt-2 text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <Timeline />
      <Contact />
    </main>
  );
}
