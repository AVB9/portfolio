import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export default function ContactSection({ onNavigate, onScrollToSection }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section className="content-section contact-section" id="contact">
      <div className="container">
        <div className="section-label">contact</div>

        <p className="contact-lead">
          Interested in bioelectronics, hardware-software systems, or web tools?
          Always happy to talk.
        </p>

        <div className="email-copy-row">
          <button
            type="button"
            className="email-copy-btn"
            onClick={handleCopyEmail}
          >
            <span className="email-text">{PROFILE.email}</span>
            {copied ? (
              <Check size={15} strokeWidth={2} className="copy-icon success" />
            ) : (
              <Copy size={15} strokeWidth={1.8} className="copy-icon" />
            )}
          </button>
          <span
            className={`copy-feedback ${copied ? 'is-visible' : ''}`}
            role="status"
            aria-live="polite"
          >
            copied to clipboard
          </span>
        </div>

        <footer className="site-footer">
          <span className="copyright">
            &copy; {new Date().getFullYear()} {PROFILE.name}
          </span>

          <div className="footer-links">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Top
            </button>
            <button type="button" onClick={() => onScrollToSection('about')}>
              About
            </button>
            <button type="button" onClick={() => onScrollToSection('projects')}>
              Work
            </button>
            <button type="button" onClick={() => onNavigate('blog')}>
              Blog
            </button>
            <a href={`mailto:${PROFILE.email}`}>Mail</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
