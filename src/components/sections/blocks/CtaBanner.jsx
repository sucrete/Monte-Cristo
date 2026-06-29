import Link from 'next/link'

const STYLES = {
  dark:  { bg: 'bg-secondary', text: 'text-white', sub: 'text-white/70', btn: 'bg-white text-secondary hover:bg-accent' },
  green: { bg: 'bg-[#02634e]', text: 'text-white', sub: 'text-white/70', btn: 'bg-white text-[#02634e] hover:bg-[#f0fdf4]' },
  light: { bg: 'bg-[#f6f6f8]', text: 'text-secondary', sub: 'text-secondary/70', btn: 'bg-secondary text-white hover:bg-secondary/90' },
}

export default function CtaBanner({ heading, subtext, buttonLabel, buttonUrl, style = 'dark' }) {
  const s = STYLES[style] ?? STYLES.dark
  return (
    <section className={`py-16 md:py-20 ${s.bg}`}>
      <div className="main-container text-center">
        {heading && <h2 className={`mb-3 ${s.text}`}>{heading}</h2>}
        {subtext && <p className={`mb-8 max-w-xl mx-auto ${s.sub}`}>{subtext}</p>}
        {buttonLabel && buttonUrl && (
          <Link
            href={buttonUrl}
            className={`inline-flex items-center px-7 py-3 rounded-full font-medium text-[15px] transition-colors ${s.btn}`}
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
