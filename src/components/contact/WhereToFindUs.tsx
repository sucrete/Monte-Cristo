import RevealAnimation from '../animation/RevealAnimation';
import Map from '../shared/Map';
import Image from 'next/image';
import Link from 'next/link';

const WhereToFindUs = () => {
  return (
    <section className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[150px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px] overflow-hidden bg-background-2">
      <div className="main-container">
        <div className="grid grid-cols-12 lg:gap-x-0 xl:gap-x-28 gap-y-12 items-center">
          <div className="col-span-12 lg:col-span-6">
            <div className="space-y-3 flex flex-col">
              {/* <RevealAnimation delay={0.2}>
                <span className="badge badge-gray-light mb-5">Location</span>
              </RevealAnimation> */}
              <RevealAnimation delay={0.2}>
                <Image
                  src={'/images/contact/car-journey.svg'}
                  width={35}
                  height={35 * 0.92}
                  alt=""
                  className="ml-[5px]"
                />
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <h2>Find us fast</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <p className="pb-3">
                  We can be reached via the dedicated bus route from the airport or a quick 10 minute drive from
                  downtown.
                </p>
              </RevealAnimation>

              <RevealAnimation delay={0.5}>
                <Link
                  href="https://www.google.com/maps/search/?api=1&query=2919+N+Kenyon+Rd%2C+Edinburg%2C+TX+78542"
                  target="_blank"
                  className="semibold hover:bold w-fit duration-300 border-l-2 pl-4 transition-[font-variation-settings]">
                  2919 N Kenyon Rd
                  <br />
                  Edinburg, TX 78542
                </Link>
              </RevealAnimation>
              <RevealAnimation delay={0.55}>
                <Link
                  className="btn btn-md btn-secondary dark:btn-transparent dark:hover:btn-accent hover:btn-secondary w-[fit-content] mt-3"
                  href="https://www.google.com/maps/search/?api=1&query=2919+N+Kenyon+Rd%2C+Edinburg%2C+TX+78542"
                  target="_blank">
                  <span>Get Directions</span>
                </Link>
              </RevealAnimation>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <RevealAnimation delay={0.6}>
              <div className="rounded-[20px] bg-white dark:bg-background-6 p-2.5">
                <div className="w-full h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden rounded-2xl">
                  <Map />
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereToFindUs;
