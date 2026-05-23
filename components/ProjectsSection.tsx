"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    id: 1,
    title: "Quiz-Arena",
    description: "Quiz Arena is an AI-powered quiz platform designed for students and colleges, where users can instantly generate quizzes by uploading PDF content. Players can challenge friends, compete against AI opponents, and participate in interactive multiplayer quiz battles with smart, dynamically generated questions.",
    tech: ["Node.js", "Express.js", "MongoDB", "HTML5","CSS3","EJS"],
    link: "https://quiz-arena-csby.onrender.com",
    github: "https://github.com/shravantalokar308-star/quizprojectfinal",
    featured: true,
    gradient: "from-cyan-500 to-blue-600",
    size: "lg"
  },
  {
    id: 2,
    title: "Elite BNB AI",
    description: "Touchless BNB Booking website with gestures",
    tech: ["Node.js", "MongoDB", "Express.js","OpenCV","MediaPipe","EJS","HTML5","CSS3"],
    github: "https://github.com",
    gradient: "from-purple-500 to-pink-600",
    size: "md"
  },
  {
    id: 3,
    title: "Synapse - Connect Tasks. Drive Progress",
    description: "Synapse is a smart task management platform that helps teams organize projects, collaborate efficiently, and track progress seamlessly in one connected workspace.",
    tech: ["React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT Authentication","Google OAuth"],
    link: "https://smarttaskmanagement.vercel.app/",
    github: "https://github.com/shravantalokar308-star/SmartTaskManagement",
    featured: true,
    gradient: "from-cyan-500 to-blue-600",
    size: "lg"
  },
 
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const sizeClass = project.size === "lg" ? "md:col-span-2 md:row-span-2" : "md:col-span-1";

  const cardContent = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer ${
        project.featured ? "ring-2 ring-cyan-400/50" : ""
      }`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
        <div>
          {project.featured && (
            <span className="inline-block mb-3 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Featured Project
            </span>
          )}
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="clickable flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500/50 rounded-lg text-cyan-300 font-semibold text-sm transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="clickable flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-gray-300 font-semibold text-sm transition-all"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
        </motion.div>
      </div>

      {/* Hover glow */}
      <motion.div
        animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 blur-3xl -z-10 transition-opacity`}
      />
    </motion.div>
  );

  if (project.featured) {
    return (
      <div className={sizeClass}>
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
          {cardContent}
        </Tilt>
      </div>
    );
  }

  return <div className={sizeClass}>{cardContent}</div>;
}

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-4">
          My Work
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Here are a few projects that reflect my skills, learning journey, and development experience.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
