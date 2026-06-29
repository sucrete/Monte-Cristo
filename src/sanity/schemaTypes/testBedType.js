import { defineField, defineType } from 'sanity';
import LexicalInput from '../components/LexicalInput';

export default defineType({
  name: 'testBed',
  title: 'Test Bed',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Test Bed' };
    },
  },
  fields: [
    defineField({
      name: 'lexicalContent',
      title: 'Content',
      type: 'text',
      components: { input: LexicalInput },
    }),
  ],
});
