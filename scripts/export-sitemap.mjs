import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const baseUrl = process.env.SITE_URL || 'https://example.com';
const routes = ['', '/projects', '/about', '/blog', '/contact'];

const items = routes
  .map(
    (path) => `<url>
  <loc>${baseUrl}${path}</loc>
  <changefreq>weekly</changefreq>
  <priority>${path === '' ? '1.0' : '0.7'}</priority>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;

const out = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(out, xml);
console.log('Sitemap exported to', out);

