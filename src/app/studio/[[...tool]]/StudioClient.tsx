'use client'

import config from '@/sanity/sanity.config'
import { NextStudio } from 'next-sanity/studio'

export default function StudioClient() {
  return <NextStudio config={config} />
}
