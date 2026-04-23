import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  metadataBase: new URL('https://swap.lego-sia.com'),
  title: 'Global Ingredient Swap | The Scientist in Your Kitchen',
  description: 'Scientifically accurate ingredient substitutes for global recipes. Baking, K-Food, and more.',
  keywords: 'cooking, baking, ingredient substitute, K-food, swap, recipe converter',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <LanguageProvider>
          <div id="root-layout">
            {children}
            <div className="disclaimer-global">
              <p>* Disclaimer: Cooking results may vary. Always check for allergen information before swapping ingredients.</p>
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
