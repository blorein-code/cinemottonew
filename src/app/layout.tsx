import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://cinemotto.com'),
  title: 'CineMotto - Film Bilgi Yarışması',
  description: 'Film bilginizi test edin ve sertifika kazanın!',
  keywords: ['film', 'sinema', 'quiz', 'test', 'sertifika', 'yarışma'],
  authors: [{ name: 'CineMotto' }],
  openGraph: {
    title: 'CineMotto - Film Bilgi Yarışması',
    description: 'Film bilginizi test edin ve sertifika kazanın!',
    url: 'https://cinemotto.com',
    siteName: 'CineMotto',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineMotto - Film Bilgi Yarışması',
    description: 'Film bilginizi test edin ve sertifika kazanın!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
          data-ad-client="pub-5226101459122786"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className + ' font-sans'}>
        {children}
      </body>
    </html>
  );
}
