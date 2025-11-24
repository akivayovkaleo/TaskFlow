// src/app/board/page.tsx
"use client";

import Layout from "@/components/Layout";
import KanbanBoard from "@/components/KanbanBoard";

export default function BoardPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Quadro Kanban</h1>
      <KanbanBoard />
    </Layout>
  );
}
