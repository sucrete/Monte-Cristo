import {defineField, defineType} from 'sanity'
// import GolfEvent from './../customIcons/golfEvent'

import moment from 'moment'

const eventType = defineType({
  name: 'events',
  title: 'Event',
  type: 'document',
  // icon: GolfEvent,
  preview: {
    select: {
      title: 'title',
      subtitle: 'start',
      media: 'flyer',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: `${moment(subtitle).format('dddd, MMMM Do, YYYY')}`,
        media: media,
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (rule) => rule.required().max(70),
    }),

    defineField({
      name: 'start',
      title: 'Event Date',
      type: 'date',
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'dddd, MMMM Do, YYYY',
      },
    }),
    defineField({
      name: 'multidayEvent',
      title: 'Multi-day event?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'end',
      title: 'Event End Date',
      type: 'date',
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.multidayEvent && value === undefined ? 'Required.' : true,
        ),
      hidden: ({document}) => !document?.multidayEvent,
      options: {
        dateFormat: 'dddd, MMMM Do, YYYY',
      },
    }),
    defineField({
      name: 'eventDescription',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'flyerQuestion',
      title: 'Flyer?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'flyer',
      type: 'image',
      description: 'Keep height of flyer under 1500px',
      validation: (rule) =>
        rule.custom((value, context) => {
          const shouldShowImage = context.document?.flyerQuestion
          // this sort of parent object (the 'event' document) uses context.document? in this context, as opposed to context.parent? perhaps in other use cases
          if (shouldShowImage && !value) {
            // if 'flyerQuestion' is true AND there is no image ("!value" ie its true there is NO value) the image type is not valid and takes a string ("Uploading an image...")
            return 'Uploading an image is required.'
          }
          return true
        }),
      hidden: ({document}) => !document?.flyerQuestion,
    }),
    defineField({
      name: 'linkQuestion',
      title: 'Link?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'linkDeets',
      title: 'Link Details',
      type: 'linkDetails',
      validation: (rule) =>
        rule.custom((value, context) => {
          const shouldGiveDeets = context.document?.linkQuestion
          // this sort of parent object (the 'event' document) uses context.document? in this context, as opposed to context.parent? perhaps in other use cases
          if (shouldGiveDeets && !value) {
            // if 'flyerQuestion' is true AND there is no image ("!value" ie its true there is NO value) the image type is not valid and takes a string ("Uploading an image...")
            return 'Link button requires text and url.'
          }
          return true
        }),
      hidden: ({document}) => !document?.linkQuestion,
    }),
  ],
  orderings: [
    {
      title: 'Date, New → Old',
      name: 'eventDateAsc',
      by: [{field: 'start', direction: 'desc'}],
    },
    {
      title: 'Date, Old → New',
      name: 'eventDateDesc',
      by: [{field: 'start', direction: 'asc'}],
    },
  ],
})
export default eventType;