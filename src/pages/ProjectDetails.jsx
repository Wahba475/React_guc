import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { GitFork, ExternalLink, ArrowLeft, CheckCircle2, Circle } from 'lucide-react'

const TABS = ['Overview', 'Tasks', 'Collaborators']

export default function ProjectDetails({ currentUser, onLogout, projects }) {
  const { id } = useParams()
  const [tab, setTab] = useState('Overview')

  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <AppLayout currentUser={currentUser} onLogout={onLogout}>
        <div className="text-center py-20">
          <p className="text-[#747878] text-sm">Project not found.</p>
          <Link to="/projects" className="mt-4 inline-block text-[#6b38d4] text-sm font-semibold hover:underline">
            ← Back to projects
          </Link>
        </div>
      </AppLayout>
    )
  }

  const completedMilestones = project.milestones.filter((m) => m.done).length
  const progress = Math.round((completedMilestones / project.milestones.length) * 100)

  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Back navigation */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-[#747878] text-xs font-semibold uppercase tracking-wider hover:text-[#111111] transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        {/* Project Header */}
        <div className="bg-white border border-[#e5e2e1] p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="bg-[#f1edec] text-[#111111] px-2 py-1 text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {project.status}
                </span>
                <span className="text-[#747878] text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Due: Oct 24, 2023
                </span>
              </div>
              <h1
                className="text-4xl font-semibold text-[#111111] mb-2"
                style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.1' }}
              >
                {project.title}
              </h1>
              <p
                className="text-[#747878] max-w-2xl text-lg leading-relaxed"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {project.description || "A comprehensive overview of the project aims to improve usability, accessibility, and align with the design system."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-[#111111] text-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#f1edec] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6b38d4] focus:ring-offset-2 flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <GitFork size={14} /> Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#111111] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#333] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6b38d4] focus:ring-offset-2 flex items-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#e5e2e1] flex overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors
                ${tab === t
                  ? 'border-b-2 border-[#111111] text-[#111111]'
                  : 'text-[#747878] hover:text-[#111111]'
                }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 space-y-6">
            {tab === 'Overview' && (
              <section className="bg-white border border-[#e5e2e1] p-6 md:p-8">
                <h2
                  className="text-2xl font-bold text-[#111111] border-b border-[#e5e2e1] pb-2 mb-4"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  Project Brief
                </h2>
                <div
                  className="prose max-w-none text-[#111111] space-y-4 text-base leading-relaxed"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  <p>{project.description || "The current project needs to be built to adhere to our new tactile, editorial design principles."}</p>
                  <p>Key objectives include:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Implementing the new fixed-grid layout system.</li>
                    <li>Upgrading all typography to the Manrope/Newsreader/Inter stack.</li>
                    <li>Removing all synthetic gradients and rounded corners in favor of crisp borders.</li>
                  </ul>
                </div>
              </section>
            )}

            {(tab === 'Overview' || tab === 'Tasks') && (
              <section className="bg-white border border-[#e5e2e1] p-6 md:p-8">
                <div className="flex justify-between items-center border-b border-[#e5e2e1] pb-2 mb-4">
                  <h2
                    className="text-2xl font-bold text-[#111111]"
                    style={{ fontFamily: "'Newsreader', serif" }}
                  >
                    Key Tasks
                  </h2>
                  <span
                    className="text-[#747878] text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {completedMilestones}/{project.milestones.length} Completed
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-[#f1edec] rounded-none mb-6">
                  <div
                    className="h-1.5 bg-[#111111] rounded-none transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {project.milestones.map((m, i) => (
                    <label key={i} className="flex items-start gap-3 p-2 hover:bg-[#f1edec] transition-colors cursor-pointer border border-transparent hover:border-[#e5e2e1]">
                      <input
                        type="checkbox"
                        checked={m.done}
                        readOnly
                        className="mt-1 w-5 h-5 border-2 border-[#111111] rounded-none text-[#111111] focus:ring-[#111111] focus:ring-offset-2"
                      />
                      <div>
                        <p
                          className={`text-base ${m.done ? 'line-through text-[#747878]' : 'text-[#111111]'}`}
                          style={{ fontFamily: "'Manrope', sans-serif" }}
                        >
                          {m.title}
                        </p>
                        {m.done && (
                          <p className="text-sm text-[#747878]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            Completed
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Metadata) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#e5e2e1] p-6 space-y-6">
              <div>
                <h3
                  className="text-xs font-semibold uppercase tracking-wider text-[#747878] mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Project Lead
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white text-xs font-bold">
                    ME
                  </div>
                  <span className="text-base text-[#111111]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {currentUser?.name || "Me"}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-[#e5e2e1] pt-6">
                <h3
                  className="text-xs font-semibold uppercase tracking-wider text-[#747878] mb-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Progress
                </h3>
                <p
                  className="text-xl font-bold text-[#111111]"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {progress}%
                </p>
              </div>

              <div className="border-t border-[#e5e2e1] pt-6">
                <h3
                  className="text-xs font-semibold uppercase tracking-wider text-[#747878] mb-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-[#f1edec] text-[#111111] px-2 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {(tab === 'Collaborators' || tab === 'Overview') && (
              <section className="bg-[#fdf8f8] border border-[#e5e2e1] p-6">
                <h2
                  className="text-xl font-bold text-[#111111] mb-4"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  Team
                </h2>
                <div className="space-y-3">
                  {project.collaborators.map((name) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e5e2e1] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#111111] text-xs font-bold">{name.charAt(0)}</span>
                      </div>
                      <span className="text-sm text-[#111111]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

