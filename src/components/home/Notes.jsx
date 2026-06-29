import RevealAnimation from '../animation/RevealAnimation';
import { cn } from '@/utils/cn';
import Image from 'next/image';

const Notes = ({ className = '' }) => {
  return (
    <section
      className={cn(
        'xl:pt-[160px] pt-[50px] xl:pb-[160px] sm:pb-[100px] md:pb-[70px] pb-[1.5rem] bg-background-2',
        className,
      )}>
      <div className="main-container">
        <RevealAnimation delay={0.1}>
          <div className="flex md:flex-row flex-col pt-8 pb-10 px-6 md:pt-13 md:pb-13 md:px-10 bg-[#f0f0f0] border-white/20 border-[1.5px] rounded-[32px] justify-between align-middle">
            <div className="md:basis-[45%] flex flex-col justify-center pb-6 md:pb-0 text-center md:text-left">
              <p className="newsletter-heading text-[30px] md:text-[35px] text-black tracking-[-1px] leading-[1.1] font-serif font-[500] pt-5 md:pt-0 -mt-[1.25rem]">
                Notes
              </p>
            </div>
            <div className="md:max-w-[45%] flex flex-col justify-center align-middle pr-[1rem]">
              <div className="bushwood-note px-5 pt-5 pb-5 relative w-[375px] h-[450px] bg-[#efeee6] realistic-shadow-md">
                <div className="paper-layer absolute h-fill w-fill bg-[url('/images/shared/fine-paper.webp')] bg-cover bg-center inset-0 opacity-60 -z-0 shadow-[inset_0_0_2px_rgba(0,102,0,1)]"></div>
                <div className="border-layer shadow-[inset_0_0_0_2px_rgba(0,102,0,.45)] w-full h-full absolute inset-0 bg-transparent"></div>
                <div className="note-header h-[70px] w-full relative">
                  <Image
                    className="absolute center-it"
                    src={'/images/shared/bushwood-note-graphic.png'}
                    alt=""
                    width={150}
                    height={70}
                  />
                </div>
                <div className="note-body relative z-5 pt-5">
                  <p className="font-note text-[13px]">
                    If you are looking to get your Jr. Golfer involved in tournaments this is a great way to do it. The
                    MJGA hosts tournaments on Thursdays in and around Manhattan throughout the summer. These events are
                    considered developmental tournaments and allow parents to be involved by caddying for their child.
                    These events are very low key and are just 9 holes each week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Notes;
