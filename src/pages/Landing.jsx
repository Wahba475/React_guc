import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GitFork, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import PortfoliaHero from '../components/ui/portfolia-hero'
import { FeaturesSection } from '../components/ui/features-section'

export default function Landing({ currentUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) navigate('/dashboard')
  }, [currentUser, navigate])

  return (
    <div className="min-h-screen bg-[#fdf8f8] flex flex-col">
      {/* ══════════════════════════════════════════════════
          HERO — full-screen shader + framer-motion
      ══════════════════════════════════════════════════ */}
      <PortfoliaHero />

      {/* ══════════════════════════════════════════════════
          FEATURES — Spline 3D panel + editorial cards
      ══════════════════════════════════════════════════ */}
      <FeaturesSection />

      {/* ══════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════ */}
      <section
        id="about"
        className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-32 border-t border-[#e5e2e1]"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              About
            </p>
            <h2
              className="text-4xl font-bold text-[#111111] mb-6 leading-tight"
              style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.2' }}
            >
              Building the foundation for academic and professional legacy.
            </h2>
            <p
              className="text-base text-[#444748] leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Portfolia was built for the German University in Cairo ecosystem — connecting
              students with instructors who guide them, and employers who hire them.
              Clean design, zero clutter.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-px bg-[#e5e2e1] border border-[#e5e2e1]"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {[
              { val: '3 roles', label: 'Student · Instructor · Employer' },
              { val: '∞ Projects', label: 'Unlimited project documentation' },
              { val: '100% free', label: 'For every GUC student' },
              { val: '1 platform', label: 'One place for your entire career' },
            ].map(({ val, label }) => (
              <div key={val} className="bg-white p-8 flex flex-col justify-between">
                <span
                  className="text-2xl font-black text-[#111111] mb-2 block"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {val}
                </span>
                <span
                  className="text-xs text-[#747878] uppercase tracking-wider leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════ */}
      <section className="w-full bg-[#111111] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#fdf8f8] mb-6 leading-tight"
            style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to build your legacy?
          </motion.h2>
          <motion.p
            className="text-base text-[#e5e2e1]/60 mb-10"
            style={{ fontFamily: "'Manrope', sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Join students already documenting their journey on Portfolia.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-[#fdf8f8] text-[#111111] px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-colors border border-[#fdf8f8]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center text-[#fdf8f8]/80 border border-[#fdf8f8]/30 px-10 py-4 text-sm font-bold uppercase tracking-widest hover:border-[#fdf8f8]/60 hover:text-[#fdf8f8] transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer className="border-t border-[#e5e2e1] py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-[#111111] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold" style={{ fontFamily: "'Newsreader', serif" }}>P</span>
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-wider text-[#747878]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © 2026 Portfolia — GUC Career Platform
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#747878] hover:text-[#111111] transition-colors"><GitFork size={16} /></a>
            <a href="#" className="text-[#747878] hover:text-[#111111] transition-colors"><Globe size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
