import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, Mail } from 'lucide-react'

export default function ForgotPassword({ userList }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [enteredOtp, setEnteredOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleEmailSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Please enter your email address.'); return }
    setLoading(true)
    setTimeout(() => {
      const exists = (userList || []).some((u) => u.email === email.trim())
      if (!exists) {
        setError('No account found with that email address.')
        setLoading(false)
        return
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000))
      setGeneratedOtp(otp)
      // In a real app this would be emailed. For demo, show in toast.
      toast.success(`OTP sent! (Demo code: ${otp})`, { duration: 8000 })
      setLoading(false)
      setStep(2)
    }, 600)
  }

  function handleOtpSubmit(e) {
    e.preventDefault()
    setError('')
    if (!enteredOtp.trim()) { setError('Please enter the OTP.'); return }
    if (enteredOtp.trim() !== generatedOtp) {
      setError('Invalid OTP. Please check and try again.')
      return
    }
    setStep(3)
  }

  function handleReset(e) {
    e.preventDefault()
    setError('')
    if (!newPassword || newPassword.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }
    toast.success('Password reset successfully! You can now log in.')
    navigate('/login')
  }

  const stepLabels = ['Verify Email', 'Enter OTP', 'New Password']

  return (
    <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-md bg-white border border-[#e5e2e1] p-8 md:p-12 flex flex-col gap-8">
        <header className="flex flex-col gap-3">
          <button
            onClick={() => step === 1 ? navigate('/login') : setStep(s => s - 1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#747878] hover:text-[#111111] transition-colors w-fit"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={14} /> {step === 1 ? 'Back to Login' : 'Back'}
          </button>

          {/* Step indicator */}
          <div className="flex gap-1.5 mt-1">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1 flex-1 transition-all duration-300 ${step >= s ? 'bg-[#111111]' : 'bg-[#e5e2e1]'}`} />
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#747878]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Step {step} of 3 — {stepLabels[step - 1]}
          </p>

          <h1 className="text-3xl font-bold text-[#111111]" style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }}>
            {step === 1 ? 'Forgot Password?' : step === 2 ? 'Enter OTP' : 'Reset Password'}
          </h1>
          <p className="text-sm text-[#444748]" style={{ fontFamily: "'Inter', sans-serif" }}>
            {step === 1
              ? "Enter your email and we'll send you a one-time password."
              : step === 2
              ? `Enter the 6-digit OTP sent to ${email}.`
              : 'Choose a new password for your account.'}
          </p>
        </header>

        {error && (
          <p className="text-xs text-[#ba1a1a] font-semibold bg-[#ffdad6] border border-[#ba1a1a] px-3 py-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            {error}
          </p>
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-widest" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white border-0 border-b border-[#e5e2e1] py-2 px-0 focus:ring-0 focus:border-[#111111] text-base text-[#111111] placeholder:text-[#c4c7c7] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#111111] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#333] transition-colors border border-[#111111] disabled:opacity-50"
              style={{ fontFamily: "'Manrope', sans-serif" }}>
              {loading ? 'Sending OTP…' : 'Send OTP'}
            </button>
            <p className="text-center text-sm text-[#444748]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Remember it?{' '}
              <Link to="/login" className="text-[#111111] font-semibold underline decoration-1 underline-offset-4 hover:text-[#6b38d4] transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 bg-[#f1edec] border border-[#e5e2e1] p-4">
              <Mail size={16} className="text-[#747878] flex-shrink-0" />
              <p className="text-xs text-[#444748]" style={{ fontFamily: "'Inter', sans-serif" }}>
                OTP sent to <strong>{email}</strong>. For this demo, the code was shown in the notification.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-widest" style={{ fontFamily: "'Manrope', sans-serif" }}>
                One-Time Password (OTP)
              </label>
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit code"
                maxLength={6}
                className="w-full bg-white border-0 border-b border-[#e5e2e1] py-2 px-0 focus:ring-0 focus:border-[#111111] text-xl text-[#111111] placeholder:text-[#c4c7c7] transition-colors tracking-[0.5em]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            <button type="submit"
              className="w-full bg-[#111111] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#333] transition-colors border border-[#111111]"
              style={{ fontFamily: "'Manrope', sans-serif" }}>
              Verify OTP
            </button>
            <button type="button" onClick={() => { setStep(1); setEnteredOtp('') }}
              className="text-center text-xs text-[#747878] hover:text-[#111111] underline transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}>
              Resend OTP
            </button>
          </form>
        )}

        {/* Step 3: New password */}
        {step === 3 && (
          <form onSubmit={handleReset} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-widest" style={{ fontFamily: "'Manrope', sans-serif" }}>
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full bg-white border-0 border-b border-[#e5e2e1] py-2 px-0 focus:ring-0 focus:border-[#111111] text-base text-[#111111] placeholder:text-[#c4c7c7] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#111111] uppercase tracking-widest" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-white border-0 border-b border-[#e5e2e1] py-2 px-0 focus:ring-0 focus:border-[#111111] text-base text-[#111111] placeholder:text-[#c4c7c7] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>
            <button type="submit"
              className="w-full bg-[#111111] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#333] transition-colors border border-[#111111]"
              style={{ fontFamily: "'Manrope', sans-serif" }}>
              Reset Password
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
