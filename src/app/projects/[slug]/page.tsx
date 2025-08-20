import { CaseStudyLayout } from '@/components/CaseStudyLayout';
import { PROJECTS } from '@/mocks/data/projects';
import { mdToHtml } from '@/lib/markdown';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  return { title: project ? project.title : 'Project' };
}

export default function ProjectCaseStudy({ params }: Props) {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return <CaseStudyLayout title="Project not found">Not found.</CaseStudyLayout>;
  return <CaseStudyLayout title={project.title}>{mdToHtml(project.caseStudy)}</CaseStudyLayout>;
}

