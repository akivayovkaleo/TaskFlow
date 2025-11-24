// src/app/tasks/[id]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import Layout from "@/components/Layout";
import { Task } from "@/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

export default function TaskDetailPage() {
  const params = useParams();
  const { id } = params;
  const { tasks } = useTasks();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const foundTask = tasks.find((t) => t.id === id);
      setTask(foundTask || null);
    }
  }, [id, tasks]);

  if (!task) {
    return (
      <Layout>
        <p>Carregando tarefa...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <Link
            href={`/tasks/edit/${task.id}`}
            className="p-2 text-gray-600 hover:text-indigo-600"
            aria-label={`Editar tarefa ${task.title}`}
            title={`Editar tarefa ${task.title}`}
          >
            <FiEdit size={24} />
          </Link>
        </div>
        {task.description && <p className="text-gray-700 mb-4">{task.description}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold">Status</h4>
            <p>{task.status}</p>
          </div>
          <div>
            <h4 className="font-bold">Prioridade</h4>
            <p>{task.priority || "Não definida"}</p>
          </div>
          <div>
            <h4 className="font-bold">Data de Vencimento</h4>
            <p>{task.dueDate ? new Date(task.dueDate as string).toLocaleDateString() : "Não definida"}</p>
          </div>
        </div>
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mt-6">
            <h4 className="font-bold mb-2">Subtarefas</h4>
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={subtask.isCompleted}
                    readOnly
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className={`ml-2 ${subtask.isCompleted ? "line-through text-gray-500" : ""}`}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (task.subtasks.filter((s) => s.isCompleted).length /
                      task.subtasks.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
