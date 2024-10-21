import { Syne } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Footer from '@/app/_components/footer/footer';

const StarryBackground = dynamic(() => import('@/app/_components/starry-background'), {
  ssr: false,
});

const ScrollProgress = dynamic(() => import('@/app/_components/scroll-progress'), {
  ssr: false,
});

const NavBar = dynamic(() => import('@/app/_components/nav-bar/nav-bar'), {
  ssr: false,
});

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
        <StarryBackground />
        <ScrollProgress />
        <NavBar />

        <main className="flex-grow pt-20 p-8">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
