// src/components/KanbanBoard.tsx
"use client";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useTasks } from "@/hooks/useTasks";
import KanbanColumn from "./KanbanColumn";
import { Task } from "@/types";
import { useEffect, useState } from "react";

export default function KanbanBoard() {
  const { tasks, updateTask } = useTasks();
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>({
    "A Fazer": [],
    "Fazendo": [],
    "Concluído": [],
  });

  useEffect(() => {
    const todo = tasks.filter((task) => task.status === "A Fazer");
    const inProgress = tasks.filter((task) => task.status === "Fazendo");
    const done = tasks.filter((task) => task.status === "Concluído");
    setColumns({
      "A Fazer": todo,
      "Fazendo": inProgress,
      "Concluído": done,
    });
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);

    if (activeTask && activeTask.status !== overId) {
      await updateTask(activeTask.id, { status: overId as Task["status"] });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-x-4">
        {Object.entries(columns).map(([columnId, tasks]) => (
          <KanbanColumn
            key={columnId}
            columnId={columnId}
            title={columnId}
            tasks={tasks}
          />
        ))}
      </div>
    </DndContext>
  );
}
