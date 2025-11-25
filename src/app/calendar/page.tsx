"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTasks } from "@/hooks/useTasks";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { Modal } from "@/components/Modal";
import { TaskForm } from "@/components/TaskForm";

export default function CalendarPage() {
  const { tasks, fetchTasks } = useTasks();
  const [events, setEvents] = useState([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const calendarEvents = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      date: task.dueDate,
    }));
    setEvents(calendarEvents);
  }, [tasks]);

  const handleEventClick = (clickInfo: any) => {
    const task = tasks.find((t) => t.id === clickInfo.event.id);
    if (task) {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Calendar</h1>
      <div className="mt-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
        />
      </div>
      {selectedTask && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TaskForm task={selectedTask} onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
