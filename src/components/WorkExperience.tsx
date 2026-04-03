"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import teyaLogo from '@/../public/teyahealth-logo.png';

const experience = [
  {
    title: 'Full-Stack Developer Intern',
    company: 'TeyaHealth',
    period: 'Jan 2025 – Present',
    description:
      'Building an internal Data Ingestion platform in C# and ASP.NET Core with role-based access control and optimized bulk export APIs.',
    achievements: [
      'Reduced large dataset export times from minutes to under 10 seconds, increasing overall throughput by ~35%.',
      'Implemented detailed audit logging for secure documentation using Serilog and Elasticsearch (view/update/lock/delete).',
      'Developed end-to-end deployment workflows with automated configuration for low-downtime releases.'
    ],
    icon: '💼',
    logo: teyaLogo,
    website: 'https://www.teyahealth.com/Home',
    color: 'from-teal-500 to-emerald-500',
    tags: ['C#', '.NET Core', 'SQL Server', 'Serilog', 'Azure']
  }
];

/* ─── Magnetic Hover ─── */
function MagneticDot({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.1 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left - width / 2) * 0.35);
    y.set((clientY - top - height / 2) * 0.35);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function WorkExperience() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "50%"]);

  return (
    <section ref={containerRef} id="experience" className="py-24 relative bg-transparent overflow-hidden">

      {/* Ghost Typography Watermark */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-center pointer-events-none overflow-hidden z-0">
        <motion.span
          style={{ y, willChange: 'transform' }}
          className="text-[14vw] leading-none pt-4 font-black tracking-tighter text-gray-900/[0.04] dark:text-white/[0.03] whitespace-nowrap select-none origin-top transform-gpu"
        >
          EXPERIENCE
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Work Experience</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and key achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[31px] md:left-8 top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-teal-500 via-emerald-400 to-cyan-500 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[30%] bg-gradient-to-b from-transparent via-white to-transparent blur-[2px] mix-blend-overlay animate-[shoot_4s_ease-in-out_infinite]" />
          </div>

          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                style={{ willChange: 'transform, opacity' }}
                className="relative flex items-start gap-6 md:gap-8 group"
              >
                {/* Magnetic timeline dot */}
                <MagneticDot className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-xl shadow-lg ring-4 ring-white dark:ring-gray-950 cursor-pointer`}
                  >
                    <span className="drop-shadow-sm">{item.icon}</span>
                  </motion.div>
                </MagneticDot>

                {/* Content card */}
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_50px_rgba(59,130,246,0.05)] hover:border-gray-300 dark:hover:border-gray-600 rounded-2xl p-6 md:p-8 relative overflow-hidden"
                >
                  {/* Hover gradient accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* "Currently Active" pulse badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-full"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400">Current</span>
                  </motion.div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 pr-24">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 mb-1">
                    {item.logo && (
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Image src={item.logo} alt={`${item.company} logo`} width={28} height={28} className="rounded shadow-sm" />
                      </motion.div>
                    )}
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {item.website ? (
                        <Link
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 inline-flex items-center gap-1"
                        >
                          {item.company}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-60 transition-opacity"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
                        </Link>
                      ) : item.company}
                    </h4>
                  </div>

                  <span className="inline-block text-sm text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full mb-4">
                    {item.period}
                  </span>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Achievements with staggered entrance */}
                  <div className="space-y-3 mb-6">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <span className="w-4 h-px bg-gradient-to-r from-teal-500 to-emerald-500" />
                      Key Highlights
                    </h5>
                    <ul className="space-y-2.5">
                      {item.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                          className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 flex-shrink-0" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        whileHover={{ scale: 1.08, y: -1 }}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-[11px] font-medium tracking-wide cursor-default hover:border-teal-300 dark:hover:border-teal-700 transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
