import AppLayout from '../components/AppLayout'
import StatCard from '../components/StatCard'
import { projects } from '../data/projects'
import { internships } from '../data/internships'
import { FolderKanban, Briefcase, Star, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const activityFeed = [
  { id: 1, text: 'You uploaded a new project: AI Study Assistant', time: '2 hours ago' },
  { id: 2, text: 'TechCorp Egypt viewed your profile.', time: '5 hours ago' },
  { id: 3, text: 'New internship posted: Frontend Developer at Instabug.', time: 'Yesterday at 3:45 PM' },
  { id: 4, text: 'Dr. Khaled Mansour commented on your project.', time: '2 days ago' },
]

export default function Dashboard({ currentUser, onLogout }) {
  const myProjects = projects.filter((p) => p.ownerId === currentUser.id)
  const openInternships = internships.length
  const completedProjects = myProjects.filter((p) => p.status === 'Completed').length
  const skills = currentUser.skills?.length ?? 0

  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      {/* Page header */}
      <div className="mb-8">
        <p
          className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-1"
          style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.1em' }}
        >
          Overview
        </p>
        <h1
          className="text-2xl font-semibold text-[#111111]"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Dashboard
        </h1>
        <p className="text-sm text-[#747878] mt-1">
          Welcome back, <strong className="text-[#111111]">{currentUser.name}</strong>. Here's your activity at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="My Projects" value={myProjects.length} icon={FolderKanban} note="Total projects" />
        <StatCard label="Completed" value={completedProjects} icon={Star} note="Finished projects" />
        <StatCard label="Internships" value={openInternships} icon={Briefcase} note="Open listings" />
        <StatCard label="Skills" value={skills} icon={Clock} note="Listed on profile" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-sm font-bold text-[#111111] uppercase tracking-wide"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Recent Projects
            </h2>
            <Link
              to="/projects"
              className="text-xs text-[#6b38d4] font-semibold hover:underline"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="flex items-center justify-between bg-white border border-[#e5e2e1] rounded-lg px-4 py-3.5 hover:border-[#c4c7c7] hover:shadow-sm transition-all group"
              >
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold text-[#111111] group-hover:text-[#6b38d4] transition-colors truncate"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {p.title}
                  </p>
                  <p className="text-xs text-[#747878] mt-0.5 truncate">{p.tags.slice(0, 3).join(' · ')}</p>
                </div>
                <span
                  className={`ml-3 flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded
                    ${p.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {p.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div>
          <h2
            className="text-sm font-bold text-[#111111] uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Activity Feed
          </h2>
          <div className="bg-white border border-[#e5e2e1] rounded-lg divide-y divide-[#f1edec]">
            {activityFeed.map((item) => (
              <div key={item.id} className="px-4 py-3.5">
                <p className="text-sm text-[#111111] leading-snug">{item.text}</p>
                <p className="text-xs text-[#c4c7c7] mt-1">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
