"use client";

import { motion } from 'framer-motion';

const education = [
  {
    degree: 'Master of Computer Science',
    institution: 'Stanford University',
    period: '2020 - 2022',
    description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.',
    gpa: '3.9/4.0',
    icon: '🎓'
  },
  {
    degree: 'Bachelor of Computer Science',
    institution: 'University of California, Berkeley',
    period: '2016 - 2020',
    description: 'Major in Computer Science with minor in Mathematics. Dean\'s List recipient.',
    gpa: '3.8/4.0',
    icon: '📚'
  },
  {
    degree: 'High School Diploma',
    institution: 'Tech High School',
    period: '2012 - 2016',
    description: 'Valedictorian. President of Computer Science Club. National Merit Scholar.',
    gpa: '4.0/4.0',
    icon: '🏫'
  }
];

export function Education() {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white/30 to-indigo-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50" />
      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-12 w-80 h-80 bg-pink-200/20 dark:bg-pink-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute bottom-24 right-12 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Education</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My academic journey and achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-teal-500" />

          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
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
                <div className="flex-1 card bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 hover:border-white/30 dark:hover:border-gray-600/50 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {item.period}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {item.institution}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      GPA:
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                      {item.gpa}
                    </span>
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
