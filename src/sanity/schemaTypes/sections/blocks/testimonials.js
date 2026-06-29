import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionTestimonials',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      validation: r => r.min(1),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: r => r.required() }),
          defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
          defineField({ name: 'role', title: 'Role / Member type', type: 'string' }),
          defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'name', subtitle: 'role' } },
      }],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: 'Testimonials', subtitle: heading } },
  },
})
