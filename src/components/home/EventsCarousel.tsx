'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { useRef, useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/utils/cn';
import { Arrow } from '../ui/Icons';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

interface SanityEvent {
  _id: string;
  title: string;
  start: string;
  eventDescription?: string;
  flyerQuestion?: boolean;
  flyer?: { asset?: { url?: string } };
  linkQuestion?: boolean;
  linkDeets?: { linkText?: string; linkURL?: string };
}

interface EventsCarouselProps {
  eventsData: SanityEvent[];
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  return `${month} ${ordinal(date.getDate())}`;
}

export default function EventsCarousel({ eventsData }: EventsCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full select-none overflow-visible">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setIsEnd(swiper.isEnd);
          setIsBeginning(swiper.isBeginning);
          setActiveIndex(swiper.activeIndex);
        }}
        effect="coverflow"
        centeredSlides
        initialSlide={0}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 480,
          depth: 50,
          modifier: 1.2,
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
        className="!overflow-visible translate-x-[5.25rem]"
        style={{ overflow: 'visible', marginRight: 0 }}>
        {eventsData.map((event, index) => {
          const hasFlyer = event.flyerQuestion && event.flyer?.asset?.url;
          const hasLink = event.linkQuestion && event.linkDeets?.linkURL;
          const hasButtons = hasFlyer || hasLink;

          return (
            <SwiperSlide
              key={event._id}
              className={index < activeIndex ? 'slide-viewed' : ''}
              style={{ transitionProperty: 'all', width: 550, height: 150, overflow: 'visible' }}>
              <RevealAnimation delay={0.4 + index * 0.1} direction="right" offset={8}>
                <div className="slide-styling-starts-here rounded-2xl w-full p-[20px_25px_20px_20px] text-accent text-2xl border-1 border-[#ffffff10] backdrop-blur-lg bg-ns-dark-green shadow-[0_20px_25px_-5px_rgba(0,0,0,0.01),0_10px_10px_-5px_rgba(0,0,0,0.008)] h-full flex flex-col justify-between transition-opacity duration-300 [.slide-viewed_&]:opacity-0">
                  <div className="upper-portion">
                    <div className="card-brow flex flex-row justify-between items-center">
                      <div className="title medium text-[16px] truncate max-w-[80%]">{event.title}</div>
                      <div className="monospaced text-accent pt-[5px] pb-[6px] px-[7px] bg-[#a5a5a556] rounded-[3px] text-[10px] h-fit">
                        {formatDate(event.start)}
                      </div>
                    </div>
                    <p className={cn(
                      'event-description text-[12px] text-[#ffffff7f] leading-[1.4] mt-[5px] tracking-[.25px]',
                      hasButtons ? 'line-clamp-2' : 'line-clamp-5',
                    )}>
                      {event.eventDescription}
                    </p>
                  </div>

                  {hasButtons && (
                    <div className="button-group flex flex-row gap-2 h-[32px]">
                      {hasFlyer && (
                        <a
                          href={event.flyer!.asset!.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-very-small border-1 border-[#ffffff14]">
                          <span>View Flyer</span>
                        </a>
                      )}
                      {hasLink && (
                        <a
                          href={event.linkDeets!.linkURL!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-very-small border-1 border-[#ffffff14]">
                          <span>{event.linkDeets!.linkText || 'Learn More'}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </RevealAnimation>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Controls */}
      <div className="flex justify-end items-center gap-1 mt-[.25rem] ml-[2rem] mr-[.25rem]">
        <div className="flex">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={cn(
              'cursor-pointer text-xl transition-opacity duration-150 hover:opacity-75',
              isBeginning ? 'opacity-15 pointer-events-none' : 'opacity-50',
            )}>
            <Arrow className="rotate-180 fill-black size-[24px]" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={cn(
              'cursor-pointer text-xl transition-opacity duration-150 hover:opacity-75',
              isEnd ? 'opacity-15 pointer-events-none' : 'opacity-50',
            )}>
            <Arrow className="fill-black size-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
