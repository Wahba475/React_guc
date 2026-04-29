import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Badge from '../components/Badge'
import { projects } from '../data/projects'
import { GitFork, ExternalLink, Search } from 'lucide-react'

export default function Projects({ currentUser, onLogout }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const statusFilters = ['All', 'In Progress', 'Completed']

  const filtered = projects.filter((p) => {
    const matchQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    const matchStatus = filter === 'All' || p.status === filter
    return matchQuery && matchStatus
  })

  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      {/* Header */}
      <div className="mb-8">
        <p
          className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-1"
          style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.1em' }}
        >
          Portfolio
        </p>
        <h1
          className="text-2xl font-semibold text-[#111111]"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Projects
        </h1>
        <p className="text-sm text-[#747878] mt-1">Browse and explore documented project work.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c7c7]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or tag…"
            className="w-full pl-9 pr-3 py-2.5 border border-[#c4c7c7] rounded-md text-sm bg-white text-[#111111] placeholder-[#c4c7c7] focus:outline-none focus:border-[#6b38d4] focus:ring-2 focus:ring-[#6b38d4]/10 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {statusFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-md text-xs font-semibold border transition-all
                ${filter === f
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#444748] border-[#c4c7c7] hover:border-[#747878]'
                }`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#c4c7c7] text-sm">No projects match your search.</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-[#e5e2e1] rounded-lg p-5 flex flex-col gap-3 hover:border-[#c4c7c7] hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <Link
                  to={`/projects/${p.id}`}
                  className="text-base font-semibold text-[#111111] hover:text-[#6b38d4] transition-colors leading-snug"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {p.title}
                </Link>
                <span
                  className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded
                    ${p.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {p.status}
                </span>
              </div>

              <p className="text-sm text-[#4B5563] leading-relaxed line-clamp-2">{p.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <Badge key={tag} variant="purple">{tag}</Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 mt-auto">
                <span className="text-xs text-[#c4c7c7]">{p.updatedAt}</span>
                <div className="flex items-center gap-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#747878] hover:text-[#111111] transition-colors"
                    >
                      <GitFork size={15} />
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#747878] hover:text-[#111111] transition-colors"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <Link
                    to={`/projects/${p.id}`}
                    className="text-xs font-semibold text-[#6b38d4] hover:underline"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
