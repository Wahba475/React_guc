import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Building2, BookOpen, AlertCircle, Eye, EyeOff } from 'lucide-react'

const roles = [
  {
    id: 'student',
    label: 'Student',
    icon: GraduationCap,
    desc: 'Build your portfolio and find internships.',
  },
  {
    id: 'employer',
    label: 'Employer',
    icon: Building2,
    desc: 'Post internships and discover talent.',
  },
  {
    id: 'instructor',
    label: 'Instructor',
    icon: BookOpen,
    desc: 'Guide students and review their work.',
  },
]

function Step1({ selected, onSelect, onNext }) {
  return (
    <div>
      <h2
        className="text-2xl font-semibold text-[#111111] mb-1"
        style={{ fontFamily: "'Newsreader', serif" }}
      >
        I am a…
      </h2>
      <p className="text-sm text-[#747878] mb-6">Choose your role to get started.</p>
      <div className="space-y-3 mb-6">
        {roles.map(({ id, label, icon: Icon, desc }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg border text-left transition-all
              ${selected === id
                ? 'border-[#6b38d4] bg-[#f5f0ff] ring-2 ring-[#6b38d4]/10'
                : 'border-[#e5e2e1] bg-white hover:border-[#c4c7c7]'
              }`}
          >
            <span
              className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0
                ${selected === id ? 'bg-[#6b38d4]' : 'bg-[#f1edec]'}`}
            >
              <Icon size={18} className={selected === id ? 'text-white' : 'text-[#747878]'} />
            </span>
            <div>
              <p
                className="text-sm font-semibold text-[#111111]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {label}
              </p>
              <p className="text-xs text-[#747878]">{desc}</p>
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full bg-[#111111] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        Continue
      </button>
    </div>
  )
}

function Field({ id, label, type = 'text', value, onChange, placeholder }) {
  const [showPw, setShowPw] = useState(false)
  const isPassword = type === 'password'
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-bold text-[#444748] mb-1.5 uppercase tracking-wide"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPw ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 border border-[#c4c7c7] rounded-md text-sm text-[#111111] placeholder-[#c4c7c7] focus:outline-none focus:border-[#6b38d4] focus:ring-2 focus:ring-[#6b38d4]/10 transition-all bg-white pr-10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#111111]"
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  )
}

function Step2({ role, onSubmit, onBack }) {
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    university: '', major: '', gpa: '',
    company: '', position: '',
    department: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  function validate() {
    if (!form.name || !form.email || !form.password) return 'Name, email and password are required.'
    if (form.password.length < 6) return 'Password must be at least 6 characters.'
    if (role === 'student' && !form.university) return 'University is required.'
    if (role === 'employer' && !form.company) return 'Company is required.'
    if (role === 'instructor' && !form.department) return 'Department is required.'
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      const payload = { name: form.name, email: form.email, password: form.password, role, skills: [] }
      if (role === 'student') {
        Object.assign(payload, { university: form.university, major: form.major, gpa: form.gpa })
      } else if (role === 'employer') {
        Object.assign(payload, { company: form.company, position: form.position })
      } else {
        Object.assign(payload, { department: form.department })
      }
      onSubmit(payload)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2
        className="text-2xl font-semibold text-[#111111] mb-1"
        style={{ fontFamily: "'Newsreader', serif" }}
      >
        Create your account
      </h2>
      <p className="text-sm text-[#747878] mb-6 capitalize">Registering as a <strong>{role}</strong>.</p>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 rounded-md px-3 py-2 text-sm mb-4">
          <AlertCircle size={14} className="flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-3">
        <Field id="name" label="Full Name" value={form.name} onChange={set('name')} placeholder="Ahmed Hassan" />
        <Field id="reg-email" label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />
        <Field id="reg-password" label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" />

        {role === 'student' && (
          <>
            <Field id="university" label="University" value={form.university} onChange={set('university')} placeholder="German University in Cairo" />
            <Field id="major" label="Major" value={form.major} onChange={set('major')} placeholder="Computer Science" />
            <Field id="gpa" label="GPA (optional)" value={form.gpa} onChange={set('gpa')} placeholder="3.8" />
          </>
        )}
        {role === 'employer' && (
          <>
            <Field id="company" label="Company" value={form.company} onChange={set('company')} placeholder="TechCorp Egypt" />
            <Field id="position" label="Your Position" value={form.position} onChange={set('position')} placeholder="HR Manager" />
          </>
        )}
        {role === 'instructor' && (
          <Field id="department" label="Department" value={form.department} onChange={set('department')} placeholder="Computer Science" />
        )}
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-[#c4c7c7] text-[#444748] py-2.5 rounded-md text-sm font-semibold hover:border-[#747878] hover:text-[#111111] transition-colors"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#111111] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-[#333] disabled:opacity-50 transition-colors"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </div>
    </form>
  )
}

export default function Register({ onRegister, currentUser }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('')

  useEffect(() => {
    if (currentUser) navigate('/dashboard')
  }, [currentUser, navigate])

  function handleRegister(payload) {
    onRegister(payload)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-7">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="w-7 h-7 rounded-sm bg-[#111111] flex items-center justify-center">
              <span className="text-white text-sm font-bold" style={{ fontFamily: "'Newsreader', serif" }}>P</span>
            </span>
            <span className="text-xl font-semibold text-[#111111]" style={{ fontFamily: "'Newsreader', serif" }}>
              Portfolia
            </span>
          </Link>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${step >= s ? 'bg-[#6b38d4] w-8' : 'bg-[#e5e2e1] w-4'}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#e5e2e1] rounded-lg p-6">
          {step === 1
            ? <Step1 selected={role} onSelect={setRole} onNext={() => setStep(2)} />
            : <Step2 role={role} onSubmit={handleRegister} onBack={() => setStep(1)} />
          }
        </div>

        <p className="text-center text-sm text-[#747878] mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-[#6b38d4] font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
