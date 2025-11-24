// src/components/TaskForm.tsx
"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TTaskSchema, taskSchema } from "@/lib/schemas";
import { Task, Subtask } from "@/types";
import { FiPlus, FiTrash } from "react-icons/fi";
import { useState } from "react";

interface TaskFormProps {
  onSubmit: (data: TTaskSchema) => void;
  initialData?: Task;
}

export default function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TTaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      priority: "média",
      subtasks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim() !== "") {
      append({ title: newSubtaskTitle, isCompleted: false });
      setNewSubtaskTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Título
        </label>
        <div className="mt-1">
          <input
            {...register("title")}
            id="title"
            type="text"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{`${errors.title.message}`}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700"
        >
          Data de Vencimento
        </label>
        <div className="mt-1">
          <input
            {...register("dueDate")}
            id="dueDate"
            type="date"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.dueDate && (
            <p className="mt-2 text-sm text-red-600">{`${errors.dueDate.message}`}</p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <div className="mt-1">
          <textarea
            {...register("description")}
            id="description"
            rows={4}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">{`${errors.description.message}`}</p>
          )}
        </div>
      </div>

      {/* Priority Field */}
      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Prioridade
        </label>
        <div className="mt-1">
          <select
            {...register("priority")}
            id="priority"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      {/* Subtasks Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subtarefas
        </label>
        <div className="mt-1 space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(`subtasks.${index}.isCompleted`)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <input
                {...register(`subtasks.${index}.title`)}
                className="flex-grow appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                readOnly // Torna o título da subtarefa somente leitura após adicionado
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <FiTrash />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <input
            type="text"
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            placeholder="Nova subtarefa"
            className="flex-grow appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={handleAddSubtask}
            className="p-2 text-indigo-600 hover:text-indigo-800"
            aria-label="Adicionar Subtarefa"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
