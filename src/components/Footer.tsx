import Link from 'next/link';
import { SITE } from '@/config/site';
import { GitHubIcon, LinkedInIcon, XIcon, InstagramIcon } from './icons/Social';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <nav className="flex items-center gap-4" aria-label="Social">
          <Link href={SITE.social.github} aria-label="GitHub" className="hover:text-primary">
            <GitHubIcon width={20} height={20} />
          </Link>
          <Link href={SITE.social.linkedin} aria-label="LinkedIn" className="hover:text-primary">
            <LinkedInIcon width={20} height={20} />
          </Link>
          <Link href={SITE.social.twitter} aria-label="X" className="hover:text-primary">
            <XIcon width={20} height={20} />
          </Link>
          {SITE.social.instagram && (
            <Link href={SITE.social.instagram} aria-label="Instagram" className="hover:text-primary">
              <InstagramIcon width={20} height={20} />
            </Link>
          )}
        </nav>
      </div>
    </footer>
  );
}


