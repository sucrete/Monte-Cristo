import Image from 'next/image'
import Link from 'next/link'

export default function TeamPeople({ heading, items = [] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="main-container">
        {heading && <h2 className="text-center mb-12">{heading}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={item._key ?? i} className="text-center">
              {item.photo?.asset?.url && (
                <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={item.photo.asset.url}
                    alt={item.name}
                    width={128} height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-[1.1rem] mb-1">{item.name}</h3>
              {item.title && <p className="text-[13px] text-[#9ca3af] mb-3 font-medium uppercase tracking-wide">{item.title}</p>}
              {item.bio && <p className="text-[14px] text-[#6b7280] leading-relaxed mb-4">{item.bio}</p>}
              {item.ctaLabel && item.ctaUrl && (
                <Link href={item.ctaUrl} className="text-[13px] font-medium text-[#02634e] underline underline-offset-2">
                  {item.ctaLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
