import React from 'react';

const ASCII_MARK = `   /\\   /\\
  /  \\_/  \\
 /  _   _  \\
 \\__\\___/__/`;

export default function Header({ currentView, onNavigate, onScrollToSection }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button
          type="button"
          className="brand-block"
          onClick={() => onNavigate('portfolio')}
          aria-label="Go to portfolio home"
        >
          <pre className="ascii-logo" aria-hidden="true">
            {ASCII_MARK}
          </pre>
          <span className="path-crumb">
            {currentView === 'blog' ? '/blog' : '/portfolio'}
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button
            type="button"
            className={`nav-link ${currentView === 'portfolio' ? 'is-active' : ''}`}
            onClick={() => onScrollToSection('about')}
          >
            about
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => onScrollToSection('experience')}
          >
            experience
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => onScrollToSection('projects')}
          >
            projects
          </button>
          <button
            type="button"
            className={`nav-link ${currentView === 'blog' ? 'is-active' : ''}`}
            onClick={() => onNavigate('blog')}
          >
            blogs
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => onScrollToSection('contact')}
          >
            contact
          </button>
        </nav>
      </div>
    </header>
  );
}
