import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionTeamPeople',
  title: 'Team / People',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'People',
      type: 'array',
      validation: r => r.min(1),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
          defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
          defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'url', validation: r => r.uri({ allowRelative: true }) }),
        ],
        preview: { select: { title: 'name', subtitle: 'title', media: 'photo' } },
      }],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: 'Team / People', subtitle: heading } },
  },
})
