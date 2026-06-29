import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $findMatchingParent,
  $insertNodes,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  createCommand,
  COMMAND_PRIORITY_EDITOR,
  DecoratorNode,
  ParagraphNode,
} from 'lexical'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { $setBlocksType } from '@lexical/selection'
import {
  ListNode,
  ListItemNode,
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list'
import { LinkNode, TOGGLE_LINK_COMMAND, $isLinkNode } from '@lexical/link'
import {
  TableNode,
  TableCellNode,
  TableRowNode,
  INSERT_TABLE_COMMAND,
  $isTableCellNode,
  $insertTableRowAtSelection,
  $deleteTableRowAtSelection,
  $insertTableColumnAtSelection,
  $deleteTableColumnAtSelection,
} from '@lexical/table'
import { HeadingNode, $createHeadingNode, $isHeadingNode } from '@lexical/rich-text'
import { set, useClient } from 'sanity'

// --- HTML formatter ---
const INLINE_TAGS = new Set(['a','b','i','u','s','em','strong','span','code','sub','sup','small','mark','del','ins'])
const VOID_TAGS   = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'])

function serializeNode(node, depth) {
  const INDENT = '  '
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim()
    return text ? INDENT.repeat(depth) + text + '\n' : ''
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return ''
  const tag = node.tagName.toLowerCase()
  const attrs = Array.from(node.attributes).map(a => ` ${a.name}="${a.value}"`).join('')
  if (VOID_TAGS.has(tag)) return `${INDENT.repeat(depth)}<${tag}${attrs}>\n`
  if (INLINE_TAGS.has(tag)) return `${INDENT.repeat(depth)}<${tag}${attrs}>${node.innerHTML}</${tag}>\n`
  let children = ''
  for (const child of node.childNodes) children += serializeNode(child, depth + 1)
  if (!children.trim()) return `${INDENT.repeat(depth)}<${tag}${attrs}></${tag}>\n`
  return `${INDENT.repeat(depth)}<${tag}${attrs}>\n${children}${INDENT.repeat(depth)}</${tag}>\n`
}

function formatHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  let out = ''
  for (const child of doc.body.childNodes) out += serializeNode(child, 0)
  return out.trim()
}

function stripFormattingWhitespace(dom) {
  const BLOCK = new Set(['p','div','table','thead','tbody','tfoot','tr','th','td','ul','ol','li',
    'h1','h2','h3','h4','h5','h6','blockquote','pre','colgroup','col'])
  function walk(node) {
    const toRemove = []
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE && !child.textContent.trim()) {
        const parentTag = node.nodeName.toLowerCase()
        if (BLOCK.has(parentTag) || parentTag === 'body') toRemove.push(child)
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child)
      }
    }
    toRemove.forEach(n => node.removeChild(n))
  }
  walk(dom.body)
}

// --- Icons ---
const IconAlignLeft = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M3 3h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3zm0 4h18v2H3z" />
  </svg>
)
const IconAlignCenter = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M3 3h18v2H3zm3 4h12v2H6zm-3 4h18v2H3zm3 4h12v2H6zm-3 4h18v2H3z" />
  </svg>
)
const IconAlignRight = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M3 3h18v2H3zm6 4h12v2H9zm-6 4h18v2H3zm6 4h12v2H9zm-6 4h18v2H3z" />
  </svg>
)
const IconBulletList = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zM8 6h13v2H8zm0 5h13v2H8zm0 5h13v2H8z" />
  </svg>
)
const IconNumberedList = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2zm1-9h1V4H2v1h1zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2zm5-5v2h14V6zm0 5v2h14v-2zm0 5v2h14v-2z" />
  </svg>
)
const IconLink = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
  </svg>
)
const IconTable = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M20 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v3H5V5h15zm-9 5v4H5v-4h6zm0 9H5v-3h6v3zm2 0v-3h7v3h-7zm7-5h-7v-4h7v4z" />
  </svg>
)

const IconImage = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
)

// --- ImageNode ---
const INSERT_IMAGE_COMMAND = createCommand('INSERT_IMAGE_COMMAND')

class ImageNode extends DecoratorNode {
  __src
  __alt

  static getType() { return 'image' }
  static clone(node) { return new ImageNode(node.__src, node.__alt, node.__key) }

  constructor(src, alt, key) {
    super(key)
    this.__src = src
    this.__alt = alt || ''
  }

