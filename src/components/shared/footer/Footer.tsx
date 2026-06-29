import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';
import facebook from '@public/images/icons/facebook.png';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import WeatherModule from './WeatherModule';

import TQSGears from './TQSGears';

import MonteCristoLogo from '@public/images/shared/logos/monte-cristo-logo-full.svg';

interface FooterOneProps {
  className?: string;
}

const FooterOne: FC<FooterOneProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        'bg-[#00251e] dark:bg-background-8 relative h-auto xl:h-[550px] bg-[radial-gradient(ellipse_400%_120%_at_40%_0%,#01251e,#011914)]',
        className,
      )}>
      <div className="main-container">
        <div className="grid grid-cols-12 justify-between gap-x-0 gap-y-16 pt-16 pb-12 xl:pt-[6rem]">
          <div className="col-span-12 xl:col-span-4">
            <RevealAnimation delay={0.3}>
              <div className="max-w-[306px] flex flex-col items-center mx-auto xl:mx-0">
                <figure className="max-w-[250px] mt-[-15px]">
                  {/* <BushwoodLogoScript /> */}
                  <Image src={MonteCristoLogo} alt="" width={300} height={300} />
                </figure>
                <div className="flex gap-3 mt-4">
                  <Link
                    target="_blank"
                    href="https://www.facebook.com/p/Monte-Cristo-Golf-Country-Club-100059966024246/"
                    className="footer-social-link">
                    <span className="sr-only">Facebook</span>
                    <Image className="size-6" src={facebook} alt="Facebook" />
                  </Link>
                  {/* <div className="bg-stroke-1/20 h-6 w-px"></div>
                  <Link target="_blank" href="https://www.instagram.com" className="footer-social-link">
                    <span className="sr-only">Instagram</span>
                    <Image className="size-6" src={instagram} alt="Instagram" />
                  </Link> */}
                </div>
                <p className="text-accent/60 text-tagline-1 mt-4 ">Open 7 days a week, 7am - 7pm.</p>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.45} offset={5}>
              <div className="max-w-[306px] flex flex-col items-center mx-auto xl:mx-0 mt-4">
                <Link
                  target="_blank"
                  href="tel:9563810964"
                  className="text-accent/60 hover:text-accent duration-250 decoration-none text-center">
                  (956) 381-0964
                </Link>
              </div>
            </RevealAnimation>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-x-0 gap-y-8 xl:col-span-8">
            <div className="col-span-12 md:col-span-4">
              <RevealAnimation delay={0.4}>
                <div className="space-y-3 flex flex-col items-center md:items-start">
                  <p className=" text-tagline-1  text-accent/60  ">Pages</p>
                  <ul className="space-y-0 text-center md:text-left">
                    <li>
                      <Link href="/greens-fees" className="footer-link">
                        Greens Fees
                      </Link>
                    </li>
                    <li>
                      <Link href="/events" className="footer-link">
                        Events
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="footer-link">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/book-tee-time" className="footer-link">
                        Book Tee Time
                      </Link>
                    </li>
                  </ul>
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.45}>
                <p className=" text-tagline-1  text-accent/60  pt-[30px] pb-3">Address</p>
                <div className=" flex flex-col ">
                  <Link
                    target="_blank"
                    href="https://maps.app.goo.gl/VzbGNTavcvsF2Zjt8"
                    className="text-accent hover:text-accent/80 duration-250 decoration-none inline-block">
                    2919 N Kenyon Rd
                    <br />
                    Edinburg, TX 78542
                  </Link>
                </div>
              </RevealAnimation>
            </div>
            <div className="col-span-12 md:col-span-8">
              <RevealAnimation delay={0.5}>
                <div>
                  <WeatherModule />
                </div>
              </RevealAnimation>

              <div className="flex flex-col space-y-3 text-center md:text-right pt-[3rem]">
                <RevealAnimation delay={0.7} offset={5} start="top 105%">
                  <p className="text-tagline-1 text-accent/60">
                    <a
                      href="/studio"
                      className="text-accent/60 hover:text-accent duration-250 decoration-none"
                      target="_blank">
                      Copyright Monte Cristo Golf & Country Club © {new Date().getFullYear()}
                    </a>
                  </p>
                </RevealAnimation>

                <RevealAnimation delay={0.75} offset={5} start="top 105%">
                  <div className="TQS-attribution-wrapper flex flex-row justify-center md:justify-end">
                    <TQSGears />
                    <p className="text-tagline-1 text-accent/60">Powered by TeeQuest</p>
                  </div>
                </RevealAnimation>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative pt-[35px] pb-[100px] text-center">
          <RevealAnimation delay={0.3} offset={10} duration={1.5}>
            <div>
              <Image
                className="w-full large-bottom-logo"
                src={'/images/shared/logos/monte-cristo-logo-plain.svg'}
                alt=""
                width={1000}
                height={500}
              />
            </div>
          </RevealAnimation>
        </div> */}
      </div>
    </footer>
  );
};

export default FooterOne;
