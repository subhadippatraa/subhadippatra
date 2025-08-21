"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      // Only do scroll detection on home page. Detect home by DOM presence to be basePath-safe.
      if (typeof window !== 'undefined' && document.getElementById('home')) {
        const sections = ['home', 'skills', 'projects', 'education', 'experience', 'blog', 'contact'];
        const headerOffset = 80; // header height
        
        let currentSection = 'home';
        
        // Find the section that's currently in view
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is in viewport (accounting for header)
            if (rect.top <= headerOffset && rect.bottom > headerOffset) {
              currentSection = sectionId;
              break;
            }
            // If we're past this section, it might be the active one
            if (rect.top <= headerOffset) {
              currentSection = sectionId;
            }
          }
        }
        
        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
          // Update URL hash to reflect current section without page navigation
          if (typeof window !== 'undefined') {
            const newHash = `#${currentSection}`;
            const base = window.location.pathname;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, '', `${base}${newHash}`);
            }
          }
        }
      }
    };

    const handleHashChange = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        setActiveSection(id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    handleScroll(); // Check initial position
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  // Handle initial page load for individual section pages
  useEffect(() => {
    // Normalize path independent of basePath by using window.location
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      // Blog section (covers /blog and /blog/*)
      if (p.includes('/blog')) {
        setActiveSection('blog');
        return;
      }
      // Match known section pages at the end of the path
      const match = p.match(/\/(skills|projects|education|experience|contact)\/?$/);
      if (match && match[1]) {
        setActiveSection(match[1]);
        return;
      }
      // Home page when the main sections exist on the DOM
      if (document.getElementById('home')) {
        setActiveSection('home');
      }
    }
  }, [pathname]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Immediately mark active for better UX
        const id = href.substring(1);
        setActiveSection(id);
        // Reflect in URL without triggering navigation
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
      const sectionId = href.substring(1);
      return activeSection === sectionId;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-tight text-gray-900 dark:text-white">
          Subhadip<span className="text-primary">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map((l) => (
            l.href.startsWith('#') ? (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className={`px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive(l.href) ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {l.label}
              </button>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive(l.href) ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {l.label}
              </Link>
            )
          ))}
          <div className="ml-2">
            <DarkModeToggle />
          </div>
        </nav>
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>☰
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="md:hidden block border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-3 grid gap-1">
            {links.map((l) => (
              l.href.startsWith('#') ? (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href)}
                  className={`px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-left ${
                    isActive(l.href) ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {l.label}
                </button>
                              ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-left ${
                      isActive(l.href) ? 'text-primary font-semibold' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {l.label}
                  </Link>
              )
            ))}
            <DarkModeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
