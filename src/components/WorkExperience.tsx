  "use client";

import { motion } from 'framer-motion';
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
    website: 'https://www.teyahealth.com/Home'
  }
];

export function WorkExperience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/30 to-blue-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50" />
      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-10 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute bottom-24 right-10 w-80 h-80 bg-blue-200/20 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Work Experience</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and key achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-500" />

          <div className="space-y-8">
            {experience.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {item.icon}
                </div>

                {/* Content card */}
                <div className="flex-1 card bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:border-white/30 dark:hover:border-gray-600/50 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {item.period}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    {/** Company logo */}
                    {/** optional chaining to handle future entries without logo */}
                    {item.logo && (
                      <Image
                        src={item.logo}
                        alt={`${item.company} logo`}
                        width={28}
                        height={28}
                        className="rounded"
                      />
                    )}
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {item.website ? (
                        <Link
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {item.company}
                        </Link>
                      ) : (
                        item.company
                      )}
                    </h4>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-blue-500 mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
