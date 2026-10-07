import { PORTFOLIO_DATA } from '@/constants/portfolio';

/**
 * Matches a pasted job description against the portfolio data, entirely in
 * the browser. One dictionary of terms drives everything: a term found in the
 * job description counts as a match if the same term also appears somewhere
 * in my experience or projects, and as a gap if it doesn't. Evidence is read
 * from the data file, so it can never claim something the site doesn't.
 */

interface Term {
  name: string;
  patterns: RegExp[];
}

/** Case-insensitive whole-word match. `.`, `+` and `#` count as part of a word, so "Node.js" isn't read as "JS". */
const word = (alias: string) =>
  new RegExp(`(?<![A-Za-z0-9.+#])${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![A-Za-z0-9+#])`, 'gi');

const term = (name: string, ...aliases: (string | RegExp)[]): Term => ({
  name,
  patterns: aliases.map((a) => (typeof a === 'string' ? word(a) : a)),
});

const TERMS: Term[] = [
  // Languages
  term('TypeScript', 'typescript'),
  term('JavaScript', 'javascript', 'js', 'es6', 'ecmascript'),
  term('Ruby', 'ruby'),
  term('HTML', 'html', 'html5'),
  term('CSS', 'css', 'css3', 'sass', 'scss'),
  term('SQL', 'sql'),
  term('Python', 'python'),
  term('Java', 'java'),
  term('Go', 'golang', /\bGo\b/g),
  term('Rust', 'rust'),
  term('C#', 'c#'),
  term('.NET', '.net', 'dotnet'),
  term('PHP', 'php'),
  term('Kotlin', 'kotlin'),
  term('Swift', 'swift'),

  // Frontend
  term('React', 'react', 'react.js', 'reactjs'),
  term('Next.js', 'next.js', 'nextjs'),
  term('Redux', 'redux'),
  term('Zustand', 'zustand'),
  term('Tailwind CSS', 'tailwind', 'tailwindcss'),
  term('Storybook', 'storybook'),
  term('Material UI', 'material ui', 'material-ui', 'mui'),
  term('Vite', 'vite'),
  term('three.js', 'three.js', 'threejs', 'webgl'),
  term('Vue', 'vue', 'vue.js', 'vuejs', 'nuxt'),
  term('Angular', 'angular'),
  term('Svelte', 'svelte', 'sveltekit'),
  term('React Native', 'react native'),
  term('Flutter', 'flutter'),

  // Backend & data
  term('Node.js', 'node.js', 'nodejs', 'node'),
  term('Fastify', 'fastify'),
  term('Express', 'express.js', 'expressjs', /\bExpress\b/g),
  term('Ruby on Rails', 'ruby on rails', 'rails', 'ror'),
  term('Prisma', 'prisma'),
  term('PostgreSQL', 'postgresql', 'postgres', 'psql'),
  term('Redis', 'redis'),
  term('REST APIs', 'restful', /\bREST\b/g, 'rest api', 'rest apis'),
  term('API design', 'api design', 'openapi', 'swagger'),
  term('WebSockets', 'websocket', 'websockets', 'socket.io', 'real-time', 'realtime'),
  term('Serverless', 'serverless', 'cloudflare worker', 'cloudflare workers', 'edge functions', 'lambda'),
  term('Cloudflare', 'cloudflare'),
  term('GraphQL', 'graphql'),
  term('MongoDB', 'mongodb', 'mongo'),
  term('MySQL', 'mysql'),
  term('Kafka', 'kafka'),
  term('RabbitMQ', 'rabbitmq'),
  term('Elasticsearch', 'elasticsearch', 'opensearch'),
  term('NestJS', 'nestjs', 'nest.js'),
  term('Django', 'django'),
  term('Laravel', 'laravel'),
  term('Spring', 'spring boot'),
  term('Microservices', 'microservice', 'microservices'),

  // Testing & tooling
  term('Cypress', 'cypress'),
  term('Jest', 'jest'),
  term('Vitest', 'vitest'),
  term('Testing', 'testing', 'e2e', 'end-to-end', 'tests', 'unit tests', 'automated tests', 'tdd', 'test automation'),
  term('Docker', 'docker', 'containers'),
  term('CI/CD', 'ci/cd', 'ci-cd', 'continuous integration', 'continuous delivery', 'github actions'),
  term('Git', 'git'),
  term('AWS', 'aws', 'amazon web services'),
  term('GCP', 'gcp', 'google cloud'),
  term('Azure', 'azure'),
  term('Kubernetes', 'kubernetes', 'k8s'),
  term('Terraform', 'terraform'),

  // Domain & ways of working
  term('Payments', 'payment', 'payments', 'fintech', 'psp', 'psps', 'payment service providers'),
  term('Webhooks', 'webhook', 'webhooks'),
  term('CRM', 'crm'),
  term('Design systems', 'design system', 'design systems', 'component library'),
  term('Full stack', 'full stack', 'full-stack', 'fullstack'),
  term('Frontend', 'frontend', 'front-end', 'front end'),
  term('Backend', 'backend', 'back-end', 'back end'),
  term('Performance', 'performance', 'optimisation', 'optimization', 'web vitals'),
  term('Reliability & on-call', 'on-call', 'reliability', 'incident', 'incidents', 'uptime'),
  term('Mentoring', 'mentor', 'mentored', 'mentoring', 'mentorship', 'coaching'),
  term('Remote work', 'remote', 'distributed team'),
];

