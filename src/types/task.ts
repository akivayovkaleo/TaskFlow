export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: Date | string;
  priority?: 'baixa' | 'média' | 'alta';
  status: 'A Fazer' | 'Fazendo' | 'Concluído';
  subtasks?: Subtask[];
  progress?: number;
  createdAt: Date | any;
  updatedAt?: Date | any;
}

