"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

type Proficiency = 'Expert' | 'Advanced' | 'Intermediate';

type Skill = {
  name: string;
  proficiency: Proficiency;
  level: number; // 0-100 for radial chart
};

type SkillCategory = {
  name: string;
  description: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    description: 'Core programming languages and query languages',
    skills: [
      { name: 'Java', proficiency: 'Advanced', level: 85 },
      { name: 'TypeScript', proficiency: 'Advanced', level: 88 },
      { name: 'JavaScript', proficiency: 'Advanced', level: 90 },
      { name: 'Python', proficiency: 'Intermediate', level: 70 },
      { name: 'SQL', proficiency: 'Advanced', level: 82 },
      { name: 'C', proficiency: 'Intermediate', level: 65 },
      { name: 'C #', proficiency: 'Intermediate', level: 75 }
    ]
  },
  {
    name: 'Frameworks & Libraries',
    description: 'Frontend and backend frameworks used in projects',
    skills: [
      { name: 'React', proficiency: 'Advanced', level: 90 },
      { name: '.Net Core', proficiency: 'Advanced', level: 85 },
      { name: 'Tailwind CSS', proficiency: 'Advanced', level: 88 },
      { name: 'Framer Motion', proficiency: 'Advanced', level: 80 },
      { name: 'LangChain', proficiency: 'Intermediate', level: 70 },
      { name: 'Spring Boot', proficiency: 'Intermediate', level: 70 },
      { name: 'Express.js', proficiency: 'Advanced', level: 80 }
    ]
  },
  {
    name: 'Backend & Databases',
    description: 'Server-side development and data storage',
    skills: [
      { name: 'Node.js', proficiency: 'Advanced', level: 82 },
      { name: 'REST APIs', proficiency: 'Advanced', level: 84 },
      { name: 'MySQL', proficiency: 'Advanced', level: 80 },
      { name: 'PostgreSQL', proficiency: 'Intermediate', level: 68 },
      { name: 'MongoDB', proficiency: 'Intermediate', level: 72 }
    ]
  },
  {
    name: 'Tools & Platforms',
    description: 'Productivity, collaboration, and deployment tools',
    skills: [
      { name: 'Git & GitHub', proficiency: 'Expert', level: 92 },
      { name: 'Docker', proficiency: 'Intermediate', level: 65 },
      { name: 'Jira', proficiency: 'Intermediate', level: 70 },
      { name: 'Postman', proficiency: 'Advanced', level: 80 },
      { name: 'Vercel/Netlify', proficiency: 'Advanced', level: 82 }
    ]
  }
];

const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case 'Expert':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    case 'Advanced':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Intermediate':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

// Map of skill names to Simple Icons slug for logo rendering
const skillIconMap: Record<string, string> = {
  'Java': 'openjdk',
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'Python': 'python',
  'SQL': 'mysql',
  'C': 'c',
  'C#': 'csharp',
  'React': 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer',
  '.Net Core': 'dotnet',
  'Spring Boot': 'springboot',
  'Express.js': 'express',
  'Node.js': 'nodedotjs',
  'REST APIs': 'swagger',
  'MySQL': 'mysql',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'Git & GitHub': 'github',
  'Docker': 'docker',
  'Jira': 'jira',
  'Postman': 'postman',
  'Vercel/Netlify': 'vercel'
};

// Logo circle: tries to show real logo via Simple Icons; falls back to initials
function SkillIcon({ name }: { name: string }) {
  const [imgError, setImgError] = useState(false);
  const [slugIndex, setSlugIndex] = useState(0);
  const initials = name
    .split(/\s|\+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
  const baseSlug = skillIconMap[name];
  const slugCandidates = (() => {
    switch (name) {
      case 'C#':
        return ['csharp', 'dotnet'];
      default:
        return baseSlug ? [baseSlug] : [];
    }
  })();
  const activeSlug = slugCandidates[slugIndex];
  const showIcon = !!activeSlug && !imgError;
  const handleImgError = () => {
    if (slugIndex < slugCandidates.length - 1) {
      setSlugIndex((i) => i + 1);
    } else {
      setImgError(true);
    }
  };
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/70 via-teal-500/70 to-purple-500/70 dark:from-blue-500/40 dark:via-teal-500/40 dark:to-purple-500/40" />
      <div className="absolute inset-0 backdrop-blur-sm" />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {showIcon ? (
          <>
            {/* Light mode: dark icon for contrast */}
            <img
              src={`https://cdn.simpleicons.org/${activeSlug}/0f172a`}
              alt={`${name} logo`}
              className="w-5 h-5 opacity-90 dark:hidden"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImgError}
            />
            {/* Dark mode: white icon */}
            <img
              src={`https://cdn.simpleicons.org/${activeSlug}/ffffff`}
              alt={`${name} logo`}
              className="w-5 h-5 opacity-90 hidden dark:block"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImgError}
            />
          </>
        ) : (
          <span className="text-white text-xs font-bold tracking-wide">{initials}</span>
        )}
      </div>
    </div>
  );
}

// Radial progress ring with neon glow
function RadialProgress({ value }: { value: number }) {
  const size = 44;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * circumference;

  return (
    <svg width={size} height={size} className="drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]">
      <defs>
        <linearGradient id="skillGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        className="text-white/30 dark:text-white/20"
        strokeWidth={stroke}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#skillGrad)"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference - dash}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: circumference - dash }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        className="fill-gray-800 dark:fill-gray-200 text-[10px] font-semibold"
      >
        {clamped}%
      </text>
    </svg>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/30 to-teal-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50" />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-10 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-teal-200/20 dark:bg-teal-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Technical Expertise</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive skill set spanning modern web development, from frontend frameworks to backend architecture
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="relative group"
            >
              {/* Glass card */}
              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 hover:border-white/30 dark:hover:border-gray-600/50 transition-all duration-200 hover:shadow-md hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: skillIndex * 0.05 }}
                      className="group/item flex items-center justify-between py-3 px-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 hover:bg-white/35 dark:hover:bg-gray-800/35 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          initial={{ scale: 0.995, rotate: 0 }}
                          whileHover={{ scale: 1.008, rotate: 0.15 }}
                          transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                          className="shrink-0"
                        >
                          <SkillIcon name={skill.name} />
                        </motion.div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                            {skill.name}
                          </span>
                          <span className={`mt-1 w-fit px-2 py-0.5 rounded-full text-[10px] font-medium ${getProficiencyColor(skill.proficiency)} group-hover/item:brightness-[1.02] transition` }>
                            {skill.proficiency}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="transition-all duration-200 group-hover/item:drop-shadow-[0_0_2px_rgba(20,184,166,0.18)]">
                          <RadialProgress value={skill.level} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-60 transition-opacity duration-400 pointer-events-none blur-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
