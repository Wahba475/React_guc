import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function Login({ onLogin, currentUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) navigate('/dashboard')
  }, [currentUser, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const result = onLogin(email, password)
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error)
        setLoading(false)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center">
            <span className="w-7 h-7 rounded-sm bg-[#111111] flex items-center justify-center">
              <span className="text-white text-sm font-bold" style={{ fontFamily: "'Newsreader', serif" }}>P</span>
            </span>
            <span className="text-xl font-semibold text-[#111111]" style={{ fontFamily: "'Newsreader', serif" }}>
              Portfolia
            </span>
          </Link>
          <h1
            className="mt-6 text-2xl font-semibold text-[#111111]"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-[#747878]">Sign in to your account to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#e5e2e1] rounded-lg p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 rounded-md px-3 py-2 text-sm">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold text-[#444748] mb-1.5 uppercase tracking-wide"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 border border-[#c4c7c7] rounded-md text-sm text-[#111111] placeholder-[#c4c7c7] focus:outline-none focus:border-[#6b38d4] focus:ring-2 focus:ring-[#6b38d4]/10 transition-all bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-[#444748] mb-1.5 uppercase tracking-wide"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 pr-10 border border-[#c4c7c7] rounded-md text-sm text-[#111111] placeholder-[#c4c7c7] focus:outline-none focus:border-[#6b38d4] focus:ring-2 focus:ring-[#6b38d4]/10 transition-all bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#111111] transition-colors"
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-[#747878] mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6b38d4] font-semibold hover:underline">
            Create one
          </Link>
        </p>

        {/* Demo hint */}
        <p className="text-center text-xs text-[#c4c7c7] mt-3">
          Demo: ahmed@test.com / password
        </p>
      </div>
    </div>
  )
}
