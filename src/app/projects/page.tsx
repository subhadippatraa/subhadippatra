import { ProjectGrid } from '@/components/ProjectGrid';
import { PROJECTS } from '@/mocks/data/projects';

export const metadata = {
  title: 'Projects',
  description: 'Selected work: shipped products and case studies.'
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
        A selection of recent work. Each project includes a brief case study covering problem, approach, implementation, and outcomes.
      </p>
      <div className="mt-8">
        <ProjectGrid projects={PROJECTS} />
      </div>
    </section>
  );
}

