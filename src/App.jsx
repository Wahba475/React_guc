import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { users as initialUsers } from './data/users'
import { projects as initialProjects } from './data/projects'

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

  useEffect(() => {
    localStorage.setItem('portfolia_users', JSON.stringify(userList))
  }, [userList])

  useEffect(() => {
    localStorage.setItem('portfolia_projects', JSON.stringify(projectsList))
  }, [projectsList])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('portfolia_currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('portfolia_currentUser')
    }
  }, [currentUser])

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
    const id = String(userList.length + 1)
    const user = { id, password: newUser.password, ...newUser }
    setUserList((prev) => [...prev, user])
    setCurrentUser(user)
  }

  function handleLogout() {
    setCurrentUser(null)
  }

  // Patch currentUser and mirror the change into userList (e.g. for image upload)
  function handleUpdateUser(patch) {
    const updated = { ...currentUser, ...patch }
    setCurrentUser(updated)
    setUserList((prev) =>
      prev.map((u) => (u.id === updated.id ? updated : u))
    )
  }

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
              ? <Dashboard currentUser={currentUser} onLogout={handleLogout} projects={projectsList} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/projects"
          element={
            currentUser
              ? <Projects currentUser={currentUser} onLogout={handleLogout} projects={projectsList} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/projects/:id"
          element={
            currentUser
              ? <ProjectDetails currentUser={currentUser} onLogout={handleLogout} projects={projectsList} setProjectsList={setProjectsList} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/internships"
          element={
            currentUser
              ? <Internships currentUser={currentUser} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            currentUser
              ? <Profile currentUser={currentUser} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin"
          element={
            currentUser
              ? <Admin currentUser={currentUser} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
