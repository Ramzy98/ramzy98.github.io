'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa6';
import { PORTFOLIO_DATA } from '@/constants/portfolio';
import { track } from '@/app/_lib/analytics';
import { party } from '@/app/_lib/party';
import SectionHeader from '../section-header';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xanynodr';

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success' } | { kind: 'error'; message: string };
type FieldName = 'name' | 'email' | 'message';
type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const FIELDS: FieldName[] = ['name', 'email', 'message'];

const inputClass =
  'w-full bg-white/5 border rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:bg-white/[0.07] transition-colors';

/** Plain-language message for a field's built-in constraint failure, or '' when it's valid. */
function validationMessage(field: FieldElement): string {
  const { validity } = field;
  if (validity.valid) return '';
  switch (field.name as FieldName) {
    case 'name':
      return 'Add your name so I know who to reply to.';
    case 'email':
      return validity.typeMismatch ? "That email doesn't look right. Check for a typo." : 'Add an email so I can reply.';
    case 'message':
      return validity.tooShort ? 'Add a little more detail — a sentence or two is plenty.' : 'Write a line about what you need.';
  }
}

export default function ContactSection() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const setFieldError = (field: FieldElement) =>
    setErrors((prev) => ({ ...prev, [field.name]: validationMessage(field) }));

  // Re-check a field as it's edited, but only once it has already been flagged.
  const handleChange = (e: React.ChangeEvent<FieldElement>) => {
    if (errors[e.target.name as FieldName]) setFieldError(e.target);
  };

  // Flag mistakes on blur, but don't nag about fields someone merely tabbed through.
  const handleBlur = (e: React.FocusEvent<FieldElement>) => {
    if (e.target.value) setFieldError(e.target);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const fields = FIELDS.map((name) => form.elements.namedItem(name) as FieldElement);
    const nextErrors = Object.fromEntries(fields.map((f) => [f.name, validationMessage(f)]));
    setErrors(nextErrors);
    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

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
        party();
        track('contact_submit');
      } else {
        setStatus({ kind: 'error', message: "Your message didn't go through. Please try again." });
        track('contact_error', { status: response.status });
      }
    } catch {
      setStatus({ kind: 'error', message: "Couldn't reach the server. Check your connection and try again." });
      track('contact_error', { status: 'network' });
    }
  };

  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    required: true,
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `${inputClass} ${errors[name] ? 'border-red-300/60' : 'border-white/10 focus:border-accent/60'}`,
  });

  return (
    <section id="contact" aria-labelledby="contact-heading" className="w-full pt-24 pb-32 px-6">
      <div className="mx-auto max-w-6xl grid gap-12 lg:gap-16 lg:grid-cols-[0.85fr_1.15fr] items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHeader
            id="contact-heading"
            eyebrow="Contact"
            title="Let's talk"
            description="Hiring, building something interesting, or just want to say hi? Drop me a message."
          />
          <a
            href={`mailto:${PORTFOLIO_DATA.email}`}
            className="mt-8 inline-flex items-center gap-3 text-lg text-white underline decoration-accent/40 underline-offset-[6px] hover:decoration-accent hover:text-accent transition-colors"
          >
            <FaEnvelope aria-hidden="true" className="text-accent" />
            {PORTFOLIO_DATA.email}
          </a>
        </div>

        <div className="glass-panel p-6 sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field name="name" label="Name" error={errors.name}>
                <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Mariam Haddad" />
              </Field>
              <Field name="email" label="Email" error={errors.email}>
                <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="mariam@northwind.studio" />
              </Field>
            </div>

            <Field name="message" label="Message" error={errors.message}>
              <textarea
                {...fieldProps('message')}
                rows={5}
                minLength={10}
                placeholder="What are you working on?"
                className={`${fieldProps('message').className} resize-y min-h-32`}
              />
            </Field>

            {/* Honeypot: invisible to people, tempting to bots. */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <button
              type="submit"
              disabled={status.kind === 'sending'}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-accent transition-[background-color,transform] active:scale-[0.99] disabled:opacity-60 disabled:cursor-wait disabled:active:scale-100"
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
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: FieldName;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
