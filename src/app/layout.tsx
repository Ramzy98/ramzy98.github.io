import { Syne } from 'next/font/google';
import './globals.css';
import Footer from '@/app/_components/footer/footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import DynamicComponents from '@/app/_components/DynamicComponents';
import AnalyticsProvider from '@/app/_components/analytics-provider';

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
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.digitaloceanspaces.com https://raw.githubusercontent.com https://raw.githack.com; connect-src 'self' https://www.google-analytics.com https://formspree.io https://*.digitaloceanspaces.com https://raw.githubusercontent.com https://raw.githack.com;" />
      </head>
      <body className={`${syne.className} flex flex-col min-h-screen relative overflow-x-hidden`}>

        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        <AnalyticsProvider>
          <DynamicComponents />
          <main className="flex-grow py-32 sm:p-8 lg:py-40 md:py-40">{children}</main>
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
