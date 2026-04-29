import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import AppLayout from '../components/AppLayout'
import Badge from '../components/Badge'
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
      {/* Avatar circle */}
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#e5e2e1] bg-[#6b38d4] flex items-center justify-center flex-shrink-0">
          {currentUser?.image ? (
            <img
              src={currentUser.image}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-white text-2xl font-bold select-none"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {initials}
            </span>
          )}
        </div>
        {/* Hover overlay */}
        <button
          onClick={open}
          className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
          aria-label="Change profile photo"
        >
          <Camera size={18} className="text-white" />
        </button>
      </div>

      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={`w-full max-w-xs border-2 border-dashed rounded-lg px-5 py-5 flex flex-col items-center gap-2 cursor-pointer transition-all
          ${isDragActive
            ? 'border-[#6b38d4] bg-[#f5f0ff]'
            : 'border-[#c4c7c7] hover:border-[#6b38d4] hover:bg-[#faf8ff]'
          }`}
      >
        <input {...getInputProps()} />
        <UploadCloud
          size={22}
          className={`transition-colors ${isDragActive ? 'text-[#6b38d4]' : 'text-[#c4c7c7]'}`}
        />
        <p className="text-xs text-center text-[#747878]">
          <button
            type="button"
            onClick={open}
            className="text-[#6b38d4] font-semibold hover:underline"
          >
            Click to upload
          </button>
          {' '}or drag & drop
        </p>
        <p className="text-xs text-[#c4c7c7]">PNG, JPG, GIF, WEBP</p>
      </div>
    </div>
  )
}

/* ── Info Row ───────────────────────────────────────────── */
function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-[#f1edec] last:border-0">
      <span
        className="w-32 flex-shrink-0 text-xs font-bold uppercase tracking-wide text-[#747878]"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {label}
      </span>
      <span className="text-sm text-[#111111]">{value}</span>
    </div>
  )
}

/* ── Page ───────────────────────────────────────────────── */
export default function Profile({ currentUser, onLogout, onUpdateUser }) {
  return (
    <AppLayout currentUser={currentUser} onLogout={onLogout}>
      {/* Header */}
      <div className="mb-8">
        <p
          className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-1"
          style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.1em' }}
        >
          Account
        </p>
        <h1
          className="text-2xl font-semibold text-[#111111]"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Profile
        </h1>
        <p className="text-sm text-[#747878] mt-1">Your personal and professional information.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — Avatar + Upload */}
        <div className="bg-white border border-[#e5e2e1] rounded-lg p-6 flex flex-col items-center gap-4">
          <AvatarUpload currentUser={currentUser} onUpdateUser={onUpdateUser} />

          <div className="text-center mt-1">
            <p
              className="text-base font-semibold text-[#111111]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {currentUser.name}
            </p>
            <p className="text-sm text-[#747878] capitalize mt-0.5">{currentUser.role}</p>
            <p className="text-xs text-[#c4c7c7] mt-1">{currentUser.email}</p>
          </div>

          {/* Skills */}
          {currentUser.skills?.length > 0 && (
            <div className="w-full border-t border-[#f1edec] pt-4 mt-2">
              <p
                className="text-xs font-bold uppercase tracking-wide text-[#747878] mb-3 text-center"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {currentUser.skills.map((s) => (
                  <Badge key={s} variant="purple">{s}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic Info */}
          <div className="bg-white border border-[#e5e2e1] rounded-lg p-6">
            <h2
              className="text-sm font-bold uppercase tracking-wide text-[#747878] mb-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
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
            <div className="bg-[#f7f3f2] border border-[#e5e2e1] rounded-lg p-5 text-sm text-[#747878] italic">
              No bio added yet.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
