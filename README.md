# ramzy98.github.io

Personal portfolio of Ahmad Ramzy, full stack software engineer. Live at **https://ramzy98.github.io**.

Built with Next.js (static export), React, TypeScript, Tailwind CSS and Motion, and deployed to GitHub Pages by the workflow in `.github/workflows/nextjs.yml` on every push to `main`.

## Development

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm lint
pnpm build   # static site in ./out
```

## Editing content

Everything the site says (experience, projects, skills, links, resume dialog, SEO metadata) lives in [`src/constants/portfolio.ts`](src/constants/portfolio.ts). Project screenshots go in `public/projects/` as WebP.

The downloadable resume is `public/Ahmad_Ramzy_Software_Engineer_Resume.pdf`; keep it in sync with the data file.

## Analytics

Google Analytics loads only when the `NEXT_PUBLIC_GA_ID` repository secret is set. The tracked events are listed in [`src/app/_lib/analytics.ts`](src/app/_lib/analytics.ts).
