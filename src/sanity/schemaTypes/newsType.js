import {defineField, defineType} from 'sanity'

const newsType = defineType({
  name: 'news',
  title: 'News Item',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(500)
    }),
    defineField({
      name: 'linkQuestion',
      title: 'Link?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'linkDeets',
      title: 'Link Details',
      type: 'linkDetails',
      validation: (rule) =>
        rule.custom((value, context) => {
          const shouldGiveDeets = context.document?.linkQuestion
          // this sort of parent object (the 'event' document) uses context.document? in this context, as opposed to context.parent? perhaps in other use cases
          if (shouldGiveDeets && !value) {
            // if 'linkQuestion' is true AND there is no text ("!value" ie its true there is NO value) the image type is not valid and returns a string ("Link button requires text and url.")
            return 'Link button requires text and url.'
          }
          return true
        }),
      hidden: ({document}) => !document?.linkQuestion,
    }),
  ],

})
export default newsType