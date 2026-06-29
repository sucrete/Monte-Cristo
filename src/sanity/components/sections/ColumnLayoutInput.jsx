import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { set } from 'sanity'
import TinyMCEInput from '../TinyMCEInput'

// ─── Entrance animations (injected once, shared with SectionPickerInput) ─────
;(function injectModalAnims() {
  if (typeof document === 'undefined') return
  let s = document.getElementById('bw-modal-anims')
  if (!s) { s = document.createElement('style'); s.id = 'bw-modal-anims'; document.head.appendChild(s) }
  s.textContent = [
    '@keyframes bwBdIn{from{opacity:0}to{opacity:1}}',
    '@keyframes bwMdIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}',
  ].join('')
})()

// ─── Column config per schema type ────────────────────────────────────────────
const COLUMN_CONFIGS = {
  sectionSingleColumn:      [{ name: 'col1', label: 'Column 1', flex: 1 }],
  sectionTwoColumn:         [{ name: 'col1', label: 'Column 1', flex: 1 }, { name: 'col2', label: 'Column 2', flex: 1 }],
  sectionOneThirdTwoThirds: [{ name: 'col1', label: 'Column 1 · 33', flex: 1 }, { name: 'col2', label: 'Column 2 · 66', flex: 2 }],
  sectionTwoThirdsOneThird: [{ name: 'col1', label: 'Column 1 · 66', flex: 2 }, { name: 'col2', label: 'Column 2 · 33', flex: 1 }],
  sectionThreeColumn:       [{ name: 'col1', label: 'Column 1', flex: 1 }, { name: 'col2', label: 'Column 2', flex: 1 }, { name: 'col3', label: 'Column 3', flex: 1 }],
  sectionFourColumn:        [{ name: 'col1', label: 'Column 1', flex: 1 }, { name: 'col2', label: 'Column 2', flex: 1 }, { name: 'col3', label: 'Column 3', flex: 1 }, { name: 'col4', label: 'Column 4', flex: 1 }],
}

