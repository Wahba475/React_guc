import { SplineScene } from './spline-scene'
import { Spotlight } from './spotlight'
import { motion } from 'framer-motion'
import { FolderKanban, BookOpen, Briefcase, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const pillars = [
  {
    icon: FolderKanban,
    num: '01',
    title: 'Projects',
    desc: 'Every project is a documented milestone. Structural clarity with tags, collaborators, and milestones.',
    href: '/projects',
  },
  {
    icon: BookOpen,
    num: '02',
    title: 'Portfolios',
    desc: 'An editorial canvas that presents your capabilities. Substance over flash — always.',
    href: '/profile',
  },
  {
    icon: Briefcase,
    num: '03',
    title: 'Internships',
    desc: 'Bridge academia and industry. Verified skills, real opportunities, zero noise.',
    href: '/internships',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="w-full bg-[#fdf8f8]">
      {/* ── Spline 3D Panel ── */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="relative w-full h-[520px] bg-[#111111] overflow-hidden border border-[#e5e2e1]">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          {/* Left copy */}
          <div className="absolute inset-y-0 left-0 w-[45%] z-10 flex flex-col justify-center px-10">
            <motion.p
              className="text-xs font-bold uppercase tracking-widest text-[#e5e2e1]/50 mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Interactive 3D
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#fdf8f8] leading-tight mb-4"
              style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Your work,{' '}
              <span className="italic font-light text-[#c9b8a8]">alive.</span>
            </motion.h2>
            <motion.p
              className="text-sm text-[#e5e2e1]/60 leading-relaxed max-w-sm"
              style={{ fontFamily: "'Manrope', sans-serif" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Portfolia turns static project records into an immersive experience.
              Showcase your technical depth with interactive 3D visuals that captivate
              employers at first glance.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#fdf8f8] border border-[#fdf8f8]/30 px-6 py-3 hover:bg-[#fdf8f8]/10 transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Start building <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>

          {/* Right — Spline 3D robot */}
          <div className="absolute inset-y-0 right-0 w-[58%]">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* ── Three Pillars — editorial numbered cards ── */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#e5e2e1]">
          {pillars.map(({ icon: Icon, num, title, desc, href }, idx) => (
            <motion.div
              key={title}
              className={[
                'group relative p-10 flex flex-col justify-between min-h-[320px]',
                'bg-white hover:bg-[#111111] transition-all duration-500 cursor-pointer',
                idx < pillars.length - 1 ? 'border-r border-[#e5e2e1]' : '',
              ].join(' ')}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              {/* Number */}
              <span
                className="absolute top-8 right-8 text-[80px] font-black leading-none text-[#f1edec] group-hover:text-[#1e1e1e] transition-colors duration-500 select-none"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                {num}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 bg-[#f1edec] group-hover:bg-[#222] border border-[#e5e2e1] group-hover:border-[#333] flex items-center justify-center mb-8 transition-colors duration-500">
                <Icon size={22} className="text-[#111111] group-hover:text-[#fdf8f8] transition-colors duration-500" />
              </div>

              {/* Body */}
              <div>
                <h3
                  className="text-2xl font-bold text-[#111111] group-hover:text-[#fdf8f8] mb-3 transition-colors duration-500"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm text-[#747878] group-hover:text-[#e5e2e1]/70 leading-relaxed transition-colors duration-500"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {desc}
                </p>
              </div>

              {/* Arrow */}
              <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#111111] group-hover:text-[#fdf8f8] transition-colors duration-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Link to={href} className="flex items-center gap-2 hover:gap-4 transition-all">
                  Explore <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
