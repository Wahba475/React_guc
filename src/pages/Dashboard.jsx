import AppLayout from '../components/AppLayout'
import StatCard from '../components/StatCard'
import { internships } from '../data/internships'
import { FolderKanban, FileText, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'

const activityFeed = [
  { id: 1, text: 'You uploaded a new project: AI Study Assistant', time: '2 hours ago', icon: 'M' },
  { id: 2, text: 'TechCorp Egypt viewed your profile.', time: '5 hours ago', icon: '👁' },
  { id: 3, text: 'New internship posted: Frontend Developer at Instabug.', time: 'Yesterday at 3:45 PM', icon: 'B' },
]

export default function Dashboard({ currentUser, onLogout, projects }) {
  const myProjects = projects?.filter((p) => String(p.ownerId) === String(currentUser.id)) || []
  const openInternships = internships.length

  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="max-w-[1280px] mx-auto w-full space-y-12">
        {/* Page header */}
        <header>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#111111]"
            style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.15' }}
          >
            Dashboard Overview
          </h1>
          <p className="text-lg text-[#747878] mt-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Your professional activity at a glance.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Total Projects" 
            value={myProjects.length} 
            icon={FolderKanban} 
            note="↑ 12%" 
            highlightNote={true}
          />
          <StatCard 
            label="Internship Applications" 
            value={openInternships} 
            icon={FileText} 
            note="Pending Review" 
          />
          <StatCard 
            label="New Notifications" 
            value={activityFeed.length} 
            icon={Bell} 
            note="Requires Attention" 
          />
        </section>

        {/* Activity feed */}
        <section className="mt-12">
          <h2
            className="text-2xl font-bold text-[#111111] mb-6"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Activity Feed
          </h2>
          <div className="bg-white border border-[#e5e2e1]">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-6 border-b border-[#e5e2e1] hover:bg-[#fdf8f8] transition-colors last:border-b-0">
                <div className="w-10 h-10 bg-[#f1edec] border border-[#e5e2e1] flex-shrink-0 mt-1 flex items-center justify-center">
                  <span className="text-[#111111] font-bold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-base text-[#111111]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {item.text}
                  </p>
                  <p className="text-sm text-[#747878] mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {item.time}
                  </p>
                </div>
                <button className="text-[#747878] hover:text-[#111111] mt-1 p-1">
                  •••
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button
              className="text-xs font-semibold uppercase tracking-wider text-[#747878] hover:text-[#111111] underline decoration-[#c4c7c7] hover:decoration-[#111111] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View All Activity
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
