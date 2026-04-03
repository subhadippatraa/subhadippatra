"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { POSTS } from '@/mocks/data/blog';

/* ─── Spotlight Blog Card ─── */
function SpotlightBlogCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_60px_rgba(59,130,246,0.06)] hover:border-gray-300 dark:hover:border-gray-600 ${className}`}
    >
      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.06), transparent 80%)
          `,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
}

export function Blog() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "50%"]);

  return (
    <section ref={containerRef} id="blog" className="py-24 relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Ghost Typography */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-center pointer-events-none overflow-hidden z-0">
        <motion.span
          style={{ y, willChange: 'transform' }}
          className="text-[14vw] leading-none pt-4 font-black tracking-tighter text-gray-900/[0.04] dark:text-white/[0.03] whitespace-nowrap select-none origin-top transform-gpu"
        >
          WRITING
        </motion.span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Latest Blog Posts</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts on engineering, design systems, and performance optimization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <SpotlightBlogCard className="h-full">
                <div className="p-6 flex flex-col h-full">
                  {/* Reading time badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] uppercase tracking-wider font-bold">
                      {Math.ceil((post.summary?.length || 100) / 50)} min read
                    </span>
                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <span className="text-[11px] text-gray-400 dark:text-gray-600 font-medium">Article</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  {/* Read more button */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/btn relative mt-auto self-start inline-flex items-center gap-3 px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-xs transition-all duration-300 hover:pr-4 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <span>Read more</span>
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center transform group-hover/btn:scale-110 group-hover/btn:-rotate-12 transition-transform duration-300 shadow-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                    </div>
                  </Link>
                </div>
              </SpotlightBlogCard>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 px-6 py-2.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-full font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            View All Posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
