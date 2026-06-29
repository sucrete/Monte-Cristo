import { schemaTypes } from '@/sanity/schemaTypes';
import { defineConfig, isDev } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { media } from 'sanity-plugin-media';
import { structureHomeLandingPlugin } from 'sanity-plugin-blank-space';

import { deskStructure } from './deskStructure';
import { WelcomePane } from './components/WelcomePane';
import { StudioLayoutWrapper } from './components/StudioLayoutWrapper';

import { resolve } from './presentation/resolve';

import './custom.css';

export default defineConfig({
  name: 'default',
  title: 'Monte Cristo Studio',
  basePath: '/studio',

  studio: {
    components: {
      layout: StudioLayoutWrapper,
    },
  },

  projectId: 'fh8ftg75',
  dataset: 'production',

  plugins: isDev
    ? [
        structureTool({
          title: 'Content',
          structure: deskStructure,
        }),
        structureHomeLandingPlugin({ component: WelcomePane }),
        presentationTool({
          title: 'Visual Editor',
          resolve,
          previewUrl: {
            origin: process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
            previewMode: {
              enable: '/api/draft-mode/enable',
            },
          },
        }),
        visionTool(),
        media(),
      ]
    : [
        structureTool({
          title: 'Content',
          structure: deskStructure,
        }),
        structureHomeLandingPlugin({ component: WelcomePane }),
        presentationTool({
          title: 'Visual Editor',
          resolve,
          previewUrl: {
            origin: process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
            previewMode: {
              enable: '/api/draft-mode/enable',
            },
          },
        }),
        media(),
      ],

  tools: (prev) => prev.filter((t) => t.name !== 'releases'),

  releases: {
    enabled: false,
  },
  tasks: {
    enabled: false,
  },
  scheduledPublishing: {
    enabled: false,
  },
  document: {
    comments: {
      enabled: false,
    },
  },
  schema: {
    types: schemaTypes,
  },
});
