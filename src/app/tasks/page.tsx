"use client";
import { TaskList } from "@/components/TaskList";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-navy">Minhas Tarefas</h1>
          <p className="text-gray-600 mt-2">
            Gerencie e organize todas as suas tarefas aqui
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="flex items-center gap-2 bg-navy hover:bg-navy-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} />
          Nova Tarefa
        </Link>
      </div>

      {/* Task List */}
      <TaskList />
    </div>
  );
}

