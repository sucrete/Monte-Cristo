import Image from 'next/image'
import Link from 'next/link'

export default function EventPromo({ title, date, description, image, registerLabel = 'Register Now', registerUrl }) {
  const dateStr = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : null
  return (
    <section className="py-16 md:py-20">
      <div className="main-container">
        <div className="rounded-2xl overflow-hidden border border-[#e8eaed] grid grid-cols-1 md:grid-cols-2">
          {image?.asset?.url && (
            <div className="relative aspect-video md:aspect-auto min-h-[240px]">
              <Image src={image.asset.url} alt={title ?? ''} fill className="object-cover" />
            </div>
          )}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            {dateStr && (
              <span className="inline-block mb-3 text-[12px] font-semibold uppercase tracking-widest text-[#02634e]">{dateStr}</span>
            )}
            {title && <h2 className="mb-4">{title}</h2>}
            {description && <p className="text-[#6b7280] mb-6 leading-relaxed">{description}</p>}
            {registerLabel && registerUrl && (
              <Link
                href={registerUrl}
                className="self-start inline-flex items-center px-6 py-3 rounded-full bg-secondary text-white text-[14px] font-medium hover:bg-secondary/90 transition-colors"
              >
                {registerLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
