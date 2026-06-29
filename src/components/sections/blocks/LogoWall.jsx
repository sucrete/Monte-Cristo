import Image from 'next/image'
import Link from 'next/link'

export default function LogoWall({ heading, logos = [] }) {
  return (
    <section className="py-14 md:py-16 border-t border-[#e8eaed]">
      <div className="main-container">
        {heading && <p className="text-center text-[13px] font-medium uppercase tracking-widest text-[#9ca3af] mb-8">{heading}</p>}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, i) => {
            const img = (
              <Image
                key={logo._key ?? i}
                src={logo.image?.asset?.url}
                alt={logo.alt}
                width={120} height={40}
                className="h-8 w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            )
            return logo.url ? <Link key={logo._key ?? i} href={logo.url}>{img}</Link> : img
          })}
        </div>
      </div>
    </section>
  )
}
