'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaRocket } from 'react-icons/fa';
import { useAnalyticsContext } from '../../_components/analytics-provider';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { trackInteraction, trackUserJourney, trackConversion, trackError } = useAnalyticsContext();

  const handleFieldChange = (fieldName: string, value: string) => {
    trackInteraction('form_field_change', { field: fieldName, section: 'contact', action: 'input', value_length: value.length });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend Rate Limiting
    const LAST_SUBMIT_KEY = 'contact_last_submit';
    const lastSubmitTime = localStorage.getItem(LAST_SUBMIT_KEY);
    const now = Date.now();
    const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

    if (lastSubmitTime && now - parseInt(lastSubmitTime) < COOLDOWN_MS) {
      setSubmitMessage("You've already sent a message recently. Please wait a few minutes.");
      return;
    }

    setIsSubmitting(true);
    trackUserJourney('contact_form_submit', 'contact');

    try {
      const response = await fetch('https://formspree.io/f/xanynodr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        localStorage.setItem(LAST_SUBMIT_KEY, now.toString());
        setSubmitMessage("Message received! I'll get back to you faster than light.");
        trackConversion('contact_form_submit', 1);
        setName(''); setEmail(''); setMessage('');
      } else {
        setSubmitMessage("Error in transmission. Please try again.");
        trackError(new Error(`Form submission failed with status: ${response.status}`), 'contact_form');
      }
    } catch (error) {
      setSubmitMessage("Connection lost. Please check your signal.");
      trackError(error as Error, 'contact_form_network');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-8 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tighter">
            GET IN <span className="text-gradient-cyan">TOUCH</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl">
             Ready to start a new project or just want to say hi?
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-panel p-8 sm:p-12 rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Decorative radial gradient */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleFieldChange('name', e.target.value);
                  }}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
                  placeholder="Ahmad Ramzy"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleFieldChange('email', e.target.value);
                  }}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600"
                  placeholder="ramzy@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleFieldChange('message', e.target.value);
                }}
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600 resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-xl disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaRocket className="animate-bounce" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </motion.button>
          </form>
          
          <AnimatePresence>
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl text-center text-sm font-medium text-purple-400"
              >
                {submitMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
