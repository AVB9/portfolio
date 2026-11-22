import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="content-section" id="projects">
      <div className="container">
        <div className="section-label">projects</div>

        <div className="projects-grid">
          {PROFILE.projects.map((project) => (
            <article
              className="project-card"
              key={project.slug}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Inspect ${project.title}`}
            >
              <div className="project-top">
                <span className="project-slug">{project.slug}</span>
                <ArrowUpRight className="project-arrow" size={16} strokeWidth={1.8} />
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-summary">{project.summary}</p>

              <ul className="tag-list">
                {project.tags.map((tag) => (
                  <li className="tag-chip" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="project-slug">{selectedProject.slug}</span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <h3 id="project-modal-title" className="modal-title">
              {selectedProject.title}
            </h3>
            <p className="modal-copy">{selectedProject.summary}</p>
            <p className="modal-copy muted">{selectedProject.details}</p>

            <ul className="tag-list">
              {selectedProject.tags.map((tag) => (
                <li className="tag-chip" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
