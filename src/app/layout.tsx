import { Syne } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Footer from './_components/Footer';

const StarryBackground = dynamic(
  () => import('@/app/_components/StarryBackground'),
  {
    ssr: false,
  }
);

const NavBar = dynamic(() => import('@/app/_components/NavBar'), {
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
  titleTemplate: '%s | Ahmad Ramzy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${syne.className} flex flex-col min-h-screen`}>
        <StarryBackground />
        <NavBar />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
