'use client';
import Springer from '@/utils/springer';
import { prefersReducedMotion } from '@/utils/reducedMotion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealAnimationProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  offset?: number;
  instant?: boolean;
  start?: string;
  end?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  useSpring?: boolean;
  rotation?: number;
  animationType?: 'from' | 'to';
  className?: string;
  style?: React.CSSProperties;
}

const RevealAnimation = ({
  children,
  duration = 0.6,
  delay = 0,
  offset = 60,
  instant = false,
  start = 'top 90%',
  end = 'top 50%',
  direction = 'down',
  useSpring = false,
  rotation = 0,
  animationType = 'from',
  className,
  style,
}: RevealAnimationProps) => {

  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, x: 0, y: 0, rotation: 0 });
      return;
    }

    gsap.set(element, { opacity: 0 });

    const spring = useSpring ? Springer.default(0.2, 0.8) : null;
    const ease = useSpring && spring ? spring : 'power2.out';

    const fromVars = {
      opacity: 0.01,
      x: direction === 'left' ? -offset : direction === 'right' ? offset : 0,
      y: direction === 'down' ? offset : direction === 'up' ? -offset : 0,
      rotation: rotation,
    };

    const toVars = {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: duration,
      delay: delay,
      immediateRender: false,
      ease: ease,
      scrollTrigger: !instant
        ? {
            trigger: element,
            start: start,
            end: end,
            toggleActions: 'play none none none',
            once: true,
          }
        : undefined,
    };

    gsap.fromTo(element, fromVars, toVars);
  }, [duration, delay, offset, instant, start, end, direction, useSpring, rotation, animationType]);

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default RevealAnimation;
