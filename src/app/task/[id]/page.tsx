"use client";
import { useParams } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { SubTaskList } from "@/components/SubTaskList";
import { Modal } from "@/components/Modal";
import { Button } from "@tremor/react";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, fetchTasks } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const currentTask = tasks.find((t) => t.id === id);
      setTask(currentTask || null);
    }
  }, [tasks, id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <Button onClick={() => setIsModalOpen(true)}>Edit Task</Button>
      </div>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-4">
        <p>
          <strong>Due Date:</strong> {task.dueDate}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Status:</strong> {task.status}
        </p>
      </div>
      <SubTaskList task={task} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm task={task} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
