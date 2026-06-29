import '@/app/globals.css';

import Navbar from '@/components/shared/header/NavbarController';
import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { AppContextProvider } from '@/context/AppContext';

import { sanityFetch } from '@/sanity/lib/live';
import { TICKER_QUERY } from '@/sanity/lib/queries';

import { DisableDraftMode } from '@/components/disable-draft-mode';
import { SanityLive } from '@/sanity/lib/live';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';

import { generateMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

import { ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
  ...generateMetadata(),
};

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { data: tickerData } = await sanityFetch({ query: TICKER_QUERY });

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-secondary focus:shadow-lg focus-visible:ring-2 focus-visible:ring-bushwood-600">
        Skip to main content
      </a>
      <AppContextProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar notices={tickerData?.tickerArray ?? []} tickerVisible={tickerData?.tickerQuestion ?? false} />
          <Suspense>
            <SmoothScrollProvider>
              <div id="main-content" tabIndex={-1} className="outline-none">
                {children}
              </div>
            </SmoothScrollProvider>
          </Suspense>
        </ThemeProvider>
      </AppContextProvider>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <Suspense>
          <DisableDraftMode />
          <VisualEditing />
        </Suspense>
      )}
    </>
  );
}
