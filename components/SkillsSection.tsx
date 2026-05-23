"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaJava, FaNodeJs, FaReact, FaHtml5, FaCss3, FaJs, FaCode } from "react-icons/fa";
import { SiMongodb, SiMysql, SiExpress, SiCplusplus, SiEjs } from "react-icons/si";

const skills = [
  { name: "Java", icon: FaJava, color: "from-orange-500 to-red-600" },
  { name: "Data Structures and Algorithms", icon: FaCode, color: "from-purple-600 to-indigo-600" },
  { name: "Nodejs", icon: FaNodeJs, color: "from-green-500 to-cyan-600" },
  { name: "Expressjs", icon: SiExpress, color: "from-gray-500 to-gray-600" },
  { name: "MongoDB", icon: SiMongodb, color: "from-green-600 to-green-700" },
  { name: "Mysql", icon: SiMysql, color: "from-blue-600 to-orange-500" },
  { name: "C++", icon: SiCplusplus, color: "from-blue-500 to-purple-600" },
  { name: "HTML5", icon: FaHtml5, color: "from-orange-500 to-orange-600" },
  { name: "CSS3", icon: FaCss3, color: "from-blue-400 to-cyan-500" },
  { name: "Javascript", icon: FaJs, color: "from-yellow-500 to-orange-500" },
  { name: "EJS", icon: SiEjs, color: "from-gray-400 to-gray-500" }
];

function SkillCard({ skill, index, isMobile }: { skill: typeof skills[0]; index: number; isMobile: boolean }) {
  const IconComponent = skill.icon;
  const ref = useRef(null);

  // Stagger delays on desktop, instantaneous scroll reveals on mobile for fluid scrolling
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: isMobile ? 0 : index * 0.05,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-30px" : "-100px" }}
      variants={cardVariants}
      whileHover={isMobile ? undefined : { 
        y: -6, 
        boxShadow: "0 12px 30px -5px rgba(6, 182, 212, 0.2), 0 8px 16px -6px rgba(6, 182, 212, 0.2)"
      }}
      whileTap={{ 
        scale: 0.97,
        boxShadow: "0 4px 12px -3px rgba(6, 182, 212, 0.1), 0 4px 6px -4px rgba(6, 182, 212, 0.1)"
      }}
      className="group outline-none"
    >
      <div 
        className={`relative rounded-xl p-5 sm:p-6 backdrop-blur-xl bg-white/5 border border-white/10 ${
          isMobile ? "active:border-cyan-500/40" : "group-hover:border-cyan-500/50"
        } transition-colors duration-300 overflow-hidden`}
      >
        {/* Gradient background overlay on hover/tap */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 ${
            isMobile ? "group-active:opacity-10" : "group-hover:opacity-10"
          } transition-opacity duration-300`}
        />

        {/* Content Layout: Row on mobile, Centered Column on desktop */}
        <div className="relative flex flex-row sm:flex-col items-center justify-start sm:justify-center text-left sm:text-center gap-4 sm:gap-0">
          <motion.div
            animate={isMobile ? undefined : { rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={isMobile ? undefined : { rotate: 8, scale: 1.08 }}
            className={`p-3 sm:mb-4 rounded-lg bg-gradient-to-br ${skill.color} text-white flex items-center justify-center shrink-0`}
          >
            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
          </motion.div>

          <h3 className="font-bold text-white text-base sm:text-sm group-hover:text-cyan-300 group-active:text-cyan-300 transition-colors">
            {skill.name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef(null);
  
  // Media query state to handle responsive behaviors and touch interactions cleanly
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const isInView = useInView(sectionRef, { once: true, margin: isMobile ? "-40px" : "-100px" });

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 sm:mb-20"
      >
        <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-4">
          Skills & Tools
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
          Technology Stack
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Proficient with modern tools and technologies for building scalable systems
        </p>
      </motion.div>

      {/* Responsive Skills Grid: 1 column on mobile, multi-column on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 sm:gap-4 px-4 sm:px-0">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}
