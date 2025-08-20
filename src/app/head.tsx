import { SeoJsonLd } from '@/components/SeoJsonLd';

export default function Head() {
  const baseUrl = 'https://your-vercel-domain.vercel.app';
  return (
    <>
      <SeoJsonLd name="YOUR_NAME" url={baseUrl} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}