interface Source {
  label: string;
  texts: string[];
}

const stripMarkdown = (s: string) => s.replace(/\*\*/g, '');

/** Everything the site says I've done, grouped by where I did it. */
const SOURCES: Source[] = [
  ...PORTFOLIO_DATA.experiences.map((e) => ({
    label: e.company,
    texts: [e.title, e.location, ...e.skills, ...e.highlights.map(stripMarkdown)],
  })),
  ...PORTFOLIO_DATA.projects.map((p) => ({
    label: p.title,
    texts: [...p.technologies, p.description],
  })),
  { label: 'This website', texts: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'GitHub Actions CI/CD'] },
  {
    label: 'Skills',
    texts: PORTFOLIO_DATA.skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
  },
];

const testAny = (patterns: RegExp[], text: string) =>
  patterns.some((p) => {
    p.lastIndex = 0;
    return p.test(text);
  });

export interface Match {
  name: string;
  /** Where I used it, e.g. ["Centroid Solutions", "Frame Forge"]. */
  sources: string[];
  /** The most telling line of evidence, when there is one beyond a tag. */
  snippet?: string;
}

export interface Highlight {
  start: number;
  end: number;
  kind: 'match' | 'gap';
}

export interface FitResult {
  matches: Match[];
  gaps: string[];
  /** 0–100: share of recognised requirements backed by real work. */
  score: number;
  highlights: Highlight[];
}

export function analyzeJobDescription(text: string): FitResult {
  const matches: Match[] = [];
  const gaps: string[] = [];
  const highlights: Highlight[] = [];

  for (const t of TERMS) {
    const ranges: { start: number; end: number }[] = [];
    for (const pattern of t.patterns) {
      pattern.lastIndex = 0;
      for (const m of text.matchAll(pattern)) {
        ranges.push({ start: m.index, end: m.index + m[0].length });
      }
    }
    if (ranges.length === 0) continue;

    const evidence = SOURCES.filter((s) => s.texts.some((line) => testAny(t.patterns, line)));
    const kind = evidence.length > 0 ? 'match' : 'gap';
    ranges.forEach((r) => highlights.push({ ...r, kind }));

    if (kind === 'gap') {
      gaps.push(t.name);
      continue;
    }

    // Prefer a full sentence from a role or project over a bare tag like "React".
    const snippet = evidence
      .flatMap((s) => s.texts)
      .find((line) => line.length > 40 && testAny(t.patterns, line));

    matches.push({
      name: t.name,
      sources: evidence.filter((s) => s.label !== 'Skills' || evidence.length === 1).map((s) => s.label),
      snippet,
    });
  }

  // Strongest evidence first: more places used, then with a real sentence behind it.
  matches.sort((a, b) => b.sources.length - a.sources.length || Number(!!b.snippet) - Number(!!a.snippet));

  const total = matches.length + gaps.length;
  return {
    matches,
    gaps,
    score: total === 0 ? 0 : Math.round((matches.length / total) * 100),
    highlights: mergeHighlights(highlights),
  };
}

/** Sorts ranges and drops any that overlap an earlier one, so the text can be split cleanly. */
function mergeHighlights(ranges: Highlight[]): Highlight[] {
  const sorted = [...ranges].sort((a, b) => a.start - b.start || b.end - a.end);
  const out: Highlight[] = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    if (last && r.start < last.end) continue;
    out.push(r);
  }
  return out;
}

export const SAMPLE_JOB_DESCRIPTION = `Full Stack Engineer (Remote)

We're a product company building collaboration software used by thousands of teams, and we're hiring an engineer to own features end to end.

What you'll do
- Build product features with React, TypeScript and Next.js on the frontend and Node.js services on the backend
- Design REST APIs and data models in PostgreSQL, with Redis for caching
- Ship real-time features over WebSockets
- Contribute to our design system and keep the app fast

What we're looking for
- 4+ years of full-stack experience
- Strong TypeScript, React and Node.js
- Testing with Jest or Cypress
- Docker, CI/CD and AWS

Nice to have
- GraphQL or Kubernetes experience
- You enjoy mentoring other engineers`;
