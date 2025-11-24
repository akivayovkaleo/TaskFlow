// src/hooks/useTasks.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "./useAuth";
import { Task } from "@/types";
import toast from "react-hot-toast";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Omit<Task, "id" | "userId" | "createdAt">) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const tasksData: Task[] = [];
          querySnapshot.forEach((doc) => {
            tasksData.push({ id: doc.id, ...doc.data() } as Task);
          });
          setTasks(tasksData);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching tasks:", error);
          toast.error("Erro ao carregar tarefas.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const addTask = async (task: Omit<Task, "id" | "userId" | "createdAt">) => {
    if (!user) {
      toast.error("Você precisa estar logado para adicionar tarefas.");
      return;
    }
    try {
      await addDoc(collection(db, "tasks"), {
        ...task,
        userId: user.uid,
        createdAt: new Date(),
        status: "A Fazer", // Corrigido para o status inicial correto
      });
      toast.success("Tarefa adicionada com sucesso!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Erro ao adicionar tarefa.");
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const taskDoc = doc(db, "tasks", task.id);
      await updateDoc(taskDoc, task);
      toast.success("Tarefa atualizada com sucesso!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Erro ao atualizar tarefa.");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      toast.success("Tarefa excluída com sucesso!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Erro ao excluir tarefa.");
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
