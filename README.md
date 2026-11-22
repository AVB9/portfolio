# Atharva Bedarkar — Portfolio & Blog

A minimalist dark developer portfolio inspired by `carloslorenzo.dev`, built with **React**, **Three.js**, and **Firebase**.

## Features

- **Split Hero + Interactive 3D Sleeping Cat (`sleepy_cat.three`)**: Procedural Three.js curled-up cat with smooth breathing, ear twitches, floating `Z z z` particles, click-to-pet purr rings and heart particles, a wake/nap toggle, and a midnight/desk-lamp lighting switch.
- **Responsive Mobile View**: Stacks cleanly on narrow viewports with a floating glassmorphic bottom navigation dock (`Top`, `About`, `Work`, `Blog`, `Mail`).
- **Blogs + Personal Blogs Dropdown**: Dedicated `/blog` view with a category dropdown right beside the **Blogs** title (`Blogs` by default, `Personal Blogs` in the dropdown), article reader, and built-in post composer.
- **Modular Firebase Layer (`src/firebase/`)**: Works immediately in local preview mode with seeded posts, and switches automatically to **Cloud Firestore** + **Firebase Auth** once `.env` is configured.

## Quick Start

```bash
npm install
npm run dev
```

## Connect Firebase (Firestore + Hosting)

1. Copy `.env.example` to `.env` and paste your Firebase Web App credentials from Firebase Console.
2. In Firebase Console, enable **Cloud Firestore** and **Authentication (Google Sign-In)**.
3. Create a composite index in Firestore on the `posts` collection (`category` Ascending, `createdAt` Descending) when prompted in the browser console.
4. Deploy to Firebase Hosting:

```bash
npm run build
npx firebase deploy
```

## Customizing Content

Edit `src/data/portfolioData.js` to update your email, social links, bio, experience timeline, projects, or default seeded posts.
