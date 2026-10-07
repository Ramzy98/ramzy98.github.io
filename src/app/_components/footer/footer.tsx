import { PORTFOLIO_DATA } from '@/constants/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} {PORTFOLIO_DATA.name}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Built with Next.js, TypeScript, Tailwind CSS and Motion ·{' '}
            <a
              href="https://github.com/Ramzy98/ramzy98.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              View source
            </a>
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {PORTFOLIO_DATA.socialLinks.map(({ Icon, link, platform }) => (
            <li key={platform}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="flex items-center justify-center w-10 h-10 rounded-full text-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
