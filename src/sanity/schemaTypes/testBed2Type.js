import { defineField, defineType } from 'sanity'
import TinyMCEInput from '../components/TinyMCEInput'

export default defineType({
  name: 'testBed2',
  title: 'Test Bed 2',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Test Bed 2' }
    },
  },
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      components: { input: TinyMCEInput },
    }),
  ],
})
