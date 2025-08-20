import { POSTS } from '@/mocks/data/blog';
import { mdToHtml } from '@/lib/markdown';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = POSTS.find((p) => p.slug === params.slug);
  return { title: post ? post.title : 'Blog' };
}

export default function BlogPostPage({ params }: Props) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post)
    return (
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white/30 to-pink-50/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl px-4">Not found</div>
      </section>
    );
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
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h1>
        <div className="prose prose-slate dark:prose-invert mt-6 bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30">
          {mdToHtml(post.content)}
        </div>
      </div>
    </section>
  );
}

