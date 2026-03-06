"use client";

import { useEffect, useState } from "react";

type Item = { id: number; name: string; createdAt: string };

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchItems() {
    const res = await fetch("/api/items");
    setItems(await res.json());
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    await fetchItems();
    setLoading(false);
  }

  return (
    <main>
      <h1>My App</h1>
      <p>Edit <code>app/page.tsx</code> to customize this page. Ask Claude to help!</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, margin: "24px 0" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add an item..."
          style={{ flex: 1, padding: "8px 12px", fontSize: 16 }}
        />
        <button type="submit" disabled={loading} style={{ padding: "8px 16px", fontSize: 16 }}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
            {item.name}
            <span style={{ color: "#999", fontSize: 12, marginLeft: 12 }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>

      {items.length === 0 && <p style={{ color: "#999" }}>No items yet. Add one above!</p>}
    </main>
  );
}
