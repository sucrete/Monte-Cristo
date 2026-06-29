import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionCtaBanner',
  title: 'CTA Banner',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: r => r.required() }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
    defineField({ name: 'buttonLabel', title: 'Button label', type: 'string' }),
    defineField({ name: 'buttonUrl', title: 'Button URL', type: 'url', validation: r => r.uri({ allowRelative: true }) }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: { list: ['dark', 'green', 'light'], layout: 'radio' },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) { return { title: 'CTA Banner', subtitle: heading } },
  },
})
