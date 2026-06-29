import RevealAnimation from '../animation/RevealAnimation';

import ParallaxImageBackground from './ParallaxImageBackground';
import ProgressiveBlur from './ProgressiveBlur';
interface HalfHeroProps {
  heroText: string;
  BGHeroSrc?: string;
  imageOffset?: string;
  overlayOpacity?: string;
  imageHeight?: string;
}

const HalfHero = ({
  heroText,
  BGHeroSrc = '/images/hero-images/aaa-golf-course-2.jpg',
  imageHeight = '120%',
  imageOffset = '-10%',
  overlayOpacity = '.7',
}: HalfHeroProps) => {
  return (
    // saved classNames ->  h-[99svh] xl:max-h-[90svh]
    <section className=" bg-bushwood bg-cover bg-top bg-no-repeat relative z-20 h-[280px] sm:h-[380px] md:h-[500px] overflow-hidden">
      {/* <ProgressiveBlur blurBlockHeight="150px" /> */}
      <ParallaxImageBackground src={BGHeroSrc} offset={imageOffset} height={imageHeight} />
      <div
        className="bg-scrim-top top-0 left-0 absolute h-[100%] w-[100%] -z-1"
        style={{ opacity: overlayOpacity }}></div>
      <div className="mx-auto w-full px-25 max-w-[1920px] absolute bottom-5 z-5">
        <RevealAnimation delay={0.1}>
          <div className="h1-wrapper">
            <div className="prophylactic">
              <h1 className="text-[#ffffff] text-[2rem] sm:text-[3rem] md:text-[4rem] opacity-80">{heroText}</h1>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default HalfHero;
