export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Subhadip Patra',
  role: 'Software Developer',
  title: 'Subhadip Patra — Software Developer',
  description:
    'Modern, performant web engineering with a focus on DX, accessibility, and measurable impact.',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  primaryColor: '#2563EB',
  email: 'subhadipuohyd@gmail.com',
  avatar: '/profile.jpg',
  resume: '/SubhadipResume2025.pdf',
  social: {
    github: 'https://github.com/subhadippatraa',
    linkedin: 'https://www.linkedin.com/in/subhadippatraa',
    twitter: 'https://twitter.com/subhadippatraa',
    instagram: 'https://instagram.com/subhadippatraa',
    leetcode: 'https://leetcode.com/u/subhadippatraa/',
    gfg: 'https://auth.geeksforgeeks.org/user/subhadippatraa/practice'
  }
} as const;

