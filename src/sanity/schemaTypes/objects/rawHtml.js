import { defineType, defineField } from 'sanity'
import { HtmlBlockIcon, HtmlInsertIcon } from '../../icons/icons'
import HtmlFieldInput from '../../components/HtmlFieldInput'
import { HtmlFieldWrapper } from '../../components/HtmlFieldWrapper'

function RawHtmlPreview(props) {
  return props.renderDefault({ ...props, icon: HtmlBlockIcon })
}

export default defineType({
  name: 'rawHtml',
  title: 'Raw HTML',
  type: 'object',
  icon: HtmlInsertIcon,
  components: {
    preview: RawHtmlPreview,
  },
  fields: [
    defineField({
      name: 'html',
      title: 'HTML',
      type: 'text',
      components: { input: HtmlFieldInput, field: HtmlFieldWrapper },
      validation: (rule) =>
        rule.custom((html) => {
          if (!html) return true
          if (/<script[\s\S]*?>/i.test(html))
            return 'Script tags are not allowed in HTML blocks.'
          if (/\bon\w+\s*=/i.test(html))
            return 'Inline event handlers (e.g. onclick=) are not allowed.'
          if (/\bhref\s*=\s*["']?\s*javascript:/i.test(html) || /\bsrc\s*=\s*["']?\s*javascript:/i.test(html))
            return 'javascript: URLs are not allowed.'
          return true
        }),
    }),
  ],
  preview: {
    select: { html: 'html' },
    prepare({ html }) {
      return { title: 'HTML Block', subtitle: html?.slice(0, 60) }
    },
  },
})
