"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updatePointerMode = () => {
      setIsDesktopPointer(pointerQuery.matches);
    };

    updatePointerMode();
    pointerQuery.addEventListener("change", updatePointerMode);

    return () => {
      pointerQuery.removeEventListener("change", updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (!isDesktopPointer) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("clickable")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktopPointer]);

  if (!isDesktopPointer) {
    return null;
  }

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - (isHovering ? 20 : 12),
        y: mousePosition.y - (isHovering ? 20 : 12),
        width: isHovering ? 40 : 24,
        height: isHovering ? 40 : 24
      }}
      transition={{ type: "spring", stiffness: 800, damping: 30 }}
      style={{
        border: "2px solid #00d4ff",
        borderRadius: "50%",
        boxShadow: `0 0 20px rgba(0, 212, 255, ${isHovering ? 0.8 : 0.5})`,
        backdropFilter: "blur(2px)"
      }}
    />
  );
}
