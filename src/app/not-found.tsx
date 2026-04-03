"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute left-0 right-0 top-1/4 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-blue-500 opacity-[0.08] blur-[100px]"></div>
      <div className="animate-spin-slow absolute top-[15%] left-[15%] w-20 h-20 border-4 border-blue-500/10 rounded-xl" />
      <div className="animate-bounce-slow absolute bottom-[20%] right-[20%] w-14 h-14 bg-gradient-to-tr from-pink-500/10 to-orange-400/10 rounded-full" />

      <div className="relative z-10 text-center px-4 max-w-lg">
        {/* Glitch-style 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <h1 className="text-[12rem] md:text-[16rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="-mt-16 relative z-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Page not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-7 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-300"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
              Back to Home
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        {/* Fun ASCII art */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-[8px] leading-tight text-gray-400 dark:text-gray-700 font-mono select-none"
        >
{`
    ┌──────────────────────┐
    │  ╭───╮   ╭───╮      │
    │  │ x │   │ x │      │
    │  ╰───╯   ╰───╯      │
    │       ╭───╮          │
    │       │ ~ │          │
    │       ╰───╯          │
    └──────────────────────┘
`}
        </motion.pre>
      </div>
    </section>
  );
}
