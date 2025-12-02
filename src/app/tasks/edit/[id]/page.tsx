// src/app/tasks/edit/[id]/page.tsx
"use client";
import Layout from "@/components/Layout";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { TTaskSchema } from "@/lib/schemas";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Task } from "@/types";

export default function EditTaskPage() {
  const { tasks, updateTask } = useTasks();
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((t) => t.id === id);
      if (taskToEdit) {
        setTask(taskToEdit);
      } else {
        // Handle case where task is not found
        router.push("/dashboard");
      }
    }
  }, [id, tasks, router]);

  // Use TaskForm's built-in update behavior; pass task and onClose handler

  if (!task) {
    return (
      <Layout>
        <p>Carregando tarefa...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Editar Tarefa</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <TaskForm task={task} onClose={() => router.push("/dashboard")} />
        </div>
      </div>
    </Layout>
  );
}
