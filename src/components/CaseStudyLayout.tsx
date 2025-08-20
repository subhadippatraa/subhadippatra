import type { ReactNode } from 'react';

export function CaseStudyLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <div className="prose mt-6">{children}</div>
    </article>
  );
}

