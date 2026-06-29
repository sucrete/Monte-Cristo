import { defineField, defineType } from 'sanity';
import { SectionPickerInput } from '../components/sections/SectionPickerInput';
import { ALL_SECTION_TYPES } from './sections/index';

export default defineType({
  name: 'instructors',
  title: 'Home Page',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: ALL_SECTION_TYPES.map((type) => ({ type })),
      components: { input: SectionPickerInput },
    }),
  ],
});
