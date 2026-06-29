import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import ParallaxImageBackground from '../ui/ParallaxImageBackground';
import { fetchWeather, getWeatherLabel } from '@/utils/weather';

import WelcomeTo from '@public/images/home/welcome-to/welcome-3.svg';

const Hero = async () => {
  const data = await fetchWeather();
  const currentTemp = data ? Math.round(data.current.temperature_2m) : '--';
  const label = data ? getWeatherLabel(data.current.weather_code, data.current.wind_speed_10m) : '';
  const HeadingContent = () => (
    <>
      Monte Cristo <br />
      Golf & Country Club
    </>
  );

  return (
    // saved classNames ->  h-[99svh] xl:max-h-[90svh]
    <section className="bg-cover bg-top bg-no-repeat relative z-20 h-[600px] md:h-[850px]">
      <ParallaxImageBackground src="/images/home/mc-hero-image.webp" offset="-12%" height="100%" />
      <div className="top-0 left-0 absolute h-[100%] w-[100%] opacity-80 -z-1 bg-scrim-hero"></div>
      <div className="facebook-link absolute left-6 md:left-[6.25rem] bottom-[3rem] md:bottom-10 hidden md:block w-fit">
        <RevealAnimation delay={0.8} direction="left" offset={5}>
          <a
            href="https://www.facebook.com/p/Monte-Cristo-Golf-Country-Club-100059966024246/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Monte Cristo Golf & Country Club on Facebook (opens in new tab)"
            className="block group w-[42px] h-[42px] hover:w-[124px] transition-[width] duration-[250ms] ease-in-out overflow-hidden rounded-full backdrop-blur-xl bg-white/10 border border-[#ffffff30] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_10px_10px_-5px_rgba(0,0,0,0.02),inset_0_0_10px_rgba(236,236,236,0.18)]">
            <img
              src="/images/icons/f.svg"
              alt=""
              aria-hidden="true"
              className="absolute left-[16px] top-1/2 -translate-y-1/2 h-[17px] w-auto"
            />
            <img
              src="/images/icons/acebook.svg"
              alt=""
              aria-hidden="true"
              className="absolute left-[25px] top-1/2 -translate-y-1/2 h-[17px] w-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </RevealAnimation>
      </div>

      <div className="temperature-pane hidden md:block absolute md:right-[6.25rem] md:bottom-[3rem]">
        {/* shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_10px_10px_-5px_rgba(0,0,0,0.02),inset_0_0_20px_rgba(236,236,236,0.18)] */}
        <RevealAnimation delay={0.7} direction="right" offset={5}>
          <div className="overflow-hidden w-[180px] h-fit rounded-lg border-1 border-[#ffffff30] backdrop-blur-xl bg-[#ffffff1a] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.08),0_10px_10px_-5px_rgba(0,0,0,0.02),inset_0_0_30px_rgba(236,236,236,0.18)]">
            <div className="temp-wrapper text-center p-[20px] w-fit">
              <div className="monospaced weather text-[#ffffff] pb-1 text-[10px]">{label}</div>
              <div className="temperature font-body flex justify-center text-accent mr-[-3px]">
                <span className="text-[40px] semibold leading-[1] tracking-[1.5px]">{currentTemp}</span>{' '}
                <span className="text-[30px] leading-[1.15]">°</span>
              </div>
            </div>
            <Image
              src={'/images/home/edinburgTX.svg'}
              className="absolute right-[5px] top-[-17px] z-2 size-[105px]"
              alt=""
              width={125}
              height={100}
            />
          </div>
        </RevealAnimation>
      </div>
      <div className="main-container absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[90vw] md:min-w-[1290px]">
        <div className="text-center md:space-y-4 space-y-5">
          <RevealAnimation delay={0.3} offset={10}>
            <div className="flex justify-center text-center text-accent">
              <Image className="-mb-1" src={WelcomeTo} width={130} height={70} alt="" />
              {/* Welcome to */}
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.4} offset={10}>
            {/* 1. Relative Container for the "Stack" */}
            <div className="relative inline-block max-w-[90vw] md:max-w-[776px] mx-auto leading-[1.1] text-center overflow-visible h-fit items-center">
              {/* 2. The Real Heading (Visible Gradient) */}

              <h1
                className="hero-heading text-[28px] sm:text-[3rem] md:text-[3.5rem] -tracking-[.5px] font-[600] pb-[0.25em] -mb-[0.25em] leading-[1.1]"
                style={{
                  background: '#ffffff',
                  backgroundImage:
                    'linear-gradient(147deg, #ffffff 0%, #f7f7f7 25%, #efefef 50%, #e8e8e8 75%, #e0e0e0 100%)',
                  // textShadow: '0 0 45px white',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitBoxDecorationBreak: 'clone',
                  boxDecorationBreak: 'clone',
                }}>
                <HeadingContent />
              </h1>
              {/* 3. The Shadow Heading (Ghost) */}
              {/* <p className="hero-shadow-layer text-[5rem] -tracking-[2px]" aria-hidden="true">
                <HeadingContent />
              </p> */}
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.5} offset={15}>
            <p className="initial-descriptiion lg:max-w-[600px] md:max-w-[600px] sm:max-w-[500px] max-w-[380px] mx-auto text-[#ffffffea] wna-text-shadow">
              Tucked into the Rio Grande Valley at the southern tip of Texas — just minutes from Mexico — Monte Cristo
              is a hidden gem where a tropical climate creates a picturesque setting for a day on the greens.
            </p>
          </RevealAnimation>
        </div>
        {/* <ul className="flex items-center gap-4 justify-center md:flex-row flex-col mt-10">
          <RevealAnimation delay={0.6} direction="left" offset={50}>
            <li className="w-full sm:w-auto text-center sm:text-left">
              <LinkButton
                href="/book-tee-time"
                className="btn hover:btn-secondary dark:hover:btn-accent text-center border-0 btn-green btn-xl md:w-auto w-[90%] realistic-shadow-md  hover:realistic-shadow-light hover:text-ns-green">
                Book Tee Time
              </LinkButton>
            </li>
          </RevealAnimation>
          <RevealAnimation delay={0.7} direction="left" offset={50}>
            <li className="w-full sm:w-auto text-center sm:text-left">
              <LinkButton
                href="/events"
                className="unique-class btn btn-dark hover:btn-green hover:border-0 text-center btn-xl md:w-auto w-[90%] text-ns-green realistic-shadow-md hover:realistic-shadow-light bg-[#1a1a1c]">
                Events at Bushwood
              </LinkButton>
            </li>
          </RevealAnimation>
        </ul> */}
        {/* <RevealAnimation delay={0.8} instant>
          <div className="lg:mt-[100px] mt-[50px]">
            <figure className="xl:max-w-[1240px] lg:max-w-[900px] max-w-[700px] mx-auto rounded-2xl overflow-hidden">
              <Image src={heroImg} className="w-full h-full object-cover dark:hidden" alt="Forex trading" />
              <Image src={heroDarkImg} className="w-full h-full object-cover hidden dark:block" alt="Forex trading" />
            </figure>
          </div>
        </RevealAnimation> */}
      </div>
    </section>
  );
};

export default Hero;
