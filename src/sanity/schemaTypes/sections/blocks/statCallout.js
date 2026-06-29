import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionStatCallout',
  title: 'Stat Callout',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string', validation: r => r.required() }),
    defineField({ name: 'suffix', title: 'Suffix (e.g. +, %)', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { value: 'value', label: 'label' },
    prepare({ value, label }) { return { title: 'Stat Callout', subtitle: `${value} — ${label}` } },
  },
})
