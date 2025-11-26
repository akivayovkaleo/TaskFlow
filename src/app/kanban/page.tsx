"use client";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

function KanbanColumn({ id, status, tasks }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-bold">{status}</h2>
      <SortableContext id={id} items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="mt-4 space-y-2">
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id}>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function KanbanPage() {
  const { tasks, fetchTasks, updateTask } = useTasks();
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    setColumns({
      todo: tasks.filter((t) => t.status === "todo"),
      doing: tasks.filter((t) => t.status === "doing"),
      done: tasks.filter((t) => t.status === "done"),
    });
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    const task = tasks.find((t) => t.id === activeId);
    if (task) {
      updateTask(task.id, { status: overContainer });
    }
  }

  const findContainer = (id) => {
    if (id === 'todo' || id === 'doing' || id === 'done') return id;
    for (const column in columns) {
      if (columns[column].some((item) => item.id === id)) {
        return column;
      }
    }
    return null;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn id="todo" status="To Do" tasks={columns.todo} />
        <KanbanColumn id="doing" status="Doing" tasks={columns.doing} />
        <KanbanColumn id="done" status="Done" tasks={columns.done} />
      </div>
    </DndContext>
  );
}