  createDOM() {
    const span = document.createElement('span')
    span.style.display = 'block'
    return span
  }
  updateDOM() { return false }
  isInline() { return false }

  exportDOM() {
    const img = document.createElement('img')
    img.src = this.__src
    img.alt = this.__alt
    img.style.maxWidth = '100%'
    img.style.height = 'auto'
    img.style.display = 'block'
    return { element: img }
  }

  static importDOM() {
    return {
      img: () => ({
        conversion: (domNode) => {
          if (domNode instanceof HTMLImageElement) {
            return { node: new ImageNode(domNode.src, domNode.alt) }
          }
          return null
        },
        priority: 0,
      }),
    }
  }

  static importJSON(data) {
    return new ImageNode(data.src, data.alt)
  }

  exportJSON() {
    return { type: 'image', src: this.__src, alt: this.__alt, version: 1 }
  }

  decorate() {
    return <ImageComponent src={this.__src} alt={this.__alt} />
  }
}

function ImageComponent({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '4px 0', pointerEvents: 'none' }}
    />
  )
}

function ImagePlugin({ sanityClient }) {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      ({ src, alt }) => {
        const imageNode = new ImageNode(src, alt)
        const selection = $getSelection()
        if (selection) {
          $insertNodes([imageNode])
        } else {
          $getRoot().selectEnd()
          $insertNodes([imageNode])
        }
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])
  return null
}

