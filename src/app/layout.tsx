import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineMotto - Film Replikleri",
  description: "Film repliklerini biliyor musunuz? En iyi film tutkunları için hazırlanmış eğlenceli bir test!",
  keywords: "film replikleri, sinema replikleri, film testi, sinema testi, film bilgi yarışması, türk filmleri, yeşilçam replikleri, film alıntıları, sinema kültürü, film sertifikası",
  authors: [{ name: "CineMotto" }],
  creator: "CineMotto",
  publisher: "CineMotto",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://cinemotto.com',
    siteName: 'CineMotto',
    title: 'CineMotto - Film Replikleri Testi',
    description: 'Film repliklerini biliyor musunuz? En iyi film tutkunları için hazırlanmış eğlenceli bir test! Türk sinemasının unutulmaz repliklerini test edin, sertifikanızı alın ve paylaşın.',
    images: [
      {
        url: '/images/og-image.jpg', // Eğer varsa sosyal medya paylaşım görseli
        width: 1200,
        height: 630,
        alt: 'CineMotto Film Replikleri Testi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineMotto - Film Replikleri Testi',
    description: 'Film repliklerini biliyor musunuz? En iyi film tutkunları için hazırlanmış eğlenceli bir test! Sertifikanızı alın ve paylaşın.',
    images: ['/images/og-image.jpg'], // Eğer varsa Twitter paylaşım görseli
    creator: '@CineMotto',
    site: '@CineMotto',
  },
  alternates: {
    canonical: 'https://cinemotto.com',
  },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎬</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console doğrulama kodu
  },
  category: 'entertainment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
