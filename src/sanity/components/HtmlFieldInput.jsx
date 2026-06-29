import { useCallback, useContext, useEffect } from 'react'
import { set, unset } from 'sanity'
import { TextArea } from '@sanity/ui'
import { FormatContext } from './FormatContext'

async function formatHtml(html) {
  const [{ default: prettier }, { default: parserHtml }] = await Promise.all([
    import('prettier/standalone'),
    import('prettier/plugins/html'),
  ])
  return prettier.format(html, {
    parser: 'html',
    plugins: [parserHtml],
    printWidth: 100,
    tabWidth: 2,
    htmlWhitespaceSensitivity: 'ignore',
  })
}

export default function HtmlFieldInput({ value, onChange }) {
  const formatContext = useContext(FormatContext)

  const handleChange = useCallback((e) => {
    const val = e.currentTarget.value
    onChange(val ? set(val) : unset())
  }, [onChange])

  const handleFormat = useCallback(async () => {
    if (!value?.trim()) return
    try {
      const formatted = await formatHtml(value)
      onChange(set(formatted))
    } catch (e) {
      console.warn('[HtmlFieldInput] Format failed:', e)
    }
  }, [value, onChange])

  useEffect(() => {
    if (formatContext?.formatRef) {
      formatContext.formatRef.current = handleFormat
    }
    return () => {
      if (formatContext?.formatRef) formatContext.formatRef.current = null
    }
  }, [formatContext, handleFormat])

  return (
    <TextArea
      value={value ?? ''}
      onChange={handleChange}
      style={{
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '1.6',
        minHeight: '60vh',
        resize: 'vertical',
      }}
    />
  )
}
