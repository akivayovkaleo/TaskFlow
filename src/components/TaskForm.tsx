"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "sonner";
import { Task } from "@/types/task";
import { useState } from "react";

const taskSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["baixa", "média", "alta"]).default("média"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export function TaskForm({ task, onClose }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: task || {
      title: "",
      description: "",
      dueDate: "",
      priority: "média",
    },
  });
  const { createTask, updateTask } = useTasks();

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setIsLoading(true);
      if (task) {
        await updateTask(task.id, {
          ...data,
          status: task.status || "A Fazer",
        });
        toast.success("Tarefa atualizada com sucesso!");
      } else {
        await createTask({
          ...data,
          status: "A Fazer",
          subtasks: [],
        });
        toast.success("Tarefa criada com sucesso!");
      }
      onClose();
    } catch (error: any) {
      console.error("Erro:", error);
      toast.error("Erro: " + (error.message || "Tente novamente"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Título *
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Título da tarefa"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-crimson">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Descrição detalhada da tarefa"
          rows={4}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent resize-none"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-crimson">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Vencimento
          </label>
          <input
            id="dueDate"
            type="date"
            {...register("dueDate")}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-crimson">{errors.dueDate.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Prioridade
          </label>
          <select
            id="priority"
            {...register("priority")}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
          >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 text-white bg-navy hover:bg-navy-dark rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {isLoading ? "Processando..." : task ? "Atualizar Tarefa" : "Criar Tarefa"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 text-navy bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

