// src/app/tasks/new/page.tsx
"use client";

import { TaskForm } from "@/components/TaskForm";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewTaskPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/tasks");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/tasks"
          className="flex items-center space-x-2 text-navy hover:text-navy-dark transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </Link>
        <h1 className="text-4xl font-bold text-navy">Nova Tarefa</h1>
        <p className="text-gray-600 mt-2">
          Crie uma nova tarefa para organizar suas atividades
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <TaskForm onClose={handleClose} />
      </div>
    </div>
  );
}

