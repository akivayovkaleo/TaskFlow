// src/components/DashboardMetrics.tsx
"use client";

import { useTasks } from "@/hooks/useTasks";
import { FiCheckSquare, FiClock, FiGrid } from "react-icons/fi";

export default function DashboardMetrics() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Concluído"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const metrics = [
    {
      icon: <FiGrid size={24} className="text-blue-500" />,
      label: "Total de Tarefas",
      value: totalTasks,
    },
    {
      icon: <FiCheckSquare size={24} className="text-green-500" />,
      label: "Tarefas Concluídas",
      value: completedTasks,
    },
    {
      icon: <FiClock size={24} className="text-yellow-500" />,
      label: "Tarefas Pendentes",
      value: pendingTasks,
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4"
          >
            <div className="flex-shrink-0">{metric.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-500 truncate">
                {metric.label}
              </p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">
                {metric.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
