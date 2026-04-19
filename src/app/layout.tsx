import { Syne } from 'next/font/google';
import './globals.css';
import Footer from '@/app/_components/footer/footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import DynamicComponents from '@/app/_components/DynamicComponents';
import AnalyticsProvider from '@/app/_components/analytics-provider';
import { Suspense } from 'react';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Ahmad Ramzy | Software Engineer',
    template: '%s | Ahmad Ramzy',
  },
  description: 'Full Stack Software Engineer specializing in high-performance web applications, modern frontend architecture, and clean UI/UX design.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'Frontend Engineer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Ahmad Ramzy' }],
  creator: 'Ahmad Ramzy',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ramzy98.github.io/',
    title: 'Ahmad Ramzy | Premium Engineering Portfolio',
    description: 'Explore the portfolio of Ahmad Ramzy. High-performance engineering meets premium design.',
    siteName: 'Ahmad Ramzy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmad Ramzy | Software Engineer',
    description: 'Full Stack Software Engineer specializing in high-performance web applications.',
    creator: '@amazingramzy',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.digitaloceanspaces.com https://raw.githubusercontent.com https://raw.githack.com; connect-src 'self' https://www.google-analytics.com https://formspree.io https://*.digitaloceanspaces.com https://raw.githubusercontent.com https://raw.githack.com;" />
      </head>
      <body className={`${syne.className} flex flex-col min-h-screen relative overflow-x-hidden`}>

        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <AnalyticsProvider>
          {/* Global Terminal Overlay */}
          <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <filter id="globalNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#globalNoise)" />
            </svg>
          </div>
          <div className="fixed inset-0 pointer-events-none z-[9999] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-[0.05]" />

          <Suspense fallback={null}>
            <DynamicComponents />
          </Suspense>
          <main className="flex-grow py-32 sm:p-8 lg:py-40 md:py-40">{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
