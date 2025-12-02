"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTasks } from "@/hooks/useTasks";
import { Task, Subtask } from "@/types/task";
import { Button } from "@tremor/react";

const subtaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type SubtaskFormValues = z.infer<typeof subtaskSchema>;

interface SubTaskListProps {
  task: Task;
}

export function SubTaskList({ task }: SubTaskListProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubtaskFormValues>({
    resolver: zodResolver(subtaskSchema),
  });
  const { updateTask } = useTasks();

  const addSubtask = async (data: SubtaskFormValues) => {
    const newSubtask: Subtask = {
      id: new Date().toISOString(),
      title: data.title,
      isCompleted: false,
    };
    const updatedSubtasks = [...(task.subtasks || []), newSubtask];
    await updateTask(task.id, { subtasks: updatedSubtasks });
    reset();
  };

  const toggleSubtask = async (subtaskId: string) => {
    const updatedSubtasks = (task.subtasks || []).map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : subtask
    );
    await updateTask(task.id, { subtasks: updatedSubtasks });
  };

  const removeSubtask = async (subtaskId: string) => {
    const updatedSubtasks = (task.subtasks || []).filter(
      (subtask) => subtask.id !== subtaskId
    );
    await updateTask(task.id, { subtasks: updatedSubtasks });
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Subtasks</h2>
      <form onSubmit={handleSubmit(addSubtask)} className="flex mt-4">
        <input
          type="text"
          {...register("title")}
          className="flex-grow px-3 py-2 border rounded-l-md"
          placeholder="New subtask"
        />
        <Button type="submit">Add</Button>
      </form>
      {errors.title && (
        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
      )}
      <div className="mt-4 space-y-2">
        {(task.subtasks || []).map((subtask) => (
          <div key={subtask.id} className="flex items-center">
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={() => toggleSubtask(subtask.id)}
              className="mr-2"
            />
            <span className={subtask.isCompleted ? "line-through" : ""}>
              {subtask.title}
            </span>
            <button
              onClick={() => removeSubtask(subtask.id)}
              className="ml-auto text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
