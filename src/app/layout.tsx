import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/config/site';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Preloader } from '@/components/Preloader';
import { BackToTop } from '@/components/BackToTop';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const ThemeInit = `
(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: { default: SITE.title, template: '%s — ' + SITE.name },
  description: SITE.description,
  openGraph: { type: 'website', title: SITE.title, description: SITE.description, url: SITE.baseUrl, siteName: SITE.name },
  twitter: { card: 'summary_large_image', title: SITE.title, description: SITE.description },
  alternates: { types: { 'application/rss+xml': '/feed.xml' } }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: SITE.name, url: SITE.baseUrl, jobTitle: SITE.role, email: `mailto:${SITE.email}`, sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.twitter, SITE.social.instagram] };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ThemeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 flex flex-col min-h-screen`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-primary text-white px-4 py-2 rounded-lg">Skip to content</a>
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        <Nav />
        <SmoothScroll />
        <main id="main" className="flex-grow z-10 bg-white dark:bg-[#0A0A0A] relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
