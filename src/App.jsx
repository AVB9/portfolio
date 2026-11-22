import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import StackSection from './components/StackSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import BlogView from './components/BlogView';
import MobileNav from './components/MobileNav';

function resolveInitialView() {
  if (typeof window === 'undefined') return 'portfolio';
  return window.location.pathname.startsWith('/blog') ||
    window.location.hash === '#blog'
    ? 'blog'
    : 'portfolio';
}

export default function App() {
  const [currentView, setCurrentView] = useState(resolveInitialView);

  useEffect(() => {
    const onPopState = () => {
      setCurrentView(resolveInitialView());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (view) => {
    setCurrentView(view);
    const nextPath = view === 'blog' ? '/blog' : '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header
        currentView={currentView}
        onNavigate={navigate}
        onScrollToSection={scrollToSection}
      />

      <main id="main-content">
        {currentView === 'portfolio' ? (
          <>
            <Hero
              onExplore={() => scrollToSection('about')}
              onOpenBlog={() => navigate('blog')}
            />
            <AboutSection />
            <ExperienceSection />
            <StackSection />
            <ProjectsSection />
            <ContactSection
              onNavigate={navigate}
              onScrollToSection={scrollToSection}
            />
          </>
        ) : (
          <BlogView onBackToPortfolio={() => navigate('portfolio')} />
        )}
      </main>

      <MobileNav
        currentView={currentView}
        onNavigate={navigate}
        onScrollToSection={scrollToSection}
      />
    </div>
  );
}
