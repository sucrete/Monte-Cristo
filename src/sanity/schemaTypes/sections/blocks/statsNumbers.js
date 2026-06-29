import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionStatsNumbers',
  title: 'Stats & Numbers',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      validation: r => r.min(1),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string', validation: r => r.required() }),
          defineField({ name: 'suffix', title: 'Suffix (e.g. +, %)', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: 'Stats & Numbers', subtitle: heading } },
  },
})
