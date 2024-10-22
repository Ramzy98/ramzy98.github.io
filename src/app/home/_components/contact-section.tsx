import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRocket } from 'react-icons/fa';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setSubmitMessage("Houston, we've had a problem. Please try again later.");
      }
    } catch (error) {
      setSubmitMessage('Communication disrupted by a black hole. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white"
        >
          Contact Mission Control
        </motion.h2>
        <div className="max-w-2xl mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                Your Earth Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setMessage(e.target.value)}
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
              className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold flex items-center justify-center space-x-2"
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
              className="mt-4 text-green-400 text-center"
            >
              {submitMessage}
            </motion.p>
          )}
        </div>
      </div>
      <ContactBackground />
    </section>
  );
}

function ContactBackground() {
  return (
    <div className="absolute inset-0 z-[-1]">
      {[...Array(20)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-purple-500 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random(),
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
}
