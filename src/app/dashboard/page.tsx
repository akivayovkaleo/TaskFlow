"use client";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import {
  Card,
  Title,
  Text,
  LineChart,
  BarChart,
  DonutChart,
  Grid,
} from "@tremor/react";
import { useEffect, useMemo } from "react";
import { CheckCircle2, Clock, AlertCircle, ListTodo } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const taskMetrics = useMemo(() => {
    const pending = tasks.filter((task) => task.status === "A Fazer").length;
    const inProgress = tasks.filter(
      (task) => task.status === "Fazendo"
    ).length;
    const completed = tasks.filter((task) => task.status === "Concluído").length;
    const overdue = tasks.filter(
      (task) =>
        task.status !== "Concluído" &&
        task.dueDate &&
        new Date(task.dueDate) < new Date()
    ).length;
    return { pending, inProgress, completed, overdue, total: tasks.length };
  }, [tasks]);

  const weeklyProgress = useMemo(() => {
    const data = Array(7)
      .fill(0)
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toLocaleDateString("pt-BR", {
            weekday: "short",
            month: "2-digit",
            day: "2-digit",
          }),
          Concluídas: 0,
          "Em Progresso": 0,
        };
      });

    tasks.forEach((task) => {
      if (task.createdAt) {
        const createdDate = new Date(task.createdAt);
        const today = new Date();
        const diffTime = today.getTime() - createdDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays < 7) {
          if (task.status === "Concluído") {
            data[6 - diffDays].Concluídas++;
          } else if (task.status === "Fazendo") {
            data[6 - diffDays]["Em Progresso"]++;
          }
        }
      }
    });

    return data;
  }, [tasks]);

  const priorityDistribution = useMemo(() => {
    const data = [
      { name: "Baixa", value: 0 },
      { name: "Média", value: 0 },
      { name: "Alta", value: 0 },
    ];

    tasks.forEach((task) => {
      if (task.priority === "baixa") data[0].value++;
      if (task.priority === "média") data[1].value++;
      if (task.priority === "alta") data[2].value++;
    });

    return data;
  }, [tasks]);

  const progressByStatus = useMemo(() => {
    return [
      { name: "A Fazer", value: taskMetrics.pending },
      { name: "Fazendo", value: taskMetrics.inProgress },
      { name: "Concluído", value: taskMetrics.completed },
    ];
  }, [taskMetrics]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-gray-500">Faça login para acessar o painel.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Title className="text-3xl font-bold text-navy">Bem-vindo de volta, {user.displayName || user.email}!</Title>
        <Text className="text-baby-blue-dark mt-2">
          Aqui está um resumo das suas tarefas
        </Text>
      </div>

      {/* Metric Cards */}
      <Grid numItems={1} numItemsMd={2} numItemsLg={4} className="gap-6">
        <Card className="border-l-4 border-navy shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-gray-600">Total de Tarefas</Text>
              <Title className="text-3xl font-bold text-navy">
                {taskMetrics.total}
              </Title>
            </div>
            <ListTodo className="h-12 w-12 text-navy opacity-20" />
          </div>
        </Card>

        <Card className="border-l-4 border-baby-blue shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-gray-600">Tarefas Pendentes</Text>
              <Title className="text-3xl font-bold text-baby-blue">
                {taskMetrics.pending}
              </Title>
            </div>
            <Clock className="h-12 w-12 text-baby-blue opacity-20" />
          </div>
        </Card>

        <Card className="border-l-4 border-crimson shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-gray-600">Concluídas</Text>
              <Title className="text-3xl font-bold text-crimson">
                {taskMetrics.completed}
              </Title>
            </div>
            <CheckCircle2 className="h-12 w-12 text-crimson opacity-20" />
          </div>
        </Card>

        <Card className="border-l-4 border-red-500 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-gray-600">Vencidas</Text>
              <Title className="text-3xl font-bold text-red-500">
                {taskMetrics.overdue}
              </Title>
            </div>
            <AlertCircle className="h-12 w-12 text-red-500 opacity-20" />
          </div>
        </Card>
      </Grid>

      {/* Charts */}
      <Grid numItems={1} numItemsMd={2} className="gap-6">
        <Card className="shadow-lg">
          <Title className="text-navy">Progresso Semanal</Title>
          <LineChart
            className="mt-6 h-80"
            data={weeklyProgress}
            index="date"
            categories={["Concluídas", "Em Progresso"]}
            colors={["emerald", "blue"]}
            yAxisWidth={40}
            showLegend={true}
            showAnimation={true}
          />
        </Card>

        <Card className="shadow-lg">
          <Title className="text-navy">Tarefas por Prioridade</Title>
          <DonutChart
            className="mt-6"
            data={priorityDistribution}
            category="value"
            index="name"
            colors={["green", "yellow", "red"]}
            showAnimation={true}
            showTooltip={true}
          />
        </Card>

        <Card className="shadow-lg">
          <Title className="text-navy">Status das Tarefas</Title>
          <BarChart
            className="mt-6 h-80"
            data={progressByStatus}
            index="name"
            categories={["value"]}
            colors={["blue"]}
            yAxisWidth={40}
            showAnimation={true}
          />
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-navy to-navy-dark text-white shadow-lg">
        <Title className="text-white text-2xl">Ações Rápidas</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Link
            href="/tasks/new"
            className="bg-white text-navy px-4 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            + Nova Tarefa
          </Link>
          <Link
            href="/kanban"
            className="bg-baby-blue text-navy px-4 py-3 rounded-lg font-semibold hover:bg-baby-blue-dark transition-colors text-center"
          >
            Quadro Kanban
          </Link>
          <Link
            href="/calendar"
            className="bg-crimson text-white px-4 py-3 rounded-lg font-semibold hover:bg-crimson-light transition-colors text-center"
          >
            Calendário
          </Link>
        </div>
      </Card>
    </div>
  );
}
