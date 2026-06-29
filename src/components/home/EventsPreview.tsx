import RevealAnimation from '../animation/RevealAnimation';
import EventsCarousel from './EventsCarousel';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { EVENTS_QUERY } from '@/sanity/lib/queries';

const EventsPreview = async ({ className }: { className?: string }) => {
  const { data: allEvents } = await sanityFetch({ query: EVENTS_QUERY });

  const today = new Date().toISOString().split('T')[0];

  const upcomingEvents = (allEvents ?? [])
    .filter((e: any) => e.start >= today)
    .sort((a: any, b: any) => a.start.localeCompare(b.start))
    .slice(0, 3);

  if (upcomingEvents.length < 2) return null;

  return (
    <section className={cn('xl:pt-[160px] pt-[50px] xl:pb-[160px] sm:pb-[100px] md:pb-[70px] pb-16 bg-background-2', className)}>
      <div className="main-container">
        <RevealAnimation>
          <div>
            <div className="bg-cover bg-[center_50%] bg-no-repeat flex md:flex-row flex-col p-5 md:pt-12 md:pr-11 md:pb-5 md:pl-10 bg-ns-pale-green rounded-[20px] justify-between align-middle overflow-hidden">
              <div className="md:basis-[35%] flex flex-col pb-[2rem] relative z-10 justify-center">
                <p className="text-[26px] md:text-[35px] text-black tracking-[-1px] leading-[1.1] font-serif font-[500] pb-[.25rem] pl-[3px]">
                  Upcoming Events
                </p>
                <p className="off-black text-[14px] leading-[1.3] pl-[5px]">
                  Check out all upcoming events on our <Link href={'/events'}>events page</Link>!
                </p>
              </div>
              <div className="md:max-w-[60%] flex flex-col justify-center align-middle relative z-10">
                <EventsCarousel eventsData={upcomingEvents} />
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default EventsPreview;
