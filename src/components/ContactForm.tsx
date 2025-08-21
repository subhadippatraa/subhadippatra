"use client";

import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Please write a short message')
});

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      // Use Formspree for static site contact forms
      const res = await fetch('https://formspree.io/f/xldlyvyp', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(parsed.data)
      });

      setStatus(res.ok ? 'success' : 'error');
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <form action={onSubmit} className="grid gap-4 max-w-xl">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Name</label>
        <input id="name" name="name" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 px-4 py-3" />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Email</label>
        <input id="email" name="email" type="email" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 px-4 py-3" />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">Message</label>
        <textarea id="message" name="message" rows={5} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/60 px-4 py-3" />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center rounded-full bg-primary text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'success' && <p role="status" className="text-sm text-teal-500">Thanks! I’ll reply shortly.</p>}
        {status === 'error' && <p role="status" className="text-sm text-red-500">Something went wrong.</p>}
      </div>
    </form>
  );
}

