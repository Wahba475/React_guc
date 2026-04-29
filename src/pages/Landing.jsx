import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowRight, BookOpen, Briefcase, FolderKanban, GitFork, Globe } from 'lucide-react'

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
      <header className="sticky top-0 z-30 bg-[#fdf8f8]/90 backdrop-blur-sm border-b border-[#e5e2e1]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-sm bg-[#111111] flex items-center justify-center">
              <span className="text-white text-xs font-bold" style={{ fontFamily: "'Newsreader', serif" }}>P</span>
            </span>
            <span className="text-base font-semibold text-[#111111]" style={{ fontFamily: "'Newsreader', serif" }}>
              Portfolia
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-[#4B5563]">
            <a href="#features" className="hover:text-[#111111] transition-colors">Features</a>
            <a href="#about" className="hover:text-[#111111] transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-[#444748] hover:text-[#111111] transition-colors px-3 py-1.5 rounded-md"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-sm bg-[#111111] text-white px-4 py-1.5 rounded-md hover:bg-[#333] transition-colors font-medium"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest text-[#6b38d4] mb-6"
            style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.1em' }}
          >
            Student Career Portfolio Platform
          </span>
          <h1
            className="text-[42px] font-bold leading-tight text-[#111111] mb-6"
            style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            Build your legacy on a foundation of clarity.
          </h1>
          <p className="text-lg text-[#4B5563] mb-10 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Portfolia brings together students, instructors, and employers in one seamless environment.
            Document your work, find internships, and showcase your journey.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-[#333] transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Start building <ArrowRight size={15} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-[#444748] px-5 py-3 rounded-md border border-[#c4c7c7] hover:border-[#747878] hover:text-[#111111] transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Decorative rule */}
        <div className="mt-20 mb-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#e5e2e1]" />
          <span className="text-xs text-[#c4c7c7] uppercase tracking-widest" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Everything you need
          </span>
          <div className="flex-1 h-px bg-[#e5e2e1]" />
        </div>

        {/* Features */}
        <div id="features" className="grid sm:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white border border-[#e5e2e1] rounded-lg p-6 hover:border-[#c4c7c7] hover:shadow-sm transition-all"
            >
              <div className="w-9 h-9 rounded-md bg-[#f1edec] flex items-center justify-center mb-4">
                <Icon size={18} className="text-[#6b38d4]" />
              </div>
              <h3
                className="text-base font-semibold text-[#111111] mb-2"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* About section */}
        <div id="about" className="mt-24 border-t border-[#e5e2e1] pt-16">
          <div className="max-w-xl">
            <p
              className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-4"
              style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.1em' }}
            >
              About
            </p>
            <h2
              className="text-2xl font-semibold text-[#111111] mb-4"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              Building the foundation for academic and professional legacy.
            </h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Portfolia was built for the German University in Cairo ecosystem — connecting students
              with instructors who guide them, and employers who hire them. Clean design, zero clutter.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e2e1] py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#747878]" style={{ fontFamily: "'Manrope', sans-serif" }}>
            © 2026 Portfolia. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#c4c7c7] hover:text-[#111111] transition-colors"><GitFork size={16} /></a>
            <a href="#" className="text-[#c4c7c7] hover:text-[#111111] transition-colors"><Globe size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
