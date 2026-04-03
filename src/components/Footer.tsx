"use client";

import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SITE } from '@/config/site';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon } from './icons/Social';
import { MouseEvent } from 'react';

/* ─── Magnetic Button Wrapper ─── */
function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left - width / 2) * 0.3);
    y.set((clientY - top - height / 2) * 0.3);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-gray-300 py-8 sm:py-10 overflow-hidden w-full border-t border-white/5">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 flex flex-col items-center w-full">

        {/* Massive CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center justify-center border-b border-white/5 pb-8 mb-8"
        >
          <motion.h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-5 text-center text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600"
            whileInView={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Let&apos;s build together.
          </motion.h2>
          <Magnetic>
            <a
              href={`mailto:${SITE.email}`}
              className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 bg-white text-black rounded-full font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span>Start a conversation</span>
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
              </div>
            </a>
          </Magnetic>
        </motion.div>

        {/* Info Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-3"
          >
            <a href="#" className="font-extrabold tracking-tight text-white text-2xl group">
              Subhadip<span className="text-teal-400 group-hover:animate-pulse">.</span>
            </a>
            <p className="text-gray-500 max-w-sm mt-1 text-sm leading-relaxed">
              Software Developer crafting reliable, high-performance systems and beautiful interfaces that move metrics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 md:items-end"
          >
            <h4 className="text-white font-semibold tracking-wide uppercase text-[11px] mb-1">Connect</h4>
            <div className="flex items-center gap-3">
              {[
                { Icon: GitHubIcon, href: SITE.social.github, label: 'GitHub' },
                { Icon: LinkedInIcon, href: SITE.social.linkedin, label: 'LinkedIn' },
                { Icon: XIcon, href: SITE.social.twitter, label: 'X' },
              ].map(({ Icon, href, label }, i) => (
                <Magnetic key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:-translate-y-1 hover:text-white transition-all duration-300 text-gray-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <Icon width={16} height={16} />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-3 md:items-end"
          >
            <h4 className="text-white font-semibold tracking-wide uppercase text-[11px] mb-1">Contact</h4>
            <a
              href={`mailto:${SITE.email}`}
              className="text-gray-400 hover:text-white transition-colors duration-300 text-base font-medium group inline-flex items-center gap-1.5"
            >
              {SITE.email}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg>
            </a>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[13px] text-gray-600">Available for new opportunities</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <div className="w-full flex justify-center items-center border-t border-white/5 pt-6 mt-2 text-[13px] text-gray-600 font-medium">
          <p>© {currentYear} {SITE.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
