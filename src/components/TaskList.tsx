// src/components/TaskList.tsx
"use client";
import { useTasks } from "@/hooks/useTasks";
import TaskComponent from "./Task";
import Link from "next/link";

export default function TaskList() {
  const { tasks, loading } = useTasks();

  if (loading) {
    return <p>Carregando tarefas...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Suas Tarefas</h2>
        <Link
          href="/tasks/new"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Nova Tarefa
        </Link>
      </div>
      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </div>
  );
}
