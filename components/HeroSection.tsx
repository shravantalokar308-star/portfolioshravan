"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Full Stack Web Developer";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-6"
        >
          Welcome to my portfolio
        </motion.p>

        <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
          <span className="text-white">I'm </span>
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-xl opacity-50" />
            <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Shravan
            </span>
          </span>
          <span className="text-white"> </span>
        </h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-gray-300 mb-8 h-12 flex items-center justify-center"
        >
          <span className="flex items-center gap-2">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-cyan-400"
            >
              
            </motion.span>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.2, ease: "easeOut" }}
          className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-cyan-400">Learning</span>, <span className="text-cyan-400">Building</span>, <span className="text-cyan-400">and Growing</span> Everyday.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            className="clickable group relative px-8 py-4 font-bold text-lg rounded-lg overflow-hidden"
            onClick={() => {
              const element = document.getElementById("projects");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-100 group-hover:opacity-110 transition-opacity" />
            <div className="relative flex items-center justify-center gap-2 text-white">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <a
            href="#contact"
            className="clickable px-8 py-4 font-bold text-lg rounded-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300 text-center"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 rounded-lg border border-cyan-500/30 opacity-30"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-32 h-32 rounded-lg border border-blue-500/20 opacity-20"
        />
      </motion.div>
    </section>
  );
}
