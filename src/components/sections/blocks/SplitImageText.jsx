import Image from 'next/image'
import Link from 'next/link'

export default function SplitImageText({ image, imagePosition = 'left', heading, body, ctaLabel, ctaUrl }) {
  const imgEl = image?.asset?.url && (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
      <Image src={image.asset.url} alt={heading ?? ''} fill className="object-cover" />
    </div>
  )
  const textEl = (
    <div className="flex flex-col justify-center">
      {heading && <h2 className="mb-4">{heading}</h2>}
      {body && <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: body }} />}
      {ctaLabel && ctaUrl && (
        <Link
          href={ctaUrl}
          className="mt-6 self-start inline-flex items-center px-6 py-3 rounded-full bg-secondary text-white text-[14px] font-medium hover:bg-secondary/90 transition-colors"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  )
  return (
    <section className="py-16 md:py-20">
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {imagePosition === 'left' ? <>{imgEl}{textEl}</> : <>{textEl}{imgEl}</>}
        </div>
      </div>
    </section>
  )
}
