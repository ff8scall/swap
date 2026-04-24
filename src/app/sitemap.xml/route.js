import ingredientsData from '@/lib/data/ingredients';

export async function GET() {
  const baseUrl = 'https://swap.lego-sia.com';
  const lastMod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/explore</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/docs</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.6</priority>
  </url>
  ${ingredientsData.ingredients.map(ing => `
  <url>
    <loc>${baseUrl}/explore/${ing.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
