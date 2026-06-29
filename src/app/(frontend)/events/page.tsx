import HalfHero from '@/components/ui/HalfHero';
import CalendarComponent from '@/components/events/Calendar';
import NewsletterSignup from '@/components/shared/NewsletterSignup';

import Footer from '@/components/shared/footer/Footer';

import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

import { sanityFetch } from '@/sanity/lib/live';
import { EVENTS_QUERY } from '@/sanity/lib/queries';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Events at Bushwood | Find out about what is happening at Bushwood Golf Course.',
};

const Course = async () => {
  const { data: eventsData } = await sanityFetch({ query: EVENTS_QUERY });
  console.log(JSON.stringify(eventsData, null, 2));
  return (
    <Fragment>
      <main>
        <HalfHero
          BGHeroSrc="/images/hero-images/nice-vista.webp"
          imageOffset="-55%"
          imageHeight="150%"
          overlayOpacity=".75"
          heroText="Events"
        />
        <CalendarComponent eventsData={eventsData} />

        {/* <NewsletterSignup
          className="bg-white"
          inputFieldClass="placeholder:text-black/70 focus:border-black bg-accent"
        /> */}
      </main>
      <Footer />
    </Fragment>
  );
};

export default Course;
