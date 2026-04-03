"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MouseEvent, useState, useEffect } from 'react';
import { SITE } from '@/config/site';
import { GitHubIcon, LinkedInIcon, XIcon } from './icons/Social';
import profileImg from '@/../public/profile.jpg';

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

/* ─── Typing Effect ─── */
function TypeWriter({ words, className }: { words: string[]; className?: string }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-blue-600 dark:text-teal-400"
      >
        |
      </motion.span>
    </span>
  );
}

/* ─── Scroll Down Indicator ─── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600 font-medium">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center pt-1.5"
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-600"
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Multi-speed parallax layers
  const bgGlowY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const shape1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-100px']);
  const shape2Y = useTransform(scrollYProgress, [0, 1], ['0px', '-150px']);
  const shape3Y = useTransform(scrollYProgress, [0, 1], ['0px', '-50px']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '-80px']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Parallax background glow */}
      <motion.div
        style={{ y: isMobile ? 0 : bgGlowY, willChange: 'transform' }}
        className="absolute left-0 right-0 top-0 -z-20 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-[0.08] blur-[120px] transform-gpu"
      />

      {/* Parallax Background Geometrics — pushed to edges to prevent overlapping content */}
      <motion.div
        aria-hidden="true"
        style={{ y: isMobile ? 0 : shape1Y }}
        className="absolute top-1/4 left-[5%] w-24 h-24 border-2 border-blue-500/5 rounded-2xl dark:border-teal-400/5 transform-gpu"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: isMobile ? 0 : shape2Y }}
        className="absolute bottom-1/3 right-[5%] w-20 h-20 bg-gradient-to-tr from-pink-500/5 to-orange-400/5 rounded-full blur-[2px] transform-gpu"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: isMobile ? 0 : shape3Y }}
        className="absolute top-[15%] right-[10%] transform-gpu"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="stroke-indigo-500/[0.05] dark:stroke-indigo-400/[0.05]" strokeWidth="1.5">
          <polygon points="12 2 22 20 2 20" />
        </svg>
      </motion.div>

      {/* Content layer — drifts up + fades on scroll */}
      <motion.div
        style={{ y: isMobile ? 0 : contentY, opacity: isMobile ? 1 : contentOpacity, willChange: 'transform, opacity' }}
        className="relative z-20 mx-auto max-w-6xl px-4 pt-4 pb-32 text-center transform-gpu"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {/* Avatar with animated ring */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="relative mx-auto w-32 h-32 mb-8"
          >
            <div className="relative w-32 h-32 rounded-full ring-4 ring-offset-4 ring-offset-white dark:ring-offset-[#0A0A0A] ring-blue-500/20 overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-md">
              <Image src={profileImg} alt={`${SITE.name} photo`} fill className="object-cover" priority sizes="(max-width: 128px) 100vw, 128px" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-gray-900 dark:text-white"
          >
            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 dark:from-teal-400 dark:via-blue-500 dark:to-purple-500 inline-block hover:scale-105 transition-transform duration-300">{SITE.name.split(' ')[0]}</span><span className="animate-pulse text-blue-600 dark:text-teal-400">.</span>
          </motion.h1>

          {/* Typing tagline */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium h-8"
          >
            <TypeWriter
              words={[
                "Building reliable software that moves metrics",
                "Crafting high-performance backend systems",
                "Turning complex problems into elegant code",
                "Full-Stack Developer & System Architect"
              ]}
            />
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-wrap justify-center items-center gap-4 mb-10"
          >
            <Magnetic>
              <Link href={SITE.social.github} className="block text-gray-500 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-300" aria-label="GitHub">
                <GitHubIcon width={22} height={22} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href={SITE.social.linkedin} className="block text-gray-500 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <LinkedInIcon width={22} height={22} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href={SITE.social.twitter} className="block text-gray-500 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-300" aria-label="X / Twitter">
                <XIcon width={22} height={22} />
              </Link>
            </Magnetic>
            {SITE.social.leetcode && (
              <Magnetic>
                <Link href={SITE.social.leetcode} className="block text-gray-500 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-300" aria-label="LeetCode">
                  <img src="https://cdn.simpleicons.org/leetcode/6b7280" alt="LeetCode" className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity" loading="lazy" referrerPolicy="no-referrer" />
                </Link>
              </Magnetic>
            )}
            {SITE.social.gfg && (
              <Magnetic>
                <Link href={SITE.social.gfg} className="block text-gray-500 hover:text-gray-900 dark:hover:text-white hover:scale-110 transition-all duration-300" aria-label="GeeksforGeeks">
                  <img src="https://cdn.simpleicons.org/geeksforgeeks/0F9D58" alt="GeeksforGeeks" className="w-5 h-5 dark:hidden" loading="lazy" referrerPolicy="no-referrer" />
                  <img src="https://cdn.simpleicons.org/geeksforgeeks/FFFFFF" alt="GeeksforGeeks" className="w-5 h-5 hidden dark:inline-block" loading="lazy" referrerPolicy="no-referrer" />
                </Link>
              </Magnetic>
            )}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Magnetic>
              <Link
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <span>Download Resume</span>
                <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"></path><path d="M19 12l-7 7-7-7"></path></svg>
                </div>
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:shadow-[0_0_30px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <span>Get In Touch</span>
                <div className="w-6 h-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </div>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity: scrollIndicatorOpacity }}>
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
