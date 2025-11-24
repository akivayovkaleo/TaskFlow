// src/app/calendar/page.tsx
"use client";
import Layout from "@/components/Layout";
import TaskCalendar from "@/components/TaskCalendar";

export default function CalendarPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Calendário de Tarefas</h1>
      <TaskCalendar />
    </Layout>
  );
}
