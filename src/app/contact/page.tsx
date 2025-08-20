import { ContactForm } from '@/components/ContactForm';

export const metadata = { title: 'Contact', description: 'Get in touch.' };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">Have a question or want to work together? Send a message.</p>
      <div className="mt-6">
        <ContactForm />
      </div>
    </section>
  );
}

