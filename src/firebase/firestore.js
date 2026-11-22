import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { SEED_POSTS } from '../data/portfolioData';

const COLLECTION_NAME = 'posts';
const LOCAL_STORAGE_KEY = 'atharva_portfolio_posts_v1';

function readLocalPosts() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_POSTS));
      return SEED_POSTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_POSTS;
  }
}

function writeLocalPosts(posts) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

export function slugifyTitle(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function estimateReadTime(content) {
  const words = (content || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 210));
  return `${minutes} min read`;
}

export async function fetchPosts(category = 'blogs') {
  if (!isFirebaseConfigured || !db) {
    const localPosts = readLocalPosts();
    return localPosts
      .filter((post) => post.category === category)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }

  try {
    const postsRef = collection(db, COLLECTION_NAME);
    const q = query(
      postsRef,
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return SEED_POSTS.filter((post) => post.category === category);
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        publishedAt:
          data.publishedAt ||
          (data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10)),
      };
    });
  } catch (error) {
    console.warn('Firestore fetch fallback to seeded posts:', error.message);
    const localPosts = readLocalPosts();
    return localPosts.filter((post) => post.category === category);
  }
}

export async function createPost({ title, excerpt, content, category, tags }) {
  const cleanTags = Array.isArray(tags)
    ? tags
    : String(tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

  const today = new Date().toISOString().slice(0, 10);
  const newPost = {
    slug: `${slugifyTitle(title)}-${Date.now().toString(36).slice(-4)}`,
    title: title.trim(),
    excerpt: excerpt.trim(),
    content: content.trim(),
    category: category === 'personal' ? 'personal' : 'blogs',
    tags: cleanTags.length ? cleanTags : ['notes'],
    publishedAt: today,
    readTime: estimateReadTime(content),
  };

  if (!isFirebaseConfigured || !db) {
    const localPosts = readLocalPosts();
    const withId = { ...newPost, id: `local-${Date.now()}` };
    writeLocalPosts([withId, ...localPosts]);
    return withId;
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...newPost,
    createdAt: serverTimestamp(),
  });

  return { id: docRef.id, ...newPost };
}

export async function deletePost(postId) {
  if (!isFirebaseConfigured || !db || String(postId).startsWith('seed-') || String(postId).startsWith('local-')) {
    const localPosts = readLocalPosts().filter((p) => p.id !== postId);
    writeLocalPosts(localPosts);
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, postId));
}
