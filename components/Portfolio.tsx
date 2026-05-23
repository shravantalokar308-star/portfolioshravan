"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Github, Linkedin, Twitter } from "lucide-react";

import { AnimatedBackground } from "./AnimatedBackground";
import { CustomCursor } from "./CustomCursor";
import { HeroSection } from "./HeroSection";
import { TimelineSection } from "./TimelineSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";

function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 max-w-4xl mx-auto pb-32 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-4">
          Get In Touch
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Let's Work Together
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Reach out and let's create something amazing together.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="group">
            <div className="flex items-center gap-4 p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
              <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <a href="mailto:hello@example.com" className="text-white font-semibold hover:text-cyan-400 transition-colors">
                  shravantalokar@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3 flex flex-col items-center md:items-start">
            <p className="text-gray-400 text-sm font-semibold">Follow Me</p>
            <div className="flex gap-4 justify-center md:justify-start">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="clickable p-4 rounded-lg backdrop-blur-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6 p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-cyan-500/20"
        >
          <div>
            <label className="block text-white font-semibold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-500/20 text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === "sending"}
            className="clickable w-full py-3 px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
            <Send className="w-4 h-4" />
          </motion.button>

          {status === "success" && (
            <p className="text-green-400 text-center font-semibold">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center font-semibold">Error sending message. Please try again.</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/50 border-b border-cyan-500/20"
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-2xl" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>&lt;</span>
              <span className="text-white font-black text-lg mx-0.5">S</span>
              <span className="text-white font-bold text-2xl" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>&gt;</span>
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Shravan
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {["Experience", "Projects", "Skills", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="clickable text-gray-300 hover:text-cyan-400 transition-colors font-semibold"
            >
              {item}
            </a>
          ))}
        </div>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          className="clickable px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          Hire Me
        </motion.a>
      </nav>
    </motion.header>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black overflow-visible">
      <AnimatedBackground />
      <CustomCursor />
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        <TimelineSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-12 px-4 border-t border-cyan-500/20 backdrop-blur-xl bg-white/5"
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 Portfolio.Designed and developed by Shravan Talokar
          </p>
          
        </div>
      </motion.footer>
    </div>
  );
}
