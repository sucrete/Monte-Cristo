import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionBigPic',
  title: 'Big Pic',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'overlayLabel', title: 'Overlay label (small text)', type: 'string' }),
    defineField({ name: 'overlayCaption', title: 'Overlay caption', type: 'string' }),
    defineField({
      name: 'features',
      title: 'Feature bullets',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'text', title: 'Text', type: 'string' })], preview: { select: { title: 'text' } } }],
    }),
  ],
  preview: {
    select: { media: 'image', caption: 'overlayCaption' },
    prepare({ media, caption }) { return { title: 'Big Pic', subtitle: caption, media } },
  },
})
