import { defineLocations, PresentationPluginOptions } from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    home: defineLocations({
      select: {
        title: 'title',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    weekdayRates: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Greens Fees', href: '/greens-fees' }],
      }),
    }),
    weekendRates: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Greens Fees', href: '/greens-fees' }],
      }),
    }),
    twilightRates: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Greens Fees', href: '/greens-fees' }],
      }),
    }),
    nonStandardRates: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Greens Fees', href: '/greens-fees' }],
      }),
    }),
    memberships: defineLocations({
      select: {
        title: 'title',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Memberships',
            href: '/membership',
          },
        ],
      }),
    }),
    news: defineLocations({
      select: {
        title: 'title',
      },
      resolve: () => ({
        locations: [
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    instructors: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Instructors', href: '/instructors' }],
      }),
    }),
    testBed: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Test Bed',
            href: '/test-bed',
          },
        ],
      }),
    }),
    testBed2: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Test Bed 2',
            href: '/test-bed-2',
          },
        ],
      }),
    }),
    blog: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ?? 'Blog Post',
            href: `/blog/${doc?.slug}`,
          },
          {
            title: 'Blog',
            href: '/blog',
          },
        ],
      }),
    }),
  },
}