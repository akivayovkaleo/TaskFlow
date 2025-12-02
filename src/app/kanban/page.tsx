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
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface SortableItemProps {
  id: string;
  task: Task;
  onSelect?: (task: Task) => void;
}

function SortableTaskItem({ id, task, onSelect }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "alta":
        return "border-l-4 border-crimson";
      case "média":
        return "border-l-4 border-yellow-500";
      case "baixa":
        return "border-l-4 border-green-500";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-grab active:cursor-grabbing ${getPriorityColor(
        task.priority
      )}`}
      onClick={() => onSelect?.(task)}
    >
      <div className="flex items-start gap-3">
        <div {...attributes} {...listeners} className="flex-shrink-0 mt-1">
          <GripVertical size={18} className="text-gray-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-navy truncate">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {task.description}
            </p>
          )}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              {task.subtasks.filter((s) => s.isCompleted).length}/
              {task.subtasks.length} sub-tarefas
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onSelectTask?: (task: Task) => void;
}

function KanbanColumnComponent({
  id,
  title,
  tasks,
  onSelectTask,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-4 min-h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-navy">{title}</h2>
        <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-semibold">
          {tasks.length}
        </span>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 space-y-3 overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500 text-center">
              <p>Nenhuma tarefa</p>
            </div>
          ) : (
            tasks.map((task) => (
              <Link key={task.id} href={`/tasks/${task.id}`}>
                <SortableTaskItem
                  id={task.id}
                  task={task}
                  onSelect={onSelectTask}
                />
              </Link>
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default function KanbanPage() {
  const { tasks, fetchTasks, updateTask } = useTasks();
  const [localTasks, setLocalTasks] = useState(tasks);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeTask = localTasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id as string;

    // Determine the target status
    let targetStatus: "A Fazer" | "Fazendo" | "Concluído" | undefined;
    if (overId === "column-todo") targetStatus = "A Fazer";
    else if (overId === "column-doing") targetStatus = "Fazendo";
    else if (overId === "column-done") targetStatus = "Concluído";
    else {
      // Find which column the over task belongs to
      const overTask = localTasks.find((t) => t.id === overId);
      if (overTask) targetStatus = overTask.status;
    }

    if (!targetStatus) return;

    try {
      await updateTask(activeTask.id, { status: targetStatus });
      toast.success(`Tarefa movida para "${targetStatus}"`);
    } catch (error) {
      toast.error("Erro ao mover tarefa");
      console.error(error);
    }
  }

  const todoTasks = localTasks.filter((t) => t.status === "A Fazer");
  const doingTasks = localTasks.filter((t) => t.status === "Fazendo");
  const doneTasks = localTasks.filter((t) => t.status === "Concluído");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-navy">Quadro Kanban</h1>
        <p className="text-gray-600 mt-2">
          Arraste as tarefas entre colunas para atualizar seu status
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumnComponent
            id="column-todo"
            title="A Fazer"
            tasks={todoTasks}
          />
          <KanbanColumnComponent
            id="column-doing"
            title="Fazendo"
            tasks={doingTasks}
          />
          <KanbanColumnComponent
            id="column-done"
            title="Concluído"
            tasks={doneTasks}
          />
        </div>
      </DndContext>

      {localTasks.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <CheckCircle2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">
            Nenhuma tarefa encontrada
          </p>
          <Link
            href="/tasks/new"
            className="inline-block px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors"
          >
            Criar Tarefa
          </Link>
        </div>
      )}
    </div>
  );
}

