'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { track } from '@/app/_lib/analytics';
import { RevealHeading, RevealWords } from '../scroll/reveal-text';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xanynodr';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; message: string };

const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent/60 focus:bg-white/[0.07] transition-colors';

export default function ContactSection() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: 'sending' });

    try {
      // FormData includes the hidden `_gotcha` honeypot; Formspree silently
      // drops submissions where a bot filled it in.
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();
        setStatus({ kind: 'success' });
        track('contact_submit');
      } else {
        setStatus({ kind: 'error', message: 'Something went wrong sending your message. Please try again.' });
        track('contact_error', { status: response.status });
      }
    } catch {
      setStatus({ kind: 'error', message: "Couldn't reach the server. Check your connection and try again." });
      track('contact_error', { status: 'network' });
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="w-full py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="section-eyebrow mb-4">Contact</p>
          <RevealHeading
            id="contact-heading"
            lead="Let's"
            accent="talk"
            className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight"
          />
          <RevealWords
            className="text-gray-300 text-lg"
            segments={[{ text: 'Hiring, collaborating, or just want to say hi? Send a message or email me directly.' }]}
          />
          <a
            href={`mailto:${PORTFOLIO_DATA.email}`}
            className="mt-5 inline-flex items-center gap-2 text-accent hover:text-white transition-colors"
          >
            <FaEnvelope aria-hidden="true" />
            {PORTFOLIO_DATA.email}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input id="name" name="name" type="text" autoComplete="name" required className={inputClass} placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={inputClass}
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`${inputClass} resize-y min-h-32`}
                placeholder="What are you working on?"
              />
            </div>

            {/* Honeypot: invisible to people, tempting to bots. */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <button
              type="submit"
              disabled={status.kind === 'sending'}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-wait"
            >
              <FaPaperPlane aria-hidden="true" />
              {status.kind === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`min-h-6 text-center text-sm ${status.kind === 'error' ? 'text-red-300' : 'text-accent'}`}
            >
              {status.kind === 'success' && "Thanks — your message is on its way. I'll get back to you soon."}
              {status.kind === 'error' && status.message}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
