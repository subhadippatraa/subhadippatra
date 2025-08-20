type Props = {
  name: string;
  url: string;
  headline?: string;
};

export function SeoJsonLd({ name, url, headline = 'Software Engineer Portfolio' }: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
    sameAs: [
      'https://github.com/YOUR_GITHUB',
      'https://www.linkedin.com/in/YOUR_LINKEDIN'
    ],
    knowsAbout: ['Software Engineering', 'Web Development', 'React', 'TypeScript']
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name: `${name} – ${headline}`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}

