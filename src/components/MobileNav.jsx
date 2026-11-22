import React from 'react';
import { ArrowUp, User, Briefcase, BookOpen, Mail } from 'lucide-react';

export default function MobileNav({
  currentView,
  onNavigate,
  onScrollToSection,
}) {
  const handleTop = () => {
    if (currentView !== 'portfolio') {
      onNavigate('portfolio');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="mobile-dock" aria-label="Mobile quick navigation">
      <button type="button" className="dock-item" onClick={handleTop}>
        <ArrowUp size={15} strokeWidth={1.8} />
        <span>Top</span>
      </button>
      <button
        type="button"
        className="dock-item"
        onClick={() => onScrollToSection('about')}
      >
        <User size={15} strokeWidth={1.8} />
        <span>About</span>
      </button>
      <button
        type="button"
        className="dock-item"
        onClick={() => onScrollToSection('projects')}
      >
        <Briefcase size={15} strokeWidth={1.8} />
        <span>Work</span>
      </button>
      <button
        type="button"
        className={`dock-item ${currentView === 'blog' ? 'is-active' : ''}`}
        onClick={() => onNavigate('blog')}
      >
        <BookOpen size={15} strokeWidth={1.8} />
        <span>Blog</span>
      </button>
      <button
        type="button"
        className="dock-item"
        onClick={() => onScrollToSection('contact')}
      >
        <Mail size={15} strokeWidth={1.8} />
        <span>Mail</span>
      </button>
    </nav>
  );
}
