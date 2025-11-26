"use client";
import { useTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";
import { useEffect } from "react";
import { ProgressBar } from "@tremor/react";

export function TaskList() {
  const { tasks, fetchTasks, deleteTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const calculateProgress = (task: Task) => {
    if (task.subtasks.length === 0) return 0;
    const completed = task.subtasks.filter((subtask) => subtask.done).length;
    return (completed / task.subtasks.length) * 100;
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="p-4 my-2 bg-white rounded-lg shadow-md">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <div className="flex space-x-2">
              <button className="text-blue-600">Edit</button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <p className="text-gray-600">{task.description}</p>
          <div className="mt-4">
            <ProgressBar
              value={calculateProgress(task)}
              color={calculateProgress(task) === 100 ? "green" : "blue"}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
