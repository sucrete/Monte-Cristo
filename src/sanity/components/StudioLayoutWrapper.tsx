import { useEffect } from 'react'

const DEFAULTS: Record<string, string[]> = {
  'bulk-actions-table-events-selected-columns': ['title', 'start'],
}

export function StudioLayoutWrapper({ renderDefault, ...props }: any) {
  useEffect(() => {
    for (const [key, value] of Object.entries(DEFAULTS)) {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(value))
      }
    }
  }, [])

  return renderDefault(props)
}
