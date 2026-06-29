import { useRef, useState } from 'react'
import { Button, Flex, Box } from '@sanity/ui'
import { FormatContext } from './FormatContext'

export function HtmlFieldWrapper(props) {
  const formatRef = useRef(null)
  const [formatting, setFormatting] = useState(false)

  async function handleFormat() {
    if (!formatRef.current) return
    setFormatting(true)
    await formatRef.current()
    setFormatting(false)
  }

  return (
    <FormatContext.Provider value={{ formatRef, setFormatting }}>
      <div style={{ position: 'relative' }}>
        {props.renderDefault(props)}
        <div style={{ position: 'absolute', top: '.5rem', right: '2rem' }}>
          <Button
            text={formatting ? '…' : 'Format'}
            mode="ghost"
            fontSize={0}
            padding={2}
            disabled={formatting}
            onClick={handleFormat}
          />
        </div>
      </div>
    </FormatContext.Provider>
  )
}
