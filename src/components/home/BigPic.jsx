import RevealAnimation from '../animation/RevealAnimation';
import ParallaxImageBackground from '../ui/ParallaxImageBackground';
const features = ['36-Hole course.', 'World-class pro shop.', 'On-course beverage service.'];
const BigPic = () => {
  return (
    <section className="relative">
      <div className="background-section absolute inset-0 -z-14 bg-[#fafafa] size-full"></div>

      <div className="w-full h-[450px] md:h-[800px] relative">
        <div className="background-section opacity-25 absolute inset-0 -z-2 size-full bg-linear-[to_bottom,hsla(0,0%,0%,0)_0%,hsla(0,0%,0%,0.066)_15.3%,hsla(0,0%,0%,0.129)_28.4%,hsla(0,0%,0%,0.19)_39.7%,hsla(0,0%,0%,0.25)_49.2%,hsla(0,0%,0%,0.308)_57.3%,hsla(0,0%,0%,0.366)_64%,hsla(0,0%,0%,0.425)_69.6%,hsla(0,0%,0%,0.485)_74.4%,hsla(0,0%,0%,0.547)_78.5%,hsla(0,0%,0%,0.612)_82.1%,hsla(0,0%,0%,0.68)_85.4%,hsla(0,0%,0%,0.752)_88.6%,hsla(0,0%,0%,0.829)_92%,hsla(0,0%,0%,0.911)_95.7%,hsl(0,0%,0%)_100%]"></div>
        <ParallaxImageBackground src="/images/home/putting-green-and-ball.jpg" />
        <div className="absolute bottom-5 left-5 md:bottom-[50px] md:left-[50px]">
          <div className=" text-[#ffffffa5] monospaced flex flex-row">
            <RevealAnimation delay={0.3} offset={7}>
              <span className="green-circle size-[9px] bg-ns-green rounded-full inline-block mr-3 -mb-[1px]"></span>
            </RevealAnimation>
            <RevealAnimation delay={.35} offset={7}>
              <span className='inline-block'>views from the greens</span>
            </RevealAnimation>
          </div>
          <RevealAnimation delay={0.45} offset={7}>
            <div className="text-[#fff] text-[18px] pt-[10px]">Hole 12, Early Morning</div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default BigPic;
