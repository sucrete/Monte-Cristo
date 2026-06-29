import { defineField, defineType } from 'sanity';
import TinyMCEInput from '../components/TinyMCEInput';

const blogType = defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'coverImage',
    },
  },
  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      components: { input: TinyMCEInput },
    }),
  ],
  orderings: [
    {
      title: 'Date, New → Old',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Date, Old → New',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});

export default blogType;
