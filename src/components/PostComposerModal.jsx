import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function PostComposerModal({
  defaultCategory = 'blogs',
  onClose,
  onSubmit,
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [tags, setTags] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title,
        category,
        tags,
        excerpt: excerpt.trim() || content.trim().slice(0, 140),
        content,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="composer-title"
    >
      <div
        className="modal-panel composer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span className="project-slug">/blog/new</span>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close post composer"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        <h3 id="composer-title" className="modal-title">
          Publish New Entry
        </h3>

        <form className="composer-form" onSubmit={handleSubmit}>
          <div className="form-row-two">
            <label className="form-field">
              <span>Section</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="blogs">Blogs</option>
                <option value="personal">Personal Blogs</option>
              </select>
            </label>

            <label className="form-field">
              <span>Tags (comma-separated)</span>
              <input
                type="text"
                placeholder="React, Three.js, Notes"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>
          </div>

          <label className="form-field">
            <span>Title</span>
            <input
              type="text"
              required
              placeholder="Write a concise headline..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="form-field">
            <span>Short summary</span>
            <input
              type="text"
              placeholder="One-line overview shown in the blog list..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </label>

          <label className="form-field">
            <span>Body (supports ## headings, - bullets, **bold**, `code`)</span>
            <textarea
              rows={8}
              required
              placeholder="Write your post here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>

          <div className="composer-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'publishing...' : 'publish entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
