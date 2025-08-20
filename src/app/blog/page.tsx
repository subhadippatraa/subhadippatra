import Link from 'next/link';
import { POSTS } from '@/mocks/data/blog';

export const metadata = { title: 'Blog', description: 'Writing on engineering, design systems, and performance.' };

export default function BlogPage() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white/30 to-pink-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50" />
      <div className="absolute inset-0 backdrop-blur-3xl" />

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-12 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
        <div className="absolute bottom-24 right-12 w-80 h-80 bg-pink-200/20 dark:bg-pink-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Blog</h1>
        <ul className="mt-8 grid gap-6">
          {POSTS.map((p) => (
            <li
              key={p.slug}
              className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 hover:border-white/30 dark:hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                <Link href={`/blog/${p.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{p.summary}</p>
              <Link
                href={`/blog/${p.slug}`}
                className="inline-flex items-center mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

