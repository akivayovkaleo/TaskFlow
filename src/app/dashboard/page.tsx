// src/app/dashboard/page.tsx
"use client";
import Layout from "@/components/Layout";
import DashboardMetrics from "@/components/DashboardMetrics";
import TaskCharts from "@/components/TaskCharts";
import TaskList from "@/components/TaskList";

export default function DashboardPage() {
  return (
    <Layout>
      <DashboardMetrics />
      <TaskCharts />
      <TaskList />
    </Layout>
  );
}
