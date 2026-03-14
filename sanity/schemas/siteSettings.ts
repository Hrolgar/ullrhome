import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Default: #6366f1',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'string',
      description: 'Default: #8b5cf6',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Default: #f59e0b',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Default: #0f172a',
    }),
    defineField({
      name: 'surfaceColor',
      title: 'Surface Color',
      type: 'string',
      description: 'Default: #1e293b',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Default: #f8fafc',
    }),
    defineField({
      name: 'textSecondaryColor',
      title: 'Text Secondary Color',
      type: 'string',
      description: 'Default: #94a3b8',
    }),
  ],
})
