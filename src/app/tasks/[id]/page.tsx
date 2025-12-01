// src/app/tasks/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Task, Subtask } from "@/types/task";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Check, Edit2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id as string;
  const { tasks, updateTask, deleteTask } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId);
    if (foundTask) {
      setTask(foundTask);
    }
    setIsLoading(false);
  }, [taskId, tasks]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando tarefa...</p>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Tarefa não encontrada</p>
        <Link
          href="/tasks"
          className="inline-block px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark"
        >
          Voltar para Tarefas
        </Link>
      </div>
    );
  }

  const progress = task.subtasks
    ? (task.subtasks.filter((s) => s.isCompleted).length / task.subtasks.length) * 100
    : 0;

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) {
      toast.error("Digite um título para a sub-tarefa");
      return;
    }

    const newSubtask: Subtask = {
      id: Date.now().toString(),
      title: newSubtaskTitle,
      isCompleted: false,
    };

    const updatedSubtasks = task.subtasks ? [...task.subtasks, newSubtask] : [newSubtask];
    await updateTask(task.id, { subtasks: updatedSubtasks });
    setNewSubtaskTitle("");
    toast.success("Sub-tarefa adicionada");
  };

  const handleToggleSubtask = async (subtaskId: string) => {
    if (!task.subtasks) return;

    const updatedSubtasks = task.subtasks.map((s) =>
      s.id === subtaskId ? { ...s, isCompleted: !s.isCompleted } : s
    );

    await updateTask(task.id, { subtasks: updatedSubtasks });
    toast.success("Sub-tarefa atualizada");
  };

  const handleDeleteSubtask = async (subtaskId: string) => {
    if (!task.subtasks) return;

    const updatedSubtasks = task.subtasks.filter((s) => s.id !== subtaskId);
    await updateTask(task.id, { subtasks: updatedSubtasks });
    toast.success("Sub-tarefa removida");
  };

  const handleStatusChange = async (newStatus: "A Fazer" | "Fazendo" | "Concluído") => {
    await updateTask(task.id, { status: newStatus });
    toast.success("Status atualizado");
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
      await deleteTask(task.id);
      toast.success("Tarefa deletada");
      router.push("/tasks");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/tasks"
          className="flex items-center space-x-2 text-navy hover:text-navy-dark transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Title and Status */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-navy">{task.title}</h1>
              {task.description && (
                <p className="text-gray-600 mt-3 text-lg">{task.description}</p>
              )}
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-navy hover:bg-blue-100 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit2 size={20} />
            </button>
          </div>

          {/* Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-gray-600 text-sm">Prioridade:</span>
              <p className="font-semibold text-navy capitalize">{task.priority || "N/A"}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Data de Vencimento:</span>
              <p className="font-semibold text-navy">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("pt-BR")
                  : "Sem data"}
              </p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Status:</span>
              <div className="flex gap-2 mt-2">
                {(["A Fazer", "Fazendo", "Concluído"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                      task.status === status
                        ? "bg-navy text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-navy text-lg">Progresso</h3>
              <span className="text-baby-blue-dark font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="bg-white rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-baby-blue transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Subtasks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-navy">Sub-tarefas</h2>

          {/* Add Subtask */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddSubtask()}
              placeholder="Adicionar nova sub-tarefa..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
            />
            <button
              onClick={handleAddSubtask}
              className="flex items-center gap-2 bg-navy hover:bg-navy-dark text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} />
              Adicionar
            </button>
          </div>

          {/* Subtask List */}
          {task.subtasks && task.subtasks.length > 0 ? (
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <button
                    onClick={() => handleToggleSubtask(subtask.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      subtask.isCompleted
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {subtask.isCompleted && <Check size={16} className="text-white" />}
                  </button>
                  <span
                    className={`flex-1 ${
                      subtask.isCompleted
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {subtask.title}
                  </span>
                  <button
                    onClick={() => handleDeleteSubtask(subtask.id)}
                    className="p-2 text-crimson hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">
              Nenhuma sub-tarefa. Adicione uma acima!
            </p>
          )}
        </div>

        {/* Delete Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="w-full px-4 py-3 bg-crimson text-white rounded-lg hover:bg-crimson-dark transition-colors font-semibold"
          >
            Deletar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
}

