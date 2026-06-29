import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { insert, set } from 'sanity'
import { Stack } from '@sanity/ui'
import {
  GridFourIcon, MegaphoneIcon, ChartBarIcon, QuotesIcon, UsersIcon, BuildingsIcon,
  ArrowsSplitIcon, ImageIcon, ImagesIcon, ActivityIcon, HashIcon, UserIcon, CalendarIcon, BookOpenIcon,
} from '@phosphor-icons/react'
import TinyMCEInput from '../TinyMCEInput'

// ─── Layout SVGs ──────────────────────────────────────────────────────────────
const LayoutSvg = ({ children, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
    <svg viewBox="0 0 80 52" width="80" height="52" style={{ display: 'block' }}>
      {children}
    </svg>
    <span style={{ fontSize: 11, color: '#54595f', fontFamily: 'system-ui, sans-serif' }}>{label}</span>
  </div>
)

const LAYOUTS = [
  {
    type: 'sectionSingleColumn', label: '1 Column',
    svg: <LayoutSvg label="1 Column"><rect x="4" y="4" width="72" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /></LayoutSvg>,
  },
  {
    type: 'sectionTwoColumn', label: '2 Column',
    svg: <LayoutSvg label="2 Column"><rect x="4" y="4" width="34" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="42" y="4" width="34" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /></LayoutSvg>,
  },
  {
    type: 'sectionOneThirdTwoThirds', label: '33 + 66',
    svg: <LayoutSvg label="33 + 66"><rect x="4" y="4" width="22" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="30" y="4" width="46" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /></LayoutSvg>,
  },
  {
    type: 'sectionTwoThirdsOneThird', label: '66 + 33',
    svg: <LayoutSvg label="66 + 33"><rect x="4" y="4" width="46" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="54" y="4" width="22" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /></LayoutSvg>,
  },
  {
    type: 'sectionThreeColumn', label: '3 Column',
    svg: <LayoutSvg label="3 Column"><rect x="4" y="4" width="21" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="29" y="4" width="22" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="55" y="4" width="21" height="44" rx="5" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /></LayoutSvg>,
  },
  {
    type: 'sectionFourColumn', label: '4 Column',
    svg: <LayoutSvg label="4 Column"><rect x="4" y="4" width="14" height="44" rx="4" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="22" y="4" width="14" height="44" rx="4" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="40" y="4" width="14" height="44" rx="4" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /><rect x="58" y="4" width="14" height="44" rx="4" fill="#93c5fd" fillOpacity=".25" stroke="#93c5fd" strokeWidth="1.5" /></LayoutSvg>,
  },
]

const COLUMN_CONFIGS = {
  sectionSingleColumn:      [{ name: 'col1', label: 'Column 1', flex: 1 }],
  sectionTwoColumn:         [{ name: 'col1', label: 'Column 1', flex: 1 }, { name: 'col2', label: 'Column 2', flex: 1 }],
  sectionOneThirdTwoThirds: [{ name: 'col1', label: 'Column 1 · 33', flex: 1 }, { name: 'col2', label: 'Column 2 · 66', flex: 2 }],
  sectionTwoThirdsOneThird: [{ name: 'col1', label: 'Column 1 · 66', flex: 2 }, { name: 'col2', label: 'Column 2 · 33', flex: 1 }],
  sectionThreeColumn:       [{ name: 'col1', label: 'Column 1', flex: 1 }, { name: 'col2', label: 'Column 2', flex: 1 }, { name: 'col3', label: 'Column 3', flex: 1 }],
  sectionFourColumn:        [{ name: 'col1', label: 'Column 1', flex: 1 }, { name: 'col2', label: 'Column 2', flex: 1 }, { name: 'col3', label: 'Column 3', flex: 1 }, { name: 'col4', label: 'Column 4', flex: 1 }],
}

// ─── Block catalogue ──────────────────────────────────────────────────────────
const BLOCKS = [
  { type: 'sectionFeaturesGrid',    label: 'Features Grid',       Icon: GridFourIcon },
  { type: 'sectionCtaBanner',       label: 'CTA Banner',          Icon: MegaphoneIcon },
  { type: 'sectionStatsNumbers',    label: 'Stats & Numbers',     Icon: ChartBarIcon },
  { type: 'sectionTestimonials',    label: 'Testimonials',        Icon: QuotesIcon },
  { type: 'sectionTeamPeople',      label: 'Team / People',       Icon: UsersIcon },
  { type: 'sectionLogoWall',        label: 'Logo Wall',           Icon: BuildingsIcon },
  { type: 'sectionSplitImageText',  label: 'Split Image + Text',  Icon: ArrowsSplitIcon },
  { type: 'sectionBigPic',          label: 'Big Pic',             Icon: ImageIcon },
  { type: 'sectionGallery',         label: 'Gallery',             Icon: ImagesIcon },
  { type: 'sectionConditionsStatus',label: 'Conditions / Status', Icon: ActivityIcon },
  { type: 'sectionStatCallout',     label: 'Stat Callout',        Icon: HashIcon },
  { type: 'sectionStaffProCard',    label: 'Staff / Pro Card',    Icon: UserIcon },
  { type: 'sectionEventPromo',      label: 'Event Promo',         Icon: CalendarIcon },
  { type: 'sectionLessonPackage',   label: 'Lesson Package',      Icon: BookOpenIcon },
]

// ─── Entrance animations (injected once) ─────────────────────────────────────
;(function injectModalAnims() {
  if (typeof document === 'undefined') return
  let s = document.getElementById('bw-modal-anims')
  if (!s) { s = document.createElement('style'); s.id = 'bw-modal-anims'; document.head.appendChild(s) }
  s.textContent = [
    '@keyframes bwBdIn{from{opacity:0}to{opacity:1}}',
    '@keyframes bwMdIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}',
  ].join('')
})()

// ─── Shared styles ────────────────────────────────────────────────────────────
const modalShell = {
  background: '#fff', borderRadius: 10, width: '92%', maxWidth: 780,
  maxHeight: '88vh', display: 'flex', flexDirection: 'column',
  boxShadow: '0 0 0 0.03125rem rgba(114,120,146,0.3),0 0.4375rem 0.5rem -0.25rem rgba(114,120,146,0.1),0 0.75rem 1.0625rem 0.125rem rgba(114,120,146,0.07),0 0.3125rem 1.375rem 0.25rem rgba(114,120,146,0.06)', overflow: 'hidden',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  animation: 'bwMdIn 200ms cubic-bezier(.16,1,.3,1) forwards',
}
const backdrop = (zIndex = 999990, paneRect = null) => ({
  ...(paneRect
    ? { position: 'fixed', top: paneRect.top, left: paneRect.left, width: paneRect.width, height: paneRect.height }
    : { position: 'fixed', inset: 0 }),
  zIndex,
  background: 'rgba(227,228,232,0.5)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  animation: 'bwBdIn 180ms ease forwards',
})
const closeBtn = {
  border: 'none', background: 'none', cursor: 'pointer',
  color: '#6b7280', lineHeight: 1, padding: '4px', borderRadius: 4,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
const CloseIcon = () => (
  <svg data-sanity-icon="close" width="21" height="21" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 7L7 18M7 7L18 18" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
)
const sectionLabel = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
  color: '#9ca3af', textTransform: 'uppercase', marginBottom: 12,
}

// ─── Column editor modal (TinyMCE) ────────────────────────────────────────────
function ColumnEditorModal({ column, value, onChange, onClose, onBack }) {
  const [paneRect, setPaneRect] = useState(null)
  const [editorFullscreen, setEditorFullscreen] = useState(false)

  useEffect(() => {
    const pane = document.querySelector('[data-testid="document-panel-scroller"]')
    if (!pane) return
    setPaneRect(pane.getBoundingClientRect())
    const ro = new ResizeObserver(() => setPaneRect(pane.getBoundingClientRect()))
    ro.observe(pane)
    return () => ro.disconnect()
  }, [])

  return createPortal(
    <div
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      style={backdrop(999995, paneRect)}
    >
      <div style={editorFullscreen
        ? { ...modalShell, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, width: '100%', maxWidth: 'none', maxHeight: 'none', borderRadius: 0, animation: 'none' }
        : { ...modalShell, maxWidth: 1000, height: '88vh', animation: 'bwBdIn 200ms ease forwards' }
      }>
        <div style={{
          padding: '12px 18px', borderBottom: '1px solid #e8eaed',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={onBack}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, color: '#6b7280', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              ← Back
            </button>
            <span style={{ color: '#d1d5db' }}>|</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#101112' }}>{column.label}</span>
          </div>
          <button onClick={onClose} style={closeBtn}><CloseIcon /></button>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: '16px' }}>
          <TinyMCEInput value={value} onChange={onChange} fill onFullscreenChange={setEditorFullscreen} />
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Picker modal ─────────────────────────────────────────────────────────────
function SectionPickerModal({ pendingLayout, onSelectLayout, onSelectBlock, onColChange, onClose }) {
  const [hovered, setHovered] = useState(null)
  const [hoveredCol, setHoveredCol] = useState(null)
  const [activeCol, setActiveCol] = useState(null)
  const [colData, setColData] = useState({})
  const [paneRect, setPaneRect] = useState(null)

  useEffect(() => {
    const pane = document.querySelector('[data-testid="document-panel-scroller"]')
    if (!pane) return
    setPaneRect(pane.getBoundingClientRect())
    const ro = new ResizeObserver(() => setPaneRect(pane.getBoundingClientRect()))
    ro.observe(pane)
    return () => ro.disconnect()
  }, [])

  const columns = pendingLayout ? (COLUMN_CONFIGS[pendingLayout.type] ?? []) : []
  const activeColumn = columns.find(c => c.name === activeCol)

  const handleColChange = (colName) => (patch) => {
    if (patch?.value !== undefined) {
      setColData(prev => ({ ...prev, [colName]: patch.value }))
      onColChange(colName)(patch)
    }
  }

  return (
    <>
      {createPortal(
        <div
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          style={backdrop(999990, paneRect)}
        >
          <div style={modalShell}>

            {!pendingLayout ? (
              <>
                {/* Header — pick step */}
                <div style={{
                  padding: '14px 20px', borderBottom: '1px solid #e8eaed',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: '#101112' }}>Add a Section</span>
                  <button onClick={onClose} style={closeBtn}><CloseIcon /></button>
                </div>

                {/* Body — pick step */}
                <div style={{ overflowY: 'auto', padding: '20px 20px 28px' }}>
                  <div style={{ marginBottom: 24 }}>
                    <div style={sectionLabel}>Layouts</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
                      {LAYOUTS.map(({ type, svg }) => (
                        <div
                          key={type}
                          onClick={() => onSelectLayout(type)}
                          onMouseEnter={() => setHovered(type)}
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            borderRadius: 8, padding: '12px 8px', cursor: 'pointer',
                            border: hovered === type ? '1.5px solid #93c5fd' : '1.5px solid #e8eaed',
                            background: hovered === type ? '#eff6ff' : '#fafafa',
                            transition: 'all 0.12s', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          {svg}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Blocks — hidden for now, uncomment to re-enable
                  <div>
                    <div style={sectionLabel}>Content Blocks</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
                      {BLOCKS.map(({ type, label, Icon }) => (
                        <div
                          key={type}
                          onClick={() => onSelectBlock(type)}
                          onMouseEnter={() => setHovered(type)}
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            borderRadius: 8, padding: '16px 10px', cursor: 'pointer', textAlign: 'center',
                            border: hovered === type ? '1.5px solid #93c5fd' : '1.5px solid #e8eaed',
                            background: hovered === type ? '#eff6ff' : '#fafafa',
                            transition: 'all 0.12s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                          }}
                        >
                          <div style={{
                            width: 38, height: 38, borderRadius: 8,
                            background: hovered === type ? '#dbeafe' : '#f0f2f5',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.12s',
                          }}>
                            <Icon size={18} color={hovered === type ? '#3b82f6' : '#6b7280'} weight="regular" />
                          </div>
                          <span style={{ fontSize: 11.5, color: '#374151', fontWeight: 500, lineHeight: 1.3 }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  */}
                </div>
              </>
            ) : (
              <>
                {/* Header — column cards step */}
                <div style={{
                  padding: '14px 20px', borderBottom: '1px solid #e8eaed',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontWeight: 600, fontSize: 15, color: '#101112' }}>
                    {LAYOUTS.find(l => l.type === pendingLayout.type)?.label}
                  </span>
                  <button onClick={onClose} style={closeBtn}><CloseIcon /></button>
                </div>

                {/* Body — column cards */}
                <div style={{ overflowY: 'auto', padding: '20px 20px 28px' }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {columns.map((col) => {
                      const hasContent = Boolean(colData[col.name])
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
              </>
            )}

          </div>
        </div>,
        document.body
      )}

      {activeCol && activeColumn && (
        <ColumnEditorModal
          column={activeColumn}
          value={colData[activeCol] ?? ''}
          onChange={handleColChange(activeCol)}
          onBack={() => setActiveCol(null)}
          onClose={onClose}
        />
      )}
    </>
  )
}

// ─── Suppress default "Add item" button ──────────────────────────────────────
function NoAddButton() { return null }

// ─── Main array input ─────────────────────────────────────────────────────────
export function SectionPickerInput(props) {
  const [showPicker, setShowPicker] = useState(false)
  const [pendingLayout, setPendingLayout] = useState(null) // { type, key }
  const { onChange } = props

  const handleSelectLayout = (type) => {
    const key = Math.random().toString(36).slice(2, 10)
    onChange(insert([{ _type: type, _key: key }], 'after', [-1]))
    setPendingLayout({ type, key })
  }

  const handleSelectBlock = (type) => {
    const key = Math.random().toString(36).slice(2, 10)
    onChange(insert([{ _type: type, _key: key }], 'after', [-1]))
    setShowPicker(false)
  }

  const handleColChange = (colName) => (patch) => {
    if (patch?.value !== undefined && pendingLayout) {
      onChange(set(patch.value, [{ _key: pendingLayout.key }, colName]))
    }
  }

  const handleClose = () => {
    setShowPicker(false)
    setPendingLayout(null)
  }

  return (
    <Stack space={2}>
      {props.renderDefault({ ...props, arrayFunctions: NoAddButton })}
      <button
        type="button"
        onClick={() => setShowPicker(true)}
        style={{
          marginTop: 4, width: '100%', padding: '9px 0', borderRadius: 6, cursor: 'pointer',
          border: '1.5px dashed #c8cdd3', background: 'transparent',
          color: '#54595f', fontSize: 13, fontWeight: 500,
          fontFamily: 'system-ui, sans-serif', transition: 'all 0.12s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#93c5fd'; e.currentTarget.style.color = '#2563eb' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#c8cdd3'; e.currentTarget.style.color = '#54595f' }}
      >
        + Add Section
      </button>
      {showPicker && (
        <SectionPickerModal
          pendingLayout={pendingLayout}
          onSelectLayout={handleSelectLayout}
          onSelectBlock={handleSelectBlock}
          onColChange={handleColChange}
          onClose={handleClose}
        />
      )}
    </Stack>
  )
}
