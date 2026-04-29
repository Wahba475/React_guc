import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { Search, Globe, Lock } from 'lucide-react'

export default function Projects({ currentUser, onLogout, projects }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const visibilityFilters = ['All', 'Public', 'Private']

  const filtered = projects.filter((p) => {
    const matchQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    
    // Using status as visibility for demonstration purposes, or map it.
    const vis = p.visibility || (p.status === 'Completed' ? 'Public' : 'Private')
    const matchVis = filter === 'All' || vis === filter

    return matchQuery && matchVis
  })

  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Page Header */}
        <div className="mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#111111] mb-4"
            style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.15' }}
          >
            My Projects
          </h2>
          <p
            className="text-lg text-[#747878] max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            A collection of technical and academic works spanning multiple disciplines and technologies.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#e5e2e1]">
          <div className="flex gap-2">
            {visibilityFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border
                  ${filter === f
                    ? 'bg-[#111111] text-white border-[#111111] hover:bg-[#333]'
                    : 'bg-white text-[#111111] border-[#c4c7c7] hover:bg-[#f1edec]'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#747878]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border-b border-[#c4c7c7] bg-transparent focus:border-[#111111] focus:outline-none focus:ring-0 text-sm text-[#111111] placeholder:text-[#747878] transition-colors"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              />
            </div>
          </div>
        </div>

        {/* Project Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#747878] text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
            No projects match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const isPublic = (p.visibility || (p.status === 'Completed' ? 'Public' : 'Private')) === 'Public'

              return (
                <Link
                  to={`/projects/${p.id}`}
                  key={p.id}
                  className="bg-white border border-[#e5e2e1] p-6 flex flex-col gap-4 hover:border-[#111111] transition-colors duration-200 group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className="text-xs font-semibold text-[#747878] uppercase tracking-wider"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {p.category || 'Project'}
                    </span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider bg-[#f1edec] text-[#111111] px-2 py-1 flex items-center gap-1 border border-[#e5e2e1]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {isPublic ? <Globe size={12} /> : <Lock size={12} />}
                      {isPublic ? 'Public' : 'Private'}
                    </span>
                  </div>
                  
                  <h3
                    className="text-2xl font-bold text-[#111111] group-hover:text-[#6b38d4] transition-colors leading-snug"
                    style={{ fontFamily: "'Newsreader', serif" }}
                  >
                    {p.title}
                  </h3>
                  
                  <p
                    className="text-sm text-[#747878] flex-1 line-clamp-3 leading-relaxed"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {p.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-[#e5e2e1]">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-wider bg-[#ebe7e6] text-[#111111] px-2 py-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
