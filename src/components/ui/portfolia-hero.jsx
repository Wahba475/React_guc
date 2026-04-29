"use client"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

/**
 * PortfoliaHero — Full-screen shader hero matching the Paper / Portfolia
 * color palette (#111111 ink, #fdf8f8 surface, cream accents).
 * Replaces the original "ShaderShowcase" which used cyan/orange.
 */
export default function PortfoliaHero() {
  const containerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const enter = () => setIsActive(true)
    const leave = () => setIsActive(false)
    container.addEventListener("mouseenter", enter)
    container.addEventListener("mouseleave", leave)
    return () => {
      container.removeEventListener("mouseenter", enter)
      container.removeEventListener("mouseleave", leave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#111111]"
    >
      {/* --- SVG Filter defs (glass, glow, gradients) --- */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="ph-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.05  0 1 0 0 0.04  0 0 1 0 0.02  0 0 0 0.9 0"
            />
          </filter>
          <filter id="ph-gooey" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="ph-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Ink → warm cream gradient for title */}
          <linearGradient id="ph-title-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf8f8" />
            <stop offset="40%" stopColor="#e5e2e1" />
            <stop offset="70%" stopColor="#c9b8a8" />
            <stop offset="100%" stopColor="#fdf8f8" />
          </linearGradient>
        </defs>
      </svg>

      {/* --- Background mesh gradient (monochrome ink palette) --- */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#111111", "#1e1e1e", "#2a2218", "#3d3530", "#111111"]}
        speed={0.25}
        backgroundColor="#111111"
      />
      {/* Subtle warm-wire overlay */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#111111", "#fdf8f8", "#c9b8a8", "#e5e2e1"]}
        speed={0.15}
      />

      {/* --- Navbar --- */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span
            className="w-7 h-7 bg-[#fdf8f8] flex items-center justify-center"
            style={{ filter: "url(#ph-glow)" }}
          >
            <span
              className="text-[#111111] text-sm font-bold"
              style={{ fontFamily: "'Newsreader', serif" }}
            >P</span>
          </span>
          <span
            className="text-lg font-semibold text-[#fdf8f8]"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Portfolia
          </span>
        </motion.div>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          {["Features", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#e5e2e1]/70 hover:text-[#fdf8f8] text-xs font-medium px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200 uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Auth buttons — gooey group */}
        <div
          className="relative flex items-center group"
          style={{ filter: "url(#ph-gooey)" }}
        >
          <Link
            to="/register"
            className="absolute right-0 px-2.5 py-2 rounded-full bg-[#fdf8f8] text-[#111111] font-semibold text-xs cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-[76px] z-0 transition-transform duration-300"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 rounded-full bg-[#fdf8f8] text-[#111111] font-semibold text-xs cursor-pointer h-8 flex items-center z-10 transition-colors hover:bg-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* --- Hero copy — bottom-left, editorial layout --- */}
      <main className="absolute bottom-10 left-8 z-20 max-w-2xl">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm mb-7 border border-white/10 relative"
          style={{ filter: "url(#ph-glass)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-[#e5e2e1]/30 to-transparent" />
          <span
            className="text-[#e5e2e1]/80 text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ✦ Student Career Portfolio Platform
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.span
            className="block font-light text-4xl md:text-5xl mb-2 tracking-wider"
            style={{
              fontFamily: "'Manrope', sans-serif",
              background: "linear-gradient(135deg, #fdf8f8 0%, #c9b8a8 50%, #fdf8f8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Build your
          </motion.span>
          <span
            className="block font-black text-[#fdf8f8] drop-shadow-2xl"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Legacy.
          </span>
          <span
            className="block font-light text-[#e5e2e1]/60 italic text-5xl md:text-6xl"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Start here.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base font-light text-[#e5e2e1]/60 mb-8 leading-relaxed max-w-lg"
          style={{ fontFamily: "'Manrope', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          A unified platform connecting students, instructors, and employers through
          documented work, verified skills, and real internship opportunities.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link to="/register">
            <motion.span
              className="inline-flex items-center px-10 py-4 bg-[#fdf8f8] text-[#111111] font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.span>
          </Link>
          <Link to="/login">
            <motion.span
              className="inline-flex items-center px-10 py-4 border border-[#fdf8f8]/30 text-[#fdf8f8]/80 font-medium text-sm uppercase tracking-widest hover:border-[#fdf8f8]/60 hover:text-[#fdf8f8] transition-all cursor-pointer backdrop-blur-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.span>
          </Link>
        </motion.div>
      </main>

      {/* --- Scroll hint --- */}
      <motion.div
        className="absolute bottom-10 right-10 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5e2e1]/40 rotate-90 origin-center mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-[#e5e2e1]/40 to-transparent" />
      </motion.div>
    </div>
  )
}
