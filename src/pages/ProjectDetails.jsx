import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Badge from '../components/Badge'
import { projects } from '../data/projects'
import { GitFork, ExternalLink, ArrowLeft, CheckCircle2, Circle } from 'lucide-react'

const TABS = ['Overview', 'Milestones', 'Collaborators']

export default function ProjectDetails({ currentUser, onLogout }) {
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
      {/* Back */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-xs text-[#747878] hover:text-[#111111] transition-colors mb-6"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        <ArrowLeft size={13} /> All projects
      </Link>

      {/* Hero */}
      <div className="bg-white border border-[#e5e2e1] rounded-lg p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded mb-3 inline-block
                ${project.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {project.status}
            </span>
            <h1
              className="text-2xl font-semibold text-[#111111]"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              {project.title}
            </h1>
            <p className="text-sm text-[#747878] mt-2">Last updated {project.updatedAt}</p>
          </div>
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-[#c4c7c7] text-[#444748] px-3 py-2 rounded-md text-xs font-semibold hover:border-[#747878] hover:text-[#111111] transition-all"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <Github size={13} /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#111111] text-white px-3 py-2 rounded-md text-xs font-semibold hover:bg-[#333] transition-colors"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <ExternalLink size={13} /> Live demo
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.map((tag) => <Badge key={tag} variant="purple">{tag}</Badge>)}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#e5e2e1] mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px
              ${tab === t
                ? 'border-[#6b38d4] text-[#6b38d4]'
                : 'border-transparent text-[#747878] hover:text-[#111111]'
              }`}
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'Overview' && (
        <div className="bg-white border border-[#e5e2e1] rounded-lg p-6">
          <h2
            className="text-sm font-bold uppercase tracking-wide text-[#747878] mb-3"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Description
          </h2>
          <p className="text-sm text-[#4B5563] leading-relaxed">{project.description}</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-[#c4c7c7] mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>Visibility</p>
              <p className="text-sm font-semibold text-[#111111]">{project.visibility}</p>
            </div>
            <div>
              <p className="text-xs text-[#c4c7c7] mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>Created</p>
              <p className="text-sm font-semibold text-[#111111]">{project.createdAt}</p>
            </div>
            <div>
              <p className="text-xs text-[#c4c7c7] mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>Progress</p>
              <p className="text-sm font-semibold text-[#111111]">{progress}%</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'Milestones' && (
        <div className="bg-white border border-[#e5e2e1] rounded-lg p-6">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-2">
            <h2
              className="text-sm font-bold uppercase tracking-wide text-[#747878]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Progress
            </h2>
            <span className="text-sm font-semibold text-[#6b38d4]">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#f1edec] rounded-full mb-6">
            <div
              className="h-1.5 bg-[#6b38d4] rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="space-y-3">
            {project.milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                {m.done
                  ? <CheckCircle2 size={17} className="text-green-500 flex-shrink-0" />
                  : <Circle size={17} className="text-[#c4c7c7] flex-shrink-0" />
                }
                <span className={`text-sm ${m.done ? 'text-[#111111]' : 'text-[#747878]'}`}>
                  {m.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Collaborators' && (
        <div className="bg-white border border-[#e5e2e1] rounded-lg p-6">
          <h2
            className="text-sm font-bold uppercase tracking-wide text-[#747878] mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Team
          </h2>
          <div className="space-y-3">
            {project.collaborators.map((name) => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6b38d4] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{name.charAt(0)}</span>
                </div>
                <span className="text-sm text-[#111111]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  )
}
