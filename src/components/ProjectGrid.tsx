import { ProjectCard } from './ProjectCard';
import type { Project } from './ProjectCard';

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}

