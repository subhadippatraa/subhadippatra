"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const sections = [
  'home',
  'skills', 
  'projects',
  'education',
  'experience',
  'blog',
  'contact'
];

export function ScrollUrlUpdater() {
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that's most visible
        let mostVisible = entries[0];
        let maxRatio = entries[0].intersectionRatio;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisible = entry;
          }
        });

        // Update URL if section is significantly visible
        if (mostVisible.intersectionRatio > 0.3) {
          const sectionId = mostVisible.target.id;
          const currentPath = window.location.pathname;
          const newPath = `/${sectionId}`;
          
          if (currentPath !== newPath) {
            // Update URL without page reload
            window.history.replaceState(null, '', newPath);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-20% 0px -20% 0px' // Only trigger when section is well within viewport
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [router]);

  return null; // This component doesn't render anything
}
