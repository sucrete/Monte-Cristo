import { defineType, defineField } from 'sanity'
import TinyMCEInput from '../../../components/TinyMCEInput'
import { ColumnLayoutInput } from '../../../components/sections/ColumnLayoutInput'

export default defineType({
  name: 'sectionTwoColumn',
  title: '2 Column',
  type: 'object',
  components: { input: ColumnLayoutInput },
  fields: [
    defineField({ name: 'col1', title: 'Column 1', type: 'text', components: { input: TinyMCEInput } }),
    defineField({ name: 'col2', title: 'Column 2', type: 'text', components: { input: TinyMCEInput } }),
  ],
  preview: {
    prepare() { return { title: '2 Column Layout' } },
  },
})
