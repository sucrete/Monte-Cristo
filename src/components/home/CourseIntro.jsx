'use client';

import holeInOneGuy from '@public/images/home/monte-cristo/hole-in-one-guy-2.jpg';
import golfCart from '@public/images/home/monte-cristo/cart.webp';
import sunny from '@public/images/home/sunny.png';

import { CheckIcon } from '@/icons';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MUX_SRC = 'https://stream.mux.com/82p26i2ivu9e6m02FXiBOqjBF00SQdc02CN00RLfBJ4w400M.m3u8';
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
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = MUX_SRC;
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          hls = new Hls({ lowLatencyMode: false, maxBufferLength: 10 });
          hls.loadSource(MUX_SRC);
          hls.attachMedia(video);
        }
      });
    }
    return () => hls?.destroy();
  }, []);

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
      className="py-16 md:py-20 lg:py-[100px] bg-background-2 dark:bg-background-5 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center md:py-[50px] lg:py-[80px] ">
          {/* Left — text */}
          <div className="flex flex-col space-y-4">
            <RevealAnimation delay={0.1} direction='left'>
              <span className="monospaced text-[#00000086]">About us</span>
            </RevealAnimation>
            <RevealAnimation delay={0.2} direction="left">
              <h2 className="ml-[-4px]">Country Club Living Without Country Club Prices</h2>
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

            <RevealAnimation delay={0.3} direction="left">
              <div className="md:pt-3">
                <p className="max-[426px]:text-tagline-2 max-w-[750px] max-[426px]:w-full pb-5">
                  The Rio Grande Valley golfing community, on the southeast tip of Texas just minutes from Mexico, hides
                  a true gem in Monte Cristo Golf and Country Club. The Valley’s tropical climate creates a picturesque
                  setting for this welcoming, active community, where you enjoy Country Club living without the Country
                  Club prices.
                </p>
                <p className="[426px]:text-tagline-2 max-w-[750px] max-[426px]:max-w-full">
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
                  <RevealAnimation key={index} delay={0.1 + index * 0.1} direction="left">
                    <li className="flex items-center pb-5 gap-3 md:gap-5">
                      <span className="inline-flex items-center justify-center rounded-full bg-[#eaf5cf] p-2">
                        <Image className="size-[15px] md:size-[20px]" src={item.imgURL} alt="" height={14} width={14} />
                      </span>
                      <span className="text-bushwood-900 text-[14px] md:text-[15px]">{item.text}</span>
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
            <RevealAnimation delay={0.2} direction="right" className='absolute inset-0 w-[95%] md:w-[85%]'>
              <div className="w-full h-full rounded-2xl">
                <Image
                  src={holeInOneGuy}
                  alt="man celebrating his hole-in-one at Monte Cristo Golf Club"
                  fill
                  className="object-cover rounded-2xl"
                />
                <Image
                  className="absolute top-[-30px] md:top-3 left-3 w-[109px] h-auto md:left-[-35px] rotate-5"
                  src={sunny}
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
            </RevealAnimation>

            {/* Floating parallax image */}
            <div
              ref={floatingRef}
              className="absolute bottom-[-100px] md:bottom-[-10px] right-0 w-[50%] md:w-[45%] aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-background-5"
              style={{ willChange: 'transform' }}>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseIntro;
