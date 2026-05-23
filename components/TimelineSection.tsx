"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const timelineData = [
  {
    title: "Java Developer Intern",
    company: "Nileson IT Consultancy",
    period: "2025",
    location: "Remote",
    description: "Core Java development ,JDBC,Servlets,JSP",
    side: "left"
  },
  {
    title: "Software Design and AI Intern - Backend",
    company: "Preskilet",
    period: "Oct-Jan 2025",
    location: "Remote",
    description: "Designed and developed restful APIs using Node.js and Express.js, integrated AI models for intelligent features, and optimized backend performance for scalability.",
    side: "right"
  }
];

function TimelineItem({ item, index, isMobile }: { item: typeof timelineData[0]; index: number; isMobile: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.1 }}
      className={`relative flex flex-col md:flex-row mb-12 ${
        item.side === "right" ? "md:flex-row-reverse" : ""
      } justify-between items-stretch`}
    >
      {/* Content */}
      <div className="w-full md:w-[45%] pl-10 md:pl-0">
        <motion.div
          whileHover={isMobile ? undefined : { x: item.side === "left" ? -6 : 6 }}
          className="relative p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
        >
          <div className="flex items-start gap-3 mb-3">
            <Briefcase className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-cyan-400 font-semibold">{item.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {item.period}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {item.location}
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      </div>

      {/* Node element: Centered on desktop, left-aligned absolute on mobile */}
      <div className="absolute md:relative left-4 md:left-auto md:w-1/12 flex md:justify-center items-start pt-[26px] md:pt-6 z-10 transform -translate-x-1/2 md:translate-x-0">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 10px rgba(0, 212, 255, 0.3)",
              "0 0 25px rgba(0, 212, 255, 0.6)",
              "0 0 10px rgba(0, 212, 255, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full border-2 border-cyan-300 flex-shrink-0"
        >
          <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-30" />
        </motion.div>
      </div>

      {/* Balanced layout spacer for desktop */}
      <div className="hidden md:block w-[45%]" />
    </motion.div>
  );
}

export function TimelineSection() {
  const sectionRef = useRef(null);

  // Responsive state for performance and touch optimizations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const isInView = useInView(sectionRef, { once: true, margin: isMobile ? "-40px" : "-100px" });

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-4">
          Professional Journey
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Experience & Growth
        </h2>
      </motion.div>

      {/* Timeline container */}
      <div className="relative">
        {/* Left vertical line on mobile, center vertical line on desktop */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50 transform -translate-x-1/2" />

        {/* Timeline items */}
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}