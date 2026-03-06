# Project Guide for Claude

## What this project is

A full-stack web app built with:
- **Next.js 14** (React frontend + API routes backend)
- **PostgreSQL** database (hosted on Railway)
- **Prisma** ORM for database access
- **Railway** for hosting and deployment

## How deployment works

**Push to `main` = deploy to production. That's it.**

Railway watches this repo and automatically:
1. Builds the app
2. Runs `prisma migrate deploy` (applies any DB schema changes)
3. Starts the server

You never need to touch Railway's dashboard after initial setup.

## Project structure

```
app/
  page.tsx          # Main UI — edit this to change the frontend
  layout.tsx        # HTML shell, fonts, global styles
  api/
    items/
      route.ts      # Example API route (GET + POST /api/items)
lib/
  db.ts             # Prisma client (singleton, import from here)
prisma/
  schema.prisma     # Database schema — edit to add/change tables
  migrations/       # Auto-generated migration files (don't edit manually)
railway.json        # Railway build & start config
```

## How to make changes

### Change the UI
Edit `app/page.tsx`. It's a React component. Push to main to deploy.

### Add a new page
Create `app/your-page/page.tsx`. It's automatically routed to `/your-page`.

### Add a new API endpoint
Create `app/api/your-endpoint/route.ts`. Export `GET`, `POST`, etc.

### Change the database schema
1. Edit `prisma/schema.prisma` to add or modify models
2. Run `npx prisma migrate dev --name describe_your_change` locally, OR just push to main and Railway will apply changes automatically if you use `db push` approach

**The simplest approach for non-local development:**
- Edit `prisma/schema.prisma`
- Run `npx prisma db push` in a Railway shell (or use `prisma migrate dev` locally)
- Push code changes to main

### Query the database in an API route
```typescript
import { db } from "@/lib/db";

// Fetch all items
const items = await db.item.findMany();

// Create an item
const item = await db.item.create({ data: { name: "hello" } });
```

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Set automatically by Railway PostgreSQL plugin |

For local development, copy `.env.example` to `.env` and fill in your local DB URL.

## Common tasks Claude should handle

- "Add a new field to the database" → Edit schema.prisma, create migration
- "Build a form that saves to the database" → Add API route + update page.tsx
- "Add authentication" → Suggest NextAuth.js, implement it
- "Style the app" → Use Tailwind CSS or inline styles in page.tsx
- "Add a new page" → Create app/[page-name]/page.tsx
- "Deploy my changes" → Commit and push to main

## Important rules

- Always use `db` from `@/lib/db` for database access (not `new PrismaClient()`)
- Never commit `.env` files
- API routes live in `app/api/*/route.ts`
- Migrations in `prisma/migrations/` should not be manually edited
