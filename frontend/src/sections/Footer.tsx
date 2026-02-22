import { Github, Linkedin, Instagram, Heart } from 'lucide-react';
import { siteConfig } from '../config/site';

export function Footer() {
  const { initials, social, navLinks, name } = siteConfig;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-heading text-3xl font-bold text-white"
            >
              {initials}
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Passionate developer building modern web experiences with React,
              Python, and AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: social.github, label: 'GitHub' },
                { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
                { icon: Instagram, href: social.twitter, label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Built with React, Python and{' '}
            <Heart size={14} className="text-accent-pink fill-accent-pink" />{' '}
            by {name}
          </p>
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
