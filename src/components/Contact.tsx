"use client";

import { motion } from 'framer-motion';
import { ContactForm } from './ContactForm';
import { SITE } from '@/config/site';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon } from './icons/Social';

export function Contact() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white/30 to-purple-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50" />
      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 right-12 w-80 h-80 bg-teal-200/20 dark:bg-teal-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute bottom-24 left-12 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Get In Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full"
          >
            <div className="card bg-white/60 dark:bg-gray-900/20 backdrop-blur-xl border border-white/40 dark:border-gray-700/30 text-gray-900 dark:text-gray-100 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send me a message</h3>
              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 h-full"
          >
            {/* Email */}
            <div className="card bg-white/60 dark:bg-gray-900/20 backdrop-blur-xl border border-white/40 dark:border-gray-700/30 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl">
                  ✉️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">Let&apos;s start a conversation</p>
                </div>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {SITE.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="card bg-white/60 dark:bg-gray-900/20 backdrop-blur-xl border border-white/40 dark:border-gray-700/30 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl">
                  🌐
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Social</h3>
                  <p className="text-gray-600 dark:text-gray-300">Connect with me online</p>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href={SITE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <GitHubIcon width={20} height={20} />
                </a>
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <LinkedInIcon width={20} height={20} />
                </a>
                <a
                  href={SITE.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                >
                  <XIcon width={20} height={20} />
                </a>
                {SITE.social.instagram && (
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                  >
                    <InstagramIcon width={20} height={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Resume Download */}
            <div className="card bg-white/60 dark:bg-gray-900/20 backdrop-blur-xl border border-white/40 dark:border-gray-700/30 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl">
                  📄
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Resume</h3>
                  <p className="text-gray-600 dark:text-gray-300">Download my latest resume</p>
                </div>
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${SITE.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-semibold"
              >
                📥 Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