const LAYOUT_LABELS = {
  sectionSingleColumn: '1 Column',
  sectionTwoColumn: '2 Column',
  sectionOneThirdTwoThirds: '33 + 66',
  sectionTwoThirdsOneThird: '66 + 33',
  sectionThreeColumn: '3 Column',
  sectionFourColumn: '4 Column',
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const SHADOW = '0 0 0 0.03125rem rgba(114,120,146,0.3),0 0.4375rem 0.5rem -0.25rem rgba(114,120,146,0.1),0 0.75rem 1.0625rem 0.125rem rgba(114,120,146,0.07),0 0.3125rem 1.375rem 0.25rem rgba(114,120,146,0.06)'

const modalShell = {
  background: '#fff', borderRadius: 10, width: '92%', maxWidth: 780,
  maxHeight: '88vh', display: 'flex', flexDirection: 'column',
  boxShadow: SHADOW, overflow: 'hidden',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  animation: 'bwMdIn 200ms cubic-bezier(.16,1,.3,1) forwards',
}

const closeBtnStyle = {
  border: 'none', background: 'none', cursor: 'pointer',
  color: '#6b7280', lineHeight: 1, padding: '4px', borderRadius: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

const CloseIcon = () => (
  <svg data-sanity-icon="close" width="21" height="21" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 7L7 18M7 7L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)

// ─── Shared pane rect hook ────────────────────────────────────────────────────
function usePaneRect() {
  const [paneRect, setPaneRect] = useState(null)
  useEffect(() => {
    const pane = document.querySelector('[data-testid="document-panel-scroller"]')
    if (!pane) return
    setPaneRect(pane.getBoundingClientRect())
    const ro = new ResizeObserver(() => setPaneRect(pane.getBoundingClientRect()))
    ro.observe(pane)
    return () => ro.disconnect()
  }, [])
  return paneRect
}

function backdropStyle(zIndex, paneRect) {
  return {
    ...(paneRect
      ? { position: 'fixed', top: paneRect.top, left: paneRect.left, width: paneRect.width, height: paneRect.height }
      : { position: 'fixed', inset: 0 }),
    zIndex,
    background: 'rgba(227,228,232,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    animation: 'bwBdIn 180ms ease forwards',
  }
}

// ─── Column editor modal (TinyMCE) ────────────────────────────────────────────
function ColumnEditorModal({ column, value, onChange, onClose, onBack }) {
  const paneRect = usePaneRect()
  const [editorFullscreen, setEditorFullscreen] = useState(false)

  const shellStyle = editorFullscreen
    ? { ...modalShell, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', maxWidth: 'none', maxHeight: 'none', borderRadius: 0, animation: 'none' }
    : { ...modalShell, maxWidth: 1000, height: '88vh', animation: 'bwBdIn 200ms ease forwards' }

  return createPortal(
    <div onMouseDown={(e) => e.target === e.currentTarget && onClose()} style={backdropStyle(999995, paneRect)}>
      <div style={shellStyle}>
        <div style={{
          padding: '12px 18px', borderBottom: '1px solid #e8eaed',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {onBack && (
              <button
                onClick={onBack}
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: '#6b7280', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
              >
                ← Back
              </button>
            )}
            {onBack && <span style={{ color: '#d1d5db' }}>|</span>}
            <span style={{ fontWeight: 600, fontSize: 14, color: '#101112' }}>{column.label}</span>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><CloseIcon /></button>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '16px' }}>
          <TinyMCEInput value={value} onChange={onChange} fill onFullscreenChange={setEditorFullscreen} />
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Layout input — renders as a custom portal modal over Sanity's dialog ────
export function ColumnLayoutInput(props) {
  const containerRef = useRef(null)
  const [activeCol, setActiveCol] = useState(null)
  const [hoveredCol, setHoveredCol] = useState(null)
  const paneRect = usePaneRect()

  // Hide Sanity's dialog card while our custom modal is mounted
  useEffect(() => {
    const dialog = containerRef.current?.closest('[data-ui="DialogCard"]')
    if (!dialog) return
    const prev = dialog.style.visibility
    dialog.style.visibility = 'hidden'
    return () => { dialog.style.visibility = prev }
  }, [])

  // Programmatically close Sanity's underlying dialog
  const handleClose = () => {
    const dialog = containerRef.current?.closest('[data-ui="DialogCard"]')
    const btn = dialog?.querySelector('button[aria-label="Close dialog"]')
    btn?.click()
  }

  const typeName = props.schemaType?.name ?? ''
  const columns = COLUMN_CONFIGS[typeName] ?? []
  const value = props.value ?? {}

  const handleColChange = (colName) => (patch) => {
    if (patch?.value !== undefined) {
      props.onChange(set(patch.value, [colName]))
    }
  }

  const activeColumn = columns.find(c => c.name === activeCol)

  return (
    <>
      {/* Anchor inside Sanity's dialog DOM — used to traverse up to the close button */}
      <div ref={containerRef} style={{ display: 'none' }} />

      {createPortal(
        <div onMouseDown={(e) => e.target === e.currentTarget && handleClose()} style={backdropStyle(999990, paneRect)}>
          <div style={modalShell}>

            {/* Header */}
            <div style={{
              padding: '14px 20px', borderBottom: '1px solid #e8eaed',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontWeight: 600, fontSize: 15, color: '#101112' }}>
                {LAYOUT_LABELS[typeName] ?? typeName}
              </span>
              <button onClick={handleClose} style={closeBtnStyle}><CloseIcon /></button>
            </div>

            {/* Column cards */}
            <div style={{ overflowY: 'auto', padding: '20px 20px 28px' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                {columns.map((col) => {
                  const hasContent = Boolean(value[col.name])
                  const isHovered = hoveredCol === col.name
                  return (
                    <div
                      key={col.name}
                      onClick={() => setActiveCol(col.name)}
                      onMouseEnter={() => setHoveredCol(col.name)}
                      onMouseLeave={() => setHoveredCol(null)}
                      style={{
                        flex: col.flex, borderRadius: 8,
                        border: isHovered ? '2px solid #93c5fd' : '2px solid #e2e8f0',
                        background: isHovered ? '#eff6ff' : '#fafafa',
                        padding: '20px 16px', cursor: 'pointer',
                        transition: 'all 0.12s', minHeight: 90,
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 6,
                      }}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: isHovered ? '#dbeafe' : '#f0f2f5',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.12s',
                      }}>
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke={isHovered ? '#3b82f6' : '#9ca3af'} strokeWidth="1.5" strokeLinecap="round">
                          <rect x="2" y="2" width="12" height="12" rx="2" />
                          <line x1="2" y1="6" x2="14" y2="6" />
                          <line x1="5" y1="9" x2="11" y2="9" />
                          <line x1="5" y1="11.5" x2="9" y2="11.5" />
                        </svg>
                      </div>
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        color: isHovered ? '#1d4ed8' : '#374151',
                        textAlign: 'center', lineHeight: 1.3,
                      }}>{col.label}</span>
                      <span style={{ fontSize: 11, color: hasContent ? '#16a34a' : '#9ca3af' }}>
                        {hasContent ? '● Has content' : 'Click to edit'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {activeCol && activeColumn && (
        <ColumnEditorModal
          column={activeColumn}
          value={value[activeCol] ?? ''}
          onChange={handleColChange(activeCol)}
          onBack={() => setActiveCol(null)}
          onClose={handleClose}
        />
      )}
    </>
  )
}
