import { defineType, defineField } from 'sanity'
import TinyMCEInput from '../../../components/TinyMCEInput'
import { ColumnLayoutInput } from '../../../components/sections/ColumnLayoutInput'

export default defineType({
  name: 'sectionSingleColumn',
  title: 'Single Column',
  type: 'object',
  components: { input: ColumnLayoutInput },
  fields: [
    defineField({ name: 'col1', title: 'Column 1', type: 'text', components: { input: TinyMCEInput } }),
  ],
  preview: {
    prepare() { return { title: 'Single Column Layout' } },
  },
})
