# Full Stack Quickstart

A one-click deployable full-stack app template. Built for use with [Claude Code](https://claude.ai/code) — no technical setup needed.

**Stack:** Next.js · PostgreSQL · Prisma · Railway

---

## Deploy in one click

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/YOUR_TEMPLATE_ID)

> This button will:
> 1. Fork this repo into your GitHub account
> 2. Create a Railway project connected to your repo
> 3. Provision a PostgreSQL database automatically
>
> After ~2 minutes, your app is live. Every push to `main` deploys automatically.

---

## After deploying — use Claude Code to build your app

1. Open [Claude Code Web](https://claude.ai/code)
2. Connect it to your forked GitHub repo
3. Tell Claude what you want to build — it already knows the project structure

**Example prompts to get started:**
- "Add a page where users can submit their name and it saves to the database"
- "Show a list of all submissions on the homepage"
- "Add a delete button to each item"
- "Style the app to look like a clean todo list"

Claude handles the code, migrations, and deployment. You just describe what you want.

---

## Local development (optional)

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Fill in DATABASE_URL in .env

# Apply database schema
npx prisma db push

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
app/
  page.tsx          # Main page — start editing here
  api/items/        # Example API endpoint
lib/
  db.ts             # Database client
prisma/
  schema.prisma     # Database schema
railway.json        # Deployment config (auto-migrates on deploy)
CLAUDE.md           # Instructions for Claude Code
```

---

## How it works

- **Push to `main`** → Railway builds and deploys automatically
- **Database migrations** run automatically on every deploy (`prisma migrate deploy`)
- **`CLAUDE.md`** gives Claude context about the project so it always knows how to help

No DevOps knowledge required. Just talk to Claude.
