export default function StatCard({ label, value, icon: Icon, note, highlightNote }) {
  return (
    <div className="bg-white border border-[#e5e2e1] p-4 lg:p-6 flex flex-col justify-between hover:border-[#111111] transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-semibold uppercase tracking-wider text-[#747878]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {label}
        </span>
        {Icon && (
          <Icon size={20} className="text-[#747878]" />
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <p
          className="text-4xl font-bold text-[#111111]"
          style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em', lineHeight: '1.1' }}
        >
          {value}
        </p>
        {note && (
          <span 
            className={`text-sm ${highlightNote ? 'text-green-600' : 'text-[#747878]'}`} 
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {note}
          </span>
        )}
      </div>
    </div>
  )
}
