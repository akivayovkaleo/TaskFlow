"use client";
import { useState, createContext, useContext, ReactNode, useCallback, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "./useAuth";
import { Task } from "@/types/task";

interface TaskContextData {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, "id" | "userId" | "createdAt">) => Promise<void>;
  updateTask: (taskId: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  const fetchTasks = useCallback(async () => {
    if (user) {
      try {
        const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date(),
            dueDate: data.dueDate ? (typeof data.dueDate === 'string' ? data.dueDate : data.dueDate.toDate?.()) : undefined,
          } as Task;
        });
        setTasks(tasksData);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [user, fetchTasks]);

  const createTask = async (task: Omit<Task, "id" | "userId" | "createdAt">) => {
    if (user) {
      try {
        await addDoc(collection(db, "tasks"), {
          ...task,
          userId: user.uid,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        await fetchTasks();
      } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        throw error;
      }
    }
  };

  const updateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, {
        ...updatedTask,
        updatedAt: Timestamp.now(),
      });
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
      throw error;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await deleteDoc(taskDoc);
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      throw error;
    }
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

