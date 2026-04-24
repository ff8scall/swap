import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Inter, Outfit } from 'next/font/google';
import PWARegistration from '@/components/pwa/PWARegistration';
import OfflineBanner from '@/components/pwa/OfflineBanner';
import KitchenTools from '@/components/common/KitchenTools';



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
  manifest: '/manifest.json',
  themeColor: '#10b981',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Swap',
  },
  verification: {
    other: {
      'naver-site-verification': '0c93136e44c45a7adafbab467815239677a7fe17',
      'msvalidate.01': '048AB450B6B91E03CAF13FDE8415F954',
    }
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <PWARegistration />
          <OfflineBanner />
          <KitchenTools />
          <div id="root-layout">


            {children}
          </div>
        </LanguageProvider>

      </body>
    </html>
  );
}
