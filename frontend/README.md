A personal portfolio site built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org), and [Tailwind CSS](https://tailwindcss.com). Frontend-only — no backend, no database, nothing to deploy but static files.

## Stack

- Next.js 15 (App Router, Turbopack)
- TypeScript + Tailwind CSS 4
- Framer Motion for scroll animations
- next-themes for light/dark mode
- lucide-react for icons

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Make it yours

Everything on the page — name, role, bio, socials, skills, projects, and work experience — comes from one file:

```
src/data/site-config.ts
```

Edit the values there and every section updates automatically. No other files need to change for content edits.

A few other things to swap in:

- `public/resume.pdf` — add your resume; the "Download resume" button in the hero already links to `/resume.pdf`.
- Favicon — replace `src/app/favicon.ico`.
- Accent color — edit the `--accent` CSS variable in `src/app/globals.css` (light and dark values are separate).

## Project structure

```
src/
  app/            Root layout, global styles, page composition
  components/     One component per section (hero, about, skills, projects, experience, contact, ...)
  data/           site-config.ts — all editable content lives here
```

## Build

```bash
npm run build
npm start
```

## Deploy

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages via `next export`-style hosting). No environment variables or backend services are required.
