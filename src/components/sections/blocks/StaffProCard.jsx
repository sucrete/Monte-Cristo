import Image from 'next/image'
import Link from 'next/link'

export default function StaffProCard({ photo, name, title, credentials = [], bio, ctaLabel, ctaUrl }) {
  return (
    <section className="py-16 md:py-20">
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            {photo?.asset?.url && (
              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={photo.asset.url} alt={name ?? ''} fill className="object-cover" />
              </div>
            )}
            {credentials.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {credentials.map((c, i) => (
                  <span key={c._key ?? i} className="text-[11px] font-medium px-3 py-1 rounded-full bg-[#f0f2f5] text-[#6b7280]">
                    {c.text}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            {name && <h2 className="mb-1">{name}</h2>}
            {title && <p className="text-[14px] font-medium uppercase tracking-widest text-[#9ca3af] mb-6">{title}</p>}
            {bio && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: bio }} />}
            {ctaLabel && ctaUrl && (
              <Link
                href={ctaUrl}
                className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-secondary text-white text-[14px] font-medium hover:bg-secondary/90 transition-colors"
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
