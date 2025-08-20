import type { Metadata } from 'next';
import './globals.css';
import { SITE } from '@/config/site';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
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
      <body className={inter.className}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-primary text-white px-4 py-2 rounded-lg">Skip to content</a>
        <Nav />
        <SmoothScroll />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

