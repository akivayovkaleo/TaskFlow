// src/components/KanbanColumn.tsx
"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types";
import TaskComponent from "./Task";

interface KanbanColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
}

export default function KanbanColumn({
  columnId,
  title,
  tasks,
}: KanbanColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: columnId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 rounded-lg p-4 w-80"
    >
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <div className="space-y-4 min-h-[500px]">
        {tasks.map((task) => (
          <TaskComponent key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
