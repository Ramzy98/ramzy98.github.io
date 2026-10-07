import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Syne } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Footer from '@/app/_components/footer/footer';
import NavBar from '@/app/_components/nav-bar/nav-bar';
import AuroraBackground from '@/app/_components/aurora-background';
import BackToTop from '@/app/_components/back-to-top';
import CommandPalette from '@/app/_components/command-palette';
import ResumeModal from '@/app/_components/resume-modal';
import EasterEggs from '@/app/_components/easter-eggs';
import { PORTFOLIO_DATA, yearsOfExperience } from '@/constants/portfolio';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['700', '800'] });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const { name, role, siteUrl, headline } = PORTFOLIO_DATA;
const description = `${role} with ${yearsOfExperience()}+ years of experience. ${headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${name} | ${role}`,
    template: `%s | ${name}`,
  },
  description,
  keywords: ['Software Engineer', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Fastify', 'Payments'],
  authors: [{ name, url: siteUrl }],
  creator: name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: '/',
    title: `${name} | ${role}`,
    description,
    siteName: name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${name} | ${role}`,
    description,
    creator: '@amazingramzy',
  },
};

export const viewport: Viewport = {
  themeColor: '#050a15',
  colorScheme: 'dark',
};

// GitHub Pages can't set response headers, so the CSP ships as a meta tag.
// Dev mode needs 'unsafe-eval' for React Refresh; production doesn't.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: https://www.googletagmanager.com",
  "connect-src 'self' https://formspree.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
].join('; ');

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name,
  jobTitle: role,
  url: siteUrl,
  email: `mailto:${PORTFOLIO_DATA.email}`,
  image: `${siteUrl}/me.webp`,
  address: { '@type': 'PostalAddress', addressLocality: 'Alexandria', addressCountry: 'EG' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: PORTFOLIO_DATA.education.school },
  sameAs: PORTFOLIO_DATA.socialLinks.filter((s) => s.link.startsWith('http')).map((s) => s.link),
  knowsAbout: PORTFOLIO_DATA.skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen relative overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:font-semibold"
        >
          Skip to content
        </a>
        <AuroraBackground />
        <BackToTop />
        <NavBar />
        <CommandPalette />
        <ResumeModal />
        <EasterEggs />
        <main id="main" className="grow pt-28 sm:pt-32">
          {children}
        </main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
