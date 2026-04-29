export default function Badge({ children, variant = 'default' }) {
  const styles = {
    default:  'bg-[#f1edec] text-[#444748]',
    purple:   'bg-[#e9ddff] text-[#5516be]',
    green:    'bg-green-50 text-green-700',
    yellow:   'bg-yellow-50 text-yellow-700',
    red:      'bg-red-50 text-red-700',
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${styles[variant]}`}
      style={{ fontFamily: "'Manrope', sans-serif", letterSpacing: '0.03em' }}
    >
      {children}
    </span>
  )
}
