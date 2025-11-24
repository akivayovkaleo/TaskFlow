// src/components/TaskCalendar.tsx
"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTasks } from "@/hooks/useTasks";

const localizer = momentLocalizer(moment);

export default function TaskCalendar() {
  const { tasks } = useTasks();

  const events = tasks.map((task) => ({
    title: task.title,
    start: new Date(task.dueDate as string),
    end: new Date(task.dueDate as string),
    allDay: true,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
        }}
      />
    </div>
  );
}
