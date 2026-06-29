import { useState, useCallback } from 'react'
import { PortableTextInput, set } from 'sanity'
import { Button, Dialog, Box, Stack, Flex, Text, TextArea } from '@sanity/ui'
import { nanoid } from 'nanoid'

// PT blocks → HTML string
function blocksToHtml(blocks) {
  if (!blocks?.length) return ''
  const lines = []
  let inList = false

  for (const block of blocks) {
    if (block._type === 'rawHtml') {
      if (inList) { lines.push('</ul>'); inList = false }
      lines.push(block.html || '')
      continue
    }
    if (block._type === 'image' || block._type !== 'block') continue

    const text = (block.children || []).map(span => {
      let t = (span.text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      const marks = span.marks || []
      if (marks.includes('strong')) t = `<strong>${t}</strong>`
      if (marks.includes('em')) t = `<em>${t}</em>`
      return t
    }).join('')

    if (block.listItem === 'bullet') {
      if (!inList) { lines.push('<ul>'); inList = true }
      lines.push(`  <li>${text}</li>`)
    } else {
      if (inList) { lines.push('</ul>'); inList = false }
      switch (block.style) {
        case 'h2': lines.push(`<h2>${text}</h2>`); break
        case 'h3': lines.push(`<h3>${text}</h3>`); break
        default: lines.push(`<p>${text}</p>`)
      }
    }
  }
  if (inList) lines.push('</ul>')
  return lines.join('\n')
}

// HTML string → PT blocks
function makeSpan(text, marks = []) {
  return { _type: 'span', _key: nanoid(), text, marks }
}

function makeBlock(style, children, listItem, level) {
  const block = {
    _type: 'block',
    _key: nanoid(),
    style: style || 'normal',
    children: children.length ? children : [makeSpan('')],
    markDefs: [],
  }
  if (listItem) { block.listItem = listItem; block.level = level || 1 }
  return block
}

function parseInline(node, marks = []) {
  if (node.nodeType === 3) {
    const text = node.textContent || ''
    return text ? [makeSpan(text, marks)] : []
  }
  if (node.nodeType !== 1) return []
  const tag = node.tagName.toLowerCase()
  const next = [...marks]
  if (tag === 'strong' || tag === 'b') next.push('strong')
  else if (tag === 'em' || tag === 'i') next.push('em')
  return Array.from(node.childNodes).flatMap(c => parseInline(c, next))
}

const BLOCK_TAGS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'blockquote', 'section', 'article'])

function hasBlockChild(node) {
  return Array.from(node.children || []).some(c => BLOCK_TAGS.has(c.tagName.toLowerCase()))
}

function processNode(node, blocks) {
  if (node.nodeType === 3) {
    const text = (node.textContent || '').trim()
    if (text) blocks.push(makeBlock('normal', [makeSpan(text)]))
    return
  }
  if (node.nodeType !== 1) return

  const tag = node.tagName.toLowerCase()

  if (tag === 'ul' || tag === 'ol') {
    const listItem = tag === 'ul' ? 'bullet' : 'number'
    for (const child of node.childNodes) {
      if (child.nodeType === 1 && child.tagName.toLowerCase() === 'li') {
        blocks.push(makeBlock('normal', parseInline(child), listItem, 1))
      }
    }
    return
  }

  const styleMap = { h1: 'h2', h2: 'h2', h3: 'h3', h4: 'h3' }
  if (styleMap[tag]) {
    blocks.push(makeBlock(styleMap[tag], parseInline(node)))
    return
  }

  // div, p, span, section, etc. — recurse if it contains block elements, otherwise treat as paragraph
  if (hasBlockChild(node)) {
    for (const child of node.childNodes) processNode(child, blocks)
    return
  }

  const children = parseInline(node)
  if (children.length) blocks.push(makeBlock('normal', children))
}

function htmlToPortableTextBlocks(html) {
  if (!html.trim()) return []
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const blocks = []
  for (const child of doc.body.childNodes) processNode(child, blocks)
  return blocks
}

export default function PortableTextWithCodeEditor(props) {
  const [open, setOpen] = useState(false)
  const [html, setHtml] = useState('')

  const handleOpen = useCallback(() => {
    setHtml(blocksToHtml(props.value))
    setOpen(true)
  }, [props.value])

  const handleSave = useCallback(() => {
    const imageBlocks = (props.value || []).filter(b => b._type === 'image')
    const ptBlocks = htmlToPortableTextBlocks(html)
    props.onChange(set([...ptBlocks, ...imageBlocks]))
    setOpen(false)
  }, [html, props])

  return (
    <Stack space={2}>
      <PortableTextInput {...props} />
      <Flex justify="flex-end" paddingTop={1}>
        <Button
          text="Edit as HTML"
          mode="ghost"
          tone="default"
          fontSize={1}
          onClick={handleOpen}
        />
      </Flex>

      {open && (
        <Dialog
          id="html-editor"
          header="Edit as HTML"
          width={2}
          onClose={() => setOpen(false)}
          footer={
            <Flex padding={3} justify="flex-end" gap={2}>
              <Button text="Cancel" mode="ghost" onClick={() => setOpen(false)} />
              <Button text="Apply" tone="primary" onClick={handleSave} />
            </Flex>
          }
        >
          <Box padding={4}>
            <Stack space={3}>
              <Text size={1} muted>
                Edit content as HTML. Supports &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;/&lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, and &lt;div&gt;/&lt;span&gt; (treated as paragraphs). Images are preserved separately.
              </Text>
              <TextArea
                rows={22}
                value={html}
                onChange={(e) => setHtml(e.currentTarget.value)}
                style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6' }}
              />
            </Stack>
          </Box>
        </Dialog>
      )}
    </Stack>
  )
}
