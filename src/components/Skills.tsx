"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useState, useRef, useEffect, MouseEvent } from 'react';

type Proficiency = 'Expert' | 'Advanced' | 'Intermediate';

type Skill = {
  name: string;
  proficiency: Proficiency;
  level: number;
};

type SkillCategory = {
  name: string;
  emoji: string;
  description: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    emoji: '⚡',
    description: 'Core programming languages and query languages',
    skills: [
      { name: 'C#', proficiency: 'Expert', level: 90 },
      { name: 'Java', proficiency: 'Expert', level: 90 },
      { name: 'C++', proficiency: 'Advanced', level: 80 },
      { name: 'SQL', proficiency: 'Expert', level: 90 },
      { name: 'JavaScript', proficiency: 'Advanced', level: 85 }
    ]
  },
  {
    name: 'Frameworks & Libraries',
    emoji: '🧩',
    description: 'Frontend and backend frameworks used in projects',
    skills: [
      { name: '.NET Core', proficiency: 'Expert', level: 90 },
      { name: 'Spring Boot', proficiency: 'Expert', level: 90 },
      { name: 'React', proficiency: 'Advanced', level: 85 },
      { name: 'Entity Framework', proficiency: 'Advanced', level: 85 },
      { name: 'Hibernate', proficiency: 'Advanced', level: 80 }
    ]
  },
  {
    name: 'Backend & Databases',
    emoji: '🗄️',
    description: 'Server-side development and data storage',
    skills: [
      { name: 'SQL Server', proficiency: 'Expert', level: 90 },
      { name: 'PostgreSQL', proficiency: 'Advanced', level: 85 },
      { name: 'MongoDB', proficiency: 'Intermediate', level: 75 },
      { name: 'Redis', proficiency: 'Advanced', level: 85 },
      { name: 'Apache Kafka', proficiency: 'Advanced', level: 80 }
    ]
  },
  {
    name: 'Tools & Platforms',
    emoji: '🚀',
    description: 'Productivity, collaboration, and deployment tools',
    skills: [
      { name: 'Docker', proficiency: 'Advanced', level: 85 },
      { name: 'Git & GitHub', proficiency: 'Expert', level: 95 },
      { name: 'Azure DevOps', proficiency: 'Advanced', level: 80 },
      { name: 'Swagger', proficiency: 'Expert', level: 90 },
      { name: 'Postman', proficiency: 'Expert', level: 90 }
    ]
  }
];

const getBarGradient = (proficiency: string) => {
  switch (proficiency) {
    case 'Expert':
      return 'from-emerald-500 via-teal-400 to-cyan-400';
    case 'Advanced':
      return 'from-blue-500 via-indigo-400 to-violet-400';
    case 'Intermediate':
      return 'from-amber-500 via-orange-400 to-yellow-400';
    default:
      return 'from-gray-500 to-gray-400';
  }
};

const getProficiencyDot = (proficiency: string) => {
  switch (proficiency) {
    case 'Expert':
      return 'bg-emerald-500';
    case 'Advanced':
      return 'bg-blue-500';
    case 'Intermediate':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
};

// Map of skill names to Simple Icons slug for logo rendering
const skillIconMap: Record<string, string> = {
  'Java': 'openjdk', 'TypeScript': 'typescript', 'JavaScript': 'javascript',
  'Python': 'python', 'SQL': 'mysql', 'C': 'c', 'C#': 'csharp', 'C++': 'cplusplus',
  'React': 'react', 'Next.js': 'nextdotjs', 'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer', '.NET Core': 'dotnet', 'Spring Boot': 'springboot',
  'Express.js': 'express', 'Node.js': 'nodedotjs', 'REST APIs': 'swagger',
  'MySQL': 'mysql', 'PostgreSQL': 'postgresql', 'MongoDB': 'mongodb',
  'SQL Server': 'microsoftsqlserver', 'Redis': 'redis', 'Apache Kafka': 'apachekafka',
  'Entity Framework': 'dotnet', 'Hibernate': 'hibernate', 'Git & GitHub': 'github',
  'Docker': 'docker', 'Jira': 'jira', 'Postman': 'postman',
  'Azure DevOps': 'azuredevops', 'Swagger': 'swagger', 'Vercel/Netlify': 'vercel'
};

/* ─── Animated Counter ─── */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref} className="tabular-nums">{display}%</span>;
}

/* ─── Skill Icon ─── */
function SkillIcon({ name }: { name: string }) {
  const [imgError, setImgError] = useState(false);
  const [slugIndex, setSlugIndex] = useState(0);
  const initials = name.split(/\s|\+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  const baseSlug = skillIconMap[name];
  const slugCandidates = name === 'C#' ? ['csharp', 'dotnet'] : baseSlug ? [baseSlug] : [];
  const activeSlug = slugCandidates[slugIndex];
  const showIcon = !!activeSlug && !imgError;
  const handleImgError = () => {
    if (slugIndex < slugCandidates.length - 1) setSlugIndex((i) => i + 1);
    else setImgError(true);
  };

  return (
    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/80 dark:border-gray-700/80 flex items-center justify-center shadow-sm group-hover/item:shadow-md transition-shadow duration-300">
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {showIcon ? (
          <>
            <img src={`https://cdn.simpleicons.org/${activeSlug}/0f172a`} alt={`${name} logo`}
              className="w-5 h-5 opacity-90 dark:hidden" loading="lazy" referrerPolicy="no-referrer" onError={handleImgError} />
            <img src={`https://cdn.simpleicons.org/${activeSlug}/ffffff`} alt={`${name} logo`}
              className="w-5 h-5 opacity-90 hidden dark:block" loading="lazy" referrerPolicy="no-referrer" onError={handleImgError} />
          </>
        ) : (
          <span className="text-gray-600 dark:text-gray-300 text-xs font-bold tracking-wide">{initials}</span>
        )}
      </div>
    </div>
  );
}

/* ─── Spotlight Category Card ─── */
function SpotlightCategoryCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
      className={`group/card relative overflow-hidden rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_25px_60px_rgba(59,130,246,0.06)] hover:border-gray-300 dark:hover:border-gray-600 ${className}`}
    >
      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.06),
              transparent 80%
            )
          `,
        }}
      />
      {/* Edge glow border effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.12),
              transparent 60%
            )
          `,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ─── Animated Progress Bar ─── */
