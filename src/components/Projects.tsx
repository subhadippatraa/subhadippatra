"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GitHubIcon } from './icons/Social';

const projects = [
  {
    title: 'HireSense',
    description:
      'Full‑stack app that ingests resumes, extracts key skills via OpenAI embeddings, and computes match scores against job descriptions. Real‑time filters and ranking with WebSockets.',
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'OpenAI'],
    github: 'https://github.com/subhadippatraa',
    demo: '#',
    featured: true
  },
  {
    title: 'FabricMind: AI‑Driven Retail',
    description:
      'LLM‑powered retail assistant using LangChain to answer natural language queries for inventory, sales, and recommendations. Dynamic SQL generation over MySQL knowledge base.',
    image: 'https://images.unsplash.com/photo-1557825835-70d97c4aa567?q=80&w=1600&auto=format&fit=crop',
    tags: ['LangChain', 'GenAI', 'SQL', 'MySQL'],
    github: 'https://github.com/subhadippatraa',
    demo: '#',
    featured: false
  },
  {
    title: 'Project Nimbus (Demo)',
    description:
      'A placeholder project showcasing the card design. Replace this later with a real project. Includes feature highlights and tech tags.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    tags: ['Tailwind','Java', 'Spring Boot', 'Demo'],
    github: 'https://github.com/subhadippatraa',
    demo: '#',
    featured: false
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white/30 to-blue-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-teal-200/20 dark:bg-teal-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work and technical expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:border-white/30 dark:hover:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-500 hover:-translate-y-2">
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.06] transition-transform duration-500 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <GitHubIcon width={16} height={16} />
                      Code
                    </Link>
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Live Demo
                    </Link>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="https://github.com/subhadippatraa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <GitHubIcon width={20} height={20} />
            View All Projects on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
