import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import itemsRouter from "./routes/items.js";

const app = express();
const PORT = process.env.PORT || 3001;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// API routes
app.use("/api/items", itemsRouter);

// In production, serve the built frontend
if (process.env.NODE_ENV === "production") {
  const distPath = join(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => res.sendFile(join(distPath, "index.html")));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
