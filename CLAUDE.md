# Project Guide for Claude

## What this project is

A full-stack web app:
- **React + Vite** — frontend (lives in `src/`)
- **Express** — backend API (lives in `server/`)
- **PostgreSQL + Prisma** — database
- **Railway** — hosting (auto-deploys on push to `main`)

## How deployment works

**Push to `main` = deploy to production. That's it.**

Railway automatically:
1. Runs `npm run build` (compiles React into `dist/`)
2. Runs `prisma migrate deploy` (applies DB schema changes)
3. Starts `node server/index.js` (Express serves the app + API)

## Project structure

```
src/
  App.tsx           # Main React UI — edit this to change the frontend
  main.tsx          # React entry point (rarely needs editing)
server/
  index.js          # Express server entry point
  routes/
    items.js        # Example API route — copy this for new routes
prisma/
  schema.prisma     # Database schema — edit to add/change tables
  migrations/       # Migration files (auto-generated, don't edit)
index.html          # HTML shell for the React app
vite.config.ts      # Vite config (proxies /api to Express in dev)
railway.json        # Build + start commands for Railway
```

## How to make changes

### Change the UI
Edit `src/App.tsx`. It's a standard React component.

### Add a new page
Install `react-router-dom`, then add routes in `App.tsx`. Example:
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
// <Route path="/about" element={<About />} />
```

### Add a new API endpoint
1. Create `server/routes/your-thing.js` (copy `items.js` as a starting point)
2. Register it in `server/index.js`:
   ```js
   import yourThingRouter from "./routes/your-thing.js";
   app.use("/api/your-thing", yourThingRouter);
   ```
3. Call it from React: `fetch("/api/your-thing")`

### Change the database schema
1. Edit `prisma/schema.prisma` — add or modify models
2. Run `npx prisma migrate dev --name describe_your_change` locally to create a migration
3. Push to main — Railway applies the migration automatically on deploy

### Query the database in a route
```js
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Fetch all items
const items = await db.item.findMany();

// Create an item
const item = await db.item.create({ data: { name: "hello" } });

// Delete an item
await db.item.delete({ where: { id: 1 } });
```

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Set automatically by Railway PostgreSQL plugin |
| `PORT` | Set automatically by Railway |

For local development, copy `.env.example` to `.env` and fill in your local DB URL.

## How dev mode works

`npm run dev` starts two things in parallel:
- Vite dev server on `http://localhost:5173` (hot-reloading React)
- Express server on `http://localhost:3001` (API)

Vite automatically proxies `/api/*` requests to Express, so your React code always just calls `/api/...` regardless of environment.

## Common tasks

- "Add a new field to the database" → Edit `prisma/schema.prisma`, run migrate
- "Build a form that saves data" → Add a POST route in `server/routes/`, call it from `App.tsx`
- "Show data from the database" → Add a GET route, fetch it in `useEffect` in `App.tsx`
- "Add a second page" → Install react-router-dom, add a route
- "Style the app" → Add CSS in `index.html` or install Tailwind CSS
- "Deploy changes" → Commit and push to `main`
