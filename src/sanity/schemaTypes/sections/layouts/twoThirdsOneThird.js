import { defineType, defineField } from 'sanity'
import TinyMCEInput from '../../../components/TinyMCEInput'
import { ColumnLayoutInput } from '../../../components/sections/ColumnLayoutInput'

export default defineType({
  name: 'sectionTwoThirdsOneThird',
  title: '66 + 33',
  type: 'object',
  components: { input: ColumnLayoutInput },
  fields: [
    defineField({ name: 'col1', title: 'Column 1 (66)', type: 'text', components: { input: TinyMCEInput } }),
    defineField({ name: 'col2', title: 'Column 2 (33)', type: 'text', components: { input: TinyMCEInput } }),
  ],
  preview: {
    prepare() { return { title: '66 + 33 Layout' } },
  },
})
