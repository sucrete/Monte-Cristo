import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionEventPromo',
  title: 'Event Promo',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Event title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'datetime' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'registerLabel', title: 'Register button label', type: 'string', initialValue: 'Register Now' }),
    defineField({ name: 'registerUrl', title: 'Register URL', type: 'url', validation: r => r.uri({ allowRelative: true }) }),
  ],
  preview: {
    select: { title: 'title', date: 'date', media: 'image' },
    prepare({ title, date, media }) {
      return { title: 'Event Promo', subtitle: title, media }
    },
  },
})
