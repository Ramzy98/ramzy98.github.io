import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="glass-panel max-w-md w-full text-center p-10">
        <p className="section-eyebrow">Error 404</p>
        <h1 className="mt-4 font-display text-6xl sm:text-7xl font-extrabold tracking-tight text-white">Lost?</h1>
        <p className="mt-4 text-gray-300">This page doesn&apos;t exist — it may have moved, or the link is wrong.</p>
        <Link
          href="/"
          className="mt-8 inline-block px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-accent transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
