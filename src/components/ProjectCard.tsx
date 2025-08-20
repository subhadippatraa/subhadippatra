"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  tags: readonly string[];
  repo: string;
  demo: string;
};

type Props = { project: Project };

export function ProjectCard({ project }: Props) {
  return (
    <motion.article whileHover={{ y: -4 }} className="card overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image src={project.image} alt="" fill />
      </div>
      <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
      <p className="mt-1 text-gray-600 dark:text-gray-300">{project.blurb}</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
        {project.tags.map((t) => (
          <li key={t} className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4">
        <Link href={project.repo} className="text-sm underline text-gray-600 dark:text-gray-300 hover:text-primary" target="_blank" rel="noopener noreferrer">GitHub</Link>
        <Link href={project.demo} className="text-sm underline text-gray-600 dark:text-gray-300 hover:text-primary" target="_blank" rel="noopener noreferrer">Live demo</Link>
        <Link href={`/projects/${project.slug}`} className="text-sm underline text-gray-600 dark:text-gray-300 hover:text-primary">Case study →</Link>
      </div>
    </motion.article>
  );
}

