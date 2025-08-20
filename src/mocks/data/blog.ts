export const POSTS = [
  {
    slug: 'measuring-ux-performance',
    title: 'Measuring UX performance that actually matters',
    summary: 'A practical approach to measuring what users feel, not just what lab tools say.',
    content: `# Measuring UX performance

Ship features that feel fast. This post covers Core Web Vitals, user timing marks, and pragmatic budgets.

## Why UX perf matters
Latency compounds. A few small wins create delighted users.`
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design systems that scale with teams',
    summary: 'Design tokens, component APIs, and processes that scale.',
    content: `# Design systems at scale

Start with tokens, accessibility, and useful docs. Components follow.`
  },
  {
    slug: 'small-bets-architecture',
    title: 'Small bets, big outcomes: architecture that adapts',
    summary: 'Reduce risk by shipping smaller changes behind feature flags.',
    content: `# Small bets

When complexity rises, shrink the bet size. Flags + steady iterations win.`
  }
] as const;

