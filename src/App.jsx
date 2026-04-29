import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { users as initialUsers } from './data/users'
import { projects as initialProjects } from './data/projects'
import { internships as initialInternships } from './data/internships'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Internships from './pages/Internships'
import Profile from './pages/Profile'
import Admin from './pages/Admin'

export default function App() {
  // ── State ──────────────────────────────────────────────
  const [userList, setUserList] = useState(() => {
    const saved = localStorage.getItem('portfolia_users')
    return saved ? JSON.parse(saved) : initialUsers
  })

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('portfolia_currentUser')
    return saved ? JSON.parse(saved) : null
  })

  const [projectsList, setProjectsList] = useState(() => {
    const saved = localStorage.getItem('portfolia_projects')
    return saved ? JSON.parse(saved) : initialProjects
  })

  const [internshipsList, setInternshipsList] = useState(() => {
    const saved = localStorage.getItem('portfolia_internships')
    return saved ? JSON.parse(saved) : initialInternships
  })

  // ── Persistence ────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('portfolia_users', JSON.stringify(userList))
  }, [userList])

  useEffect(() => {
    localStorage.setItem('portfolia_projects', JSON.stringify(projectsList))
  }, [projectsList])

  useEffect(() => {
    localStorage.setItem('portfolia_internships', JSON.stringify(internshipsList))
  }, [internshipsList])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('portfolia_currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('portfolia_currentUser')
    }
  }, [currentUser])

  // ── Auth ───────────────────────────────────────────────
  function handleLogin(email, password) {
    const found = userList.find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      setCurrentUser(found)
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password.' }
  }

  function handleRegister(newUser) {
    const id = String(Date.now())
    const user = {
      id,
      ...newUser,
      projects: [],
      applications: [],
    }
    setUserList((prev) => [...prev, user])
    setCurrentUser(user)
  }

  function handleLogout() {
    setCurrentUser(null)
  }

  function handleUpdateUser(patch) {
    const updated = { ...currentUser, ...patch }
    setCurrentUser(updated)
    setUserList((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u))
    )
  }

  // ── Projects ───────────────────────────────────────────
  function handleCreateProject({ title, description, tags, visibility }) {
    const newProject = {
      id: String(Date.now()),
      ownerId: currentUser.id,
      title,
      description,
      tags: tags || [],
      visibility: visibility || 'Public',
      status: 'In Progress',
      github: null,
      demo: null,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      collaborators: [],
      milestones: [],
      tasks: [],
      comments: [],
    }
    setProjectsList((prev) => [...prev, newProject])
    // Link project to user
    handleUpdateUser({
      projects: [...(currentUser.projects || []), newProject.id],
    })
    return newProject
  }

  function handleUpdateProject(updatedProject) {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    )
  }

  // ── Internships ────────────────────────────────────────
  function handleApplyInternship(internshipId) {
    // Already applied?
    const internship = internshipsList.find((i) => i.id === internshipId)
    if (!internship) return { success: false, error: 'Not found' }
    const applicants = internship.applicants || []
    if (applicants.includes(currentUser.id)) {
      return { success: false, error: 'Already applied' }
    }

    // Update internship applicants list
    setInternshipsList((prev) =>
      prev.map((i) =>
        i.id === internshipId
          ? { ...i, applicants: [...(i.applicants || []), currentUser.id] }
          : i
      )
    )

    // Update user's applications list
    const updatedApplications = [...(currentUser.applications || []), internshipId]
    handleUpdateUser({ applications: updatedApplications })

    return { success: true }
  }

  function handleCreateInternship(data) {
    const newInternship = {
      id: String(Date.now()),
      ...data,
      employerId: currentUser.id,
      applicants: [],
      postedAt: new Date().toISOString().split('T')[0],
    }
    setInternshipsList((prev) => [...prev, newInternship])
    return newInternship
  }

  // ── Render ─────────────────────────────────────────────
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing currentUser={currentUser} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} currentUser={currentUser} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} currentUser={currentUser} />} />

        <Route
          path="/dashboard"
          element={
            currentUser
              ? <Dashboard
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  projects={projectsList}
                  internships={internshipsList}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/projects"
          element={
            currentUser
              ? <Projects
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  projects={projectsList}
                  onCreateProject={handleCreateProject}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/projects/:id"
          element={
            currentUser
              ? <ProjectDetails
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  projects={projectsList}
                  userList={userList}
                  onUpdateProject={handleUpdateProject}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/internships"
          element={
            currentUser
              ? <Internships
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  internships={internshipsList}
                  onApply={handleApplyInternship}
                  onCreateInternship={handleCreateInternship}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/profile"
          element={
            currentUser
              ? <Profile
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onUpdateUser={handleUpdateUser}
                  projects={projectsList}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/admin"
          element={
            currentUser
              ? <Admin
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  userList={userList}
                  projects={projectsList}
                  internships={internshipsList}
                />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
