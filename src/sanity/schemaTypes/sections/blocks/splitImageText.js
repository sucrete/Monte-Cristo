import { defineType, defineField } from 'sanity'
import TinyMCEInput from '../../../components/TinyMCEInput'

export default defineType({
  name: 'sectionSplitImageText',
  title: 'Split — Image + Text',
  type: 'object',
  fields: [
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: { list: ['left', 'right'], layout: 'radio' },
      initialValue: 'left',
    }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', components: { input: TinyMCEInput } }),
    defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'url', validation: r => r.uri({ allowRelative: true }) }),
  ],
  preview: {
    select: { heading: 'heading', media: 'image' },
    prepare({ heading, media }) { return { title: 'Split — Image + Text', subtitle: heading, media } },
  },
})
