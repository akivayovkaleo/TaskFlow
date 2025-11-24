// src/components/TaskCharts.tsx
"use client";
import { useTasks } from "@/hooks/useTasks";
import { Card, Title, BarChart, DonutChart } from "@tremor/react";

export default function TaskCharts() {
  const { tasks } = useTasks();

  // Process data for charts
  const statusData = [
    { name: "A Fazer", value: tasks.filter((t) => t.status === "A Fazer").length },
    { name: "Fazendo", value: tasks.filter((t) => t.status === "Fazendo").length },
    { name: "Concluído", value: tasks.filter((t) => t.status === "Concluído").length },
  ];

  const priorityData = [
    { name: "Baixa", value: tasks.filter((t) => t.priority === "baixa").length },
    { name: "Média", value: tasks.filter((t) => t.priority === "média").length },
    { name: "Alta", value: tasks.filter((t) => t.priority === "alta").length },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card>
        <Title>Tarefas por Status</Title>
        <BarChart
          data={statusData}
          index="name"
          categories={["value"]}
          colors={["blue"]}
          yAxisWidth={30}
        />
      </Card>
      <Card>
        <Title>Tarefas por Prioridade</Title>
        <DonutChart
          data={priorityData}
          category="value"
          index="name"
          colors={["green", "yellow", "red"]}
        />
      </Card>
    </div>
  );
}
