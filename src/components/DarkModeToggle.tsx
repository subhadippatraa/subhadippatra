"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function setThemeClass(t: 'light' | 'dark') {
  const root = window.document.documentElement;
  if (t === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

export function DarkModeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = (stored as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    setThemeClass(initial);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeClass(next);
    localStorage.setItem('theme', next);
  }

  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle dark mode"
      whileTap={{ scale: 0.85, rotate: theme === 'dark' ? -30 : 30 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="relative w-9 h-9 inline-flex items-center justify-center rounded-full border border-gray-300/60 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="moon"
            initial={{ y: 10, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="text-base"
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 10, opacity: 0, rotate: 30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.2 }}
            className="text-base"
          >
            ☀️
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
