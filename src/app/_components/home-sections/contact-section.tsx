import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRocket } from 'react-icons/fa';
import { useAnalyticsContext } from '../../_components/analytics-provider';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { trackInteraction, trackUserJourney, trackConversion, trackError } = useAnalyticsContext();

  const handleFieldFocus = (fieldName: string) => {
    trackInteraction('form_field_focus', {
      field: fieldName,
      section: 'contact',
      action: 'focus',
    });
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    trackInteraction('form_field_change', {
      field: fieldName,
      section: 'contact',
      action: 'input',
      value_length: value.length,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission attempt
    trackInteraction('form_submit_attempt', {
      section: 'contact',
      form_type: 'contact_form',
      fields_filled: [name, email, message].filter(Boolean).length,
    });

    trackUserJourney('contact_form_submit', 'contact');

    try {
      const response = await fetch('https://formspree.io/f/xanynodr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitMessage(
          "Message sent to the cosmos! I'll respond faster than light travel permits."
        );
        
        // Track successful submission
        trackInteraction('contact_form_submit', {
          status: 'success',
          section: 'contact',
          response_time: Date.now(),
        });
        
        trackConversion('contact_form_submit', 1);
        
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitMessage("Houston, we've had a problem. Please try again later.");
        
        // Track submission error
        trackInteraction('contact_form_submit', {
          status: 'error',
          section: 'contact',
          error_type: 'http_error',
          status_code: response.status,
        });
        
        trackError(new Error(`Form submission failed with status: ${response.status}`), 'contact_form');
      }
    } catch (error) {
      setSubmitMessage('Communication disrupted by a black hole. Please try again.');
      
      // Track network error
      trackInteraction('contact_form_submit', {
        status: 'error',
        section: 'contact',
        error_type: 'network_error',
      });
      
      trackError(error as Error, 'contact_form_network');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-white"
        >
          Contact Mission Control
        </motion.h2>
        <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-6 sm:p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                Your Earth Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleFieldChange('name', e.target.value);
                }}
                onFocus={() => handleFieldFocus('name')}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="E.T., Yoda, or just Bob..."
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Intergalactic Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleFieldChange('email', e.target.value);
                }}
                onFocus={() => handleFieldFocus('email')}
                required
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@milkyway.universe"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white mb-2">
                Your Cosmic Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleFieldChange('message', e.target.value);
                }}
                onFocus={() => handleFieldFocus('message')}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Share your thoughts, but please no Klingon... my translator is broken."
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-purple-600 text-white py-2 sm:py-3 rounded-md font-semibold flex items-center justify-center space-x-2 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaRocket className="animate-spin" />
                  <span>Launching Message...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  <span>Send to the Stars</span>
                </>
              )}
            </motion.button>
          </form>
          {submitMessage && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-400 text-center "
            >
              {submitMessage}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
