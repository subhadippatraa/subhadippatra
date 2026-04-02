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
      { name: 'C#', proficiency: 'Expert', level: 90 },
      { name: 'Java', proficiency: 'Expert', level: 90 },
      { name: 'C++', proficiency: 'Advanced', level: 80 },
      { name: 'SQL', proficiency: 'Expert', level: 90 },
      { name: 'JavaScript', proficiency: 'Advanced', level: 85 }
    ]
  },
  {
    name: 'Frameworks & Libraries',
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
  'C++': 'cplusplus',
  'React': 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
  'Framer Motion': 'framer',
  '.NET Core': 'dotnet',
  'Spring Boot': 'springboot',
  'Express.js': 'express',
  'Node.js': 'nodedotjs',
  'REST APIs': 'swagger',
  'MySQL': 'mysql',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'SQL Server': 'microsoftsqlserver',
  'Redis': 'redis',
  'Apache Kafka': 'apachekafka',
  'Entity Framework': 'dotnet',
  'Hibernate': 'hibernate',
  'Git & GitHub': 'github',
  'Docker': 'docker',
  'Jira': 'jira',
  'Postman': 'postman',
  'Azure DevOps': 'azuredevops',
  'Swagger': 'swagger',
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

function ProgressBar({ value, name }: { value: number; name: string }) {
  return (
    <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-1.5 mt-3 overflow-hidden backdrop-blur-sm shadow-inner group-hover/item:bg-gray-300/50 dark:group-hover/item:bg-gray-600/50 transition-colors duration-300">
      <div 
        className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 relative"
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 w-full h-full bg-white/20 animate-pulse mix-blend-overlay"></div>
      </div>
    </div>
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

        <div className="grid lg:grid-cols-2 gap-8 relative z-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="relative group"
            >
              {/* Glass card background */}
              <div className="h-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/40 dark:border-white/10 hover:border-white/60 dark:hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                
                {/* Decorative header blur */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-teal-400/20 blur-2xl rounded-full pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />
                
                <div className="mb-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight">{category.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/item flex flex-col justify-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-white/50 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-4">
                        <div className="shrink-0 transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-3 shadow-sm rounded-full">
                          <SkillIcon name={skill.name} />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-gray-900 dark:text-gray-100 truncate text-sm">
                              {skill.name}
                            </span>
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider font-bold mt-0.5 w-max ${getProficiencyColor(skill.proficiency).replace('bg-', 'text-').replace('text-', '')} opacity-80 group-hover/item:opacity-100 transition-opacity`}>
                            {skill.proficiency}
                          </span>
                        </div>
                      </div>
                      
                      {/* Subdued Progress Bar replacing layout-heavy Radial SVG */}
                      <ProgressBar value={skill.level} name={skill.name} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
