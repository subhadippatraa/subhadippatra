"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { MouseEvent, useRef } from 'react';
import { GitHubIcon } from './icons/Social';

function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const springTiltX = useSpring(tiltX, { stiffness: 400, damping: 30 });
  const springTiltY = useSpring(tiltY, { stiffness: 400, damping: 30 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    // Normalize bounds from -1 to 1 for tilt
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;

    tiltX.set(yPct * -10); // Rotate up/down max 10deg
    tiltY.set(xPct * 10);  // Rotate left/right max 10deg
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <motion.div
      style={{ rotateX: springTiltX, rotateY: springTiltY, transformPerspective: 1200 }}
      whileHover={{ zIndex: 10 }}
      className={`group/spotlight relative overflow-hidden rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Light mode spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover/spotlight:opacity-100 dark:hidden"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.03),
              transparent 80%
            )
          `,
        }}
      />
      {/* Dark mode spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 hidden dark:block group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.05),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

function ParallaxProjectImage({ src, alt }: { src: string, alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax translation: slide from top to bottom slightly as you scroll past
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-gray-100 dark:bg-gray-900 pointer-events-none">
      <motion.div
        style={{ y, top: "-15%", height: "130%" }}
        className="absolute w-full origin-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/spotlight:scale-[1.03]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

const projects = [
  {
    title: 'PayFlow -- Payment Processing Service',
    description:
      'Engineered a Stripe-inspired payment processing API supporting wallet top-ups, peer-to-peer transfers, and merchant payouts with idempotent transaction handling. Implemented double-entry bookkeeping with SQL Server transactions and optimistic concurrency control. Published transaction events to RabbitMQ for async processing.',
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/projects/payflow.png`,
    tags: ['C#', '.NET Core', 'SQL Server', 'RabbitMQ', 'Docker'],
    github: 'https://github.com/subhadippatraa/PayFlow',
    demo: '#',
    featured: true
  },
  {
    title: 'SnapLink -- URL Shortener & Analytics',
    description:
      'Built a high-throughput URL shortening service generating unique short codes via Base62 encoding, handling 1,000+ req/s with Redis as a write-through cache layer. Streamed click events to Apache Kafka for real-time analytics. Implemented token-bucket rate limiting, custom link expiration, and JWT-based auth.',
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/projects/snaplink.png`,
    tags: ['React', 'Java', 'Spring Boot', 'Redis', 'PostgreSQL', 'Kafka'],
    github: 'https://github.com/subhadippatraa/SnapLink',
    demo: '#',
    featured: true
  },
  {
    title: 'BitWise -- Code Learning Platform',
    description:
      'Engineered a comprehensive code learning platform featuring a DSA tracker, coding contests, and curated learning roadmaps. Implemented secure user authentication with Supabase Auth and a fully responsive themeable UI with React and Tailwind CSS.',
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/projects/bitwise.png`,
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    github: 'https://github.com/subhadippatraa/BitWise',
    demo: '#',
    featured: true
  }
];

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "50%"]);

  return (
    <section ref={containerRef} id="projects" className="py-24 relative bg-transparent overflow-hidden">

      {/* Ghost Typography Watermark with True Parallax Physics */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-center pointer-events-none overflow-hidden z-0">
        <motion.span
          style={{ y, willChange: 'transform' }}
          className="text-[14vw] leading-none pt-4 font-black tracking-tighter text-gray-900/[0.04] dark:text-white/[0.03] whitespace-nowrap select-none origin-top transform-gpu"
        >
          PROJECTS
        </motion.span>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
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
              <SpotlightCard className="h-full">
                {/* Project image */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-900 pointer-events-none">
                  <ParallaxProjectImage src={project.image} alt={project.title} />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/30 transition-colors group-hover/spotlight:bg-transparent z-10" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm overflow-hidden group-hover/spotlight:-translate-y-1 transition-transform duration-500">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        key={tag}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-md text-[11px] font-medium tracking-wide cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <GitHubIcon width={16} height={16} />
                      Source
                    </Link>
                    {/* <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center px-3 py-2 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                      Live Demo
                    </Link> */}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* View all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mt-12"
        >
          <Link
            href="https://github.com/subhadippatraa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <GitHubIcon width={16} height={16} />
            View All on GitHub
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
