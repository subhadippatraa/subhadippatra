import { redirect } from 'next/navigation';

export const metadata = { title: 'Contact', description: 'Get in touch.' };

export default function ContactPage() {
  // Redirect standalone /contact to the single-page section
  redirect('/#contact');
}

