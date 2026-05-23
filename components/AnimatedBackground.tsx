"use client";

import React, { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouse = { x: 0, y: 0, active: false };
    let isMobileDevice = false;

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvasElement.width * canvasElement.height) / 12000);
      const limit = isMobileDevice ? 12 : 60;
      for (let i = 0; i < Math.min(count, limit); i++) {
        particles.push(new Particle());
      }
    };

    const resize = () => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
      isMobileDevice = window.innerWidth < 768;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileDevice) return; // Ignore mouse events on mobile
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * canvasElement.width;
        this.y = Math.random() * canvasElement.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 2 + 1.5;
      }

      update() {
        // Base movement
        this.x += this.vx;
        this.y += this.vy;

        // Gentle mouse influence
        if (!isMobileDevice && mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            this.x += dx * 0.002;
            this.y += dy * 0.002;
          }
        }

        // Wrap around
        if (this.x < 0) this.x = canvasElement.width;
        if (this.x > canvasElement.width) this.x = 0;
        if (this.y < 0) this.y = canvasElement.height;
        if (this.y > canvasElement.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;

        if (isMobileDevice) {
          // Highly optimized flat drawing on mobile to save GPU cycles
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
          ctx.fill();
        } else {
          // Premium glow effect on desktop
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#38BDF8";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = "#38BDF8";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const drawConnections = () => {
      if (!ctx || isMobileDevice) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const opacity = 1 - dist / 140;
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(6, 182, 212, ${opacity * 0.3})`);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const drawMouseConnection = () => {
      if (!ctx || !mouse.active || isMobileDevice) return;

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };

    // Initialize dimensions and parameters on setup
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!ctx) return;

      // Dark gradient background
      const gradient = ctx.createRadialGradient(
        canvasElement.width / 2, canvasElement.height / 2, 0,
        canvasElement.width / 2, canvasElement.height / 2, canvasElement.width
      );
      gradient.addColorStop(0, "#111827");
      gradient.addColorStop(0.5, "#0a0a0f");
      gradient.addColorStop(1, "#0a0a0f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      if (!isMobileDevice) {
        drawConnections();
        drawMouseConnection();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}
