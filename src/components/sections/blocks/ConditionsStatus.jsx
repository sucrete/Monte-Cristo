const STATUS_CONFIG = {
  'open':           { label: 'Open',            dot: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  'closed':         { label: 'Closed',          dot: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
  'cart-path-only': { label: 'Cart Path Only',  dot: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  'walking-only':   { label: 'Walking Only',    dot: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  'limited':        { label: 'Limited Access',  dot: '#9333ea', bg: '#faf5ff', border: '#e9d5ff' },
}

export default function ConditionsStatus({ title = 'Course Conditions', status = 'open', details, lastUpdated }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
  const updated = lastUpdated ? new Date(lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null
  return (
    <section className="py-10 md:py-12">
      <div className="main-container">
        <div className="rounded-2xl border p-6 md:p-8 max-w-xl" style={{ background: cfg.bg, borderColor: cfg.border }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold uppercase tracking-widest text-[#6b7280]">{title}</span>
            {updated && <span className="text-[11px] text-[#9ca3af]">Updated {updated}</span>}
          </div>
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
            <span className="text-[1.4rem] font-semibold text-secondary">{cfg.label}</span>
          </div>
          {details && <p className="mt-3 text-[14px] text-[#6b7280] leading-relaxed">{details}</p>}
        </div>
      </div>
    </section>
  )
}
