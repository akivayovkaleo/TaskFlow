// src/app/tasks/new/page.tsx
"use client";

import Layout from "@/components/Layout";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { TTaskSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";

export default function NewTaskPage() {
  const { addTask } = useTasks();
  const router = useRouter();

  const handleAddTask = async (data: TTaskSchema) => {
    await addTask(data);
    router.push("/dashboard");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Nova Tarefa</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      </div>
    </Layout>
  );
}
