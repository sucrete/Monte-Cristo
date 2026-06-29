import Hero from '@/components/home/Hero';

import Links from '@/components/home/Links';
import CourseIntro from '@/components/home/CourseIntro';
import ScrollGallery from '@/components/home/ScrollGallery';
// import BigPic from '@/components/home/BigPic';
import NewsletterSignup from '@/components/shared/NewsletterSignup';
import SectionRenderer from '@/components/sections/SectionRenderer';

import Footer from '@/components/shared/footer/Footer';

import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

import { INSTRUCTORS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';

// const options = { next: { revalidate: 60 } };

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Monte Cristo Golf & Country Club',
};

const Home = async () => {
  const { data } = await sanityFetch({ query: INSTRUCTORS_QUERY });
  return (
    <Fragment>
      <main>
        <Hero />
        <Links />
         {data?.sections && <SectionRenderer sections={data.sections} />}
        <CourseIntro />
        <ScrollGallery />
        {/* <BigPic /> */}
        {/* <NewsletterSignup inputFieldClass="placeholder:text-black/70 focus:border-black bg-accent" /> */}
      </main>
      <Footer />
    </Fragment>
  );
};

export default Home;