function AnimatedProgressBar({ value, proficiency }: { value: number; proficiency: string }) {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-full h-1.5 mt-3 overflow-hidden">
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: `${value}%`, opacity: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={`h-1.5 rounded-full bg-gradient-to-r ${getBarGradient(proficiency)} relative overflow-hidden`}
      >
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </motion.div>
    </div>
  );
}

/* ─── Skill Card ─── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group/item flex flex-col justify-center p-4 bg-gray-50/80 dark:bg-[#0A0A0A]/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_40px_rgba(59,130,246,0.05)] cursor-default"
    >
      <div className="flex items-center gap-3.5">
        <motion.div
          className="shrink-0"
          whileHover={{ rotate: -12, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <SkillIcon name={skill.name} />
        </motion.div>
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-gray-900 dark:text-gray-100 truncate text-sm">
              {skill.name}
            </span>
            <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
              <AnimatedNumber value={skill.level} />
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${getProficiencyDot(skill.proficiency)} animate-pulse`} />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-500">
              {skill.proficiency}
            </span>
          </div>
        </div>
      </div>

      <AnimatedProgressBar value={skill.level} proficiency={skill.proficiency} />
    </motion.div>
  );
}

/* ─── Main Skills Section ─── */
export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "60%"]);

  // Total skills count animation
  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <section ref={containerRef} id="skills" className="py-12 md:py-24 relative bg-transparent overflow-hidden">
      {/* Ghost Typography Watermark */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-center pointer-events-none overflow-hidden z-0">
        <motion.span
          style={{ y, willChange: 'transform' }}
          className="text-[14vw] leading-none pt-4 font-black tracking-tighter text-gray-900/[0.04] dark:text-white/[0.03] whitespace-nowrap select-none origin-top transform-gpu"
        >
          EXPERTISE
        </motion.span>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating geometric accents */}
      <div className="absolute top-1/3 left-[8%] w-20 h-20 border-2 border-blue-500/10 dark:border-blue-400/10 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-[12%] w-12 h-12 border-2 border-purple-500/10 dark:border-purple-400/10 rounded-lg animate-bounce-slow pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Infinite Scrolling Marquee */}
      <div className="relative z-10 w-full overflow-hidden border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0A0A0A] py-6 mb-16 md:mb-24 flex items-center">
        <div className="animate-marquee flex whitespace-nowrap min-w-max">
          <div className="flex gap-8 md:gap-16 items-center px-4 md:px-8 text-2xl md:text-5xl font-black text-gray-300 dark:text-gray-800 uppercase tracking-widest select-none">
            <span>REACT</span><span>•</span>
            <span>NEXT.JS</span><span>•</span>
            <span>TYPESCRIPT</span><span>•</span>
            <span>C# & .NET</span><span>•</span>
            <span>SQL SERVER</span><span>•</span>
            <span>TAILWIND</span><span>•</span>
            <span>DOCKER</span><span>•</span>
            <span>SPRING BOOT</span><span>•</span>
            <span>JAVA</span><span>•</span>
            <span>KAFKA</span><span>•</span>

            <span>REACT</span><span>•</span>
            <span>NEXT.JS</span><span>•</span>
            <span>TYPESCRIPT</span><span>•</span>
            <span>C# & .NET</span><span>•</span>
            <span>SQL SERVER</span><span>•</span>
            <span>TAILWIND</span><span>•</span>
            <span>DOCKER</span><span>•</span>
            <span>SPRING BOOT</span><span>•</span>
            <span>JAVA</span><span>•</span>
            <span>KAFKA</span><span>•</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Section header with stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Technical Expertise</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Comprehensive skill set spanning modern web development, from frontend frameworks to backend architecture
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-gray-900 dark:text-white">
                <AnimatedNumber value={totalSkills} />
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1 font-semibold">Technologies</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-gray-900 dark:text-white">
                <AnimatedNumber value={4} />
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1 font-semibold">Domains</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                <AnimatedNumber value={85} />
              </div>
              <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1 font-semibold">Avg Proficiency</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid lg:grid-cols-2 gap-8 relative z-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: categoryIndex * 0.12 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <SpotlightCategoryCard className="h-full">
                <div className="p-8">
                  {/* Category Header */}
                  <div className="mb-8 flex items-start gap-4">
                    <motion.div
                      className="text-3xl"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {category.emoji}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{category.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={skillIndex + categoryIndex * 2}
                      />
                    ))}
                  </div>
                </div>
              </SpotlightCategoryCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
