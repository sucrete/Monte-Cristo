'use client';
import ollieID from '@public/images/lessons/ollie.svg';
import pattyID from '@public/images/lessons/patty.svg';
import Image from 'next/image';
import { useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

const Contact = () => {
  const [active, setActive] = useState<'ollie' | 'patty' | null>(null);
  return (
    <section id="contact-for-lesson" className="pt-[100px] pb-[100px] md:pb-[200px] bg-background-3 overflow-x-hidden">
      <div className="main-container">
        <div className="grid grid-cols-12 max-lg:gap-y-[100px] lg:gap-[100px]">
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <div className="text-left space-y-5 mb-[20px]">
              {/* <div className="relative">
                <div
                  className={`relative cursor-pointer ${active === 'ollie' ? 'z-20' : 'z-10'}`}
                  onMouseEnter={() => setActive('ollie')}
                  onMouseLeave={() => setActive(null)}
                >
                  <RevealAnimation delay={0.1} direction="left">
                    <div className={`id ollie rounded-2xl w-fit -rotate-[3deg] transition-all duration-200 ease-out ${active === 'ollie' ? '-translate-y-[3px] scale-[1.02] shadow-2xl' : 'shadow-lg'}`}>
                      <Image src={ollieID} className="h-auto w-[200px]" height={200} width={500} alt="golf pro id for Ollie Cromwell" />
                    </div>
                  </RevealAnimation>
                </div>
                <div
                  className={`absolute top-0 left-0 cursor-pointer ${active === 'patty' ? 'z-20' : 'z-0'}`}
                  style={{ width: 'max-content' }}
                  onMouseEnter={() => setActive('patty')}
                  onMouseLeave={() => setActive(null)}
                >
                  <RevealAnimation delay={0.2} direction="left">
                    <div className={`id patty rounded-2xl w-fit rotate-[3deg] transition-all duration-200 ease-out ${active === 'patty' ? '-translate-y-[3px] scale-[1.02] shadow-2xl' : 'shadow-lg'}`} style={{ marginLeft: '30px' }}>
                      <Image src={pattyID} className="h-auto w-[200px]" height={200} width={500} alt="golf pro id for Patty Berg" />
                    </div>
                  </RevealAnimation>
                </div>
              </div> */}
              <div className="space-y-3">
                <RevealAnimation delay={0.3} direction="left">
                  <h2>You'll love learning with our pros</h2>
                </RevealAnimation>
                <RevealAnimation delay={0.4} direction="left">
                  <p className="max-w-[90%] pt-1 pl-1">
                    Whether you’re picking up a club for the first time or looking to sharpen your game, our PGA
                    professionals are here to help. Reach out via the form here and we’ll pair you with the right pro
                    for your goals.
                  </p>
                </RevealAnimation>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <RevealAnimation delay={0.6} direction="right">
              <form className="p-6 lg:p-[42px] rounded-[20px] bg-white dark:bg-background-8 border border-[#80808021]">
                <div className="space-y-2 mb-8">
                  <label htmlFor="name" className="text-tagline-1 text-secondary dark:text-accent font-medium block">
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full block border border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 py-3 px-[18px] rounded-full h-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-bushwood-600/60 focus-visible:ring-offset-1 placeholder:text-tagline-1 placeholder:font-normal font-normal placeholder:text-secondary/60 dark:placeholder:text-accent/60 dark:text-accent shadow-1"
                  />
                </div>
                <div className="space-y-2 mb-8">
                  <label htmlFor="email" className="text-tagline-1 text-secondary dark:text-accent font-medium block">
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full block border border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 py-3 px-[18px] rounded-full h-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-bushwood-600/60 focus-visible:ring-offset-1 placeholder:text-tagline-1 placeholder:font-normal font-normal dark:text-accent placeholder:text-secondary/60 dark:placeholder:text-accent/60 shadow-1"
                  />
                </div>
                <div className="space-y-2 pb-9">
                  <label htmlFor="comment" className="text-tagline-1 text-secondary dark:text-accent font-medium block">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    placeholder="Enter your comment"
                    className="w-full min-h-[115px] block border border-stroke-3 bg-background-1 dark:border-stroke-7 dark:bg-background-6 py-3 px-[18px] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-bushwood-600/60 focus-visible:ring-offset-1 placeholder:text-tagline-1 placeholder:font-normal font-normal placeholder:text-secondary/60 dark:placeholder:text-accent/60 dark:text-accent shadow-1"
                    defaultValue={''}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-md btn-secondary hover:btn-primary dark:btn-accent w-full before:content-none first-letter:uppercase">
                  Submit
                </button>
              </form>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
