import InstructorLayout from '../components/InstructorLayout'
import { BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'

export default function InstructorCourses({ currentUser, onLogout, notifications, onMarkRead, courses, onRequestCourseLink }) {
  return (
    <InstructorLayout currentUser={currentUser} onLogout={onLogout} notifications={notifications} onMarkRead={onMarkRead}>
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            Academics
          </p>
          <h1 className="text-4xl font-bold text-[#111111] mb-2" style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }}>
            My Courses
          </h1>
          <p className="text-lg text-[#747878]" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Manage the courses you are currently teaching.
          </p>
        </div>

        <div className="bg-white border border-[#e5e2e1]">
          <div className="p-6">
            {(courses || []).length === 0 ? (
              <div className="text-center py-10">
                <BookOpen size={24} className="mx-auto mb-3 text-[#c4c7c7]" />
                <p className="text-sm text-[#747878]" style={{ fontFamily: "'Manrope', sans-serif" }}>No courses available in the system.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {(courses || []).map(course => {
                  const isLinked = (currentUser.courses || []).includes(course.id)
                  return (
                    <div key={course.id} className="flex items-center justify-between border border-[#e5e2e1] p-4 bg-[#fdf8f8]">
                      <div>
                        <p className="text-lg font-bold text-[#111111]" style={{ fontFamily: "'Newsreader', serif" }}>{course.code} - {course.name}</p>
                        <span className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${isLinked ? 'bg-[#111111] text-white' : 'bg-transparent border border-[#c4c7c7] text-[#747878]'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                          {isLinked ? 'Currently Linked' : 'Not Linked'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onRequestCourseLink({
                            id: String(Date.now()),
                            instructorId: currentUser.id,
                            courseId: course.id,
                            type: isLinked ? 'unlink' : 'link',
                            createdAt: new Date().toISOString()
                          })
                          toast.success(`Request to ${isLinked ? 'unlink' : 'link'} sent to Admin.`)
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${isLinked ? 'border border-[#ba1a1a] text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white' : 'bg-[#111111] text-white hover:bg-[#333]'}`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {isLinked ? 'Request Unlink' : 'Request Link'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </InstructorLayout>
  )
}
