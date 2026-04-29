import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import { internships } from '../data/internships'
import { MapPin, Clock, Banknote, Search, Users } from 'lucide-react'

export default function Internships({ currentUser, onLogout }) {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const types = ['All', 'On-site', 'Remote', 'Hybrid']

  const filtered = internships.filter((i) => {
    const matchQuery =
      i.role.toLowerCase().includes(query.toLowerCase()) ||
      i.company.toLowerCase().includes(query.toLowerCase()) ||
      i.requirements.some((r) => r.toLowerCase().includes(query.toLowerCase()))
    const matchType = typeFilter === 'All' || i.type === typeFilter
    return matchQuery && matchType
  })

  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Page Header */}
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-wider text-[#747878] mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Opportunities
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#111111] mb-4"
            style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.15' }}
          >
            Internships
          </h2>
          <p
            className="text-lg text-[#747878] max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {internships.length} open positions available.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#e5e2e1]">
          <div className="flex gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border
                  ${typeFilter === t
                    ? 'bg-[#111111] text-white border-[#111111] hover:bg-[#333]'
                    : 'bg-white text-[#111111] border-[#c4c7c7] hover:bg-[#f1edec]'
                  }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {t}
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
                placeholder="Search by role, company…"
                className="w-full pl-10 pr-4 py-2 border-b border-[#c4c7c7] bg-transparent focus:border-[#111111] focus:outline-none focus:ring-0 text-sm text-[#111111] placeholder:text-[#747878] transition-colors"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              />
            </div>
          </div>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#747878] text-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
            No internships match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((i) => (
              <div
                key={i.id}
                className="bg-white border border-[#e5e2e1] p-6 flex flex-col gap-4 hover:border-[#111111] transition-colors duration-200 group"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                  <div>
                    <h3
                      className="text-2xl font-bold text-[#111111] group-hover:text-[#6b38d4] transition-colors leading-snug"
                      style={{ fontFamily: "'Newsreader', serif" }}
                    >
                      {i.role}
                    </h3>
                    <p className="text-base text-[#111111] mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {i.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider bg-[#f1edec] text-[#111111] px-2 py-1 border border-[#e5e2e1]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {i.type}
                    </span>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider bg-[#111111] text-white px-2 py-1 border border-[#111111]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Paid
                    </span>
                  </div>
                </div>

                <p
                  className="text-sm text-[#747878] leading-relaxed line-clamp-3 flex-1"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {i.description}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#111111] uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#747878]" /> {i.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#747878]" /> {i.duration}</span>
                  <span className="flex items-center gap-1.5"><Banknote size={14} className="text-[#747878]" /> {i.stipend}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-[#747878]" /> {i.applicants} app</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e5e2e1]">
                  {i.requirements.map((r) => (
                    <span
                      key={r}
                      className="text-[10px] font-semibold uppercase tracking-wider bg-[#ebe7e6] text-[#111111] px-2 py-1"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-[#747878] font-semibold uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Deadline: {i.deadline}
                  </span>
                  <button
                    className="bg-[#111111] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity active:translate-y-[2px] active:translate-x-[2px] active:shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.5)] border border-[#111111]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Apply now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
