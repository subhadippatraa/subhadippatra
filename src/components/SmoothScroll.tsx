'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // Find closest anchor
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      // Only handle same-page hash links
      const href = anchor.getAttribute('href') || '';
      if (!href || !href.startsWith('#')) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      // Smooth scroll with header-safe offset via CSS scroll-margin-top
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update hash without full jump
      if (history.pushState) {
        history.pushState(null, '', href);
      } else {
        location.hash = href;
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
