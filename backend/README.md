NestJS backend for the portfolio site. Currently powers an AI chat widget that answers visitor questions using your resume/skills/projects/experience as grounding data — built to grow with more features later.

## Stack

- NestJS 11 + TypeScript
- `@nestjs/config` for environment config
- `@nestjs/throttler` for rate limiting
- `class-validator` / `class-transformer` for request validation
- Google Gemini or OpenAI for the chat completion (swappable via env)

## Getting started

```bash
cp .env.example .env
# add GEMINI_API_KEY (or switch AI_PROVIDER=openai and add OPENAI_API_KEY)

npm install
npm run start:dev
```

Server listens on `PORT` (default `3001`).

## API

### `GET /health`

```json
{ "status": "ok", "timestamp": "2026-08-01T00:00:00.000Z" }
```

### `POST /chat`

Request:

```json
{ "message": "What projects have you built?" }
```

Response:

```json
{ "reply": "..." }
```

Rate-limited (`CHAT_THROTTLE_LIMIT` requests per `CHAT_THROTTLE_TTL_MS`, default 10/min). If the configured AI provider isn't reachable or isn't set up, it returns a graceful fallback reply instead of an error.

## How it works

1. `POST /chat` hits `ChatController`, which validates the body and calls `ChatService`.
2. `PromptService` builds a system prompt from the JSON files in `src/knowledge/data/` (profile, skills, projects, experience) — the same content that seeds the portfolio frontend.
3. `ChatService` sends the system prompt + user message to whichever `AiService` implementation is active (`GeminiService` or `OpenaiService`, chosen by `AI_PROVIDER` in `src/ai/ai.module.ts`).
4. The reply is returned as `{ reply: string }`.

## Project structure

```
src/
  ai/           AiService interface + Gemini/OpenAI implementations, selected via AI_PROVIDER
  knowledge/    JSON knowledge base + service to read it
  chat/         DTO, prompt builder, chat service/controller
  app.module.ts Config, throttling, module wiring
  main.ts       CORS, validation pipe, bootstrap
```

## Keep the knowledge base in sync

`src/knowledge/data/*.json` mirrors `../src/data/site-config.ts` in the frontend. When you update your real info in the frontend config, update these files too so the chat assistant's answers stay accurate. (A shared source of truth is a natural next step once both sides stabilize.)

## Adding a new feature module

Follow the existing pattern: a `*.module.ts` per feature, a service for logic, a controller for HTTP, and a DTO for validated input. Register the module in `app.module.ts`.
