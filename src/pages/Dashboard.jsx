import { getLayoutForRole } from '../utils/layoutForRole'
import StatCard from '../components/StatCard'
import { FolderKanban, FileText, Bell, Users, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Dashboard({ currentUser, onLogout, projects, internships, notifications = [], onMarkRead, onUpdateProject, userList = [] }) {
  const Layout = getLayoutForRole(currentUser?.role)
  // Real stats from live data
  const myProjects = (projects || []).filter(
    (p) => String(p.ownerId) === String(currentUser.id)
  )

  const myApplications = (internships || []).filter(
    (i) => (i.applicants || []).includes(currentUser.id)
  )

  const openInternships = (internships || []).filter(
    (i) => i.status !== 'closed'
  )

  const employerInternships = (internships || []).filter(
    (i) => i.companyId === currentUser.id || i.company === currentUser.company
  )
  const totalApplicants = employerInternships.reduce((acc, curr) => acc + (curr.applicants || []).length, 0)

  const totalStudents = userList.filter((u) => u.role === 'student').length
  const totalInternships = (internships || []).length

  const myInvitations = (projects || []).filter(p => 
    (p.invitations || []).some(inv => inv.email === currentUser.email && inv.status === 'pending')
  )

  function handleInvitation(project, action) {
    if (!onUpdateProject) return
    const updatedInv = (project.invitations || []).map(i => i.email === currentUser.email ? { ...i, status: action === 'accept' ? 'accepted' : 'rejected' } : i)
    const updatedInstructors = action === 'accept' ? [...(project.instructors || []), currentUser.name] : (project.instructors || [])
    onUpdateProject({
      ...project,
      invitations: updatedInv,
      instructors: updatedInstructors
    })
    toast.success(`Invitation ${action === 'accept' ? 'accepted' : 'rejected'}`)
  }

  // Build a real activity feed from data
  function buildActivity() {
    const items = []

    // Recent projects created by this user
    myProjects
      .slice(-3)
      .reverse()
      .forEach((p) => {
        items.push({
          id: `proj-${p.id}`,
          icon: '📁',
          text: `You created a project: "${p.title}"`,
          time: p.createdAt || 'Recently',
          link: `/projects/${p.id}`,
        })
      })

    // Applied internships
    myApplications.slice(-2).reverse().forEach((i) => {
      items.push({
        id: `app-${i.id}`,
        icon: '📄',
        text: `You applied to "${i.role}" at ${i.company}`,
        time: 'Recently',
        link: '/internships',
      })
    })

    // Open internship announcements
    openInternships.slice(0, 2).forEach((i) => {
      if (!myApplications.find((a) => a.id === i.id)) {
        items.push({
          id: `intern-${i.id}`,
          icon: '🔔',
          text: `New opening: ${i.role} at ${i.company}`,
          time: i.postedAt || 'Recently',
          link: '/internships',
        })
      }
    })

    // If nothing at all, show a welcome message
    if (items.length === 0) {
      items.push({
        id: 'welcome',
        icon: '👋',
        text: `Welcome to Portfolia, ${currentUser.name}! Start by creating a project.`,
        time: 'Just now',
        link: '/projects',
      })
    }

    return items.slice(0, 6)
  }

  const activityFeed = buildActivity()

  return (
    <Layout currentUser={currentUser} onLogout={onLogout} notifications={notifications} onMarkRead={onMarkRead}>
      <div className="max-w-[1280px] mx-auto w-full space-y-12">
        {/* Page header */}
        <header>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#111111]"
            style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.15' }}
          >
            Welcome back, {currentUser.name?.split(' ')[0]}.
          </h1>
          <p className="text-lg text-[#747878] mt-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Your professional activity at a glance.
          </p>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentUser.role === 'student' && (
            <>
              <StatCard
                label="Total Projects"
                value={myProjects.length}
                icon={FolderKanban}
                note={myProjects.length > 0 ? `${myProjects.filter(p => p.status === 'In Progress').length} in progress` : 'Create your first project'}
                highlightNote={myProjects.length > 0}
              />
              <StatCard
                label="Applications Sent"
                value={myApplications.length}
                icon={FileText}
                note={myApplications.length > 0 ? 'Under review' : 'Browse internships'}
              />
              <StatCard
                label="Open Positions"
                value={openInternships.length}
                icon={Bell}
                note="Available now"
                highlightNote={true}
              />
            </>
          )}

          {currentUser.role === 'employer' && (
            <>
              <StatCard
                label="Total Internships Posted"
                value={employerInternships.length}
                icon={FolderKanban}
                note={employerInternships.length > 0 ? 'Active listings' : 'Post an internship'}
                highlightNote={employerInternships.length > 0}
              />
              <StatCard
                label="Total Applicants"
                value={totalApplicants}
                icon={Users}
                note="Across all listings"
              />
              <StatCard
                label="Open Positions"
                value={openInternships.length}
                icon={Bell}
                note="Platform total"
              />
            </>
          )}

          {currentUser.role === 'instructor' && (
            <>
              <StatCard
                label="Total Students"
                value={totalStudents}
                icon={Users}
                note="Registered on platform"
              />
              <StatCard
                label="Total Internships"
                value={totalInternships}
                icon={FolderKanban}
                note="Available to students"
              />
              <StatCard
                label="Pending Invitations"
                value={myInvitations.length}
                icon={Bell}
                note={myInvitations.length > 0 ? 'Requires action' : 'All clear'}
                highlightNote={myInvitations.length > 0}
              />
            </>
          )}
        </section>

        {/* Quick actions */}
        {currentUser.role === 'student' && (
          <section className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-[#111111] text-white px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#333] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              + New Project
            </Link>
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 border border-[#111111] text-[#111111] px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#f1edec] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Browse Internships
            </Link>
          </section>
        )}

        {/* Activity feed */}
        <section>
          <h2
            className="text-2xl font-bold text-[#111111] mb-6"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Activity Feed
          </h2>
          <div className="bg-white border border-[#e5e2e1]">
            {activityFeed.map((item) => (
              <Link
                key={item.id}
                to={item.link || '#'}
                className="flex items-start gap-4 p-6 border-b border-[#e5e2e1] hover:bg-[#fdf8f8] transition-colors last:border-b-0 group"
              >
                <div className="w-10 h-10 bg-[#f1edec] border border-[#e5e2e1] flex-shrink-0 flex items-center justify-center text-base">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#111111] group-hover:text-[#6b38d4] transition-colors" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {item.text}
                  </p>
                  <p className="text-xs text-[#747878] mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {item.time}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Invitations (Instructor Only) */}
        {currentUser.role === 'instructor' && myInvitations.length > 0 && (
          <section>
            <h2
              className="text-2xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              Project Invitations
            </h2>
            <div className="bg-white border border-[#e5e2e1]">
              {myInvitations.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-6 border-b border-[#e5e2e1] last:border-b-0 hover:bg-[#fdf8f8] transition-colors group">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-[#111111]" style={{ fontFamily: "'Newsreader', serif" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#747878] mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      You have been invited to be an instructor for this project.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInvitation(project, 'accept')}
                      className="bg-[#111111] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#333] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleInvitation(project, 'reject')}
                      className="bg-white text-[#ba1a1a] border border-[#ba1a1a] px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#fdf8f8] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* My Projects preview */}
        {myProjects.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold text-[#111111]"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                My Projects
              </h2>
              <Link
                to="/projects"
                className="text-xs font-bold uppercase tracking-widest text-[#747878] hover:text-[#111111] transition-colors underline decoration-[#c4c7c7]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myProjects.slice(0, 3).map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="bg-white border border-[#e5e2e1] p-5 hover:border-[#111111] transition-colors group"
                >
                  <h3
                    className="text-lg font-bold text-[#111111] group-hover:text-[#6b38d4] transition-colors mb-2 line-clamp-1"
                    style={{ fontFamily: "'Newsreader', serif" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-xs text-[#747878] line-clamp-2 mb-3"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {p.description}
                  </p>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider bg-[#f1edec] text-[#111111] px-2 py-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {p.status || 'In Progress'}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Req 67: Recommended Projects (student) */}
        {currentUser.role === 'student' && (() => {
          const myTags = myProjects.flatMap(p => p.tags || []).map(t => t.toLowerCase())
          const myLangs = myProjects.flatMap(p => p.languages || []).map(l => l.toLowerCase())
          const myInterests = [...new Set([...myTags, ...myLangs])]
          const recommended = (projects || [])
            .filter(p =>
              p.visibility === 'Public' &&
              !p.adminHidden &&
              String(p.ownerId) !== String(currentUser.id) &&
              (myInterests.length === 0 || (p.tags || []).some(t => myInterests.includes(t.toLowerCase())) || (p.languages || []).some(l => myInterests.includes(l.toLowerCase())))
            )
            .slice(0, 3)
          if (recommended.length === 0) return null
          return (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Newsreader', serif" }}>
                  Recommended Projects
                </h2>
                <Link to="/projects" className="text-xs font-bold uppercase tracking-widest text-[#747878] hover:text-[#111111] transition-colors underline decoration-[#c4c7c7]" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Browse all →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommended.map((p) => {
                  const owner = (userList || []).find(u => u.id === p.ownerId)
                  return (
                    <Link key={p.id} to={`/projects/${p.id}`}
                      className="bg-white border border-[#e5e2e1] p-5 hover:border-[#111111] transition-colors group">
                      <p className="text-xs text-[#747878] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        by {owner?.name || 'Unknown'}
                      </p>
                      <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#6b38d4] transition-colors mb-2 line-clamp-1" style={{ fontFamily: "'Newsreader', serif" }}>
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#747878] line-clamp-2 mb-3" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(p.tags || []).slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] font-semibold uppercase tracking-wider bg-[#ebe7e6] text-[#111111] px-2 py-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{t}</span>
                        ))}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })()}
      </div>
    </Layout>
  )
}
