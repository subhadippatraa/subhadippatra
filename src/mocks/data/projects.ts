export const PROJECTS = [
  {
    slug: 'alpha-analytics',
    title: 'Alpha Analytics',
    blurb: 'Real-time analytics dashboard with actionable insights.',
    image: '/hero-illustration.svg',
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'Tailwind'],
    repo: 'https://github.com/your-handle/alpha-analytics',
    demo: 'https://demo.example.com/alpha-analytics',
    caseStudy: `# Problem
Many teams lacked visibility into live metrics, slowing decisions.

## Approach
Ship a fast MVP with a clear UX and real-time updates.

## Implementation
- Next.js App Router and server actions
- WebSocket stream for live metrics
- Accessible data viz and keyboard shortcuts

## Outcome
- 30% faster decision cycles
- 20% increase in user engagement
- <200ms P95 interaction latency`
  },
  {
    slug: 'beta-design-system',
    title: 'Beta Design System',
    blurb: 'Scalable design system powering multiple products.',
    image: '/hero-illustration.svg',
    tags: ['React', 'TypeScript', 'Storybook', 'Tokens'],
    repo: 'https://github.com/your-handle/beta-design-system',
    demo: 'https://demo.example.com/beta-design-system',
    caseStudy: `# Problem
Inconsistent UI slowed delivery and degraded UX.

## Approach
Create a token-driven system with documented components.

## Implementation
- Token pipeline (color, spacing, typography)
- Accessible components with tests and a11y checks
- Storybook docs and usage guidelines

## Outcome
- 40% reduction in UI defects
- 25% faster feature delivery
- Cross-app visual consistency`
  },
  {
    slug: 'gamma-perf',
    title: 'Gamma Perf',
    blurb: 'Performance budget and CI monitoring toolkit.',
    image: '/hero-illustration.svg',
    tags: ['Node.js', 'CI', 'Lighthouse', 'DX'],
    repo: 'https://github.com/your-handle/gamma-perf',
    demo: 'https://demo.example.com/gamma-perf',
    caseStudy: `# Problem
Performance regressions slipped through releases.

## Approach
Automate performance checks with budget thresholds.

## Implementation
- CI step running Lighthouse with budgets
- Slack notifications on regressions
- Docs for remediation and ownership

## Outcome
- 35% median LCP improvement
- Regressions caught before prod
- Shared performance culture`
  }
] as const;

