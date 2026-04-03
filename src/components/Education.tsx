"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

const education = [
  {
    degree: "Master's of Computer Application (MCA)",
    institution: 'University of Hyderabad',
    period: 'Aug 2023 – May 2025',
    description: 'Coursework and projects across systems, software engineering, and applied AI/ML. Active in sports and campus activities.',
    grade: 'A+',
    icon: '🎓',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    degree: "Bachelor's of Computer Application (BCA)",
    institution: 'Vidyasagar University',
    period: 'Aug 2019 – May 2022',
    description: 'Foundational CS subjects including programming, databases, OS, and networks. Participated in extracurriculars and volunteering.',
    grade: 'A+',
    icon: '📚',
    color: 'from-purple-500 to-pink-500'
  }
];

/* ─── Magnetic Hover for Timeline Dots ─── */
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

export function Education() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "50%"]);

  return (
    <section ref={containerRef} id="education" className="py-24 relative bg-transparent overflow-hidden">

      {/* Ghost Typography Watermark with True Parallax Physics */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-center pointer-events-none overflow-hidden z-0">
        <motion.span
          style={{ y, willChange: 'transform' }}
          className="text-[14vw] leading-none pt-4 font-black tracking-tighter text-gray-900/[0.04] dark:text-white/[0.03] whitespace-nowrap select-none origin-top transform-gpu"
        >
          EDUCATION
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
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Education</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My academic journey and achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[31px] md:left-8 top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full bg-gradient-to-b from-blue-500 via-teal-400 to-purple-500 shadow-[0_0_15px_rgba(45,212,191,0.5)]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Liquid Energy Spark */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[30%] bg-gradient-to-b from-transparent via-white to-transparent blur-[2px] mix-blend-overlay animate-[shoot_4s_ease-in-out_infinite]" />
            <style>{`
              @keyframes shoot {
                0% { top: -30%; opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
              }
            `}</style>
          </div>

          <div className="space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                style={{ willChange: 'transform, opacity' }}
                className="relative flex items-start gap-6 md:gap-8 group"
              >
                {/* Magnetic timeline dot */}
                <MagneticDot className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
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

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full">
                      {item.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {item.institution}
                  </h4>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Grade:</span>
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1.5 bg-gradient-to-r ${item.color} text-white rounded-lg text-xs font-bold tracking-wide shadow-sm cursor-default`}
                    >
                      {item.grade}
                    </motion.span>
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
