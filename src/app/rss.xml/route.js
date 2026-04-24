import ingredientsData from '@/lib/data/ingredients';

export async function GET() {
  const baseUrl = 'https://swap.lego-sia.com';
  const buildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Global Ingredient Swap</title>
    <link>${baseUrl}</link>
    <description>Scientifically accurate ingredient substitutes for global recipes.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    ${ingredientsData.ingredients.slice(0, 20).map(ing => `
    <item>
      <title>${ing.name.en} Substitutes</title>
      <link>${baseUrl}/explore/${ing.id}</link>
      <description>${ing.description.en}</description>
      <guid>${baseUrl}/explore/${ing.id}</guid>
      <pubDate>${buildDate}</pubDate>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
