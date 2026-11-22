import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import SleepingCatCanvas from './SleepingCatCanvas';

export default function Hero({ onExplore, onOpenBlog }) {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow-tag">/portfolio</div>
          <h1 className="hero-title">{PROFILE.name}</h1>
          <p className="hero-tagline">{PROFILE.tagline}</p>

          <dl className="hero-meta-grid">
            {PROFILE.meta.map((row) => (
              <div className="meta-row" key={row.label}>
                <dt className="meta-key">{row.label}:</dt>
                <dd className="meta-val">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={onExplore}
            >
              <span className="prompt-chevron" aria-hidden="true">
                &rsaquo;
              </span>
              <span>explore</span>
              <ArrowRight size={14} strokeWidth={2} />
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={onOpenBlog}
            >
              <BookOpen size={14} strokeWidth={1.8} />
              <span>read the blog</span>
            </button>
          </div>
        </div>

        <div className="hero-art-column">
          <SleepingCatCanvas />
        </div>
      </div>
    </section>
  );
}
