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

export const metadata = {
  title: {
    default: 'Ahmad Ramzy | Software Engineer',
    template: '%s | Ahmad Ramzy',
  },
  description: 'Ahmad Ramzy Portfolio',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syne.className} flex flex-col min-h-screen`}>
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
