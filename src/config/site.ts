export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Subhadip Patra',
  role: 'Software Developer',
  title: 'Subhadip Patra — Software Developer',
  description:
    'Modern, performant web engineering with a focus on DX, accessibility, and measurable impact.',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  primaryColor: '#2563EB',
  email: 'you@example.com',
  social: {
    github: 'https://github.com/subhadippatraa',
    linkedin: 'https://www.linkedin.com/in/subhadippatraa',
    twitter: 'https://twitter.com/subhadippatraa',
    instagram: 'https://instagram.com/subhadippatraa'
  }
} as const;

