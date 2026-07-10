'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ParallaxImageBackground({
  src,
  alt = '',
  height = '120%',
  offset = '-10',
  travel = 30,
}: any) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const offsetNum = parseFloat(offset);

  useGSAP(() => {
    gsap.fromTo(
      imageRef.current,
      { yPercent: offsetNum },
      {
        yPercent: offsetNum + travel,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full"
        style={{ height, willChange: 'transform' }}
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" priority />
      </div>
    </div>
  );
}