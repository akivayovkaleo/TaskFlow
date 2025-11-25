"use client";
import { useState } from "react";
import { TaskList } from "@/components/TaskList";
import { TaskForm } from "@/components/TaskForm";
import { Modal } from "@/components/Modal";
import { Button } from "@tremor/react";

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Task</Button>
      </div>
      <TaskList />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
