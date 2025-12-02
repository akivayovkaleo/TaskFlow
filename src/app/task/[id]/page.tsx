"use client";
import { useParams } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, fetchTasks } = useTasks();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const currentTask = tasks.find((t) => t.id === id);
      setTask(currentTask || null);
    }
  }, [tasks, id]);

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link
        href="/tasks"
        className="flex items-center gap-2 text-[#001a4d] hover:text-[#1a3a66] mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        Voltar para Tarefas
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#001a4d] mb-2">{task.title}</h1>
          <p className="text-gray-600">{task.description || "Sem descrição"}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[#87ceeb]/10 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Data de Vencimento</p>
            <p className="font-semibold text-[#001a4d]">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString("pt-BR") : "Sem data"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Prioridade</p>
            <p className={`font-semibold ${
              task.priority === "alta" ? "text-[#dc143c]" :
              task.priority === "média" ? "text-orange-500" :
              "text-green-500"
            }`}>
              {task.priority ? (task.priority.charAt(0).toUpperCase() + task.priority.slice(1)) : "Sem prioridade"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className={`font-semibold ${
              task.status === "Concluído" ? "text-green-500" :
              task.status === "Fazendo" ? "text-orange-500" :
              "text-gray-500"
            }`}>
              {task.status}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sub-tarefas</p>
            <p className="font-semibold text-[#001a4d]">
              {task.subtasks?.filter(s => s.isCompleted).length || 0} / {task.subtasks?.length || 0}
            </p>
          </div>
        </div>

        <Link
          href={`/tasks/edit/${id}`}
          className="inline-block bg-[#001a4d] text-white px-6 py-2 rounded-lg hover:bg-[#1a3a66] transition-colors font-medium"
        >
          Editar Tarefa
        </Link>
      </div>
    </div>
  );
}
