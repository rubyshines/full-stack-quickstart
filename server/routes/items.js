import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const db = new PrismaClient();

// GET /api/items — return all items
router.get("/", async (_req, res) => {
  const items = await db.item.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items);
});

// POST /api/items — create an item
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  const item = await db.item.create({ data: { name } });
  res.status(201).json(item);
});

export default router;
