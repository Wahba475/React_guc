import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowRight, BookOpen, Briefcase, FolderKanban, GitFork, Globe } from 'lucide-react'
import { Component as HorizonHero } from '../components/ui/horizon-hero-section'

const features = [
  {
    icon: FolderKanban,
    title: 'Projects',
    desc: 'Organize your work with structural clarity. Every project is a documented milestone with milestones, tags, and collaborators.',
  },
  {
    icon: BookOpen,
    title: 'Portfolios',
    desc: 'Present your capabilities on a clean, editorial canvas that highlights substance over flash.',
  },
  {
    icon: Briefcase,
    title: 'Internships',
    desc: 'Bridge the gap between academia and industry with verifiable skill documentation and real opportunities.',
  },
]

export default function Landing({ currentUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) navigate('/dashboard')
  }, [currentUser, navigate])

  return (
    <div className="min-h-screen bg-[#fdf8f8] flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-[#fdf8f8]/90 backdrop-blur-md border-b border-[#e5e2e1]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#111111] flex items-center justify-center">
              <span className="text-white text-xs font-bold" style={{ fontFamily: "'Newsreader', serif" }}>P</span>
            </span>
            <span className="text-lg font-semibold text-[#111111]" style={{ fontFamily: "'Newsreader', serif" }}>
              Portfolia
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-[#444748] font-bold uppercase tracking-widest" style={{ fontFamily: "'Inter', sans-serif" }}>
            <a href="#features" className="hover:text-[#111111] transition-colors">Features</a>
            <a href="#about" className="hover:text-[#111111] transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-xs font-bold text-[#111111] uppercase tracking-widest hover:opacity-70 transition-opacity px-3 py-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-xs font-bold bg-[#111111] text-white px-4 py-2 uppercase tracking-widest hover:bg-[#333] transition-colors border border-[#111111]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <HorizonHero />

      <section className="flex-1 max-w-5xl mx-auto px-6 lg:px-8">

        {/* Decorative rule */}
        <div className="mt-20 mb-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e5e2e1]" />
          <span className="text-xs font-semibold text-[#747878] uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
            Everything you need
          </span>
          <div className="flex-1 h-px bg-[#e5e2e1]" />
        </div>

        {/* Features */}
        <div id="features" className="grid sm:grid-cols-3 gap-8 mt-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-[#e5e2e1] p-8 hover:border-[#111111] transition-colors"
            >
              <div className="w-10 h-10 bg-[#f1edec] border border-[#e5e2e1] flex items-center justify-center mb-6">
                <Icon size={20} className="text-[#111111]" />
              </div>
              <h3
                className="text-2xl font-bold text-[#111111] mb-3"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                {title}
              </h3>
              <p className="text-base text-[#444748] leading-relaxed font-normal" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* About section */}
        <div id="about" className="mt-32 border-t border-[#e5e2e1] pt-24 pb-12">
          <div className="max-w-2xl">
            <p
              className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              About
            </p>
            <h2
              className="text-4xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.2' }}
            >
              Building the foundation for academic and professional legacy.
            </h2>
            <p className="text-lg text-[#444748] leading-relaxed font-normal" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Portfolia was built for the German University in Cairo ecosystem — connecting students
              with instructors who guide them, and employers who hire them. Clean design, zero clutter.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e2e1] py-8 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#747878]" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2026 Portfolia. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#747878] hover:text-[#111111] transition-colors"><GitFork size={16} /></a>
            <a href="#" className="text-[#747878] hover:text-[#111111] transition-colors"><Globe size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
