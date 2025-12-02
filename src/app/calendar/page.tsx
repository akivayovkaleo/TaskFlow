"use client";
import { useTasks } from "@/hooks/useTasks";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CalendarPage() {
  const { tasks, fetchTasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
    );
  };

  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDay = getFirstDayOfMonth(selectedDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex items-center gap-2 mb-8">
        <Calendar className="w-8 h-8 text-[#001a4d]" />
        <h1 className="text-3xl font-bold text-[#001a4d]">
          Calendário de Tarefas
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendário */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-[#87ceeb]/20 rounded-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-[#001a4d]" />
            </button>
            <h2 className="text-2xl font-bold text-[#001a4d]">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-[#87ceeb]/20 rounded-lg transition"
            >
              <ChevronRight className="w-6 h-6 text-[#001a4d]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-[#001a4d] p-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const tasksForDay = day ? getTasksForDate(day) : [];
              const isToday =
                day &&
                new Date().toDateString() === day.toDateString();
              const isSelected =
                day &&
                selectedTask &&
                selectedTask.dueDate &&
                new Date(selectedTask.dueDate).toDateString() === day.toDateString();

              return (
                <div
                  key={index}
                  onClick={() => tasksForDay.length > 0 && setSelectedTask(tasksForDay[0])}
                  className={`min-h-24 p-2 border-2 rounded-lg cursor-pointer transition ${
                    day
                      ? `bg-white ${
                          isToday
                            ? "border-[#dc143c] bg-[#dc143c]/5"
                            : isSelected
                              ? "border-[#87ceeb] bg-[#87ceeb]/10"
                              : tasksForDay.length > 0
                                ? "border-[#001a4d] bg-[#001a4d]/5 hover:bg-[#001a4d]/10"
                                : "border-gray-200 hover:border-[#87ceeb]"
                        }`
                      : "bg-gray-100 border-gray-100"
                  }`}
                >
                  {day && (
                    <>
                      <p
                        className={`font-semibold mb-1 ${
                          isToday ? "text-[#dc143c]" : "text-[#001a4d]"
                        }`}
                      >
                        {day.getDate()}
                      </p>
                      <div className="space-y-1">
                        {tasksForDay.slice(0, 2).map((task) => (
                          <div
                            key={task.id}
                            className={`text-xs p-1 rounded truncate text-white font-semibold ${
                              task.priority === "alta"
                                ? "bg-[#dc143c]"
                                : task.priority === "média"
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                            }`}
                          >
                            {task.title}
                          </div>
                        ))}
                        {tasksForDay.length > 2 && (
                          <p className="text-xs text-gray-500 px-1">
                            +{tasksForDay.length - 2} mais
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalhes da Tarefa */}
        <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-8">
          <h3 className="text-xl font-bold text-[#001a4d] mb-4">Detalhes</h3>
          {selectedTask ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Título</p>
                <p className="font-semibold text-[#001a4d]">{selectedTask.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Descrição</p>
                <p className="text-gray-700">{selectedTask.description || "Sem descrição"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Prioridade</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    selectedTask.priority === "alta"
                      ? "bg-[#dc143c]"
                      : selectedTask.priority === "média"
                        ? "bg-orange-500"
                        : "bg-green-500"
                  }`}
                >
                  {selectedTask.priority ? selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1) : ""}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className={`font-semibold ${
                  selectedTask.status === "Concluído" ? "text-green-500" :
                  selectedTask.status === "Fazendo" ? "text-orange-500" :
                  "text-gray-500"
                }`}>
                  {selectedTask.status}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sub-tarefas</p>
                <p className="font-semibold text-[#001a4d]">
                  {selectedTask.subtasks?.filter(s => s.isCompleted).length || 0} / {selectedTask.subtasks?.length || 0}
                </p>
              </div>
              <Link
                href={`/tasks/edit/${selectedTask.id}`}
                className="block w-full text-center bg-[#001a4d] text-white px-4 py-2 rounded-lg hover:bg-[#1a3a66] transition-colors font-medium mt-4"
              >
                Editar Tarefa
              </Link>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Selecione uma tarefa para ver detalhes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

