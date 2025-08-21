import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-balanced py-24 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-4 text-text-secondary">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="mt-8 inline-block underline">Go home</Link>
    </section>
  );
}

