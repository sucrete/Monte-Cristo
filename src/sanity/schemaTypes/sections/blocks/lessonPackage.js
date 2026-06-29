import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionLessonPackage',
  title: 'Lesson Package',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Package name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'sessionsCount', title: 'Number of sessions', type: 'number' }),
    defineField({ name: 'price', title: 'Price (e.g. $299)', type: 'string' }),
    defineField({ name: 'priceNote', title: 'Price note (e.g. per person)', type: 'string' }),
    defineField({
      name: 'features',
      title: 'Included features',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'text', title: 'Feature', type: 'string' })], preview: { select: { title: 'text' } } }],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string', initialValue: 'Book Now' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'url', validation: r => r.uri({ allowRelative: true }) }),
  ],
  preview: {
    select: { title: 'title', price: 'price' },
    prepare({ title, price }) { return { title: 'Lesson Package', subtitle: `${title}${price ? ' · ' + price : ''}` } },
  },
})
