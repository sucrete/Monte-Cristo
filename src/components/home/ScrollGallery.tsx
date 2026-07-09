'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const BASE = '/images/home/monte-cristo';

type GalleryImage = { src: string; alt: string };

// Top row — scrambled mix
const ROW_ONE: GalleryImage[] = [
  { src: `${BASE}/stunner.webp`, alt: 'A stunning view of the grounds' },
  { src: `${BASE}/soakin-it-up.jpg`, alt: 'Soaking up the day on the course' },
  { src: `${BASE}/mc-vista.jpg`, alt: 'Sweeping vista across the Monte Cristo course' },
  { src: `${BASE}/holdin-one.webp`, alt: 'Holding up the winning ball' },
  { src: `${BASE}/great-weather.webp`, alt: 'Clear skies and perfect weather on the green' },
  { src: `${BASE}/mc-ussie.jpeg`, alt: 'Group photo on the course' },
  { src: `${BASE}/nice-vista.jpg`, alt: 'Lush green overlooking the course' },
  { src: `${BASE}/rving.webp`, alt: 'Cruising the grounds' },
];

// Bottom row — scrambled mix
const ROW_TWO: GalleryImage[] = [
  { src: `${BASE}/hole-in-one-guy.jpg`, alt: 'Celebrating a hole in one' },
  { src: `${BASE}/cart.webp`, alt: 'Golf cart ready on the path' },
  { src: `${BASE}/yayyy.jpg`, alt: 'Celebrating on the green' },
  { src: `${BASE}/young-bucks.jpg`, alt: 'Friends enjoying a round together' },
  { src: `${BASE}/mc-one-of-them-vistas.webp`, alt: 'Scenic fairway vista at Monte Cristo' },
  { src: `${BASE}/bir.webp`, alt: 'Relaxing at the clubhouse' },
  { src: `${BASE}/mc-hole.jpg`, alt: 'A picturesque hole at Monte Cristo' },
  { src: `${BASE}/arrangement.webp`, alt: 'Clubhouse arrangement' },
  { src: `${BASE}/sunset-2.webp`, alt: 'Golden sunset over the course' },
];

const ScrollGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackOneRef = useRef<HTMLDivElement>(null);
  const trackTwoRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set(trackOneRef.current, { x: '-32.5%' });
      gsap.set(trackTwoRef.current, { x: '-42.5%' });
      return;
    }

    // Row 1: slides right as you scroll (-40% → -25%)
    gsap.fromTo(trackOneRef.current,
      { x: '-40%' },
      {
        x: '-25%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Row 2: slides left, opposite direction (-35% → -50%)
    gsap.fromTo(trackTwoRef.current,
      { x: '-35%' },
      {
        x: '-50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: sectionRef });

  // Close the lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const renderTile = (img: GalleryImage, widthClass: string, sizes: string) => (
    <figure
      key={img.src}
      className={`relative shrink-0 ${widthClass} aspect-[16/10] overflow-hidden rounded-2xl cursor-pointer group`}
      onClick={() => setLightbox(img)}>
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={sizes}
        draggable={false}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </figure>
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Monte Cristo photo gallery"
      className="gallery overflow-hidden bg-background-2 dark:bg-background-5 py-16 md:py-20 lg:py-[200px]">
      <div className="flex flex-col gap-2 xl:gap-5">
        {/* Top row */}
        <div
          ref={trackOneRef}
          className="flex flex-nowrap items-end gap-2 xl:gap-5 will-change-transform"
          style={{ transform: 'translate3d(-40%, 0, 0)' }}>
          {ROW_ONE.map((img) => renderTile(img, 'w-[clamp(240px,32vw,460px)]', '(max-width: 768px) 60vw, 32vw'))}
        </div>

        {/* Bottom row */}
        <div
          ref={trackTwoRef}
          className="flex flex-nowrap items-start gap-2 xl:gap-5 will-change-transform"
          style={{ transform: 'translate3d(-35%, 0, 0)' }}>
          {ROW_TWO.map((img) => renderTile(img, 'w-[clamp(220px,28vw,400px)]', '(max-width: 768px) 55vw, 28vw'))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}>
          <div className="relative w-full h-full max-w-[1100px] max-h-[80vh]">
            <Image src={lightbox.src} alt={lightbox.alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ScrollGallery;
