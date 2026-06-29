import Link from 'next/link'

export default function LessonPackage({ title, sessionsCount, price, priceNote, features = [], ctaLabel = 'Book Now', ctaUrl }) {
  return (
    <section className="py-16 md:py-20 bg-[#fafafa]">
      <div className="main-container flex justify-center">
        <div className="rounded-2xl border border-[#e8eaed] bg-white p-8 md:p-10 max-w-md w-full text-center shadow-sm">
          {title && <h2 className="text-[1.6rem] mb-2">{title}</h2>}
          {sessionsCount && (
            <p className="text-[13px] text-[#9ca3af] mb-5 font-medium uppercase tracking-wide">
              {sessionsCount} {sessionsCount === 1 ? 'Session' : 'Sessions'}
            </p>
          )}
          {price && (
            <div className="mb-2">
              <span className="text-[3rem] font-serif font-medium text-secondary leading-none">{price}</span>
              {priceNote && <span className="text-[13px] text-[#9ca3af] ml-2">{priceNote}</span>}
            </div>
          )}
          {features.length > 0 && (
            <ul className="mt-6 mb-8 space-y-2 text-left">
              {features.map((f, i) => (
                <li key={f._key ?? i} className="flex items-start gap-2 text-[14px] text-[#3f3f3f]">
                  <span className="mt-0.5 flex-shrink-0 size-4 rounded-full bg-[#f0fdf4] text-[#16a34a] text-[11px] flex items-center justify-center">✓</span>
                  {f.text}
                </li>
              ))}
            </ul>
          )}
          {ctaLabel && ctaUrl && (
            <Link
              href={ctaUrl}
              className="inline-flex w-full items-center justify-center px-6 py-3 rounded-full bg-secondary text-white text-[14px] font-medium hover:bg-secondary/90 transition-colors"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
