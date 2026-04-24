import ingredientsData from '@/lib/data/ingredients';

export async function GET() {
  const baseUrl = 'https://swap.lego-sia.com';
  const lastMod = new Date().toUTCString();

  const items = ingredientsData.ingredients.map(ing => `
    <item>
      <title><![CDATA[How to Substitute ${ing.name.en} | ${ing.name.ko}]]></title>
      <link>${baseUrl}/explore/${ing.id}</link>
      <guid>${baseUrl}/explore/${ing.id}</guid>
      <pubDate>${lastMod}</pubDate>
      <description><![CDATA[${ing.description.en}]]></description>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/svg">
  <channel>
    <title>Global Ingredient Swap | Culinary Science</title>
    <link>${baseUrl}</link>
    <description>Scientifically accurate ingredient substitutes for global recipes.</description>
    <language>en</language>
    <lastBuildDate>${lastMod}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
