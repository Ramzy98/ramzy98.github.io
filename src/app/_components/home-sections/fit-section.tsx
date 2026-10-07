'use client';

import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaCheck, FaEnvelope, FaLock, FaMagnifyingGlass, FaPen, FaWandMagicSparkles } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { analyzeJobDescription, SAMPLE_JOB_DESCRIPTION, type FitResult } from '@/app/_lib/job-match';
import { track } from '@/app/_lib/analytics';
import { RevealHeading, RevealWords } from '../scroll/reveal-text';

export default function FitSection() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<FitResult | null>(null);
  const [analyzed, setAnalyzed] = useState('');

  const analyze = (input: string) => {
    const r = analyzeJobDescription(input);
    setResult(r);
    setAnalyzed(input);
    // Only the counts are tracked; the pasted text never leaves the browser.
    track('fit_check', { score: r.score, matches: r.matches.length, gaps: r.gaps.length });
  };

  const trySample = () => {
    setText(SAMPLE_JOB_DESCRIPTION);
    analyze(SAMPLE_JOB_DESCRIPTION);
  };

  const edit = () => setResult(null);

  return (
    <section id="fit" aria-labelledby="fit-heading" className="w-full py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="section-eyebrow mb-4">For hiring teams</p>
          <RevealHeading
            id="fit-heading"
            lead="Do I fit"
            accent="your role?"
            className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
          />
          <RevealWords
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            segments={[
              { text: 'Paste a job description. Every requirement is checked against' },
              { text: 'real work I have shipped,', tone: 'bright' },
              { text: 'gaps included.' },
            ]}
          />
        </div>

        <div className="glass-panel p-5 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {result === null ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="jd" className="sr-only">
                  Job description
                </label>
                <textarea
                  id="jd"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={9}
                  placeholder="Paste the job description here: title, responsibilities, requirements…"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm sm:text-base text-white placeholder:text-gray-500 font-mono leading-relaxed focus:outline-none focus:border-accent/60 resize-y min-h-48"
                />
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => analyze(text)}
                      disabled={text.trim().length < 20}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <FaMagnifyingGlass aria-hidden="true" size={13} />
                      Check the fit
                    </button>
                    <button
                      type="button"
                      onClick={trySample}
                      className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-accent/60 hover:text-accent transition-colors"
                    >
                      <FaWandMagicSparkles aria-hidden="true" size={13} />
                      Try a sample job
                    </button>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-gray-400">
                    <FaLock aria-hidden="true" />
                    Runs in your browser. Nothing you paste is sent anywhere.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Results result={result} text={analyzed} onEdit={edit} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Results({ result, text, onEdit }: { result: FitResult; text: string; onEdit: () => void }) {
  const { matches, gaps, score } = result;
  const total = matches.length + gaps.length;

  if (total === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-white text-lg font-semibold">I couldn&apos;t spot any skills or tech in that text.</p>
        <p className="mt-2 text-gray-400">Try pasting the requirements section of the job description.</p>
        <button
          type="button"
          onClick={onEdit}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm font-semibold text-white hover:border-accent/60"
        >
          <FaPen aria-hidden="true" size={12} />
          Edit text
        </button>
      </div>
    );
  }

  const roleLine = text.split('\n').find((l) => l.trim().length > 0)?.trim().slice(0, 80) ?? 'a role';
  const mailto = `mailto:${PORTFOLIO_DATA.email}?subject=${encodeURIComponent(`Role: ${roleLine}`)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {/* The pasted text, with every recognised requirement marked */}
      <div className="order-2 lg:order-1 min-w-0">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-400">Your job description</p>
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white"
          >
            <FaPen aria-hidden="true" size={10} />
            Edit
          </button>
        </div>
        <div className="max-h-[28rem] overflow-y-auto rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm leading-relaxed text-gray-400 whitespace-pre-wrap break-words">
          <HighlightedText text={text} highlights={result.highlights} />
        </div>
        <p className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-400/25 border border-emerald-400/50" /> backed by my work
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400/20 border border-amber-400/50" /> not in my day-to-day yet
          </span>
        </p>
      </div>

      {/* Score, evidence and gaps */}
      <div className="order-1 lg:order-2 min-w-0">
        <div className="flex items-center gap-5 mb-6">
          <ScoreRing score={score} />
          <div>
            <p className="text-2xl font-semibold text-white">{score}% match</p>
            <p className="text-sm text-gray-400">
              {matches.length} of {total} requirements I spotted are backed by real work.
            </p>
          </div>
        </div>

        <ul className="space-y-2 max-h-[22rem] overflow-y-auto pr-1">
          {matches.map((m, i) => (
            <motion.li
              key={m.name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.6) }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <FaCheck aria-hidden="true" className="mt-1 shrink-0 text-emerald-300" size={12} />
                <div className="min-w-0">
                  <p className="text-sm text-white">
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-gray-400">
                      {' · '}
                      {m.sources.slice(0, 3).join(', ')}
                      {m.sources.length > 3 && ` +${m.sources.length - 3} more`}
                    </span>
                  </p>
                  {m.snippet && <p className="mt-1 text-xs text-gray-400 line-clamp-2">“{m.snippet}”</p>}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        {gaps.length > 0 && (
          <div className="mt-5">
            <p className="text-xs text-gray-400 mb-2">Not in my day-to-day yet, honestly:</p>
            <ul className="flex flex-wrap gap-2">
              {gaps.map((g) => (
                <li
                  key={g}
                  className="px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-xs text-amber-200"
                >
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={mailto}
          className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white text-black font-semibold hover:bg-accent transition-colors"
        >
          <FaEnvelope aria-hidden="true" />
          Sounds like a fit? Email me about this role
        </a>
      </div>
    </div>
  );
}

function HighlightedText({ text, highlights }: { text: string; highlights: FitResult['highlights'] }) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  highlights.forEach((h, i) => {
    if (h.start > cursor) parts.push(<Fragment key={`t${i}`}>{text.slice(cursor, h.start)}</Fragment>);
    parts.push(
      <mark
        key={`h${i}`}
        className={`rounded px-0.5 text-white ${
          h.kind === 'match' ? 'bg-emerald-400/20 ring-1 ring-emerald-400/40' : 'bg-amber-400/15 ring-1 ring-amber-400/40'
        }`}
      >
        {text.slice(h.start, h.end)}
      </mark>
    );
    cursor = h.end;
  });
  if (cursor < text.length) parts.push(<Fragment key="tail">{text.slice(cursor)}</Fragment>);
  return <>{parts}</>;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" className="shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="42" cy="42" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
      <motion.circle
        cx="42"
        cy="42"
        r={radius}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
