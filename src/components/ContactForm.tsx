"use client";

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';

const Schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Please write a short message')
});

export function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setErrors({});
    setStatus('loading');
    const data = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || '')
    };
    const parsed = Schema.safeParse(data);
    if (!parsed.success) {
      const e: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (e[i.path[0] as string] = i.message));
      setErrors(e);
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch('https://formspree.io/f/xldlyvyp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(parsed.data)
      });

      if (res.ok) {
        setStatus('success');
        setErrors({});
        formRef.current?.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  const inputClasses = (field: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 outline-none ${
      errors[field]
        ? 'border-red-400 dark:border-red-500 bg-red-50/50 dark:bg-red-900/10'
        : focused === field
        ? 'border-blue-500 dark:border-teal-400 bg-white dark:bg-gray-900 shadow-[0_0_0_3px_rgba(59,130,246,0.1)] dark:shadow-[0_0_0_3px_rgba(45,212,191,0.1)]'
        : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-700'
    }`;

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex flex-col items-center justify-center py-12 gap-4"
        >
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
            className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
          >
            <motion.svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-emerald-600 dark:text-emerald-400"
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Message Sent!
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Thanks! I&apos;ll get back to you shortly.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => setStatus('idle')}
            className="mt-2 text-sm font-medium text-blue-600 dark:text-teal-400 hover:underline"
          >
            Send another message
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          action={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-5 w-full"
        >
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              className={inputClasses('name')}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 mt-1.5 font-medium">{errors.name}</motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className={inputClasses('email')}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</motion.p>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell me about your project..."
              className={`${inputClasses('message')} resize-none`}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-red-500 mt-1.5 font-medium">{errors.message}</motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-7 py-3 text-sm font-semibold tracking-wider uppercase disabled:opacity-60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(15,23,42,0.2)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <span>{status === 'loading' ? 'Sending…' : 'Send message'}</span>
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                </div>
              )}
            </motion.button>
            <AnimatePresence>
              {status === 'error' && (
                <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} role="status" className="text-sm text-red-500 font-medium">
                  Something went wrong. Try again.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
