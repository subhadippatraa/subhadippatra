import { SITE } from '@/config/site';

export const metadata = { title: 'About', description: 'Biography, impact, and skills.' };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">About</h1>
      <div className="prose mt-6">
        <p>
          I’m {SITE.name}, a {SITE.role} focused on building software that creates measurable outcomes.
          I collaborate closely with product and design to ship impactful features quickly—without sacrificing quality.
        </p>
        <p>
          Over the past years, I’ve delivered projects across the stack: fast, accessible frontends; robust APIs; and the tooling that connects them.
          I care deeply about developer experience, maintainability, and teaching—mentoring teammates and documenting practices that scale.
        </p>
        <p>
          My core tools include TypeScript, React/Next.js, Tailwind, and Node.js. On teams, you’ll find me driving
          performance strategies, building design systems, and improving CI for predictable delivery. I value clear communication,
          thoughtful architecture, and shipping small, iterative bets that add up to big wins.
        </p>
      </div>
    </section>
  );
}

