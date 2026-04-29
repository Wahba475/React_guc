import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import AppLayout from '../components/AppLayout'
import { UploadCloud, Camera } from 'lucide-react'

/* ── Profile Image Upload ───────────────────────────────── */
function AvatarUpload({ currentUser, onUpdateUser }) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      onUpdateUser({ image: url })
    },
    [onUpdateUser]
  )

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    noClick: true,   // we control click manually
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  })

  const initials = currentUser?.name
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar box */}
      <div className="relative group">
        <div className="w-24 h-24 overflow-hidden border border-[#111111] bg-[#111111] flex items-center justify-center flex-shrink-0">
          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-white text-2xl font-bold select-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {initials}
            </span>
          )}
        </div>
        {/* Hover overlay */}
        <button
          onClick={open}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
          aria-label="Change profile photo"
        >
          <Camera size={18} className="text-white" />
        </button>
      </div>

      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={`w-full max-w-xs border border-dashed px-5 py-5 flex flex-col items-center gap-2 cursor-pointer transition-all
          ${isDragActive
            ? 'border-[#111111] bg-[#f1edec]'
            : 'border-[#c4c7c7] hover:border-[#111111] hover:bg-[#fdf8f8]'
          }`}
      >
        <input {...getInputProps()} />
        <UploadCloud
          size={22}
          className={`transition-colors ${isDragActive ? 'text-[#111111]' : 'text-[#747878]'}`}
        />
        <p className="text-xs text-center text-[#747878]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <button
            type="button"
            onClick={open}
            className="text-[#111111] font-semibold hover:underline uppercase tracking-wider"
          >
            Click to upload
          </button>
          {' '}or drag & drop
        </p>
        <p className="text-[10px] text-[#747878] uppercase tracking-wider">PNG, JPG, GIF, WEBP</p>
      </div>
    </div>
  )
}

/* ── Info Row ───────────────────────────────────────────── */
function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-[#e5e2e1] last:border-0">
      <span
        className="w-32 flex-shrink-0 text-xs font-bold uppercase tracking-wider text-[#747878]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {label}
      </span>
      <span className="text-sm text-[#111111]" style={{ fontFamily: "'Manrope', sans-serif" }}>{value}</span>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────── */
export default function Profile({ currentUser, onLogout, onUpdateUser }) {
  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-1"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Account
          </p>
          <h1
            className="text-4xl font-bold text-[#111111] mb-2"
            style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }}
          >
            Profile
          </h1>
          <p className="text-lg text-[#747878]" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Your personal and professional information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left — Avatar + Upload */}
          <div className="bg-white border border-[#e5e2e1] p-6 flex flex-col items-center gap-4">
            <AvatarUpload currentUser={currentUser} onUpdateUser={onUpdateUser} />

            <div className="text-center mt-1">
              <p
                className="text-2xl font-bold text-[#111111] mb-1"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                {currentUser.name}
              </p>
              <p className="text-xs font-semibold text-[#747878] uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                {currentUser.role}
              </p>
              <p className="text-sm text-[#747878] mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                {currentUser.email}
              </p>
            </div>

            {/* Skills */}
            {currentUser.skills?.length > 0 && (
              <div className="w-full border-t border-[#e5e2e1] pt-4 mt-2">
                <p
                  className="text-xs font-bold uppercase tracking-wider text-[#747878] mb-3 text-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Skills
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentUser.skills.map((s) => (
                    <span
                      key={s}
                      className="bg-[#f1edec] text-[#111111] border border-[#e5e2e1] px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Basic Info */}
            <div className="bg-white border border-[#e5e2e1] p-6">
              <h2
                className="text-xs font-bold uppercase tracking-wider text-[#747878] mb-4 border-b border-[#e5e2e1] pb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Information
              </h2>
              <InfoRow label="Full Name" value={currentUser.name} />
              <InfoRow label="Email" value={currentUser.email} />
              <InfoRow label="Role" value={currentUser.role} />

              {/* Student-specific */}
              {currentUser.role === 'student' && (
                <>
                  <InfoRow label="University" value={currentUser.university} />
                  <InfoRow label="Major" value={currentUser.major} />
                  <InfoRow label="GPA" value={currentUser.gpa} />
                </>
              )}

              {/* Employer-specific */}
              {currentUser.role === 'employer' && (
                <>
                  <InfoRow label="Company" value={currentUser.company} />
                  <InfoRow label="Position" value={currentUser.position} />
                </>
              )}

              {/* Instructor-specific */}
              {currentUser.role === 'instructor' && (
                <InfoRow label="Department" value={currentUser.department} />
              )}

              <InfoRow label="Bio" value={currentUser.bio} />
            </div>

            {/* Bio card if no bio in InfoRow (fallback) */}
            {!currentUser.bio && (
              <div className="bg-[#fdf8f8] border border-[#e5e2e1] p-5 text-sm text-[#747878] italic" style={{ fontFamily: "'Manrope', sans-serif" }}>
                No bio added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
