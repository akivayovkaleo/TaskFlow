"use client";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { Card, Title, Text, LineChart, DonutChart } from "@tremor/react";
import { useEffect, useMemo } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const taskMetrics = useMemo(() => {
    const pending = tasks.filter((task) => task.status === "todo").length;
    const completed = tasks.filter((task) => task.status === "done").length;
    const overdue = tasks.filter(
      (task) =>
        task.status !== "done" && new Date(task.dueDate) < new Date()
    ).length;
    return { pending, completed, overdue };
  }, [tasks]);

  const weeklyProgress = useMemo(() => {
    const data = Array(7)
      .fill(0)
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
          date: date.toLocaleDateString(),
          completed: 0,
        };
      });

    tasks.forEach((task) => {
      if (task.status === "done") {
        const completedDate = new Date(task.dueDate);
        const diff = new Date().getTime() - completedDate.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days < 7) {
          data[days].completed++;
        }
      }
    });

    return data.reverse();
  }, [tasks]);

  const priorityDistribution = useMemo(() => {
    const data = [
      { name: "Low", value: 0 },
      { name: "Medium", value: 0 },
      { name: "High", value: 0 },
    ];

    tasks.forEach((task) => {
      if (task.priority === "low") data[0].value++;
      if (task.priority === "medium") data[1].value++;
      if (task.priority === "high") data[2].value++;
    });

    return data;
  }, [tasks]);

  if (!user) {
    return (
      <div className="text-center">
        <p>Please log in to view the dashboard.</p>
      </div>
    );
  }

  return (
    <div>
      <Title>Dashboard</Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <Text>Pending Tasks</Text>
          <Title>{taskMetrics.pending}</Title>
        </Card>
        <Card>
          <Text>Completed This Week</Text>
          <Title>{taskMetrics.completed}</Title>
        </Card>
        <Card>
          <Text>Overdue Tasks</Text>
          <Title>{taskMetrics.overdue}</Title>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <Title>Weekly Progress</Title>
          <LineChart
            className="mt-6"
            data={weeklyProgress}
            index="date"
            categories={["completed"]}
            colors={["green"]}
            yAxisWidth={40}
          />
        </Card>
        <Card>
          <Title>Priority Distribution</Title>
          <DonutChart
            className="mt-6"
            data={priorityDistribution}
            category="value"
            index="name"
            colors={["green", "yellow", "red"]}
          />
        </Card>
      </div>
    </div>
  );
}
