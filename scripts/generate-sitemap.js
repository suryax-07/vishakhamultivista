const fs = require('fs');
const path = require('path');

const appPath = path.resolve(__dirname, '..', 'src', 'App.tsx');
const publicPath = path.resolve(__dirname, '..', 'public');
if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath);

const content = fs.readFileSync(appPath, 'utf8');
const slugRegex = /slug:\s*'([^']+)'/g;
let match;
const slugs = new Set();
while ((match = slugRegex.exec(content)) !== null) {
  slugs.add(match[1]);
}

const pages = ['/', '/products'];
slugs.forEach((s) => pages.push(`/products/${s}`));

const origin = process.env.SITE_ORIGIN || 'https://example.com';
const lastmod = new Date().toISOString();

const urls = pages.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generated with', pages.length, 'pages at', path.join(publicPath, 'sitemap.xml'));
