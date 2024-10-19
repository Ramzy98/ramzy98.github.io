import { Syne } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';

const NavBar = dynamic(() => import('@/app/_components/NavBar'), {
  ssr: false,
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
});

export const metadata = {
  title: 'Ahmad Ramzy - Portfolio',
  description: 'Ahmad Ramzy Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${syne.className} min-h-screen`}
        style={{
          backgroundImage: `
            linear-gradient(to right bottom, rgba(30, 144, 255, 0.7), rgba(138, 43, 226, 0.7)),
            url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <NavBar />

        <main className='pt-24'>{children}</main>
      </body>
    </html>
  );
}
