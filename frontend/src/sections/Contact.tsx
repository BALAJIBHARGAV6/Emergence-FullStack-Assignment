import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { siteConfig } from '../config/site';
import { useChatStore } from '../store/chatStore';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const { contact, email, name } = siteConfig;
  const openChat = useChatStore((s) => s.openChat);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with Formspree/EmailJS in production)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        style: { background: '#ECFDF5', color: '#065F46', border: '1px solid #10B981' },
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.', {
        style: { background: '#FEF2F2', color: '#991B1B', border: '1px solid #EF4444' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/50 via-transparent to-accent-green-light/30 -z-10" />

      <div className="container-narrow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-light text-primary text-sm font-semibold rounded-full mb-4">
            Get in Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-text-primary">
            {contact.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              {contact.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-light rounded-xl">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">
                    Email
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-semibold text-text-primary hover:text-primary transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-green-light rounded-xl">
                  <MapPin size={20} className="text-accent-green" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">
                    Location
                  </div>
                  <span className="text-sm font-semibold text-text-primary">
                    Remote / Worldwide
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-pink-light rounded-xl">
                  <Clock size={20} className="text-accent-pink" />
                </div>
                <div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">
                    Availability
                  </div>
                  <span className="text-sm font-semibold text-accent-green">
                    {contact.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Nudge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={openChat}
              className="glass-card p-5 flex items-center gap-4 cursor-pointer hover:shadow-blue-lg transition-all border-primary/10"
            >
              <div className="p-3 bg-primary rounded-xl shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary">
                  Chat with AI Assistant
                </h4>
                <p className="text-xs text-text-secondary">
                  Ask anything about {name}&apos;s experience instantly
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-text-primary mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
