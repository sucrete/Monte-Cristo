import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionGallery',
  title: 'Picture Gallery',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      validation: r => r.min(1),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        ],
        preview: { select: { title: 'caption', media: 'image' } },
      }],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: 'Picture Gallery', subtitle: heading } },
  },
})
