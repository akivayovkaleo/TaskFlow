"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTasks } from "@/hooks/useTasks";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function CalendarPage() {
  const { tasks, fetchTasks } = useTasks();
  const [events, setEvents] = useState([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const calendarEvents = tasks
      .filter((task) => task.dueDate)
      .map((task) => ({
        id: task.id,
        title: task.title,
        date: task.dueDate,
        extendedProps: {
          status: task.status,
          priority: task.priority,
        },
        backgroundColor:
          task.status === "Concluído"
            ? "#10b981"
            : task.priority === "alta"
              ? "#dc143c"
              : task.priority === "média"
                ? "#f59e0b"
                : "#3b82f6",
        borderColor:
          task.status === "Concluído"
            ? "#059669"
            : task.priority === "alta"
              ? "#a80a2b"
              : task.priority === "média"
                ? "#d97706"
                : "#1e40af",
      }));
    setEvents(calendarEvents);
  }, [tasks]);

  const handleEventClick = (clickInfo: any) => {
    const task = tasks.find((t) => t.id === clickInfo.event.id);
    if (task) {
      setSelectedTask(task);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-navy flex items-center gap-3">
          <Calendar size={32} />
          Calendário de Tarefas
        </h1>
        <p className="text-gray-600 mt-2">
          Visualize suas tarefas por data de vencimento
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
              locale="pt-br"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth",
              }}
              dayCellClassNames="hover:bg-blue-50 cursor-pointer"
              eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>

        {/* Sidebar - Task Details */}
        {selectedTask ? (
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 h-fit">
            <div>
              <h2 className="text-xl font-bold text-navy mb-2">
                {selectedTask.title}
              </h2>
              <p className="text-gray-600 text-sm">{selectedTask.description}</p>
            </div>

            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="text-gray-600 text-sm">Status:</span>
                <p className="font-semibold text-navy capitalize">
                  {selectedTask.status}
                </p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Prioridade:</span>
                <p
                  className={`font-semibold capitalize ${
                    selectedTask.priority === "alta"
                      ? "text-crimson"
                      : selectedTask.priority === "média"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {selectedTask.priority || "Não definida"}
                </p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Vencimento:</span>
                <p className="font-semibold text-navy">
                  {selectedTask.dueDate
                    ? new Date(selectedTask.dueDate).toLocaleDateString(
                        "pt-BR"
                      )
                    : "Sem data"}
                </p>
              </div>

              {selectedTask.subtasks &&
                selectedTask.subtasks.length > 0 && (
                  <div>
                    <span className="text-gray-600 text-sm block mb-2">
                      Sub-tarefas:
                    </span>
                    <div className="space-y-1">
                      {selectedTask.subtasks.map((subtask) => (
                        <div
                          key={subtask.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={subtask.isCompleted}
                            readOnly
                            className="rounded"
                          />
                          <span
                            className={
                              subtask.isCompleted
                                ? "line-through text-gray-400"
                                : "text-gray-700"
                            }
                          >
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <Link
              href={`/tasks/${selectedTask.id}`}
              className="block w-full text-center bg-navy text-white py-2 rounded-lg hover:bg-navy-dark transition-colors font-semibold"
            >
              Visualizar Detalhes
            </Link>

            <button
              onClick={() => setSelectedTask(null)}
              className="w-full text-center bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center h-fit">
            <Calendar size={32} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Clique em um evento do calendário para ver os detalhes
            </p>
          </div>
        )}
      </div>

      {/* Custom Styles for Calendar */}
      <style jsx>{`
        :global(.fc-button-primary) {
          background-color: #001a4d !important;
          border-color: #001a4d !important;
        }

        :global(.fc-button-primary:hover) {
          background-color: #000d26 !important;
        }

        :global(.fc-button-primary.fc-button-active) {
          background-color: #1a3a66 !important;
        }

        :global(.fc-daygrid-day:hover) {
          background-color: #f0f9ff;
        }

        :global(.fc-col-header-cell) {
          background-color: #f3f4f6;
          color: #001a4d;
          font-weight: bold;
        }

        :global(.fc-daygrid-day-number) {
          color: #001a4d;
        }

        :global(.fc) {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
}

