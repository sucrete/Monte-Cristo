import { useCallback } from 'react'
import { set } from 'sanity'
import { Button, Flex, Stack, TextInput, Text, Card } from '@sanity/ui'

const genKey = () => Math.random().toString(36).slice(2, 9)

export default function TableInput({ value, onChange }) {
  const rows = value?.rows ?? []
  const colCount = rows.length > 0 ? Math.max(...rows.map(r => r.cells?.length ?? 0)) : 0

  const updateRows = useCallback((newRows) => {
    onChange(set({ ...(value ?? {}), rows: newRows }))
  }, [value, onChange])

  const handleCellChange = (rowIdx, colIdx, text) => {
    const newRows = rows.map((row, ri) => {
      if (ri !== rowIdx) return row
      const cells = [...(row.cells ?? [])]
      cells[colIdx] = text
      return { ...row, cells }
    })
    updateRows(newRows)
  }

  const addRow = () => {
    const cols = Math.max(colCount, 1)
    updateRows([...rows, { _key: genKey(), _type: 'tableRow', cells: Array(cols).fill('') }])
  }

  const addColumn = () => {
    updateRows(rows.map(row => ({ ...row, cells: [...(row.cells ?? []), ''] })))
  }

  const removeRow = (idx) => {
    updateRows(rows.filter((_, i) => i !== idx))
  }

  const removeCol = (ci) => {
    updateRows(rows.map(row => ({ ...row, cells: (row.cells ?? []).filter((_, i) => i !== ci) })))
  }

  return (
    <Stack space={4}>
      {rows.length === 0 ? (
        <Card padding={4} radius={2} border tone="transparent">
          <Text size={1} muted>No rows yet — add a row to start building your table.</Text>
        </Card>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: 32 }} />
                {Array.from({ length: colCount }).map((_, ci) => (
                  <th key={ci} style={{ padding: '4px 4px 8px', textAlign: 'center', minWidth: 160 }}>
                    <Button
                      text="Remove col"
                      mode="ghost"
                      tone="critical"
                      fontSize={0}
                      padding={2}
                      onClick={() => removeCol(ci)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={row._key ?? ri}
                  style={{ backgroundColor: ri === 0 ? 'rgba(0,0,0,0.04)' : 'transparent' }}
                >
                  <td style={{ padding: 4, textAlign: 'center', verticalAlign: 'middle' }}>
                    <Button
                      text="−"
                      mode="ghost"
                      tone="critical"
                      fontSize={0}
                      padding={2}
                      onClick={() => removeRow(ri)}
                    />
                  </td>
                  {Array.from({ length: colCount }).map((_, ci) => (
                    <td
                      key={ci}
                      style={{ padding: 4, border: '1px solid var(--card-border-color, #e0e0e0)' }}
                    >
                      <TextInput
                        value={row.cells?.[ci] ?? ''}
                        onChange={(e) => handleCellChange(ri, ci, e.currentTarget.value)}
                        style={{ fontFamily: 'monospace', fontSize: 13 }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Flex gap={2}>
        <Button text="+ Add Row" mode="ghost" fontSize={1} padding={2} onClick={addRow} />
        {colCount > 0 && (
          <Button text="+ Add Column" mode="ghost" fontSize={1} padding={2} onClick={addColumn} />
        )}
      </Flex>

      {rows.length > 0 && (
        <Text size={0} muted>The first row is treated as the header.</Text>
      )}
    </Stack>
  )
}
