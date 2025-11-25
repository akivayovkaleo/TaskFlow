"use client";
import { useState, createContext, useContext, ReactNode, useCallback } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase-config";
import { useAuth } from "./useAuth";
import { Task } from "@/types/task";

interface TaskContextData {
  tasks: Task[];
  fetchTasks: () => void;
  createTask: (task: Omit<Task, "id" | "userId">) => Promise<void>;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  const fetchTasks = useCallback(async () => {
    if (user) {
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Task)
      );
      setTasks(tasksData);
    }
  }, [user]);

  const createTask = async (task: Omit<Task, "id" | "userId">) => {
    if (user) {
      await addDoc(collection(db, "tasks"), { ...task, userId: user.uid });
      fetchTasks();
    }
  };

  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc, updatedTask);
    fetchTasks();
  };

  const deleteTask = async (taskId: string) => {
    const taskDoc = doc(db, "tasks", taskId);
    await deleteDoc(taskDoc);
    fetchTasks();
  };

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
