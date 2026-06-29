'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Gallery({ heading, images = [] }) {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section className="py-16 md:py-20">
      <div className="main-container">
        {heading && <h2 className="text-center mb-10">{heading}</h2>}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => img.image?.asset?.url && (
            <div
              key={img._key ?? i}
              className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setLightbox(img)}
            >
              <Image
                src={img.image.asset.url}
                alt={img.caption ?? ''}
                width={600} height={400}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              {img.caption && (
                <p className="text-[12px] text-[#9ca3af] mt-1 px-1">{img.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {lightbox && (
        <div
          className="fixed inset-0 z-[99999] bg-black/85 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={lightbox.image.asset.url}
              alt={lightbox.caption ?? ''}
              width={1200} height={800}
              className="rounded-xl max-h-[85vh] w-auto object-contain"
            />
            {lightbox.caption && (
              <p className="text-white/70 text-center mt-3 text-[13px]">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
