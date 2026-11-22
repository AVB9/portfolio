import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  PenLine,
  Trash2,
  LogIn,
  LogOut,
  Check,
  Clock,
  Calendar,
} from 'lucide-react';
import { fetchPosts, createPost, deletePost } from '../firebase/firestore';
import { isFirebaseConfigured } from '../firebase/config';
import {
  signInWithGoogle,
  signOutUser,
  subscribeToAuth,
} from '../firebase/auth';
import PostComposerModal from './PostComposerModal';

const BLOG_CHANNELS = [
  {
    id: 'blogs',
    label: 'Blogs',
    subtitle: 'Engineering notes, bioelectronics research, and software builds.',
  },
  {
    id: 'personal',
    label: 'Personal Blogs',
    subtitle: 'Reflections, university life at VIT-AP, and quiet side notes.',
  },
];

function renderArticleBody(content) {
  const blocks = String(content || '').split(/\n\n+/);
  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('## ')) {
      return (
        <h3 className="article-subheading" key={idx}>
          {trimmed.slice(3)}
        </h3>
      );
    }

    if (trimmed.split('\n').every((line) => line.trim().startsWith('- '))) {
      const items = trimmed
        .split('\n')
        .map((line) => line.trim().replace(/^- /, ''));
      return (
        <ul className="article-list" key={idx}>
          {items.map((item, i) => (
            <li key={i}>{formatInlineTokens(item)}</li>
          ))}
        </ul>
      );
    }

    return (
      <p className="article-paragraph" key={idx}>
        {formatInlineTokens(trimmed)}
      </p>
    );
  });
}

function formatInlineTokens(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code className="inline-code" key={idx}>
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function BlogView({ onBackToPortfolio }) {
  const [channel, setChannel] = useState('blogs');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const activeChannel =
    BLOG_CHANNELS.find((c) => c.id === channel) || BLOG_CHANNELS[0];

  useEffect(() => {
    const unsubscribe = subscribeToAuth((u) => setUser(u));
    return unsubscribe;
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPosts(channel).then((data) => {
      if (!cancelled) {
        setPosts(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [channel]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectChannel = (nextChannel) => {
    setChannel(nextChannel);
    setActivePost(null);
    setDropdownOpen(false);
  };

  const handleAuthToggle = async () => {
    if (user) {
      await signOutUser();
      setUser(null);
    } else {
      const res = await signInWithGoogle();
      setUser(res.user);
    }
  };

  const handlePublishPost = async (payload) => {
    const created = await createPost(payload);
    if (created.category === channel) {
      setPosts((prev) => [created, ...prev]);
    } else {
      setChannel(created.category);
    }
    setComposerOpen(false);
  };

  const handleDeletePost = async (e, postId) => {
    e.stopPropagation();
    await deletePost(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    if (activePost?.id === postId) {
      setActivePost(null);
    }
  };

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const canAuthor =
    !isFirebaseConfigured ||
    (Boolean(user) && (!adminEmail || user.email === adminEmail));

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-topbar">
          <button
            type="button"
            className="back-link"
            onClick={() => {
              if (activePost) {
                setActivePost(null);
              } else {
                onBackToPortfolio();
              }
            }}
          >
            <ArrowLeft size={15} strokeWidth={1.9} />
            <span>{activePost ? `back to ${activeChannel.label.toLowerCase()}` : 'back to /portfolio'}</span>
          </button>

          <div className="blog-auth-actions">
            {canAuthor && (
              <button
                type="button"
                className="btn-secondary btn-compact"
                onClick={() => setComposerOpen(true)}
              >
                <PenLine size={13} strokeWidth={1.9} />
                <span>write post</span>
              </button>
            )}

            {isFirebaseConfigured && (
              <button
                type="button"
                className="btn-ghost btn-compact"
                onClick={handleAuthToggle}
                title={user ? `Signed in as ${user.email}` : 'Sign in to publish'}
              >
                {user ? <LogOut size={13} strokeWidth={1.9} /> : <LogIn size={13} strokeWidth={1.9} />}
                <span>{user ? 'sign out' : 'author sign in'}</span>
              </button>
            )}
          </div>
        </div>

        {!activePost ? (
          <>
            <div className="blog-header">
              <div className="blog-title-row" ref={dropdownRef}>
                <h1 className="blog-heading">{activeChannel.label}</h1>

                <button
                  type="button"
                  className={`blog-dropdown-trigger ${dropdownOpen ? 'is-open' : ''}`}
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  aria-label="Switch blog category"
                >
                  <ChevronDown size={18} strokeWidth={2} />
                </button>

                {dropdownOpen && (
                  <div
                    className="blog-dropdown-menu"
                    role="listbox"
                    aria-label="Blog categories"
                  >
                    {BLOG_CHANNELS.map((item) => {
                      const selected = item.id === channel;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className={`blog-dropdown-option ${selected ? 'is-selected' : ''}`}
                          onClick={() => handleSelectChannel(item.id)}
                        >
                          <div className="dropdown-option-text">
                            <span className="dropdown-option-label">
                              {item.label}
                            </span>
                            <span className="dropdown-option-desc">
                              {item.subtitle}
                            </span>
                          </div>
                          {selected && <Check size={15} strokeWidth={2.2} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <p className="blog-subtitle">{activeChannel.subtitle}</p>
            </div>

            {loading ? (
              <div className="blog-empty">loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="blog-empty">
                No entries in {activeChannel.label} yet.
              </div>
            ) : (
              <div className="posts-list">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="post-card"
                    onClick={() => setActivePost(post)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActivePost(post);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                  >
                    <div className="post-meta-row">
                      <span className="post-meta-item">
                        <Calendar size={12} strokeWidth={1.8} />
                        {post.publishedAt}
                      </span>
                      <span className="post-meta-sep" aria-hidden="true">
                        /
                      </span>
                      <span className="post-meta-item">
                        <Clock size={12} strokeWidth={1.8} />
                        {post.readTime}
                      </span>

                      {canAuthor && (
                        <button
                          type="button"
                          className="post-delete-btn"
                          onClick={(e) => handleDeletePost(e, post.id)}
                          aria-label={`Delete ${post.title}`}
                          title="Delete post"
                        >
                          <Trash2 size={13} strokeWidth={1.8} />
                        </button>
                      )}
                    </div>

                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-excerpt">{post.excerpt}</p>

                    <ul className="tag-list">
                      {(post.tags || []).map((tag) => (
                        <li className="tag-chip" key={tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </>
        ) : (
          <article className="article-view">
            <div className="article-meta">
              <span className="eyebrow-tag">
                /{activePost.category === 'personal' ? 'personal-blogs' : 'blogs'}
              </span>
              <span className="post-meta-item">{activePost.publishedAt}</span>
              <span className="post-meta-sep" aria-hidden="true">
                /
              </span>
              <span className="post-meta-item">{activePost.readTime}</span>
            </div>

            <h1 className="article-title">{activePost.title}</h1>
            <p className="article-lead">{activePost.excerpt}</p>

            <ul className="tag-list article-tags">
              {(activePost.tags || []).map((tag) => (
                <li className="tag-chip" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>

            <div className="article-content">
              {renderArticleBody(activePost.content)}
            </div>
          </article>
        )}
      </div>

      {composerOpen && (
        <PostComposerModal
          defaultCategory={channel}
          onClose={() => setComposerOpen(false)}
          onSubmit={handlePublishPost}
        />
      )}
    </section>
  );
}
