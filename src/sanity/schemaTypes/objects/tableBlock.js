import { defineType, defineField } from 'sanity'
import { TableIcon } from '../../icons/icons'
import TableInput from '../../components/TableInput'

export default defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  icon: TableIcon,
  components: { input: TableInput },
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          fields: [
            {
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { rows: 'rows' },
    prepare({ rows }) {
      const rowCount = rows?.length ?? 0
      const colCount = rows?.[0]?.cells?.length ?? 0
      return {
        title: 'Table',
        subtitle: rowCount ? `${rowCount} rows × ${colCount} columns` : 'Empty table',
      }
    },
  },
})
