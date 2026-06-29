import HalfHero from '@/components/ui/HalfHero';
import NewsletterSignup from '@/components/shared/NewsletterSignup';
import Footer from '@/components/shared/footer/Footer';

import BookingEngine from '@/components/book-tee-time/BookingEngine';

import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Book Tee Time | Your door to peace is the Bushwood Booking Engine.',
};

const BookTeeTime = () => {
  return (
    <Fragment>
      <main>
        <HalfHero
          BGHeroSrc="/images/hero-images/putter-extraordinaire.webp"
          imageOffset="-20%"
          imageHeight="200%"
          overlayOpacity=".55"
          heroText="Book Tee Time"
        />
        <BookingEngine />
        {/* <NewsletterSignup className='bg-white' inputFieldClass="placeholder:text-black/70 focus:border-black bg-accent" /> */}
      </main>
      <Footer />
    </Fragment>
  );
};

export default BookTeeTime;
