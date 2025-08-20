"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE } from '@/config/site';
import { GitHubIcon, LinkedInIcon, XIcon } from './icons/Social';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-teal-200 dark:bg-teal-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Avatar */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image src="/avatar.svg" alt={`${SITE.name} avatar`} fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Name and tagline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">
            {SITE.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {SITE.role} • Building reliable software that moves metrics
          </p>

          {/* Social links */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <Link href={SITE.social.github} className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform text-gray-700 dark:text-gray-300">
              <GitHubIcon width={24} height={24} />
            </Link>
            <Link href={SITE.social.linkedin} className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform text-gray-700 dark:text-gray-300">
              <LinkedInIcon width={24} height={24} />
            </Link>
            <Link href={SITE.social.twitter} className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform text-gray-700 dark:text-gray-300">
              <XIcon width={24} height={24} />
            </Link>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/YOUR_NAME_Resume.pdf"
              download
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              📄 Download Resume
            </a>
            <a
              href="#education"
              className="inline-flex items-center px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              🎓 View Education
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              💬 Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
