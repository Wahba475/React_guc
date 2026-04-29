export default function StatCard({ label, value, icon: Icon, note }) {
  return (
    <div className="bg-white border border-[#e5e2e1] rounded-lg p-5 flex flex-col gap-3 hover:border-[#c4c7c7] transition-colors">
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold uppercase tracking-widest text-[#747878]"
          style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.08em' }}
        >
          {label}
        </span>
        {Icon && (
          <span className="w-8 h-8 rounded-md bg-[#f1edec] flex items-center justify-center">
            <Icon size={15} className="text-[#6b38d4]" />
          </span>
        )}
      </div>
      <p
        className="text-3xl font-bold text-[#111111]"
        style={{ fontFamily: "'Newsreader', serif" }}
      >
        {value}
      </p>
      {note && (
        <p className="text-xs text-[#747878]">{note}</p>
      )}
    </div>
  )
}
