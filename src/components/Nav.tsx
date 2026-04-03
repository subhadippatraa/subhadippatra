"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeToggle } from './DarkModeToggle';

const links = [
  { href: '#home' as const, label: 'Home' },
  { href: '#skills' as const, label: 'Skills' },
  { href: '#projects' as const, label: 'Projects' },
  { href: '#education' as const, label: 'Education' },
  { href: '#experience' as const, label: 'Experience' },
  { href: '#blog' as const, label: 'Blog' },
  { href: '#contact' as const, label: 'Contact' }
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (typeof window !== 'undefined' && document.getElementById('home')) {
        const sections = ['home', 'skills', 'projects', 'education', 'experience', 'blog', 'contact'];
        const headerOffset = 80;

        let currentSection = 'home';

        if (window.scrollY < 100) {
          currentSection = 'home';
        } else {
          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= headerOffset && rect.bottom > headerOffset) {
                currentSection = sectionId;
                break;
              }
              if (rect.top <= headerOffset) {
                currentSection = sectionId;
              }
            }
          }
        }

        setActiveSection((prevSection) => {
          if (prevSection !== currentSection) {
            if (typeof window !== 'undefined') {
              const newHash = `#${currentSection}`;
              const base = window.location.pathname;
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, '', `${base}${newHash}`);
              }
            }
            return currentSection;
          }
          return prevSection;
        });
      }
    };

    const handleHashChange = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        setActiveSection(id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    handleScroll();
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p.includes('/blog')) { setActiveSection('blog'); return; }
      const match = p.match(/\/(skills|projects|education|experience|contact)\/?$/);
      if (match && match[1]) { setActiveSection(match[1]); return; }
      if (document.getElementById('home')) setActiveSection('home');
    }
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(element, { offset: -50, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        const id = href.substring(1);
        setActiveSection(id);
        if (typeof window !== 'undefined') {
          const newUrl = `${window.location.pathname}${href}`;
          window.history.replaceState(null, '', newUrl);
        }
      }
    }
    setOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return activeSection === href.substring(1);
    }
    return false;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 backdrop-blur border-b transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-white/70 dark:bg-gray-900/60 border-gray-200/50 dark:border-gray-800/50'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-tight text-gray-900 dark:text-white group text-lg">
          Subhadip<motion.span
            className="text-primary inline-block"
            whileHover={{ scale: 1.3, rotate: -10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >.</motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 relative bg-gray-100/60 dark:bg-gray-800/40 rounded-full px-1.5 py-1" aria-label="Primary">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <div key={l.href} className="relative">
                {active && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {l.href.startsWith('#') ? (
                  <button
                    onClick={() => handleNavClick(l.href)}
                    className={`relative z-10 px-3 py-1.5 rounded-full text-[13px] transition-colors duration-200 ${
                      active
                        ? 'text-gray-900 dark:text-white font-semibold'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    href={l.href}
                    className={`relative z-10 px-3 py-1.5 rounded-full text-[13px] transition-colors duration-200 ${
                      active
                        ? 'text-gray-900 dark:text-white font-semibold'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {l.label}
                  </Link>
                )}
              </div>
            );
          })}
          <div className="ml-1.5 pl-1.5 border-l border-gray-200 dark:border-gray-700">
            <DarkModeToggle />
          </div>
        </nav>

        {/* Mobile hamburger with animated icon */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="w-5 h-3.5 flex flex-col justify-between">
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="block w-full h-0.5 bg-current origin-left transition-colors" />
            <motion.span animate={{ opacity: open ? 0 : 1, x: open ? -5 : 0 }} className="block w-full h-0.5 bg-current transition-colors" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="block w-full h-0.5 bg-current origin-left transition-colors" />
          </div>
        </button>
      </div>

      {/* Mobile menu with slide animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 grid gap-1">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {l.href.startsWith('#') ? (
                    <button
                      onClick={() => handleNavClick(l.href)}
                      className={`w-full px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-left transition-colors ${
                        isActive(l.href) ? 'text-primary font-semibold bg-blue-50 dark:bg-blue-900/10' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      href={l.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                        isActive(l.href) ? 'text-primary font-semibold bg-blue-50 dark:bg-blue-900/10' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {l.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <DarkModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
