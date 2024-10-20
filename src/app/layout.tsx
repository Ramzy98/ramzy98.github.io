import { Syne } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Footer from '@/app/_components/footer';

const StarryBackground = dynamic(() => import('@/app/_components/starryBackground'), {
  ssr: false,
});

const NavBar = dynamic(() => import('@/app/_components/navBar/navBar'), {
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
        <NavBar />

        <main className="p-8">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
