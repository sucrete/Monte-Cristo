

import HalfHero from '@/components/ui/HalfHero';
import NewsletterSignup from '@/components/shared/NewsletterSignup';
import RatesSection from '@/components/greens-fees/RatesSection';
import Introduction from '@/components/greens-fees/Introduction';

import Footer from '@/components/shared/footer/Footer';


import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import { Fragment } from 'react';

import { sanityFetch } from '@/sanity/lib/live';
import { RATES_QUERY } from '@/sanity/lib/queries'; 

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Greens Fees | Bushwood Golf Course in Davie, FL',
};

const GreensFees = async () => {
    const { data: ratesData } = await sanityFetch({ query: RATES_QUERY });
    console.log('in the Rates page.tsx', JSON.stringify(ratesData, null, 2));
  return (
    <Fragment> 
      <main>
        <HalfHero BGHeroSrc='/images/hero-images/mc-squad-2.webp' imageOffset='-30%' imageHeight='170%' overlayOpacity='.35' heroText='Greens Fees'/>
        {/* <Introduction /> */}
        {/* uncomment <Services/> to incorporate automatic carouselling gallery */}
        {/* <Services /> */}
        {/* <WhereToFindUs/> */}
        <RatesSection ratesSectionData={ratesData}/>
        
        {/* <NewsletterSignup inputFieldClass='placeholder:text-black/70 focus:border-black bg-accent'/> */}
      </main>
      <Footer />
    </Fragment>
  );
};

export default GreensFees;
