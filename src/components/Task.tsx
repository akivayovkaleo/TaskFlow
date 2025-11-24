// src/components/Task.tsx
"use client";
import { Task } from "@/types";
import { useTasks } from "@/hooks/useTasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: Task;
}

export default function TaskComponent({ task }: TaskProps) {
  const { deleteTask, updateTask } = useTasks();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleToggleStatus = () => {
    const newStatus = task.status === "A Fazer" ? "Concluído" : "A Fazer";
    updateTask({ ...task, status: newStatus });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-lg shadow-sm flex items-center justify-between ${
        task.status === "Concluído" ? "bg-green-100" : "bg-white"
      }`}
    >
      <div>
        <Link href={`/tasks/${task.id}`}>
          <h3 className="font-bold text-lg hover:underline">{task.title}</h3>
        </Link>
        {task.description && <p className="text-gray-600">{task.description}</p>}
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            task.status === "A Fazer"
              ? "bg-yellow-200 text-yellow-800"
              : task.status === "Fazendo"
              ? "bg-blue-200 text-blue-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {task.status}
        </span>
        {task.priority && (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
              task.priority === "baixa"
                ? "bg-green-200 text-green-800"
                : task.priority === "média"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        )}
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-700">Subtarefas</h4>
            <ul className="list-disc list-inside">
              {task.subtasks.map((subtask) => (
                <li
                  key={subtask.id}
                  className={subtask.isCompleted ? "line-through text-gray-500" : ""}
                >
                  {subtask.title}
                </li>
              ))}
            </ul>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
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
      <div className="flex items-center space-x-2">
        <button
          onClick={handleToggleStatus}
          className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {task.status === "A Fazer" ? "Concluir" : "Reabrir"}
        </button>
        <Link
          href={`/tasks/edit/${task.id}`}
          className="p-2 text-gray-600 hover:text-indigo-600"
          aria-label={`Editar tarefa ${task.title}`}
          title={`Editar tarefa ${task.title}`}
        >
          <FiEdit size={18} />
        </Link>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 text-gray-600 hover:text-red-600"
          aria-label={`Excluir tarefa ${task.title}`}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}
