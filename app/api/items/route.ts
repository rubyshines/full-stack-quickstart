import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.item.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: "name is required" }, { status: 400 });
  const item = await db.item.create({ data: { name } });
  return NextResponse.json(item, { status: 201 });
}
