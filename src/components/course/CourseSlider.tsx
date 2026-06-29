'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Arrow, ThinArrow, LongArrow, VeryLongArrow, Chevron } from '@/components/ui/Icons';
import { useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import courseHoles from '@/data/course';

import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function CourseSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="course-swiper bg-[#f0f0f0] pt-[1.5rem] md:pt-[10rem]">
      <div className="main-container relative">
        <RevealAnimation delay={0.4}>
          <div className="">
            <Swiper
              // pagination={{
              //   type: 'progressbar',
              // }}
              navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
              }}
              modules={[Pagination, Navigation]}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="mySwiper rounded-2xl z-10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.3),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
              {/* <SwiperSlide>Slide 1</SwiperSlide> */}

              {courseHoles.map((hole, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-[900px] md:h-[700px] w-full grid place-items-center bg-background-4 bg-cover bg-center bg-no-repeat text-blue-700"
                    role="img"
                    aria-label={hole.holeDescription}
                    style={{
                      backgroundImage: `url('/images/course/${hole.imgURL}')`,
                    }}></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div>
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-[300px] z-10">
                <div className="hole-info-box relative px-4 pt-4 pb-3 bg-bushwood/10 backdrop-blur-xl rounded-[.8rem] border border-solid border-accent/5">
                  <div className="brow w-full flex flex-row align-middle justify-between items-center pb-2 border-b border-accent/20">
                    <div className="hole-number font-serif text-white text-xl md:text-3xl leading-[-1px]">
                      {' '}
                      Hole {activeIndex + 1}
                    </div>
                  </div>
                  <div className="par-bar text-white text-[13px] py-2 border-b border-solid border-accent/20 flex flex-row items-center">
                    <svg
                      className="h-[.8rem] w-fit mr-2"
                      id="Layer_1"
                      height="512"
                      viewBox="0 0 24 24"
                      width="512"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      fill="white">
                      <path d="m12 10a20.294 20.294 0 0 0 -4.016.4l-.006-2.285 5.009-2.076a2 2 0 0 0 .271-3.4.838.838 0 0 0 -.1-.065l-4.258-2.362a2 2 0 0 0 -2.9 1.788v8.914c-3.609 1.195-6 3.446-6 6.086 0 3.925 5.271 7 12 7s12-3.075 12-7-5.271-7-12-7zm.073-5.745-4.1 1.7-.01-3.971zm-.073 17.745c-5.42 0-10-2.29-10-5 0-1.594 1.591-3.039 4-3.962v3.962a1 1 0 0 0 2 0l-.011-4.56a18.243 18.243 0 0 1 4.011-.44c5.42 0 10 2.29 10 5s-4.58 5-10 5zm5-5a2 2 0 1 1 -2-2 2 2 0 0 1 2 2z" />
                    </svg>
                    Par {courseHoles[activeIndex].par}
                  </div>
                  <div className="descripsh text-white text-[13px] pt-2 pb-3 border-b border-solid border-accent/20">
                    {courseHoles[activeIndex].holeDescription}
                  </div>
                  <div className="tee-boxes space-x-2 text-white text-[13px] pt-2 pb-3">
                    <div className="blue-tee flex flex-row items-center align-middle">
                      <span className="color bg-[#2344e8] rounded-full size-2.5 inline-block mr-3 -mb-[2px]"></span>
                      <span className="yardage">{courseHoles[activeIndex].blueTee} yards</span>
                    </div>
                    <div className="yellow-tee flex flex-row items-center align-middle">
                      <span className="color bg-[#f7ec20] rounded-full size-2.5 inline-block mr-3 -mb-[2px]"></span>
                      <span className="yardage">{courseHoles[activeIndex].yellowTee} yards</span>
                    </div>
                    <div className="red-tee flex flex-row items-center align-middle">
                      <span className="color bg-[#f63f16] rounded-full size-2.5 inline-block mr-3 -mb-[2px]"></span>
                      <span className="yardage">{courseHoles[activeIndex].redTee} yards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealAnimation>
        <button className="mr-1 absolute left-[-3rem] top-[50%] -translate-y-1/2 custom-prev disabled:opacity-30 hover:cursor-pointer group hover:left-[-3.25rem] transition-all duration-150">
          <Chevron className="fill-black rotate-180 w-auto h-[55px] transition-opacity opacity-70 group-hover:opacity-100" />
        </button>
        <button className="absolute right-[-3rem] top-1/2 -translate-y-1/2 custom-next disabled:opacity-30 hover:cursor-pointer opacity-60 hover:opacity-100  hover:right-[-3.25rem] transition-all duration-150">
          <Chevron className="fill-black w-auto h-[55px]" />
        </button>
      </div>
    </div>
  );
}
