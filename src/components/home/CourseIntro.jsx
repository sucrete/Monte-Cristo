'use client';

import holeInOneGuy from '@public/images/home/monte-cristo/hole-in-one-guy-2.jpg';
import golfCart from '@public/images/home/monte-cristo/cart.webp';
import sunny from '@public/images/home/sunny.png';

import { CheckIcon } from '@/icons';

import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealAnimation from '../animation/RevealAnimation';

const features = [
  { text: '36-Hole course', imgURL: '/images/shared/golf-hole.svg' },
  { text: 'World-class pro shop', imgURL: '/images/shared/golf-club.svg' },
  { text: 'On-course beverage service', imgURL: '/images/shared/beer-1.svg' },
];

const courseFeatures = [
  { id: 1, text: 'Practice facilities', imgURL: '/images/home/icons/club.svg' },
  { id: 2, text: 'Pro shop', imgURL: '/images/home/icons/polo.svg' },
  { id: 3, text: '19th Hole bar', imgURL: '/images/home/icons/cocktail.svg' },
  { id: 4, text: 'Restaurant', imgURL: '/images/home/icons/burger.svg' },
  { id: 5, text: 'Swimming pool', imgURL: '/images/home/icons/swimmer.svg' },
];

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CourseIntro = () => {
  const sectionRef = useRef(null);
  const floatingRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(floatingRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-[100px] bg-background-2 dark:bg-background-5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-[50px] lg:py-[80px]">
          {/* Left — text */}
          <div className="flex flex-col space-y-6">
            {/* <RevealAnimation delay={0.1}>
              <span className="badge badge-cyan w-fit">About us</span>
            </RevealAnimation> */}
            <RevealAnimation delay={0.2}>
              <h2 className="">Country Club Living Without Country Club Prices</h2>
            </RevealAnimation>

            {/* <ul className="flex flex-wrap justify-start md:gap-x-9 gap-x-5 gap-y-2 pb-0">
              {features.map((item, index) => (
                <RevealAnimation key={index} delay={0.1 + index * 0.1}>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center rounded-full size-[20px]">
                      <Image className="h-[11px] w-auto" src={item.imgURL} alt="" height={14} width={14} />
                    </span>
                    <span className="off-black monospaced">{item.text}</span>
                  </li>
                </RevealAnimation>
              ))}
            </ul> */}

            <RevealAnimation delay={0.3}>
              <div className="pt-3">
                <p className="max-[426px]:text-tagline-2 max-w-[750px] max-[426px]:max-w-[320px] pb-5">
                  The Rio Grande Valley golfing community, on the southeast tip of Texas just minutes from Mexico, hides
                  a true gem in Monte Cristo Golf and Country Club. The Valley’s tropical climate creates a picturesque
                  setting for this welcoming, active community, where you enjoy Country Club living without the Country
                  Club prices.
                </p>
                <p className="max-[426px]:text-tagline-2 max-w-[750px] max-[426px]:max-w-[320px]">
                  Monte Cristo is a beautiful community built around an 18-hole championship golf course, two swimming
                  pools, tennis and pickleball courts, a driving range, and a putting practice green. Our welcoming
                  clubhouse adds a fine restaurant and the lively 19th Hole bar. Look around our site, then come see us
                  in person!
                </p>
              </div>
            </RevealAnimation>
            <div className="pt-5 lg:w-[80%]">
              <ul className="columns-2">
                {courseFeatures.map((item, index) => (
                  <RevealAnimation key={index} delay={0.1 + index * 0.1}>
                    <li className="flex items-center pb-5 gap-5">
                      <span className="inline-flex items-center justify-center rounded-full bg-[#eaf5cf] p-2">
                        <Image className="size-[20px]" src={item.imgURL} alt="" height={14} width={14} />
                      </span>
                      <span className="text-bushwood-900">{item.text}</span>
                    </li>
                  </RevealAnimation>
                ))}
              </ul>
              {/* <div className="col">somethign</div> */}
            </div>
          </div>

          {/* Right — images */}
          <div className="relative h-[520px] lg:h-[700px]">
            {/* Large portrait image */}
            <RevealAnimation delay={0.2} direction="right" style={{ position: 'absolute', inset: 0, width: '75%' }}>
              <div className="w-full h-full rounded-2xl">
                <Image
                  src={golfCart}
                  alt="View of course and cart at Monte Cristo Golf & Country Club"
                  fill
                  className="object-cover rounded-2xl"
                />
                <Image className="absolute top-3 left-[-40px] rotate-3" src={sunny} width={100} height={100} alt="" />
              </div>
            </RevealAnimation>

            {/* Floating parallax image */}
            <div
              ref={floatingRef}
              className="absolute bottom-[-10px] right-0 w-[35%] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-background-5"
              style={{ willChange: 'transform' }}>
              <Image
                src={holeInOneGuy}
                alt="group of friends having fun posing around a golf cart"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseIntro;
