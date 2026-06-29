import LinkButton from '../ui/button/LinkButton';

import RevealAnimation from '../animation/RevealAnimation';

interface FeatureItem {
  id: number;
  text: string;
}

const featureItems: FeatureItem[] = [
  { id: 1, text: '10% off all food & beverage purchases, including alcohol.' },
  { id: 2, text: '5% off all golf merchandise.' },
  { id: 3, text: '10% off range tokens.' },
];

const Introduction = () => {
  return (
    <section className="xl:py-[100px] lg:py-[90px] md:py-20 py-16 xl:pb-30 bg-background-3 relative">
      <div className="main-container md:space-y-[30px] space-y-3">
        <div className="space-y-1 text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-yellow-v2 mb-5">Members win</span>
          </RevealAnimation>
          <div className="space-y-5">
            <RevealAnimation delay={0.3}>
              <h2 className="max-w-[674px] mx-auto leading-[1.1]">
                {new Date().getFullYear()} Annual
                <br />
                Membership Pricing
              </h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p className="max-w-[700px] mx-auto">
                All members enjoy <span className="emphasis">exclusive invites</span> and first-to-knows about upcoming
                tournaments, events, & specials like the Annual Ryder Cup, The Bushwood Open, the always sold-out Night
                Golf and the annual Black Friday Pass Holder event!
              </p>
            </RevealAnimation>
          </div>
        </div>
        <ul className="flex items-center md:gap-7 md:gap-y-4 gap-5 flex-wrap sm:justify-center max-w-[700px] mx-auto h-fit">
          {featureItems?.filter(Boolean).map((item, index) => (
            <RevealAnimation key={item.id || index} delay={0.1 + index * 0.1}>
              <li className="flex items-center gap-1.5">
                <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={11}
                    height={8}
                    viewBox="0 0 11 8"
                    fill="none"
                    className="shrink-0 fill-black">
                    <path d="M4.81661 7.25605L10.2491 1.92144C10.5836 1.5959 10.5836 1.0697 10.2491 0.744158C9.91446 0.418614 9.37363 0.418614 9.03904 0.744158L4.2116 5.49012L1.96096 3.28807C1.62636 2.96253 1.08554 2.96253 0.750945 3.28807C0.416352 3.61362 0.416352 4.13982 0.750945 4.46536L3.6066 7.25605C3.77347 7.41841 3.99253 7.5 4.2116 7.5C4.43067 7.5 4.64974 7.41841 4.81661 7.25605Z" />
                  </svg>
                </span>
                <span className="text-secondary/90">{item.text}</span>
              </li>
            </RevealAnimation>
          ))}
          {/* <li className="bg-red-500 text-white">Debug: End of List</li> */}
        </ul>
        <RevealAnimation delay={0.5}>
          <div>
            <div className="flex justify-center">
              <LinkButton
                href="www.google.com"
                target='_blank'
                className="btn dark:btn-transparent btn-secondary btn-md md:w-auto w-[90%] mx-auto md:mx-0 hover:btn-green">
                Membership Application
              </LinkButton>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Introduction;
