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
      if (pathname === '/') {
        // Home page scroll detection
        const sections = ['home', 'skills', 'projects', 'education', 'experience', 'blog', 'contact'];
        const headerOffset = 100; // approx header height
        const scrollPosition = window.scrollY + headerOffset;

        // Prefer bounding rect for accuracy around section edges
        let found = false;
        for (let i = sections.length - 1; i >= 0; i--) {
          const id = sections[i];
          const section = document.getElementById(id);
          if (!section) continue;
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + section.offsetHeight;
          if (top <= scrollPosition && bottom > scrollPosition) {
            setActiveSection(id);
            found = true;
            break;
          }
        }
        if (!found) {
          // Fallback: last section above current position
          for (let i = sections.length - 1; i >= 0; i--) {
            const id = sections[i];
            const section = document.getElementById(id);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(id);
              break;
            }
          }
        }
      } else if (pathname.startsWith('/blog')) {
        // Blog pages - always highlight blog
        setActiveSection('blog');
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

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Immediately mark active for better UX
        const id = href.substring(1);
        setActiveSection(id);
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
        <Link href="/" className="font-extrabold tracking-tight">
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
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-700"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>☰
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-3 grid gap-1">
            {links.map((l) => (
              l.href.startsWith('#') ? (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href)}
                  className="px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                >
                  {l.label}
                </button>
                              ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
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
