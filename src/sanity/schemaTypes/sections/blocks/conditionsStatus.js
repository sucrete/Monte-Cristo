import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionConditionsStatus',
  title: 'Conditions / Status',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Course Conditions' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
          { title: 'Cart Path Only', value: 'cart-path-only' },
          { title: 'Walking Only', value: 'walking-only' },
          { title: 'Limited Access', value: 'limited' },
        ],
        layout: 'radio',
      },
      initialValue: 'open',
      validation: r => r.required(),
    }),
    defineField({ name: 'details', title: 'Details', type: 'text', rows: 2 }),
    defineField({ name: 'lastUpdated', title: 'Last updated', type: 'datetime' }),
  ],
  preview: {
    select: { status: 'status', details: 'details' },
    prepare({ status, details }) { return { title: 'Conditions / Status', subtitle: `${status}${details ? ' · ' + details.slice(0, 40) : ''}` } },
  },
})
