import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionFeaturesGrid',
  title: 'Features Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'iconName', title: 'Icon name (Phosphor)', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: 'Features Grid', subtitle: heading } },
  },
})
