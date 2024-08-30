export type TaskState = 'todo' | 'in-progress' | 'complete';
export type TaskPriority = 'high' | 'medium' | 'low' | '';

export interface Task {
 id: string;
  title: string;
  description: string;
  state: 'todo' | 'in-progress' | 'complete';
  priority: TaskPriority;
  image?: File | null;
}
