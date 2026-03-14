import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Animated Roles',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Roles that rotate in the hero section (e.g. ".NET Developer", "Homelab Enthusiast")',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume File',
      type: 'file',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'profileImage',
    },
  },
})
