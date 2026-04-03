"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ContactForm } from './ContactForm';
import { SITE } from '@/config/site';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon } from './icons/Social';

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "50%"]);

  return (
    <section ref={containerRef} id="contact" className="py-24 relative bg-transparent overflow-hidden">
      {/* Ghost Typography Watermark with True Parallax Physics */}
      <div className="absolute top-0 inset-x-0 flex items-start justify-center pointer-events-none overflow-hidden z-0">
        <motion.span
          style={{ y, willChange: 'transform' }}
          className="text-[14vw] leading-none pt-4 font-black tracking-tighter text-gray-900/[0.04] dark:text-white/[0.03] whitespace-nowrap select-none origin-top transform-gpu"
        >
          CONTACT
        </motion.span>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ willChange: 'transform, opacity' }}
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: 'transform, opacity' }}
            className="h-full"
          >
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-6 md:p-8 text-gray-900 dark:text-gray-100 h-full flex flex-col">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Send a Message</h3>
              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ willChange: 'transform, opacity' }}
            className="space-y-6"
          >
            {/* Email */}
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-6 md:p-8 text-gray-900 dark:text-gray-100 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white text-lg bg-gray-50 dark:bg-gray-900">
                  ✉️
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Let&apos;s start a conversation</p>
                </div>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-medium text-sm mt-4 inline-block break-all"
              >
                {SITE.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-6 md:p-8 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white text-lg bg-gray-50 dark:bg-gray-900">
                  🌐
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Connect with me online</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <GitHubIcon width={18} height={18} />
                </a>
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <LinkedInIcon width={18} height={18} />
                </a>
                <a
                  href={SITE.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <XIcon width={18} height={18} />
                </a>
                {SITE.social.instagram && (
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_20px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <InstagramIcon width={18} height={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Resume Download */}
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl p-6 md:p-8 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-900 dark:text-white text-lg bg-gray-50 dark:bg-gray-900">
                  📄
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Download my latest resume</p>
                </div>
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${SITE.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
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
