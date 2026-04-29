import { useState } from 'react'
import AppLayout from '../components/AppLayout'
import Badge from '../components/Badge'
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
      {/* Header */}
      <div className="mb-8">
        <p
          className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-1"
          style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.1em' }}
        >
          Opportunities
        </p>
        <h1
          className="text-2xl font-semibold text-[#111111]"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Internships
        </h1>
        <p className="text-sm text-[#747878] mt-1">
          {internships.length} open positions available.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4c7c7]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role, company, or skill…"
            className="w-full pl-9 pr-3 py-2.5 border border-[#c4c7c7] rounded-md text-sm bg-white text-[#111111] placeholder-[#c4c7c7] focus:outline-none focus:border-[#6b38d4] focus:ring-2 focus:ring-[#6b38d4]/10 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-md text-xs font-semibold border transition-all
                ${typeFilter === t
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#444748] border-[#c4c7c7] hover:border-[#747878]'
                }`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#c4c7c7] text-sm">No internships match your search.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-[#e5e2e1] rounded-lg p-5 hover:border-[#c4c7c7] hover:shadow-sm transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h2
                    className="text-base font-semibold text-[#111111]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {i.role}
                  </h2>
                  <p className="text-sm text-[#747878] mt-0.5 font-medium">{i.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={i.type === 'Remote' ? 'green' : i.type === 'Hybrid' ? 'purple' : 'default'}>
                    {i.type}
                  </Badge>
                  <Badge variant="yellow">Paid</Badge>
                </div>
              </div>

              <p className="text-sm text-[#4B5563] leading-relaxed mb-4 line-clamp-2">{i.description}</p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#747878] mb-4">
                <span className="flex items-center gap-1.5"><MapPin size={12} /> {i.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {i.duration}</span>
                <span className="flex items-center gap-1.5"><Banknote size={12} /> {i.stipend}</span>
                <span className="flex items-center gap-1.5"><Users size={12} /> {i.applicants} applicants</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {i.requirements.map((r) => <Badge key={r} variant="default">{r}</Badge>)}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#c4c7c7]">Deadline: {i.deadline}</span>
                <button
                  className="text-xs bg-[#111111] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#333] transition-colors"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  Apply now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  )
}
