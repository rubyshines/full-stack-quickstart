# Full Stack Quickstart

A one-click deployable full-stack app template for use with [Claude Code](https://claude.ai/code). No technical setup needed.

**Stack:** React · Express · PostgreSQL · Prisma · Railway

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
3. Tell Claude what you want to build

**Example prompts:**
- "Add a form where users can submit their name, and save it to the database"
- "Show all submissions on the homepage with a delete button"
- "Make it look like a clean todo list app"
- "Add a page that shows a count of how many items have been added"

Claude handles the code, database changes, and deployment. You just describe what you want.

---

## How it works

| What you do | What happens |
|---|---|
| Push to `main` | Railway builds and deploys automatically |
| Change the DB schema | Migrations run automatically on deploy |
| Ask Claude for help | `CLAUDE.md` gives it full context about the project |

---

## Local development (optional)

```bash
npm install
cp .env.example .env
# Edit .env with your local PostgreSQL URL

npx prisma db push     # set up the database
npm run dev            # start frontend + backend
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project structure

```
src/              # React frontend
server/           # Express backend
  routes/         # API endpoints (one file per resource)
prisma/           # Database schema + migrations
index.html        # HTML entry point
vite.config.ts    # Dev proxy config
railway.json      # Deployment config
CLAUDE.md         # Context file for Claude Code
```
