// src/types/index.ts

/**
 * Represents a user in the system.
 * This interface can be extended with more user-specific properties.
 */
export interface User {
  uid: string;
  email: string | null;
  name: string | null;
  // You can add other profile properties here, like photoURL
}

/**
 * Represents a single sub-task within a main task.
 */
export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

/**
 * Represents the main task entity.
 */
export interface Task {
  id: string; // Document ID from Firestore
  userId: string; // Foreign key to the User who owns the task
  title: string;
  description?: string;
  dueDate?: Date | string; // Storing as ISO string or Firestore Timestamp and converting to Date
  priority?: 'baixa' | 'média' | 'alta';
  status: 'A Fazer' | 'Fazendo' | 'Concluído';
  subtasks?: Subtask[];
  progress?: number; // Percentage (0-100), calculated from subtasks
  createdAt: Date;
}
