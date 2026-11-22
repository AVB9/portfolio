import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  if (!isFirebaseConfigured || !auth) {
    return {
      user: {
        displayName: 'Atharva Bedarkar (Local Mode)',
        email: import.meta.env.VITE_ADMIN_EMAIL || 'local@preview',
      },
      isLocal: true,
    };
  }
  const result = await signInWithPopup(auth, provider);
  return { user: result.user, isLocal: false };
}

export async function signOutUser() {
  if (!isFirebaseConfigured || !auth) {
    return;
  }
  await signOut(auth);
}

export function subscribeToAuth(callback) {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
