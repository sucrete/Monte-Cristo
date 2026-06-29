import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';
import { Adult, AdultSeries, AdultGroup, Child, ChildSeries, ChildGroup } from './icons';

const ListOfLessons = [
  {
    id: 1,
    title: 'Adult Lesson',
    price: '$70 each',
    icon: Adult,
  },
  {
    id: 2,
    title: 'Series of 4 Adult Lessons',
    price: '$265',
    icon: AdultSeries,
  },
  {
    id: 3,
    title: 'Adult Group Lesson',
    price: '$60 per person',
    icon: AdultGroup,
  },
  {
    id: 4,
    title: 'Jr. Lesson (18 & Under)',
    price: '$45 each',
    icon: Child,
  },
  {
    id: 5,
    title: 'Series of 4 Jr. Lessons',
    price: '$175',
    icon: ChildSeries,
  },
  {
    id: 6,
    title: 'Jr. Group Lesson',
    price: '$35 per person',
    icon: ChildGroup,
  },
];
const Lessons = () => {
  return (
    <section className="bg-[#f3f2f1] dark:bg-background-7 pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="main-container">
        <div className="text-center mb-[70px]">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green mb-5 font-[500]"> Get good </span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2 className="mb-[20px] leading-[1.1]">
              We lower the anxiety
              <br className="hidden md:block" />
              of lowering your score
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <p className="max-[426px]:text-tagline-2 max-w-[750px] max-[426px]:max-w-[320px] mx-auto">
              Whether you’re a beginner or a seasoned pro, our lessons at Bushwood are designed to be low-pressure and{' '}
              <span className="emphasis">high-impact</span>. Our certified instructors focus on personalized coaching
              that builds <span className="emphasis">confidence and consistency</span>, ensuring you enjoy the game
              while you improve it. Explore our lesson packages below to find your perfect fit.
            </p>
          </RevealAnimation>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* ({"icon: Icon", ...lesson}, index) (below) basically does the job of
          "{(() => {
          const Icon = lesson.icon;.
          
          return <Icon className="w-10 h-10 mb-4 text-primary" />;
        })()}" */}
          {ListOfLessons.map(({ icon: Icon, ...lesson }, index) => (
            <RevealAnimation
              key={lesson.id}
              delay={0.1 + index * 0.1}
              className="basis-full md:basis-[calc(50%-24px)] lg:basis-[calc(33.333%-24px)] ">
              <article className="bg-background-1 dark:bg-background-6 rounded-[20px] p-8 border border-[#80808021]">
                <Icon className="fill-black mb-4" />
                <p className="title emphasis semibold">{lesson.title}</p>
                <p className="pt-2">{lesson.price}</p>
              </article>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.3}>
          <div className="flex justify-center mt-10 md:mt-14">
            <LinkButton
              href="#contact-for-lesson"
              className="btn btn-secondary btn-md hover:btn-primary dark:btn-accent w-[90%] md:w-auto mx-auto md:mx-0">
              Contact Us
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Lessons;
