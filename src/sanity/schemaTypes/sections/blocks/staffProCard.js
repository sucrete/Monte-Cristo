import { defineType, defineField } from 'sanity'
import TinyMCEInput from '../../../components/TinyMCEInput'

export default defineType({
  name: 'sectionStaffProCard',
  title: 'Staff / Pro Card',
  type: 'object',
  fields: [
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'title', title: 'Title / Role', type: 'string' }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'text', title: 'Credential', type: 'string' })], preview: { select: { title: 'text' } } }],
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', components: { input: TinyMCEInput } }),
    defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'url', validation: r => r.uri({ allowRelative: true }) }),
  ],
  preview: {
    select: { name: 'name', title: 'title', media: 'photo' },
    prepare({ name, title, media }) { return { title: name || 'Staff / Pro Card', subtitle: title, media } },
  },
})
