"use client";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { ProgressBar } from "@tremor/react";
import {
  CheckCircle2,
  Trash2,
  Edit2,
  AlertCircle,
  Clock,
  Flag,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function TaskList() {
  const { tasks, fetchTasks, deleteTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<"todas" | "pendentes" | "concluidas">(
    "todas"
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const calculateProgress = (task: Task) => {
    if (!task.subtasks || task.subtasks.length === 0) return 100;
    const completed = task.subtasks.filter((subtask) => subtask.isCompleted)
      .length;
    return (completed / task.subtasks.length) * 100;
  };

  const handleDelete = async (taskId: string) => {
    try {
      setIsDeleting(taskId);
      await deleteTask(taskId);
      toast.success("Tarefa deletada com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar tarefa");
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "alta":
        return "text-crimson";
      case "média":
        return "text-yellow-500";
      case "baixa":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getPriorityBgColor = (priority?: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100";
      case "média":
        return "bg-yellow-100";
      case "baixa":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const isOverdue = (dueDate?: string | Date) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pendentes") return task.status !== "Concluído";
    if (filter === "concluidas") return task.status === "Concluído";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {(["todas", "pendentes", "concluidas"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === f
                ? "bg-navy text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f === "todas"
              ? "Todas"
              : f === "pendentes"
                ? "Pendentes"
                : "Concluídas"}{" "}
            ({filteredTasks.length})
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <CheckCircle2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {filter === "todas"
              ? "Nenhuma tarefa encontrada"
              : filter === "pendentes"
                ? "Nenhuma tarefa pendente!"
                : "Nenhuma tarefa concluída"}
          </p>
          <Link
            href="/tasks/new"
            className="inline-block mt-4 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors"
          >
            Criar Tarefa
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => {
            const progress = calculateProgress(task);
            const overdue = isOverdue(task.dueDate);

            return (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-navy"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-navy">
                          {task.title}
                        </h3>
                        {overdue && task.status !== "Concluído" && (
                          <AlertCircle className="h-5 w-5 text-crimson" />
                        )}
                        {task.priority && (
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${getPriorityBgColor(
                              task.priority
                            )} ${getPriorityColor(task.priority)}`}
                          >
                            <Flag size={14} />
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}
                          </div>
                        )}
                      </div>

                      {task.description && (
                        <p className="text-gray-600 text-sm">
                          {task.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      <Link
                        href={`/tasks/${task.id}`}
                        className="p-2 text-navy hover:bg-blue-100 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
                        disabled={isDeleting === task.id}
                        className="p-2 text-crimson hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                        title="Deletar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Due Date and Status */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    {task.dueDate && (
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>
                          {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                        </span>
                        {overdue && task.status !== "Concluído" && (
                          <span className="text-crimson font-semibold">
                            (Vencida)
                          </span>
                        )}
                      </div>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        task.status === "Concluído"
                          ? "bg-green-500"
                          : task.status === "Fazendo"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progresso:</span>
                        <span className="font-semibold text-navy">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            progress === 100 ? "bg-green-500" : "bg-baby-blue"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {task.subtasks.filter((s) => s.isCompleted).length}/
                        {task.subtasks.length} sub-tarefas concluídas
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

