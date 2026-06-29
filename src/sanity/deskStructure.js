// ./deskStructure.js
import {
  ArticleIcon,
  CalendarBlankIcon,
  NewspaperIcon,
  BellIcon,
  IdentificationCardIcon,
  CurrencyDollarIcon,
  FlaskIcon,
  TestTubeIcon,
  SunglassesIcon,
  SunIcon,
  MoonIcon,
  GolfIcon,
  UserListIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { createBulkActionsTable } from 'sanity-plugin-bulk-actions-table';

export const deskStructure = (S, context) =>
  S.list()
    .title('Website')
    .id('website')
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'weekdayRates',
            'weekendRates',
            'twilightRates',
            'nonStandardRates',
            'memberships',
            'media.tag',
            'news',
            'events',
            'ticker',
            'blog',
            'testBed',
            'testBed2',
            'instructors',
          ].includes(listItem.getId()),
      ),
      S.listItem()
        .icon(CurrencyDollarIcon)
        .title('Rates')
        .child(
          S.list()
            .title('Rates')
            .items([
              S.listItem()
                .icon(SunIcon)
                .title('Weekdays')
                .child(S.document().schemaType('weekdayRates').documentId('weekdayRates').title('Weekdays')),
              S.listItem()
                .icon(SunglassesIcon)
                .title('Weekends')
                .child(S.document().schemaType('weekendRates').documentId('weekendRates').title('Weekends')),
              S.listItem()
                .icon(MoonIcon)
                .title('Twilight')
                .child(S.document().schemaType('twilightRates').documentId('twilightRates').title('Twilight')),
              S.listItem()
                .icon(GolfIcon)
                .title('Non-Standard')
                .child(
                  S.document().schemaType('nonStandardRates').documentId('nonStandardRates').title('Non-Standard'),
                ),
            ]),
        ),
      S.listItem()
        .icon(CalendarBlankIcon)
        .title('Events')
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .icon(CalendarBlankIcon)
                .title('All Events')
                .child(S.documentTypeList('events').title('Events')),
              createBulkActionsTable({ type: 'events', S, context, title: 'Manage', icon: TrashIcon }),
            ]),
        ),
      S.listItem().icon(NewspaperIcon).title('News').child(S.documentTypeList('news').title('News Items')),
      S.listItem()
        .icon(UserListIcon)
        .title('Home Page')
        .child(S.document().schemaType('instructors').documentId('instructors').title('Home Page')),
      // ⬇⬇⬇ singlet structure ⬇⬇⬇

      S.divider(),
      S.listItem()
        .icon(BellIcon)
        .title('Notices')
        .child(S.document().schemaType('ticker').documentId('ticker').title('Notices')),
      // S.divider(),
      // S.listItem()
      //   .icon(FlaskIcon)
      //   .title('Test Bed')
      //   .child(S.document().schemaType('testBed').documentId('testBed').title('Test Bed')),
      // S.listItem()
      //   .icon(TestTubeIcon)
      //   .title('Test Bed 2')
      //   .child(S.document().schemaType('testBed2').documentId('testBed2').title('Test Bed 2')),
    ]);