function SanityImageBrowser({ sanityClient, onSelect, onCancel }) {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [paneRect, setPaneRect] = useState(null)

  useEffect(() => {
    const pane = document.querySelector('[data-testid="document-panel-scroller"]')
    if (pane) {
      setPaneRect(pane.getBoundingClientRect())
      const ro = new ResizeObserver(() => setPaneRect(pane.getBoundingClientRect()))
      ro.observe(pane)
      return () => ro.disconnect()
    }
  }, [])

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "sanity.imageAsset"] | order(_createdAt desc) [0..199] {
        _id, url, originalFilename,
        metadata { dimensions { width, height } }
      }`
    ).then(data => { setAssets(data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [sanityClient])

  const filtered = search
    ? assets.filter(a => a.originalFilename?.toLowerCase().includes(search.toLowerCase()))
    : assets

  const overlayStyle = paneRect
    ? { position: 'fixed', top: paneRect.top, left: paneRect.left, width: paneRect.width, height: paneRect.height }
    : { position: 'fixed', inset: 0 }

  return createPortal(
    <div
      onMouseDown={(e) => e.target === e.currentTarget && onCancel()}
      style={{ ...overlayStyle, zIndex: 999999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ background: '#fff', borderRadius: 8, width: '90%', maxWidth: 900, maxHeight: '85%', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #dce1e7', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: '#101112', whiteSpace: 'nowrap' }}>Media Library</span>
          <input
            type="search"
            autoFocus
            placeholder="Search by filename…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '5px 10px', border: '1px solid #dce1e7', borderRadius: 4, fontSize: 13, outline: 'none' }}
          />
          <button type="button" onClick={onCancel} style={{ padding: '5px 14px', borderRadius: 4, border: '1px solid #dce1e7', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#54595f', whiteSpace: 'nowrap' }}>Cancel</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 48, color: '#6b7280', fontSize: 14 }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48, color: '#6b7280', fontSize: 14 }}>No images found</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 }}>
              {filtered.map(asset => (
                <button
                  key={asset._id}
                  type="button"
                  onClick={() => onSelect(asset.url, asset.originalFilename || '')}
                  style={{ border: '2px solid transparent', borderRadius: 6, padding: 4, background: '#f6f7f8', cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.1s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#101112' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent' }}
                >
                  <img
                    src={`${asset.url}?w=300&h=200&fit=crop&auto=format`}
                    alt={asset.originalFilename || ''}
                    style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block', borderRadius: 4 }}
                  />
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {asset.originalFilename || asset._id}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function ImageDialog({ onConfirm, onCancel, sanityClient }) {
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  const [uploading, setUploading] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)
  const fileRef = useRef(null)

  const handleFile = async (file) => {
    if (!file || !sanityClient) return
    setUploading(true)
    try {
      const asset = await sanityClient.assets.upload('image', file, { filename: file.name })
      setUrl(asset.url)
    } catch (err) {
      console.error('Image upload failed:', err)
    } finally {
      setUploading(false)
    }
  }

  const inputStyle = {
    flex: 1,
    minWidth: 120,
    padding: '4px 8px',
    border: '1px solid #c8cdd3',
    borderRadius: 3,
    fontSize: 13,
    outline: 'none',
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderBottom: '1px solid #dce1e7', background: '#f0f2f5', flexWrap: 'wrap' }}>
        <input type="url" placeholder="Image URL…" value={url} autoFocus onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && url && onConfirm(url, alt)} style={{ ...inputStyle, minWidth: 200 }} />
        <input type="text" placeholder="Alt text" value={alt} onChange={(e) => setAlt(e.target.value)} style={inputStyle} />
        {sanityClient && (
          <>
            <button type="button" onClick={() => setShowBrowser(true)} style={{ padding: '4px 10px', borderRadius: 3, border: '1px solid #c8cdd3', background: '#fff', fontSize: 12, cursor: 'pointer', color: '#54595f' }}>
              Browse library
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files?.[0])} />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} style={{ padding: '4px 10px', borderRadius: 3, border: '1px solid #c8cdd3', background: '#fff', fontSize: 12, cursor: 'pointer', color: '#54595f', opacity: uploading ? 0.6 : 1 }}>
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
          </>
        )}
        <button type="button" onClick={() => url && onConfirm(url, alt)} style={{ padding: '4px 12px', borderRadius: 3, border: 'none', background: '#101112', color: '#fff', fontSize: 12, cursor: 'pointer' }}>Insert</button>
        <button type="button" onClick={onCancel} style={{ padding: '4px 12px', borderRadius: 3, border: '1px solid #c8cdd3', background: 'transparent', fontSize: 12, cursor: 'pointer', color: '#54595f' }}>Cancel</button>
      </div>
      {showBrowser && (
        <SanityImageBrowser
          sanityClient={sanityClient}
          onSelect={(imgUrl, filename) => { setUrl(imgUrl); setAlt(prev => prev || filename); setShowBrowser(false) }}
          onCancel={() => setShowBrowser(false)}
        />
      )}
    </>
  )
}

// --- StyledParagraphNode ---
class StyledParagraphNode extends ParagraphNode {
  __inlineStyle

  static getType() { return 'styled-paragraph' }

  static clone(node) {
    const n = new StyledParagraphNode(node.__key)
    n.__inlineStyle = node.__inlineStyle
    return n
  }

  constructor(key) {
    super(key)
    this.__inlineStyle = ''
  }

  createDOM(config) {
    const dom = super.createDOM(config)
    if (this.__inlineStyle) dom.setAttribute('style', this.__inlineStyle)
    return dom
  }

  updateDOM(prevNode, dom, config) {
    const result = super.updateDOM(prevNode, dom, config)
    if (prevNode.__inlineStyle !== this.__inlineStyle) {
      if (this.__inlineStyle) dom.setAttribute('style', this.__inlineStyle)
      else dom.removeAttribute('style')
    }
    return result
  }

  exportDOM(editor) {
    const { element } = super.exportDOM(editor)
    if (this.__inlineStyle) element.setAttribute('style', this.__inlineStyle)
    return { element }
  }

  static importDOM() {
    return {
      p: (domNode) => {
        if (!domNode.getAttribute('style')) return null
        return {
          conversion: (node) => {
            const styledNode = new StyledParagraphNode()
            styledNode.__inlineStyle = node.getAttribute('style') || ''
            return { node: styledNode }
          },
          priority: 1,
        }
      },
    }
  }

  static importJSON(data) {
    const node = new StyledParagraphNode()
    node.__inlineStyle = data.inlineStyle || ''
    return node
  }

  exportJSON() {
    return { ...super.exportJSON(), type: 'styled-paragraph', version: 1, inlineStyle: this.__inlineStyle }
  }
}

const IconExpand = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
  </svg>
)
const IconCollapse = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
  </svg>
)
const IconSource = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
)
const IconPreview = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
)

// --- Constants ---
const BLOCK_TYPES = [
  { label: 'Normal', value: 'paragraph' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Heading 3', value: 'h3' },
  { label: 'Heading 4', value: 'h4' },
]

// --- Style helpers ---
const btnStyle = (active) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 28,
  height: 28,
  padding: '0 5px',
  border: 'none',
  borderRadius: 3,
  cursor: 'pointer',
  background: active ? 'rgba(0,0,0,0.09)' : 'transparent',
  color: active ? '#101112' : '#54595f',
  fontSize: 12,
  lineHeight: 1,
  transition: 'background 0.1s, color 0.1s',
})

const dividerStyle = {
  width: 1,
  height: 18,
  background: '#dce1e7',
  margin: '0 4px',
  flexShrink: 0,
}

// --- ToolbarPlugin ---
function ToolbarPlugin({ showSource, onOpenSource, onCloseSource, onFormatSource, isFullscreen, onToggleFullscreen, sanityClient, showPreview, onTogglePreview }) {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [elementFormat, setElementFormat] = useState('')
  const [blockType, setBlockType] = useState('paragraph')
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) return

        const cell = $findMatchingParent(selection.anchor.getNode(), $isTableCellNode)
        const inHeaderCell = cell !== null && cell.getHeaderStyles() !== 0
        // th is naturally bold; IS_BOLD in a header cell means "override bold off"
        setIsBold(inHeaderCell ? !selection.hasFormat('bold') : selection.hasFormat('bold'))
        setIsItalic(selection.hasFormat('italic'))
        setIsUnderline(selection.hasFormat('underline'))

        const anchorNode = selection.anchor.getNode()
        const element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow()

        setElementFormat('getFormatType' in element ? (element.getFormatType()) : '')

        if ($isHeadingNode(element)) {
          setBlockType(element.getTag())
        } else {
          setBlockType('paragraph')
        }

        const parent = anchorNode.getParent()
        setIsLink($isLinkNode(anchorNode) || $isLinkNode(parent))
      })
    })
  }, [editor])

  const applyBlockType = (value) => {
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return
      if (value === 'paragraph') {
        $setBlocksType(selection, () => $createParagraphNode())
      } else {
        $setBlocksType(selection, () => $createHeadingNode(value))
      }
    })
  }

  const handleLinkConfirm = (url, newTab) => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url,
      ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }),
    })
    setShowLinkDialog(false)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: '4px 8px',
          borderBottom: '1px solid #dce1e7',
          flexWrap: 'wrap',
          background: '#f6f7f8',
        }}
      >
        {!showSource && !showPreview && (
          <>
            {/* Block type dropdown */}
            <select
              value={blockType}
              onChange={(e) => applyBlockType(e.target.value)}
              style={{
                height: 28,
                padding: '0 28px 0 8px',
                border: '1px solid #dce1e7',
                borderRadius: 3,
                background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z\' fill=\'%2354595f\'/%3E%3C/svg%3E") no-repeat right 6px center',
                backgroundSize: '14px 14px',
                color: '#101112',
                fontSize: 12,
                cursor: 'pointer',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
              }}
            >
              {BLOCK_TYPES.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <div style={dividerStyle} />

            {/* Decorators */}
            <button type="button" title="Bold" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold') }} style={{ ...btnStyle(isBold), fontWeight: 700 }}>B</button>
            <button type="button" title="Italic" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic') }} style={{ ...btnStyle(isItalic), fontStyle: 'italic' }}>I</button>
            <button type="button" title="Underline" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline') }} style={{ ...btnStyle(isUnderline), textDecoration: 'underline' }}>U</button>

            <div style={dividerStyle} />

            {/* Alignment */}
            <button type="button" title="Align left" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left') }} style={btnStyle(elementFormat === 'left' || elementFormat === '')}><IconAlignLeft /></button>
            <button type="button" title="Align center" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center') }} style={btnStyle(elementFormat === 'center')}><IconAlignCenter /></button>
            <button type="button" title="Align right" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right') }} style={btnStyle(elementFormat === 'right')}><IconAlignRight /></button>

            <div style={dividerStyle} />

            {/* Lists */}
            <button type="button" title="Bullet list" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined) }} style={btnStyle(false)}><IconBulletList /></button>
            <button type="button" title="Numbered list" onMouseDown={(e) => { e.preventDefault(); editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined) }} style={btnStyle(false)}><IconNumberedList /></button>

            <div style={dividerStyle} />

            {/* Link */}
            <button
              type="button"
              title={isLink ? 'Remove link' : 'Add link'}
              onMouseDown={(e) => {
                e.preventDefault()
                if (isLink) {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
                } else {
                  setShowLinkDialog(true)
                }
              }}
              style={btnStyle(isLink)}
            >
              <IconLink />
            </button>

            {/* Image */}
            <button type="button" title="Insert image" onMouseDown={(e) => { e.preventDefault(); setShowImageDialog(true) }} style={btnStyle(false)}>
              <IconImage />
            </button>

            {/* Table */}
            <button
              type="button"
              title="Insert 3×3 table"
              onMouseDown={(e) => {
                e.preventDefault()
                editor.update(
                  () => {
                    const sel = $getSelection()
                    if (!$isRangeSelection(sel)) $getRoot().selectEnd()
                  },
                  {
                    onUpdate: () =>
                      editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: '3', columns: '3' }),
                  },
                )
              }}
              style={btnStyle(false)}
            >
              <IconTable />
            </button>

            <div style={dividerStyle} />
          </>
        )}

        {/* Format button (source mode only) */}
        {showSource && (
          <button
            type="button"
            title="Format HTML"
            onMouseDown={(e) => { e.preventDefault(); onFormatSource() }}
            style={{ ...btnStyle(false), fontSize: 11, padding: '0 8px', gap: 3 }}
          >
            Format
          </button>
        )}

        {/* Fullscreen toggle */}
        <button
          type="button"
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          onMouseDown={(e) => { e.preventDefault(); onToggleFullscreen() }}
          style={btnStyle(isFullscreen)}
        >
          {isFullscreen ? <IconCollapse /> : <IconExpand />}
        </button>

        {/* Preview toggle (not shown in source mode) */}
        {!showSource && (
          <button
            type="button"
            title={showPreview ? 'Back to editor' : 'Preview rendered HTML'}
            onMouseDown={(e) => { e.preventDefault(); onTogglePreview() }}
            style={btnStyle(showPreview)}
          >
            <IconPreview />
          </button>
        )}

        {/* Source toggle */}
        <button
          type="button"
          title={showSource ? 'Apply & back to preview' : 'Edit HTML source'}
          onMouseDown={(e) => {
            e.preventDefault()
            if (showSource) {
              onCloseSource()
            } else {
              const html = editor.getEditorState().read(() => $generateHtmlFromNodes(editor, null))
              onOpenSource(html)
            }
          }}
          style={btnStyle(showSource)}
        >
          <IconSource />
        </button>
      </div>

      {showLinkDialog && (
        <LinkDialog onConfirm={handleLinkConfirm} onCancel={() => setShowLinkDialog(false)} />
      )}
      {showImageDialog && (
        <ImageDialog
          sanityClient={sanityClient}
          onConfirm={(src, alt) => {
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, { src, alt })
            setShowImageDialog(false)
          }}
          onCancel={() => setShowImageDialog(false)}
        />
      )}
    </>
  )
}

// --- LinkDialog ---
function LinkDialog({ onConfirm, onCancel }) {
  const [url, setUrl] = useState('')
  const [newTab, setNewTab] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderBottom: '1px solid #dce1e7',
        background: '#f0f2f5',
        flexWrap: 'wrap',
      }}
    >
      <input
        type="url"
        placeholder="https://..."
        value={url}
        autoFocus
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onConfirm(url, newTab)}
        style={{
          flex: 1,
          minWidth: 200,
          padding: '4px 8px',
          border: '1px solid #c8cdd3',
          borderRadius: 3,
          fontSize: 13,
          outline: 'none',
        }}
      />
      <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#54595f', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        <input type="checkbox" checked={newTab} onChange={(e) => setNewTab(e.target.checked)} />
        New tab
      </label>
      <button
        type="button"
        onClick={() => onConfirm(url, newTab)}
        style={{ padding: '4px 12px', borderRadius: 3, border: 'none', background: '#101112', color: '#fff', fontSize: 12, cursor: 'pointer' }}
      >
        Apply
      </button>
      <button
        type="button"
        onClick={onCancel}
        style={{ padding: '4px 12px', borderRadius: 3, border: '1px solid #c8cdd3', background: 'transparent', fontSize: 12, cursor: 'pointer', color: '#54595f' }}
      >
        Cancel
      </button>
    </div>
  )
}

// --- TableControlsPlugin ---
function TableControlsPlugin() {
  const [editor] = useLexicalComposerContext()
  const [isInTable, setIsInTable] = useState(false)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) { setIsInTable(false); return }
        const cell = $findMatchingParent(selection.anchor.getNode(), $isTableCellNode)
        setIsInTable(cell !== null)
      })
    })
  }, [editor])

  if (!isInTable) return null

  const run = (fn) => editor.update(() => fn())

  const tblBtn = (label, title, fn, danger = false) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); run(fn) }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        height: 26,
        padding: '0 8px',
        border: 'none',
        borderRadius: 3,
        cursor: 'pointer',
        background: danger ? 'rgba(220,38,38,0.08)' : 'rgba(0,0,0,0.05)',
        color: danger ? '#dc2626' : '#54595f',
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '4px 8px',
      borderBottom: '1px solid #dce1e7',
      background: '#f0f4ff',
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 4 }}>Table</span>
      {tblBtn('↑ Row', 'Insert row above', () => $insertTableRowAtSelection(false))}
      {tblBtn('↓ Row', 'Insert row below', () => $insertTableRowAtSelection(true))}
      {tblBtn('✕ Row', 'Delete row', () => $deleteTableRowAtSelection(), true)}
      <div style={{ width: 1, height: 16, background: '#dce1e7', margin: '0 2px' }} />
      {tblBtn('← Col', 'Insert column left', () => $insertTableColumnAtSelection(false))}
      {tblBtn('→ Col', 'Insert column right', () => $insertTableColumnAtSelection(true))}
      {tblBtn('✕ Col', 'Delete column', () => $deleteTableColumnAtSelection(), true)}
    </div>
  )
}

// --- InitialContentPlugin ---
function InitialContentPlugin({ html }) {
  const [editor] = useLexicalComposerContext()
  const initialized = useRef(false)

  useEffect(() => {
    if (!html || initialized.current) return
    initialized.current = true
    editor.update(() => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(html, 'text/html')
      const nodes = $generateNodesFromDOM(editor, dom)
      const root = $getRoot()
      root.clear()
      root.append(...nodes)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

// --- HtmlSyncPlugin ---
function HtmlSyncPlugin({ onHtmlChange, suppressRef }) {
  const [editor] = useLexicalComposerContext()
  const debounceRef = useRef(null)

  const handleChange = useCallback(
    (editorState) => {
      if (suppressRef?.current) return
      const html = editorState.read(() => $generateHtmlFromNodes(editor, null))
      clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        if (suppressRef?.current) return
        onHtmlChange(html)
      }, 500)
    },
    [editor, onHtmlChange, suppressRef],
  )

  return <OnChangePlugin onChange={handleChange} ignoreSelectionChange />
}

// --- SourceApplyPlugin ---
function SourceApplyPlugin({ showSource, sourceHtml }) {
  const [editor] = useLexicalComposerContext()
  const prevRef = useRef(showSource)

  useEffect(() => {
    if (prevRef.current === true && showSource === false) {
      const dom = new DOMParser().parseFromString(sourceHtml, 'text/html')
      stripFormattingWhitespace(dom)
      editor.update(() => {
        const nodes = $generateNodesFromDOM(editor, dom)
        const root = $getRoot()
        root.clear()
        root.append(...nodes)
      })
    }
    prevRef.current = showSource
  }, [showSource, sourceHtml, editor])

  return null
}

// --- Main ---
const tableStyles = `
  .bw-lex table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 8px 0; }
  .bw-lex td, .bw-lex th { border: 1px solid #dce1e7; padding: 6px 10px; min-width: 60px; vertical-align: top; position: relative; }
  .bw-lex th { background: rgba(0,0,0,0.03); }
  .bw-lex td > p, .bw-lex th > p { margin: 0; }
  .bw-lex th strong, .bw-lex th b { font-weight: normal; }
  .bw-lex-underline { text-decoration: underline; }
  .bw-lex strong { font-variation-settings: 'wght' 800; font-weight: 800; }
`

const editorConfig = {
  namespace: 'BushwoodEditor',
  theme: {
    text: {
      underline: 'bw-lex-underline',
    },
  },
  nodes: [ListNode, ListItemNode, LinkNode, TableNode, TableCellNode, TableRowNode, HeadingNode, ImageNode, StyledParagraphNode],
  onError: (error) => console.error('Lexical error:', error),
}

export default function LexicalInput({ value, onChange }) {
  const sanityClient = useClient({ apiVersion: '2024-01-01' })
  const canonicalHtmlRef = useRef(value || '')
  const suppressHtmlSyncRef = useRef(false)
  const handleHtmlChange = useCallback((html) => {
    canonicalHtmlRef.current = html
    onChange(set(html))
  }, [onChange])
  const [showSource, setShowSource] = useState(false)
  const [sourceHtml, setSourceHtml] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [previewHtml, setPreviewHtml] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [paneRect, setPaneRect] = useState(null)
  const containerRef = useRef(null)
  const paneElRef = useRef(null)

  // Keep pane rect in sync with pane size
  useEffect(() => {
    if (!isFullscreen) { setPaneRect(null); paneElRef.current = null; return }
    const pane = containerRef.current?.closest('[data-testid="document-panel-scroller"]')
    if (!pane) return
    paneElRef.current = pane
    const update = () => setPaneRect(pane.getBoundingClientRect())
    update()
    const ro = new ResizeObserver(update)
    ro.observe(pane)
    return () => ro.disconnect()
  }, [isFullscreen])

  useEffect(() => {
    if (!isFullscreen) return
    const onEsc = (e) => { if (e.key === 'Escape') setIsFullscreen(false) }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [isFullscreen])

  const handleOpenSource = useCallback((lexicalHtml) => {
    setSourceHtml(formatHtml(canonicalHtmlRef.current || lexicalHtml))
    setShowSource(true)
  }, [])

  const handleFormatSource = useCallback(() => {
    setSourceHtml(prev => formatHtml(prev))
  }, [])

  const handleCloseSource = useCallback(() => {
    canonicalHtmlRef.current = sourceHtml
    onChange(set(sourceHtml))
    suppressHtmlSyncRef.current = true
    setPreviewHtml(sourceHtml)
    setShowPreview(true)
    setShowSource(false)
    setTimeout(() => { suppressHtmlSyncRef.current = false }, 800)
  }, [sourceHtml, onChange])

  const handleTogglePreview = useCallback(() => {
    if (!showPreview) {
      setPreviewHtml(canonicalHtmlRef.current)
    }
    setShowPreview(p => !p)
  }, [showPreview])

  return (
    <div
      ref={containerRef}
      className="bw-lex"
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #dce1e7',
        borderRadius: isFullscreen ? 0 : 3,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#fff',
        ...(isFullscreen && paneRect && {
          position: 'fixed',
          top: paneRect.top,
          left: paneRect.left,
          width: paneRect.width,
          height: paneRect.height,
          zIndex: 9000,
        }),
      }}
    >
      <style>{tableStyles}</style>
      <LexicalComposer initialConfig={editorConfig}>
        <ToolbarPlugin showSource={showSource} onOpenSource={handleOpenSource} onCloseSource={handleCloseSource} onFormatSource={handleFormatSource} isFullscreen={isFullscreen} onToggleFullscreen={() => setIsFullscreen(f => !f)} sanityClient={sanityClient} showPreview={showPreview} onTogglePreview={handleTogglePreview} />
        {showPreview && (
          <div
            dangerouslySetInnerHTML={{ __html: previewHtml }}
            style={{
              padding: '12px 16px',
              minHeight: isFullscreen ? 0 : 200,
              flex: isFullscreen ? 1 : undefined,
              overflow: isFullscreen ? 'auto' : undefined,
              fontSize: 15,
              lineHeight: 1.65,
              color: '#101112',
            }}
          />
        )}
        <div style={{ position: 'relative', display: (showSource || showPreview) ? 'none' : undefined, flex: isFullscreen ? 1 : undefined, overflow: isFullscreen ? 'auto' : undefined }}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                style={{
                  outline: 'none',
                  padding: '12px 16px',
                  minHeight: isFullscreen ? '100%' : 200,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: '#101112',
                }}
              />
            }
            placeholder={
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 16,
                  color: '#9ca3af',
                  fontSize: 15,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                Start writing...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <TablePlugin />
        <TableControlsPlugin />
        <ImagePlugin sanityClient={sanityClient} />
        {showSource && (
          <textarea
            value={sourceHtml}
            onChange={(e) => setSourceHtml(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              minHeight: isFullscreen ? 0 : 300,
              flex: isFullscreen ? 1 : undefined,
              padding: '12px 16px',
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              fontSize: 12,
              lineHeight: 1.6,
              color: '#101112',
              background: '#f6f7f8',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        )}
        <InitialContentPlugin html={value} />
        <HtmlSyncPlugin onHtmlChange={handleHtmlChange} suppressRef={suppressHtmlSyncRef} />
        <SourceApplyPlugin showSource={showSource} sourceHtml={sourceHtml} />
      </LexicalComposer>
    </div>
  )
}
