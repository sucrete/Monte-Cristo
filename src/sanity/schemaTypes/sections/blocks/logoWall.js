import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionLogoWall',
  title: 'Logo Wall',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      validation: r => r.min(1),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Logo image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
          defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: r => r.required() }),
          defineField({ name: 'url', title: 'Link URL', type: 'url', validation: r => r.uri({ allowRelative: true }) }),
        ],
        preview: { select: { title: 'alt', media: 'image' } },
      }],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: 'Logo Wall', subtitle: heading } },
  },
})
