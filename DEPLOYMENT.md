# Deployment

This repo is a monorepo with two independently deployed apps:

```
my-portfolio/
├── frontend/   Next.js portfolio  → Vercel
└── backend/    NestJS API         → Render
```

## Live URLs

| | URL |
|---|---|
| Portfolio (frontend) | https://frontend-tau-rouge-25.vercel.app |
| API (backend) | https://my-portfolio-7z72.onrender.com |
| Source | https://github.com/VaibhavBajpai16/my_portfolio |

## Architecture

```
Visitor
  │
  ▼
Vercel (frontend/, Next.js)
  │  POST /chat  (NEXT_PUBLIC_API_URL)
  ▼
Render (backend/, NestJS)
  │  reads knowledge/data/*.json, calls Gemini
  ▼
Google Gemini API
```

The two are connected by exactly two settings:
- Frontend's `NEXT_PUBLIC_API_URL` → points at the backend's Render URL
- Backend's `CORS_ORIGIN` → points at the frontend's Vercel URL

Both are environment variables set in each platform's dashboard — neither is committed to the repo.

---

## Frontend — Vercel

**Setup (one-time):**
1. [vercel.com](https://vercel.com) → New Project → import `VaibhavBajpai16/my_portfolio`
2. Root Directory: `frontend`
3. Framework preset: Next.js (auto-detected, no other config needed)
4. Environment variable:
   ```
   NEXT_PUBLIC_API_URL = https://my-portfolio-7z72.onrender.com
   ```

**Deploying from the CLI** (what was actually used here, no GitHub auto-deploy hook configured):
```bash
cd frontend
npx vercel login          # one-time browser auth
npx vercel --prod --yes   # deploy
```

**To redeploy after code changes:** just re-run `npx vercel --prod --yes` from `frontend/`. To change an env var, `npx vercel env add NEXT_PUBLIC_API_URL production` then redeploy — env vars prefixed `NEXT_PUBLIC_` are baked in at **build time**, so changing one always requires a fresh deploy, not just a restart.

**Gotcha hit during setup:** Vercel's deploy pipeline hard-rejects known-vulnerable Next.js versions (`"Vulnerable version of Next.js detected, please update immediately"`). The project started on `15.5.4`; fixed by upgrading to the latest patched `15.x` release:
```bash
npm install next@15.5.22
```
Stayed within the `15.x` line intentionally (vs. jumping to `16.x`) to avoid unrelated breaking changes.

---

## Backend — Render

**Setup (one-time):**
1. [dashboard.render.com](https://dashboard.render.com) → New + → Web Service
2. Connect GitHub → select `my_portfolio`
3. Root Directory: `backend`
4. Build Command: `npm install && npm run build`
5. Start Command: `npm run start:prod`
6. Instance Type: Free
7. Environment variables:
   ```
   GEMINI_API_KEY       = <your Gemini API key>
   GEMINI_MODEL         = gemini-flash-latest
   AI_PROVIDER          = gemini
   CORS_ORIGIN          = https://frontend-tau-rouge-25.vercel.app
   CHAT_THROTTLE_TTL_MS = 60000
   CHAT_THROTTLE_LIMIT  = 10
   ```
   (`PORT` is injected automatically by Render — the app already reads `process.env.PORT` via `ConfigService`, nothing to set.)

**Redeploying:** connected to GitHub, so pushing to `main` triggers an automatic redeploy. Manual redeploy: dashboard → **Manual Deploy** → **Deploy latest commit**.

**Gotchas hit during setup (in the order they actually happened):**

1. **`sh: 1: nest: not found`** — Render's build log showed no `npm install` step at all between "Checking out commit" and "Running build command." Render does **not** automatically prepend `npm install` before a custom Build Command; it has to be explicit. Fixed by changing the Build Command from `npm run build` to `npm install && npm run build`.

2. **Defense-in-depth fix, same symptom:** many hosts that *do* auto-install skip `devDependencies` in production mode, which would break this build too since `@nestjs/cli` (needed for `nest build`) lived there. Moved `@nestjs/cli`, `@nestjs/schematics`, and `typescript` into `dependencies` in `backend/package.json` so the build works regardless of how a given host handles the install step. Verified by reproducing the exact failure locally (`npm install --omit=dev` + the global `nest` CLI hidden from `PATH`) before and after the fix.

---

## Local development

Two servers, two terminals:

```bash
# backend
cd backend
cp .env.example .env   # fill in GEMINI_API_KEY
npm install
npm run start:dev       # http://localhost:3001

# frontend
cd frontend
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:3001
npm install
npm run dev              # http://localhost:3000
```

## Known limitation

Render's free tier spins the backend down after ~15 minutes of no traffic. The first chat request after idling takes 30–50s while it wakes back up — expected free-tier behavior, not a bug. Upgrading to a paid Render instance removes this.
