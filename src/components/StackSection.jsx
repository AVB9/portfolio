import React from 'react';
import { PROFILE } from '../data/portfolioData';

export default function StackSection() {
  return (
    <section className="content-section" id="stack">
      <div className="container">
        <div className="section-label">stack</div>

        <div className="stack-grid">
          {PROFILE.stack.map((group) => (
            <div className="stack-group" key={group.category}>
              <h3 className="stack-category">{group.category}</h3>
              <ul className="stack-items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
