export type TaskPriority = 'high' | 'medium' | 'low' | 'none';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  deadline?: Date | string;
  dateCreated: Date | string;
}
