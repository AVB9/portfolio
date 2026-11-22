import React from 'react';
import { PROFILE } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section className="content-section" id="about">
      <div className="container">
        <div className="section-label">about</div>

        <div className="about-layout">
          <h2 className="section-heading">Hi, I&apos;m {PROFILE.shortName} :)</h2>

          <div className="about-prose">
            {PROFILE.aboutParagraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <ul className="pill-list" aria-label="Focus areas">
            {PROFILE.aboutTags.map((tag) => (
              <li className="pill-item" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="core-block">
          <div className="section-label">core</div>
          <div className="core-grid">
            {PROFILE.core.map((item) => (
              <div className="core-card" key={item.label}>
                <span className="core-key">{item.label}</span>
                <span className="core-val">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
