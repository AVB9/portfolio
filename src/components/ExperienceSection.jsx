import React from 'react';
import { PROFILE } from '../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section className="content-section" id="experience">
      <div className="container">
        <div className="section-label">experience</div>

        <div className="timeline-list">
          {PROFILE.experience.map((entry) => (
            <article className="timeline-entry" key={`${entry.ref}-${entry.role}`}>
              <div className="timeline-git-ref">
                <span className="git-star" aria-hidden="true">
                  *
                </span>
                <span className="git-branch">{entry.ref}</span>
              </div>

              <div className="timeline-body">
                <div className="timeline-header">
                  <h3 className="timeline-role">{entry.role}</h3>
                  <span className="timeline-period">{entry.period}</span>
                </div>
                <div className="timeline-org">{entry.org}</div>
                <ul className="timeline-bullets">
                  {entry.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
